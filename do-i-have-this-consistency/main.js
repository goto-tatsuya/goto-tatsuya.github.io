let USER_WRITTEN_INPUT = [];

let CANVAS_WIDTH = 600;
let CANVAS_HEIGHT = 300;

window.addEventListener("load", () => {
    const source = document.querySelector("#source");
    const $select = $("#select");
    const $optgroup = $("<optgroup label='Preset' />");
    const $optgroup2 = $("<optgroup label='User-Written Inputs' id='user-group' />");
    $select.append($optgroup).append($optgroup2);
    for (let [name, text] of PRESETS) {
        let $option = $("<option/>").text(name);
        $optgroup.append($option);
        if (name === DEFAULT) {
            $option[0].selected = true;
            source.value = text;
        }
    }
    $select[0].addEventListener("change", (e) => {
        let value = e.target.value;
        if (!isNaN(parseInt(value))) {
            let { name, text } = USER_WRITTEN_INPUT[value];
            $("#name")[0].value = name;
            source.value = text;
        } else {
            source.value = PRESETS.find(x => x[0] == value)[1];
        }
    });
    loadUserWrittenInput();
    showUserWrittenInput();
    $("#save")[0].addEventListener("click", () => {
        let name = $("#name")[0].value;
        let index = USER_WRITTEN_INPUT.findIndex(({ name: n, text: t }) => n == name);
        if (index >= 0) {
            USER_WRITTEN_INPUT[index] = { name: name, text: source.value };
        } else {
            USER_WRITTEN_INPUT.push({ name: name, text: source.value });
        }
        saveUserWrittenInput();
        showUserWrittenInput();
    });
    $("#delete")[0].addEventListener("click", () => {
        let name = $("#name")[0].value;
        let index = USER_WRITTEN_INPUT.findIndex(({ name: n, text: t }) => n == name);
        if (index >= 0) {
            USER_WRITTEN_INPUT.splice(index, 1);
        }
        saveUserWrittenInput();
        showUserWrittenInput();
    });



    const runButton = document.querySelector("#run");
    runButton.addEventListener("click", () => {
        // アニメーション用クラスを付与
        leftPane.classList.add("is-collapsing");

        // 幅を変更（これがメインの動き）
        leftPane.style.width = "20%";

        // 少し遅れてクラスを外す（余韻）
        setTimeout(() => {
            leftPane.classList.remove("is-collapsing");
        }, 350);

        contentsSwitch("result");

        run();
    });


    const divider = document.getElementById("divider");
    const leftPane = document.querySelector("#left");
    const container = document.querySelector("#container");

    let isDragging = false;

    divider.addEventListener("mousedown", () => {
        isDragging = true;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();
        const offsetX = e.clientX - containerRect.left;
        const percentage = (offsetX / containerRect.width) * 100;

        if (percentage > 20 && percentage < 80) {
            leftPane.style.width = percentage + "%";
        }
    });

    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = tab.dataset.target;
            contentsSwitch(targetId);
        });
    });
});

