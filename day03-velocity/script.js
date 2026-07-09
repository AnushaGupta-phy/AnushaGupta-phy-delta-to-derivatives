const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const positionData = document.getElementById("positionData");
const velocityData = document.getElementById("velocityData");
const derivativeData = document.getElementById("derivativeData");
const explanation = document.getElementById("explanation");

// Position function
function position(t) {
    return 0.1 * t * t;
}

// Velocity (derivative)
function velocity(t) {
    return 0.2 * t;
}

function drawScene(t) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ==========================
    // Track
    // ==========================

    const trackY = 70;

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(50, trackY);
    ctx.lineTo(650, trackY);
    ctx.stroke();

    const x = position(t);
    const carX = 50 + (x / 10) * 600;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(carX - 12, trackY - 18, 24, 14);

    // ==========================
    // Graph
    // ==========================

    const gx = 70;
    const gy = 450;
    const graphWidth = 560;
    const graphHeight = 260;

    // Axes

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx, gy - graphHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + graphWidth, gy);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText("Position (m)", 5, 180);
    ctx.fillText("Time (s)", 585, 475);

    // Position Curve

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        let tt = i / 10;
        let yy = position(tt);

        let px = gx + (tt / 10) * graphWidth;
        let py = gy - (yy / 10) * graphHeight;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }

    }

    ctx.stroke();

    // Current Point

    const pointX = gx + (t / 10) * graphWidth;
    const pointY = gy - (x / 10) * graphHeight;

    ctx.beginPath();
    ctx.fillStyle = "#22c55e";
    ctx.arc(pointX, pointY, 6, 0, Math.PI * 2);
    ctx.fill();

    // ==========================
    // Tangent Line
    // ==========================

    const slope = velocity(t);

    const pixelsPerSecond = graphWidth / 10;
    const pixelsPerMeter = graphHeight / 10;

    const dx = 80;
    const dy = slope * (dx / pixelsPerSecond) * pixelsPerMeter;

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(pointX - dx, pointY + dy);
    ctx.lineTo(pointX + dx, pointY - dy);
    ctx.stroke();

}

function update() {

    const t = Number(timeSlider.value);

    const x = position(t);
    const v = velocity(t);

    drawScene(t);

    timeValue.textContent = t.toFixed(1) + " s";

    timeData.innerHTML =
        `<strong>${t.toFixed(1)} s</strong>`;

    positionData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    derivativeData.innerHTML =
        `<strong>dx/dt = ${v.toFixed(2)}</strong>`;

    explanation.innerHTML = `
    The blue curve represents the position function:

    <br><br>

    <strong>x(t)=0.1t²</strong>

    <br><br>

    The green point shows the object's current position.

    <br><br>

    The red line is the tangent line.

    <br><br>

    Its slope is the derivative of the position function.

    <br><br>

    In physics, this derivative is called the <strong>velocity</strong>.

    <br><br>

    <strong>v = dx/dt = 0.2t</strong>
    `;

}

timeSlider.addEventListener("input", update);

update();
