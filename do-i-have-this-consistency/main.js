window.addEventListener("load", () => {
    const $select = $("select");
    const source = document.querySelector("#source");
    for (let [name, text] of PRESETS) {
        let $option = $("<option/>").text(name);
        $select.append($option);
        if (name === DEFAULT) {
            $option[0].selected = true;
            source.value = text;
        }
    }
    $select[0].addEventListener("change", (e) => {
        source.value = PRESETS.find(x => x[0] == e.target.value)[1];
    });
    const run = document.querySelector("#run");
    const right = document.querySelector("#right");
    run.addEventListener("click", () => {
        let invariants, theorems, consistency;
        try {
            [invariants, theorems, consistency] = parse(source.value);
        } catch(e) {
            if (e instanceof ParseError) {
                alert("Parse error on the "+(e.lineno+1)+"-th line.");
                return;
            } else {
                throw e;
            }
        }
        for (let [a, b] of theorems) {
            if (check(invariants, a)) return;
            if (check(invariants, b)) return;
        }
        for (let [a, b, method] of consistency) {
            if (check(invariants, a)) return;
            if (check(invariants, b)) return;
        }

        let table;
        try {
            table = create_table(invariants, theorems, consistency);
        } catch (e) {
            if (e instanceof InconsistentError) {
                $(right).empty().append("<p>There are inconsistencies in what you have inputted.</p>");
                return;
            } else {
                throw e;
            }
        }
        let $table = $("<table />");
        let $thead = $("<thead />");
        let $tbody = $("<tbody />");
        let $tr = $("<tr />");
        $thead.append($tr);
        $tr.append($("<td>x＼y</td>"));
        for (let y of invariants) {
            $tr.append($("<td />").text(y));
        }
        invariants.forEach((x, i) => {
            let $tr = $("<tr />");
            $tbody.append($tr);
            $tr.append($("<td />").text(x));
            invariants.forEach((y, j) => {
                let [ans, opt] = table[j][i];
                let $td = $("<td />").text(cell_text(ans)).addClass(class_name(ans));
                $tr.append($td);
                tippy($td[0], {
                    content: tooltip_html(y, x, ans, opt),
                    allowHTML: true,
                    trigger: "mouseenter click"
                });
            });
        });
        $table.append($thead);
        $table.append($tbody);
        $(right).empty().append("<p>Table of Con(x < y)</p>").append($table);
        let $graph = $("<div id=graph></div>")
        $(right).append($graph);
        d3.select("#graph").graphviz()
        .fade(false)
        .renderDot(dot_text(invariants, theorems, consistency));
    });
});

function dot_text(invariants, theorems, consistency) {
    let hash = {};
    invariants.forEach((invariant, i) => {
        hash[invariant] = i;
    });
    let str = "digraph { rankdir=\"LR\"";
    invariants.forEach((invariant, i) => {
        str += "v"+i+" [label=\""+invariant+"\"];";
    });
    theorems.forEach(([a, b]) => {
        str += "v"+hash[a]+"->v"+hash[b]+" weight = 10;";
    });
    /* consistency.forEach(([a, b]) => {
        str += "v"+hash[a]+"->v"+hash[b]+" [style=\"dashed\",color=\"#cccccc\"];";
    }); */
    str += "}";
    return str;
}

function check(invariants, invariant) {
    if (invariants.indexOf(invariant) < 0) {
        alert("The invariant "+invariant+" does not apper in the list.");
        return true;
    }
    return false;
}

function tn(text) {
    return document.createTextNode(text);
}

function tooltip_html(x, y, value, opt) {
    let $elem = $("<div />");
    if (value === true) {
        $elem.append($("<b />").text(x+"≦"+y));
        $elem.append(" is a theorem.");
        if (opt.length > 2) { 
            $elem.append($("<br />"));
            $elem.append(tn("Reason: "));
            $elem.append(tn(chain_to_string(opt)));
        }
    } else if (value === false) {
        $elem.append($("<b />").text(y+"<"+x));
        $elem.append(tn(" is consistent."));
        $elem.append($("<br />"));
        $elem.append(tn("Reason 1: Using method of "+opt[0]+", we can get a model of "+opt[2][opt[2].length - 1]+"<"+opt[1][0]));
        let reason = 2;
        if (opt[2].length > 1) {
            $elem.append($("<br />"));
            $elem.append(tn("Reason "+(reason++)+": "+chain_to_string(opt[2])+" is a theorem"));
        }
        if (opt[1].length > 1) {
            $elem.append($("<br />"));
            $elem.append(tn("Reason "+(reason++)+": "+chain_to_string(opt[1])+" is a theorem"));
        }
    } else {
        $elem.append(tn("Whether "));
        $elem.append($("<b />").text("Con("+y+"<"+x+")"));
        $elem.append(tn(" or "));
        $elem.append($("<b />").text("⊢ "+x+"≦"+y));
        $elem.append(tn(" is unknown."));
    }
    return $elem[0].innerHTML;
}

function chain_to_string(chain) {
    let str = chain[0];
    for (let i = 1; i < chain.length; i ++) {
        str += "≦";
        str += chain[i];
    }
    return str;
}

function cell_text(value) {
    if (value === true) {
        return "INCON";
    } else if (value === false) {
        return "CON";
    } else {
        return "？";
    }
}

function class_name(value) {
    if (value === true) {
        return "inconsistent";
    } else if (value === false) {
        return "consistent";
    } else {
        return "unknown";
    }
}