function contentsSwitch(targetId) {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(tab => {
        if (tab.dataset.target === targetId) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(c => {
        if (c.id === targetId) {
            c.style.display = "block";
        } else {
            c.style.display = "none";
        }
    });
}

function saveUserWrittenInput() {
    localStorage.setItem("userWrittenInputs", JSON.stringify(USER_WRITTEN_INPUT));
}

function loadUserWrittenInput() {
    let json = localStorage.getItem("userWrittenInputs");
    if (json) {
        USER_WRITTEN_INPUT = JSON.parse(json);
    } else {
        USER_WRITTEN_INPUT = [];
    }
}

function showUserWrittenInput() {
    let optgroup = $("#user-group")[0];
    optgroup.innerHTML = "";
    let index = 0;
    for (let { name, text } of USER_WRITTEN_INPUT) {
        optgroup.appendChild($("<option />").text(name).val(index)[0]);
        index++;
    }
}

class TeXReplacement {
    constructor(string) {
        this.instructions = [];
        let lines = string.split("\n");
        for (let line of lines) {
            if (line == "") continue;
            let [from, to] = line.split(":");
            from = new RegExp(from);
            this.instructions.push([from, to]);
        }
    }

    replace(str) {
        for (let [from, to] of this.instructions) {
            str = str.replace(from, to);
        }
        return str;
    }
}

function run() {
    const source = document.querySelector("#source");
    const tex_replacement = new TeXReplacement(document.querySelector("#tex-replacement").value);
    const right = document.querySelector("#result-area");
    let invariants, theorems, consistency, models;
    try {
        [invariants, theorems, consistency, models] = parse(source.value);
    } catch (e) {
        if (e instanceof ParseError) {
            alert("Parse error on the " + (e.lineno + 1) + "-th line.");
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
        let $td = $("<td />");
        katex.render(tex_replacement.replace(y), $td[0]);
        $tr.append($td);
    }
    let tips = {};
    invariants.forEach((x, i) => {
        let $tr = $("<tr />");
        $tbody.append($tr);
        let $td = $("<td />");
        katex.render(tex_replacement.replace(x), $td[0]);
        $tr.append($td);
        invariants.forEach((y, j) => {
            let [ans, opt] = table[j][i];
            let $td = $("<td />").text(cell_text(ans)).addClass(class_name(ans));
            $td[0].id = y + "-" + x;
            $tr.append($td);
            tips[y + "-" + x] = tippy($td[0], {
                content: tooltip_html(y, x, ans, opt),
                allowHTML: true,
                trigger: "manual"
            });
            $td[0].addEventListener("mouseenter", () => {
                changeColor(cy, x, y);
                $td.addClass("outlined");
                tips[x + "-" + y].reference.classList.add("outlined");
                if (x != y) {
                    adjustOffsets([tips[y + "-" + x], tips[x + "-" + y]]);
                } else {
                    adjustOffsets([tips[y + "-" + x]]);
                }
                tips[y + "-" + x].show();
                tips[x + "-" + y].show();
            });
            $td[0].addEventListener("mouseleave", () => {
                $td.removeClass("outlined");
                tips[x + "-" + y].reference.classList.remove("outlined");
                tips[y + "-" + x].hide();
                tips[x + "-" + y].hide();
            });
        });
    });
    $table[0].addEventListener("mouseleave", () => {
        revertColor(cy);
        clearAllTooltip(tips);
    });
    $table.append($thead);
    $table.append($tbody);
    $(right).empty();
    let $buttons = $("<div>");
    $(right).append($buttons);
    let $graph = $("<div id=graph style='width:" + CANVAS_WIDTH + "px;height:" + CANVAS_HEIGHT + "px'></div>");
    $(right).append($graph);
    let [cy, canvas] = make_graph(invariants, theorems, consistency, tips, tex_replacement);
    $buttons.append(createModelButtons(models, cy, canvas, invariants, theorems));
    $(right).append("<p>Table of Con(x < y)</p>").append($table);
}

function createModelButtons(models, cy, canvas, invariants, theorems) {
    let div = $("<div class='tab-buttons'/>");
    let buttons = [];
    function resetActive() {
        for (let button of buttons) {
            button.removeClass("active");
        }
    }
    let none_button = $("<button class='tab-btn active' data-target='none'>None</button>");
    none_button[0].addEventListener("click", () => {
        active_model = null;
        resetActive();
        none_button.addClass("active");
        clearVoronoi(canvas);
    });
    buttons.push(none_button);
    div.append(none_button);
    let active_model;
    for (let model of models) {
        let [model_name, small_inv, large_inv] = model;
        let button = $("<button class='tab-btn' />").attr("data-target", model_name).text(model_name);
        buttons.push(button);
        div.append(button);
        button[0].addEventListener("click", () => {
            active_model = model;
            resetActive();
            button.addClass("active");
            drawVoronoi(canvas, cy, invariants, theorems, small_inv, large_inv);
        });
    }
    cy.on('dragfree', 'node', () => {
        let small_inv, large_inv;
        if (active_model) [, small_inv, large_inv] = active_model;
        drawVoronoi(canvas, cy, invariants, theorems, small_inv, large_inv);
    });
    cy.on('pan', () => {
        let small_inv, large_inv;
        if (active_model) [, small_inv, large_inv] = active_model;
        drawVoronoi(canvas, cy, invariants, theorems, small_inv, large_inv);
    });
    return div;
}

function clearAllTooltip(tips) {
    for (let x in tips) {
        tips[x].hide();
    }
}

let prev_inv1, prev_inv2;

function changeColor(cy, inv1, inv2) {
    revertColor(cy);
    cy.getElementById(inv1).addClass("focused");
    cy.getElementById(inv2).addClass("focused");
    prev_inv1 = inv1;
    prev_inv2 = inv2;
}

function revertColor(cy) {
    if (prev_inv1) cy.getElementById(prev_inv1).removeClass("focused");
    if (prev_inv2) cy.getElementById(prev_inv2).removeClass("focused");
}

function make_graph(invariants, theorems, consistency, tips, tex_replacement) {
    let elements = [];

    invariants.forEach((invariant, i) => {
        let html = katex.renderToString(tex_replacement.replace(invariant));
        let size = getHtmlSize(html);
        elements.push({
            data: {
                id: invariant,
                html: html,
                width: size.width + 20,
                height: size.height + 10
            }
        });
    });
    theorems.forEach(([a, b]) => {
        elements.push({ data: { id: a + "-" + b, source: a, target: b } });
    });
    const cy = cytoscape({
        container: document.getElementById('graph'),
        elements: elements,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#444',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'width': 'data(width)',
                    'height': 'data(height)',
                    'font-size': 12,
                    'text-wrap': 'wrap'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            },
            {
                selector: 'node.focused',
                style: {
                    'background-color': 'rgba(144, 160, 209, 1)'
                }
            },
            {
                selector: 'node.selected',
                style: {
                    'background-color': 'rgba(113, 130, 181, 1)'
                }
            },
            {
                selector: 'edge.hover',
                style: {
                    'line-color': 'red',
                    'target-arrow-color': 'red',
                    'width': 5
                }
            }
        ],
        layout: { name: 'dagre', rankDir: 'LR' },
        zoomingEnabled: false,
    });
    rotateGraph(cy, -30);
    cy.nodeHtmlLabel([
        {
            query: 'node',
            halign: 'center',
            valign: 'center',
            halignBox: 'center',
            valignBox: 'center',
            cssClass: 'node',
            tpl: (data) => {
                return data.html;
            }
        }]);
    cy.edges().on('mouseover', (evt) => {
        const edge = evt.target;
        edge.addClass('hover');
        $("td").removeClass("outlined");
        showTips(tips, edge.id());
    });
    cy.edges().on('mouseout', (evt) => {
        const edge = evt.target;
        edge.removeClass('hover');
        $("td").removeClass("outlined");
        clearAllTooltip(tips);
    });
    cy.nodes().on('mouseover', (evt) => {
        const node = evt.target;
        if (selectedNodeId) {
            $("td").removeClass("outlined");
            node.addClass("focused");
            showTips(tips, node.id()+"-"+selectedNodeId);
        }
    });
    cy.nodes().on('mouseout', (evt) => {
            evt.target.removeClass("focused");
            clearAllTooltip(tips);
        
    });
    let dragged = false;
    let selectedNodeId = null;
    cy.on('mousedown', 'node', function () {
        dragged = false;
    });
    cy.on('drag', 'node', function () {
        dragged = true;
    });
    cy.on('mouseup', 'node', function (evt) {
        if (!dragged) {
            if (selectedNodeId === evt.target.id()) {
                evt.target.removeClass("selected");
                selectedNodeId = null;
            } else {
                if (selectedNodeId) {
                    cy.getElementById(selectedNodeId).removeClass("selected");
                }
                selectedNodeId = evt.target.id();
                evt.target.addClass("selected");
            }
        }
    });
    cy.edges().on('mouseover', (evt) => {
        const edge = evt.target;
        edge.addClass('hover');

    });
    let elem = document.getElementById('graph').childNodes[0];
    let div = $("<div />").css("position", "absolute").css("z-index", 0)[0];
    let canvas = $("<canvas />").attr("width", CANVAS_WIDTH).attr("height", CANVAS_HEIGHT)[0];
    div.append(canvas)
    elem.appendChild(div);
    return [cy, canvas];
}

function showTips(tips, id) {
    let ts = [];
    let tip = tips[id];
    if (tip) {
        tip.reference.classList.add("outlined");
        ts.push(tip);
    }
    let tip2 = tips[swapId(id)];
    if (tip2) {
        tip2.reference.classList.add("outlined");
        ts.push(tip2);
    }
    adjustOffsets(ts);
    ts.forEach(t => { t.show() });
}

function getHtmlSize(htmlContent) {
    const tempDiv = document.createElement('div');
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';
    tempDiv.style.display = 'inline-block';
    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);

    const size = {
        width: tempDiv.offsetWidth,
        height: tempDiv.offsetHeight
    };

    document.body.removeChild(tempDiv);
    return size;
}

