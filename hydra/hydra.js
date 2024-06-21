"use strict";

class StateBeginning {
    constructor(hydra, inning) {
        this.hydra = hydra;
        this.inning = inning;
        this.allCoordinates = calcAllCoordinates(this.hydra, 0, 0);
    }

    draw(canvas) {
        if (document.getElementById("autoplay").checked) {
            g_state = new StateSwordMotion(this.hydra, leftmostHead(this.hydra), this.inning);
            return true;
        }
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(offx, offy);
        let mx = g_mouseX - offx;
        let my = g_mouseY - offy;
        let pathOfSelectedHead = null;
        enumerateAllHeads(this.hydra, this.allCoordinates, [], (path, x, y) => {
            let dx = x - mx;
            let dy = y - my;
            if (dx * dx + dy * dy < 28 * 28) {
                pathOfSelectedHead = path;
            }
        });
        drawHydra(canvas, this.hydra, this.allCoordinates, pathOfSelectedHead);
        ctx.restore();
        if (g_clicked && pathOfSelectedHead) {
            g_state = new StateSwordMotion(this.hydra, pathOfSelectedHead, this.inning);
            return true;
        }
        if (g_droppedX != null) {
            let path = findPathFromCoordinate(this.hydra, g_droppedX - offx, g_droppedY - offy);
            if (path) {
                g_state = new StateBiting(this.hydra, this.inning, path);
            }
            g_droppedX = null;
            g_droppedY = null;
            return true;
        }
    }
}

function findPathFromCoordinate(hydra, x, y) {
    let allCoordinates = calcAllCoordinates(hydra, 0, 0);
    let found = null;
    let found_dist = 50;
    enumerateAllHeads(hydra, allCoordinates, [], (path, x2, y2) => {
        let dx = x - x2;
        let dy = y - y2;
        let d = Math.sqrt(dx * dx + dy * dy);
        if (found == null && d < found_dist) {
            found = path;
            found_dist = d;
        }
    });
    return found;
}

class StateBiting {
    constructor(hydra, inning, path) {
        this.hydra = hydra;
        this.inning = inning;
        this.allCoordinates = calcAllCoordinates(this.hydra, 0, 0);
        this.path = path;
        this.count = 0;
    }

    choosePath() {
        let paths = [];
        enumerateAllHeads(this.hydra, this.allCoordinates, [], (path, x, y) => { paths.push(path) });
        return paths[Math.floor(Math.random() * paths.length)];
    }

    draw(canvas) {
        if (this.count == 0) {
            audio4.currentTime = 0;
            audio4.play();
        }
        if (this.count == 41) {
            g_state = new StateBeginning(this.hydra, this.inning);
            return true;
        }
        this.count ++;
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(offx, offy);
        drawHydra(canvas, this.hydra, this.allCoordinates, null, this.path);
        let x = dig_from_path(this.allCoordinates, this.path).x;
        let y = dig_from_path(this.allCoordinates, this.path).y;
        ctx.translate(x - 20, y - 20);
        ctx.drawImage(document.getElementById("bitingimg"), -10, 0, 50, 50);
        if (this.count >= 40) {
        } else if (this.count >= 30) {
            ctx.drawImage(document.getElementById("carrotimg4"), -50, 25, 40, 40);
        } else if (this.count >= 20) {
            ctx.drawImage(document.getElementById("carrotimg3"), -50, 25, 40, 40);
        } else if (this.count >= 10) {
            ctx.drawImage(document.getElementById("carrotimg2"), -50, 25, 40, 40);
        } else {
            ctx.drawImage(document.getElementById("carrotimg1"), -50, 25, 40, 40);
        }
        ctx.restore();
    }
}

class StateSwordMotion {
    constructor(hydra, path_to_cut, inning) {
        this.hydra = hydra;
        this.count = 0;
        this.allCoordinates = calcAllCoordinates(hydra, 0, 0);
        this.path_to_cut = path_to_cut;
        this.inning = inning;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        const maxcount = 3;
        
        if (this.count == 0) {
            audio1.currentTime = 0.06;
            audio1.play();
        }

        if (this.count == maxcount) {
            g_state = new StateCuttingHead(this.hydra, this.path_to_cut, this.inning);
            return true;
        } else {
            ctx.save();
            ctx.translate(offx, offy);
            drawHydra(canvas, this.hydra, this.allCoordinates);
            let x = (dig_from_path(this.allCoordinates, this.path_to_cut).x + dig_from_path(this.allCoordinates, this.path_to_cut.slice(0, this.path_to_cut.length - 1)).x) / 2;
            let y = (dig_from_path(this.allCoordinates, this.path_to_cut).y + dig_from_path(this.allCoordinates, this.path_to_cut.slice(0, this.path_to_cut.length - 1)).y) / 2;
            drawCutMotion(canvas, x, y, this.count);
            ctx.restore();
            this.count ++;
        }
    }
}

