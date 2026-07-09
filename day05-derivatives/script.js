const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const velocityData = document.getElementById("velocityData");
const accelerationData = document.getElementById("accelerationData");
const derivativeData = document.getElementById("derivativeData");
const explanation = document.getElementById("explanation");

// =======================
// Physics Functions
// =======================

// Velocity (curved)
function velocity(t) {
    return 0.03 * t * t;
}

// Acceleration (derivative of velocity)
function acceleration(t) {
    return 0.06 * t;
}

// Position (integral of velocity)
function position(t) {
    return 0.01 * t * t * t;
}

// =======================
// Draw Scene
// =======================

function drawScene(t) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --------------------
    // Track
    // --------------------

    const trackY = 70;

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(50, trackY);
    ctx.lineTo(650, trackY);
    ctx.stroke();

    const carX = 50 + (position(t) / 10) * 600;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(carX - 12, trackY - 18, 24, 14);

    // --------------------
    // Graph
    // --------------------

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

    ctx.fillText("Velocity (m/s)", 5, 180);
    ctx.fillText("Time (s)", 585, 475);

    // --------------------
    // Velocity Curve
    // --------------------

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        const tt = i / 10;

        const px = gx + (tt / 10) * graphWidth;
        const py = gy - velocity(tt) * 25;

        if (i === 0)
            ctx.moveTo(px, py);
        else
            ctx.lineTo(px, py);

    }

    ctx.stroke();

    // Current Point

    const pointX = gx + (t / 10) * graphWidth;
    const pointY = gy - velocity(t) * 25;

    ctx.beginPath();
    ctx.arc(pointX, pointY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#22c55e";
    ctx.fill();

    // --------------------
    // Tangent Line
    // --------------------

    const slope = acceleration(t);

    const pixelsPerSecond = graphWidth / 10;

    const dx = 80;
    const dy = slope * (dx / pixelsPerSecond) * 25;

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(pointX - dx, pointY + dy);
    ctx.lineTo(pointX + dx, pointY - dy);
    ctx.stroke();

}
// =======================
// Update Information
// =======================

function update() {

    const t = Number(timeSlider.value);

    const v = velocity(t);
    const a = acceleration(t);

    drawScene(t);

    timeValue.textContent = t.toFixed(1) + " s";

    timeData.innerHTML =
        `<strong>${t.toFixed(1)} s</strong>`;

    velocityData.innerHTML =
        `
        Function: <strong>v(t) = 0.03t²</strong>
        <br><br>
        Current Velocity:
        <strong>${v.toFixed(2)} m/s</strong>
        `;

    accelerationData.innerHTML =
        `
        Function: <strong>a(t) = 0.06t</strong>
        <br><br>
        Current Acceleration:
        <strong>${a.toFixed(2)} m/s²</strong>
        `;

    derivativeData.innerHTML =
        `
        <strong>dv/dt = 0.06t</strong>

        <br><br>

        Current derivative:
        <strong>${a.toFixed(2)}</strong>
        `;

    explanation.innerHTML = `
        The blue curve represents the object's velocity.

        <br><br>

        The green point marks the current time.

        <br><br>

        The red tangent line touches the curve at one point.

        <br><br>

        The slope of that tangent is the acceleration.

        <br><br>

        As time increases, the tangent becomes steeper,
        so the acceleration increases.
    `;

}

// =======================
// Slider
// =======================

timeSlider.addEventListener("input", update);

// =======================
// Start
// =======================

update();