function clearVoronoi(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

async function drawVoronoi(canvas, cy, invariants, theorems, small_inv, large_inv) {
    let pan = cy.pan();
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext('2d');
    ctx.filter = "blur(20px)";
    if (!small_inv) return;
    let values = partition_by_model(invariants, theorems, small_inv, large_inv);
    let points = [];
    let ids = [];
    cy.nodes().forEach(node => {
        const p = node.position();
        points.push([p.x + pan.x, p.y + pan.y]);
        ids.push(node.id());
    });
    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, CANVAS_WIDTH, CANVAS_HEIGHT]);
    for (let i = 0; i < points.length; i++) {
        ctx.beginPath();
        voronoi.renderCell(i, ctx);
        if (values[ids[i]] == 1) {
            ctx.fillStyle = 'black';
            ctx.fill();
        } else if (values[ids[i]] == 0) {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }
    await applyBlurToCanvas(canvas, tempCanvas, 30);
    binarizeCanvas(canvas, 170, 128, [215, 216, 230], [163, 163, 181]);
}

async function applyBlurToCanvas(canvas, sourceCanvas, radius) {
    const width = canvas.width;
    const height = canvas.height;
    const snapshot = await createImageBitmap(sourceCanvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(snapshot, 0, 0);
}


function binarizeCanvas(canvas, threshold, thresholdAlpha, white, black) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        if (data[i + 3] <= 128) {
            data[i + 3] = 0;
        } else if (r >= threshold) {
            data[i] = white[0];
            data[i + 1] = white[1];
            data[i + 2] = white[2];
            data[i + 3] = 255;
        } else {
            data[i] = black[0];
            data[i + 1] = black[1];
            data[i + 2] = black[2];
            data[i + 3] = 255;
        }
    }

    // 4. 加工したデータをCanvasに戻す
    ctx.putImageData(imageData, 0, 0);
}