class StateCuttingHead {
    constructor(hydra, path_to_cut, inning) {
        this.hydra = hydra;
        this.hydra2 = null;
    
        this.count = 0;
        this.allCoordinates = calcAllCoordinates(hydra, 0, 0);
        this.allCoordinates2 = null;
        this.path_to_cut = path_to_cut;
        this.inning = inning;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (this.count == 0) {
            let x = dig_from_path(this.allCoordinates, this.path_to_cut).x;
            let y = dig_from_path(this.allCoordinates, this.path_to_cut).y;
            if (dig_hydra_from_path(this.hydra, this.path_to_cut.slice(0, -1)).length > 1 || arrayEq(this.hydra, ["head"])) {
                const body = Bodies.fromVertices(x + offx, y + offy, dragonVertices);
                body.restitution = 0.5;
                Composite.add(engine.world, [body]);
            }
            this.hydra2 = deep_copy(this.hydra);
            delete_head(this.hydra2, this.path_to_cut);
            this.allCoordinates2 = calcAllCoordinates(this.hydra2, 0, 0);
            if (this.path_to_cut.length > 1) { 
                replace_child_from_path(
                    this.allCoordinates2,
                    this.path_to_cut.slice(0, -1),
                    calcAllCoordinates(dig_hydra_from_path(this.hydra2, this.path_to_cut.slice(0, -1)),
                    dig_from_path(this.allCoordinates2, this.path_to_cut.slice(0, -1)).x,
                    dig_from_path(this.allCoordinates2, this.path_to_cut.slice(0, -1)).y));
            }
        }
        const maxcount = 5;
        if (this.count >= maxcount) {
            g_state = new StateGrowingHead(this.hydra2, this.path_to_cut, this.inning);
            return true;
        } else {
            let coord = combineCoordinates(this.allCoordinates, this.allCoordinates2, easeInOutSine(this.count / maxcount));
            this.count ++;
            ctx.save();
            ctx.translate(offx, offy);
            drawHydra(canvas, this.hydra2, coord);
            ctx.restore();
        }
    }
}

class StateGrowingHead {
    constructor(hydra2, path_to_cut, inning) {
        this.hydra2 = hydra2;
        this.hydra3 = null;
        this.inning = inning;
        this.count = 0;
        this.allCoordinates2 = calcAllCoordinates(this.hydra2, 0, 0);
        this.allCoordinates2half = null;
        this.allCoordinates3 = null;
        this.path_to_cut = path_to_cut;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (this.count == 0) {
            this.hydra3 = deep_copy(this.hydra2);
            if (this.path_to_cut.length == 1) {
                g_state = new StateAfterGrow(remove_deleted_head(this.hydra3), this.inning);
                return true;
            }
            const node = dig_hydra_from_path(this.hydra3, this.path_to_cut.slice(0, -2));
            const i = node.length;
            for (let j = 0; j <= this.inning; j ++) {
                node.push(deep_copy(dig_hydra_from_path(this.hydra3, this.path_to_cut.slice(0, -1))));
            }
            this.allCoordinates3 = calcAllCoordinates(this.hydra3, 0, 0);
            this.allCoordinates2half = deep_copy(this.allCoordinates2);
            for (let j = 0; j <= this.inning; j ++) {
                replace_child_from_path(this.allCoordinates2half, [...this.path_to_cut.slice(0, -2), i + j],
                                        resetCoordinates(deep_copy(dig_from_path(this.allCoordinates3, [...this.path_to_cut.slice(0, -2), i + j])),
                                        dig_from_path(this.allCoordinates2half, this.path_to_cut.slice(0, -2)).x,
                                        dig_from_path(this.allCoordinates2half, this.path_to_cut.slice(0, -2)).y));
            }
        }

        let maxcount = 20;
        if (this.count == 9) {
            audio2.currentTime = 0;
            audio2.play();
        }
        if (this.count >= maxcount) {
            g_state = new StateAfterGrow(remove_deleted_head(this.hydra3), this.inning);
            return true;
        }
        let coord = combineCoordinates(this.allCoordinates2half, this.allCoordinates3, easeInOutSine(this.count / maxcount));
        this.count ++;
        ctx.save();
        ctx.translate(offx, offy);
        drawHydra(canvas, this.hydra3, coord);
        ctx.restore();
    }
}