class ParseError {
    constructor(lineno) {
        this.lineno = lineno;
    }
}

function parse(text) {
    const lines = text.split("\n");
    let mode = "";
    let invariants = [];
    let theorems = [];
    let consistency = [];
    const num_lines = lines.length;
    for (let i = 0; i < num_lines; i ++) {
        let line = lines[i];
        line = line.replace(/\s+$/, "");
        if (line === "") {
            continue;
        }
        let m;
        if (m = line.match(/^(invariants|theorems|consistency|models):$/)) {
            mode = m[1];
        } else if (m = line.match(/^- (.+)$/)) {
            if (mode === "invariants") {
                invariants.push(m[1]);
            } else if (mode === "theorems") {
                let m2 = m[1].match(/^([\w\(\)]+)\s*<=\s*([\w\(\)]+)$/);
                if (!m2) {
                    throw new ParseError(i);
                }
                theorems.push([m2[1], m2[2]]);
            } else if (mode === "consistency") {
                let m2 = m[1].match(/^([\w\(\)]+)\s*<\s*([\w\(\)]+)\s*(?:;\s*(.*))?$/);
                if (!m2) {
                    throw new ParseError(i);
                }
                consistency.push([m2[1], m2[2], m2[3] || ""]);
            } else if (mode === "models") {
                let m2 = m[1].match(/^(.+);(.+);(.+)$/);
                if (!m2) {
                    throw new ParseError(i);
                }
                let model_name = m2[1];
                let small_invariants = m2[2].split(",");
                let large_invariants = m2[3].split(",");
                for (let sm of small_invariants) {
                    for (let la of large_invariants) {
                        consistency.push([sm, la, model_name]);
                    }
                }
            } else {
                throw new ParseError(i);
            }
        } else {
            throw new ParseError(i);
        }
    }
    return [invariants, theorems, consistency];
}

class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.in = {};
        this.out = {};
        for (let x of this.vertices) {
            this.in[x] = {};
            this.out[x] = {};
        }
    }

    add_edge(x, y, label) {
        this.out[x][y] = label;
        this.in[y][x] = label;
    }

    get_edge(x, y) {
        return this.out[x][y];
    }
}

function key_and_val(obj) {
    return Object.keys(obj).map(key => [key, obj[key]]);
}

function merge_chain(a, b) {
    if (a[a.length - 1] !== b[0]) {
        throw "cannot merge";
    }
    return [...a, ...b.slice(1)];
}


class InconsistentError {}

function create_table(invariants, theorems, consistency) {
    let graph = new Graph(invariants);
    let queue = [];
    for (let [a, b] of theorems) {
        queue.push([a, b, true, [a, b]]);
    }
    for (let [a, b, method] of consistency) {
        // b /-> aのopt は [method, bで終わるchain, aで始まるchain]を入れる
        queue.push([b, a, false, [method, [b], [a]]]);
    }
    while (queue.length > 0) {
        let [a, b, ans, opt] = queue.shift();
        if (graph.get_edge(a, b) !== undefined) {
            if (graph.get_edge(a, b)[0] !== ans) {
                throw new InconsistentError();
            }
            continue;
        }
        if (ans) {
            let chain = opt; // a->bのchain
            for (let [c, [f, opt2]] of key_and_val(graph.out[b])) {
                if (f) {
                    let merged = merge_chain(chain, opt2);
                    queue.push([a, c, true, merged]);
               }
            }
            for (let [c, [f, opt2]] of key_and_val(graph.in[a])) {
                if (f) {
                    let merged = merge_chain(opt2, chain);
                    queue.push([c, b, true, merged]);
                }
            }
            for (let [c, [f, opt2]] of key_and_val(graph.out[a])) {
                if (!f) {
                    // a /-> c
                    let method = opt2[0];
                    let chain1 = opt2[1]; // aで終わるchain
                    let chain2 = opt2[2]; // cで始まるchain
                    queue.push([b, c, false, [method, merge_chain(chain1, chain), chain2]]);
                }
            }
            for (let [c, [f, opt2]] of key_and_val(graph.in[b])) {
                if (!f) {
                    // c /-> b
                    let method = opt2[0];
                    let chain1 = opt2[1]; // cで終わるchain
                    let chain2 = opt2[2]; // bで始まるchain
                    queue.push([c, a, false, [method, chain1, merge_chain(chain, chain2)]]);
                }
            }
        } else {
            // a /-> b
            // chain1はaで終わり、chain2はbで始まる
            let [method, chain1, chain2] = opt;
            for (let [c, [f, opt2]] of key_and_val(graph.in[b])) {
                if (f) {
                    // opt2はc->bのchain
                    queue.push([a, c, false, [method, chain1, merge_chain(opt2, chain2)]]);
                }
            }
            for (let [c, [f, opt2]] of key_and_val(graph.out[a])) {
                if (f) {
                    // opt2はa->cのchain
                    queue.push([c, b, false, [method, merge_chain(chain1, opt2), chain2]]);
                }
            }
        }
        graph.add_edge(a, b, [ans, opt]);
    }
    let table = [];
    for (let x of invariants) {
        let row = [];
        for (let y of invariants) {
            if (x === y) {
                row.push([true, [x, y]]);
            } else {
                let label = graph.get_edge(x, y);
                if (label) {
                    row.push(label);
                } else {
                    row.push([undefined, null]);
                }
            }
        }
        table.push(row);
    }   
    return table;
}