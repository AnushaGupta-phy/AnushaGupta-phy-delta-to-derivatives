const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const SCALE = 25;

// Sliders
const axSlider = document.getElementById("ax");
const aySlider = document.getElementById("ay");
const bxSlider = document.getElementById("bx");
const bySlider = document.getElementById("by");

// Slider values
const axValue = document.getElementById("axValue");
const ayValue = document.getElementById("ayValue");
const bxValue = document.getElementById("bxValue");
const byValue = document.getElementById("byValue");

// Info
const vectorAData = document.getElementById("vectorAData");
const vectorBData = document.getElementById("vectorBData");
const resultData = document.getElementById("resultData");
const explanation = document.getElementById("explanation");

function magnitude(x, y) {
    return Math.sqrt(x * x + y * y);
}

function direction(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

function toCanvas(x, y) {
    return {
        x: canvas.width / 2 + x * SCALE,
        y: canvas.height / 2 - y * SCALE
    };
}

function drawGrid() {

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += SCALE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += SCALE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawAxes() {

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

function drawArrow(x1, y1, x2, y2, color) {

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const ang = Math.atan2(y2 - y1, x2 - x1);
    const head = 12;

    ctx.beginPath();
    ctx.moveTo(x2, y2);

    ctx.lineTo(
        x2 - head * Math.cos(ang - Math.PI / 6),
        y2 - head * Math.sin(ang - Math.PI / 6)
    );

    ctx.lineTo(
        x2 - head * Math.cos(ang + Math.PI / 6),
        y2 - head * Math.sin(ang + Math.PI / 6)
    );

    ctx.closePath();
    ctx.fill();
}

function drawComponents(point, color) {

    const origin = toCanvas(0, 0);

    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(origin.x, point.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(point.x, origin.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    ctx.setLineDash([]);
}

function drawLabel(text, point, color) {

    ctx.fillStyle = color;
    ctx.font = "18px Arial";
    ctx.fillText(text, point.x + 10, point.y - 10);
}

function update() {

    const ax = Number(axSlider.value);
    const ay = Number(aySlider.value);
    const bx = Number(bxSlider.value);
    const by = Number(bySlider.value);

    axValue.textContent = ax;
    ayValue.textContent = ay;
    bxValue.textContent = bx;
    byValue.textContent = by;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawAxes();

    const origin = toCanvas(0, 0);

    const A = toCanvas(ax, ay);
    const B = toCanvas(bx, by);
    const R = toCanvas(ax + bx, ay + by);

    drawComponents(A, "#ef4444");
    drawComponents(B, "#3b82f6");
    drawComponents(R, "#22c55e");

    drawArrow(origin.x, origin.y, A.x, A.y, "#ef4444");
    drawArrow(origin.x, origin.y, B.x, B.y, "#3b82f6");
    drawArrow(origin.x, origin.y, R.x, R.y, "#22c55e");

    drawLabel("A", A, "#ef4444");
    drawLabel("B", B, "#3b82f6");
    drawLabel("A + B", R, "#22c55e");

    const magA = magnitude(ax, ay).toFixed(2);
    const magB = magnitude(bx, by).toFixed(2);
    const magR = magnitude(ax + bx, ay + by).toFixed(2);

    const dirA = direction(ax, ay).toFixed(1);
    const dirB = direction(bx, by).toFixed(1);
    const dirR = direction(ax + bx, ay + by).toFixed(1);

    vectorAData.innerHTML = `
        Components: (${ax}, ${ay})<br>
        Magnitude: ${magA}<br>
        Direction: ${dirA}°
    `;

    vectorBData.innerHTML = `
        Components: (${bx}, ${by})<br>
        Magnitude: ${magB}<br>
        Direction: ${dirB}°
    `;

    resultData.innerHTML = `
        Components: (${ax + bx}, ${ay + by})<br>
        Magnitude: ${magR}<br>
        Direction: ${dirR}°
    `;

    explanation.innerHTML = `
        <strong>Vector A</strong> points ${ax} units horizontally and ${ay} units vertically.<br><br>

        <strong>Vector B</strong> points ${bx} units horizontally and ${by} units vertically.<br><br>

        Add the x-components and y-components separately:

        <br><br>

        (${ax}, ${ay}) + (${bx}, ${by}) =
        <strong>(${ax + bx}, ${ay + by})</strong>

        <br><br>

        The green vector is the resultant, representing the combined effect of Vectors A and B.
    `;
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", update);
});

update();