async function adjustOffsets(tippyInstances) {
    tippyInstances.forEach(inst => {
        inst.setProps({ offset: [0, 10] });
    });
    // 1. 画面上の Y 座標順にソート（下にある要素から順に処理すると計算しやすい）
    const sorted = tippyInstances.slice().sort(
        (a, b) => b.reference.getBoundingClientRect().top - a.reference.getBoundingClientRect().top
    );

    let lastTooltipTop = Infinity; // 一つ前のツールチップの上端位置を記録

    for (const inst of sorted) {
        // 一旦表示して DOM を確定させる
        inst.show();

        // ブラウザの描画を待つ（重要！）
        await new Promise(resolve => requestAnimationFrame(resolve));

        const popper = inst.popper;
        const tooltipRect = popper.getBoundingClientRect();
        const refRect = inst.reference.getBoundingClientRect();

        // デフォルトのオフセット（要素からの距離）
        let currentOffsetY = 10;

        // ツールチップの現在の上端
        let currentTop = tooltipRect.top;

        // 前のツールチップの下端と重なっているかチェック
        // ※ ここでは「上」に積み上げる計算例
        if (tooltipRect.bottom > lastTooltipTop) {
            const overlap = tooltipRect.bottom - lastTooltipTop;
            currentOffsetY += overlap + 5; // 重なり分 + 余白5px

            inst.setProps({
                offset: [0, currentOffsetY],
            });

            // 再計算後の位置を更新
            await new Promise(resolve => requestAnimationFrame(resolve));
            const updatedRect = popper.getBoundingClientRect();
            lastTooltipTop = updatedRect.top;
        } else {
            lastTooltipTop = tooltipRect.top;
        }
    }
}