class StateAfterGrow {
    constructor(hydra, inning) {
        this.hydra = hydra;
        this.inning = inning;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (this.hydra === "head") {
            g_state = new StateClear();
            return true;
        } else {
            g_state = new StateBeginning(this.hydra, this.inning + 1);
            return true;
        }
    }
}

class StateClear {
    constructor() {
        this.count = 0;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (this.count == 0) {
            audio3.volume = 0.5;
            audio3.play();
        }
        this.count ++;
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = "black";
        ctx.font = "48px serif";
        const text = "CLEAR!!"
        const width = ctx.measureText(text).width;
        ctx.fillText(text, size / 2 - width / 2, 300);
        if (g_clicked) {
            g_state = new StateBeginning(initial_hydra, 0);
            return true;
        }
    }
}

function enumerateAllHeads(hydra, allCoordinates, path, func) {
    if (hydra === "head") {
        func(path, allCoordinates.x, allCoordinates.y);
    } else if (hydra === "deleted") {
    } else {
        for (let i = 0; i < hydra.length; i ++) {
            enumerateAllHeads(hydra[i], allCoordinates.children[i], [...path, i], func);
        }
    }
}

function drawBody(ctx) {
    var bodies = Composite.allBodies(engine.world);
    ctx.beginPath();
    for (var i = 0; i < bodies.length; i += 1) {
        var vertices = bodies[i].vertices;
        if (vertices.length === dragonVertices.length) {
            let dx = vertices[1].x - vertices[0].x;
            let dy = vertices[1].y - vertices[0].y;
            let d = Math.sqrt(dx * dx + dy * dy);
            dx /= d;
            dy /= d;

            let ex = dragonVertices[1].x - dragonVertices[0].x;
            let ey = dragonVertices[1].y - dragonVertices[0].y;
            let e = Math.sqrt(ex * ex + ey * ey);
            ex /= e;
            ey /= e;

            ctx.save();
            ctx.translate(vertices[0].x, vertices[0].y);
            ctx.transform(dx, dy, -dy, dx, 0, 0);
            ctx.transform(ex, -ey, ey, ex, 0, 0);
            drawDragon(ctx);
            ctx.restore();
        } else {
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (var j = 1; j < vertices.length; j += 1) {
                ctx.lineTo(vertices[j].x, vertices[j].y);
            }
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.stroke();
        }
    }
}