function swapId(id) {
    let matched = id.match(/^(.+)-(.+)$/);
    return matched[2] + "-" + matched[1];
}

function rotateGraph(cy, deg) {
    const rad = deg * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // ① グラフのバウンディングボックス中心を取得
    const bb = cy.elements().boundingBox();
    const cx = (bb.x1 + bb.x2) / 2;
    const cyCenter = (bb.y1 + bb.y2) / 2;

    // ② 各ノードを中心基準で回転
    cy.nodes().forEach(node => {
        const p = node.position();

        // 中心を原点に移動
        const x = p.x - cx;
        const y = p.y - cyCenter;

        // 回転
        const rx = x * cos - y * sin;
        const ry = x * sin + y * cos;

        // 鏡映
        rrx = (rx - ry) / 2;
        rry = - (rx + ry) / 2;

        // 元の中心に戻す
        node.position({
            x: rrx + cx,
            y: rry + cyCenter
        });
    });

    // ③ ビューを自動調整
    cy.fit(undefined, 30);
}

function check(invariants, invariant) {
    if (invariants.indexOf(invariant) < 0) {
        alert("The invariant " + invariant + " does not apper in the list.");
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
        $elem.append($("<b />").text(x + "≦" + y));
        $elem.append(" is a theorem.");
        if (opt.length > 2) {
            $elem.append($("<br />"));
            $elem.append(tn("Reason: "));
            $elem.append(tn(chain_to_string(opt)));
        }
    } else if (value === false) {
        $elem.append($("<b />").text(y + "<" + x));
        $elem.append(tn(" is consistent."));
        $elem.append($("<br />"));
        $elem.append(tn("Reason 1: Using method of " + opt[0] + ", we can get a model of " + opt[2][opt[2].length - 1] + "<" + opt[1][0]));
        let reason = 2;
        if (opt[2].length > 1) {
            $elem.append($("<br />"));
            $elem.append(tn("Reason " + (reason++) + ": " + chain_to_string(opt[2]) + " is a theorem"));
        }
        if (opt[1].length > 1) {
            $elem.append($("<br />"));
            $elem.append(tn("Reason " + (reason++) + ": " + chain_to_string(opt[1]) + " is a theorem"));
        }
    } else {
        $elem.append(tn("Whether "));
        $elem.append($("<b />").text("Con(" + y + "<" + x + ")"));
        $elem.append(tn(" or "));
        $elem.append($("<b />").text("⊢ " + x + "≦" + y));
        $elem.append(tn(" is unknown."));
    }
    return $elem[0].innerHTML;
}

function chain_to_string(chain) {
    let str = chain[0];
    for (let i = 1; i < chain.length; i++) {
        str += "≦";
        str += chain[i];
    }
    return str;
}

function cell_text(value) {
    if (value === true) {
        return "INC";
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
    let models = [];
    const num_lines = lines.length;
    for (let i = 0; i < num_lines; i++) {
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
                models.push([model_name, small_invariants, large_invariants]);
            } else {
                throw new ParseError(i);
            }
        } else {
            throw new ParseError(i);
        }
    }
    return [invariants, theorems, consistency, models];
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

function partition_by_model(invariants, theorems, small_invariants, large_invariants) {
    let graph = new Graph(invariants);

    for (let [a, b] of theorems) {
        graph.add_edge(a, b, null);
    }

    let queue = [];
    for (let invariant of small_invariants) {
        queue.push([invariant, 0]);
    }
    for (let invariant of large_invariants) {
        queue.push([invariant, 1]);
    }
    let values = {};
    while (queue.length > 0) {
        let [inv, val] = queue.shift();
        if (values[inv] !== undefined) continue;
        values[inv] = val;
        if (val == 1) {
            for (let inv2 of Object.keys(graph.out[inv])) {
                queue.push([inv2, 1]);
            }
        } else {
            for (let inv2 of Object.keys(graph.in[inv])) {
                queue.push([inv2, 0]);
            }
        }
    }
    return values;
}


class InconsistentError { }

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