function drawDragon(ctx, selected, biting) {
    ctx.save();
    if (biting) {
    } else {
        ctx.fillStyle = selected ? "#7ba3e3" : "white";
        if (selected) {
            ctx.translate(20, 20);
            ctx.scale(1.2, 1.2);
            ctx.translate(-20, -20);
        }
        ctx.beginPath();
        ctx.moveTo(dragonVertices[0].x, dragonVertices[0].y);
        for (let i = 0; i < dragonVertices.length; i ++) {
            ctx.lineTo(dragonVertices[i].x, dragonVertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(15, 10);
        ctx.lineTo(25, 10);
        ctx.lineTo(40, 0);
        ctx.lineTo(35, 40);
        ctx.lineTo(20, 50);
        ctx.lineTo(5, 40);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(15, 10);
        ctx.lineTo(1, 15);
        ctx.moveTo(40 - 15, 10);
        ctx.lineTo(40 - 1, 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(8, 20);
        ctx.lineTo(16, 28);
        ctx.lineTo(5, 25);
        ctx.lineTo(8, 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(40 - 8, 20);
        ctx.lineTo(40 - 16, 28);
        ctx.lineTo(40 - 5, 25);
        ctx.lineTo(40 - 8, 20);
        ctx.stroke();
    }
    ctx.restore();
}

function calcSpaceToDrawHydra(hydra) {
    if (hydra === "head") {
        return [40, 40];
    } else {
        let width = 0;
        let height = 0;
        for (let i = 0; i < hydra.length; i++) {
            const child = hydra[i];
            if (child === "deleted") continue;
            if (i > 0) width += 5;
            let [w, h] = calcSpaceToDrawHydra(child);
            width += w;
            height = Math.max(height, h);
        }
        return [width, height + 60];
    }
}

function calcAllCoordinates(hydra, xx, yy) {
    if (hydra === "head") {
        return {x: xx, y: yy};
    } else {
        let spaces = hydra.map((x) => x === "deleted" ? null : calcSpaceToDrawHydra(x));
        let filtered = spaces.filter(x => x != null);
        let width = filtered.map(sp => sp[0]).reduce((x, y) => x + y, 0) + 5 * (filtered.length - 1);
        let x = xx - width / 2;
        let y = yy - 60;
        let list = [];
        for (let i = 0; i < hydra.length; i ++) {
            if (hydra[i] === "deleted") { list.push(null); continue; }
            x += spaces[i][0] / 2;
            list.push(calcAllCoordinates(hydra[i], x, y));
            x += spaces[i][0] / 2 + 5;
        }
        return {x: xx, y: yy, children: list};
    }
}

function combineCoordinates(allCoordinates, allCoordinates2, time) {
    if (allCoordinates == null || allCoordinates2 == null) {
        return null;
    } else {
        let combined_children = null;
        if (allCoordinates.children && allCoordinates2.children) {
            combined_children = [];
            for (let i = 0; i < Math.min(allCoordinates.children.length, allCoordinates2.children.length); i ++) {
                combined_children.push(combineCoordinates(allCoordinates.children[i], allCoordinates2.children[i], time));
            }
        }
        return {
            x: allCoordinates.x * (1 - time) + allCoordinates2.x * time,
            y: allCoordinates.y * (1 - time) + allCoordinates2.y * time,
            children: combined_children
        };
    }
}

function drawHydra(canvas, hydra, allCoordinates, path, pathBiting) {
    return drawHydraRecur(canvas, hydra, allCoordinates, [], path, pathBiting);
}

function drawHydraRecur(canvas, hydra, allCoordinates, path, targetPath, targetPath2) {
    const ctx = canvas.getContext("2d");
    if (hydra === "head") {
        ctx.save();
        ctx.translate(allCoordinates.x, allCoordinates.y);
        ctx.translate(-20, -20);
        drawDragon(ctx, targetPath && arrayEq(path, targetPath), targetPath2 && arrayEq(path, targetPath2));
        ctx.restore();
    } else {
        for (let i = 0; i < hydra.length; i ++) {
            if (hydra[i] !== "deleted") {
                ctx.beginPath();
                ctx.moveTo(allCoordinates.x, allCoordinates.y);
                ctx.lineTo(allCoordinates.children[i].x, allCoordinates.children[i].y);
                ctx.stroke();
            }
        }
        ctx.save();
        ctx.translate(allCoordinates.x, allCoordinates.y);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.rect(-16, -8, 32, 16);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        for (let i = 0; i < hydra.length; i ++) {
            if (hydra[i] !== "deleted") {
                drawHydraRecur(canvas, hydra[i], allCoordinates.children[i], [...path, i], targetPath, targetPath2);
            }
        }
    }
}

function drawCutMotion(canvas, x, y, time) {
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.strokeStyle = "red";
    ctx.beginPath();
    if (time == 0) {
        ctx.lineWidth = 2;
        ctx.moveTo(x + 15, y - 15);
        ctx.lineTo(x - 5, y + 5);
    } else if (time == 1) {
        ctx.lineWidth = 5;
        ctx.moveTo(x + 8, y - 8);
        ctx.lineTo(x - 8, y + 8);
    } else if (time == 2) {
        ctx.lineWidth = 2;
        ctx.moveTo(x + 5, y - 5);
        ctx.lineTo(x - 15, y + 15);
    } else {
        ctx.lineWidth = 1;
        ctx.moveTo(x, y);
        ctx.lineTo(x - 15, y + 15);
    }
    ctx.stroke();
    ctx.restore()
}

function resetCoordinates(allCoordinates, x, y) {
    if (allCoordinates == null) {
        return null;
    } else {
        return {
            x: x,
            y: y,
            children: allCoordinates.children && allCoordinates.children.map(child => resetCoordinates(child, x, y))
        };
    }
}

function dig_from_path(allCoordinates, path) {
    if (path.length == 0) {
        return allCoordinates;
    } else {
        return dig_from_path(allCoordinates.children[path[0]], path.slice(1));
    } 
}

function dig_hydra_from_path(hydra, path) {
    if (path.length == 0) {
        return hydra;
    } else {
        return dig_hydra_from_path(hydra[path[0]], path.slice(1));
    } 
}

function replace_child_from_path(allCoordinates, path, newdata) {
    if (path.length == 1) {
        allCoordinates.children[path[0]] = newdata;
    } else {
        replace_child_from_path(allCoordinates.children[path[0]], path.slice(1), newdata);
    }
}

function delete_head(hydra, path) {
    if (path.length == 2 && hydra[path[0]].length == 1) {
        hydra[path[0]] = "head";
    } else if (path.length == 1) {
        hydra[path[0]] = "deleted";
    } else {
        delete_head(hydra[path[0]], path.slice(1));
    }
}

function remove_deleted_head(hydra) {
    if (hydra === "head") return "head";
    let res = hydra.filter((x) => x != "deleted").map(remove_deleted_head);
    if (res.length == 0) return "head";
    return res;
}

function leftmostHead(hydra) {
    if (hydra === "head") return [];
    else return [0, ...leftmostHead(hydra[0])];
}
function rightmostHead(hydra) {
    const i = hydra.length - 1;
    if (hydra === "head") return [];
    else return [i, ...rightmostHead(hydra[i])];
}
function numHeads(hydra) {
    if (hydra === "head") return 1;
    else return hydra.map(numHeads).reduce((x, y) => x + y, 0);
}

function deep_copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function arrayEq(ary1, ary2) {
    if (ary1.length != ary2.length) return false;
    for (let i = 0; i < ary1.length; i ++) {
        if (ary1[i] != ary2[i]) return false;
    }
    return true;
}

function easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}

function parse_tree(str) {
    return JSON.parse(str.replaceAll(/h/g, "\"head\""));
}

const initial_hydra = [["head", "head"]];
const size = 800;
const offx = size / 2;
const offy = size - 350;

const audio1 = document.getElementById("swordaudio");
const audio2 = document.getElementById("dragonaudio");
const audio3 = document.getElementById("fanfareaudio");
const audio4 = document.getElementById("biteaudio");

let g_state = new StateBeginning(initial_hydra, 0);

const dragonVertices = [{x: 0, y: 0}, {x: 40, y: 0}, {x: 35, y: 40}, {x: 20, y: 50}, {x: 5, y: 40}];

const Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
const engine = Engine.create();
const ground = Bodies.rectangle(400, 620, 850, 50, { isStatic: true });
ground.restitution = 0.5;
Composite.add(engine.world, [ground]);
const runner = Runner.create();
Runner.run(runner, engine);
let g_mouseX, g_mouseY, g_clicked = false;
let g_droppedX = null, g_droppedY = null;

function main() {
    const canvas = document.getElementById("maincanvas");
    const ctx = canvas.getContext("2d");
    setInterval(() => { 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBody(ctx);
        const redraw = g_state.draw(canvas);
        if (redraw) g_state.draw(canvas);
        g_clicked = false;
    }, 33);
    canvas.addEventListener("mousemove", (e) => {
        g_mouseX = e.offsetX;
        g_mouseY = e.offsetY;
    });
    canvas.addEventListener("click", (e) => {
        g_clicked = true;
    });
}

main();

if ("ontouchstart" in document) {
    document.getElementById("status").innerHTML = "<span style='color:red'>Currently this program does not support touch control.</span>"
}

document.getElementById("generate").addEventListener("click", () => {
    let select = document.getElementById("treeselect");
    let str = select.options[select.selectedIndex].text;
    if (str == "Custom") {
        str = prompt("Input your tree:");
    }
    g_state = new StateBeginning(parse_tree(str), 0);
});
document.getElementById("maincanvas").addEventListener("drop", (e) => {
    g_droppedX = e.offsetX
    g_droppedY = e.offsetY;
});
document.getElementById("maincanvas").addEventListener("dragover", (e) => {
    e.preventDefault();
});
