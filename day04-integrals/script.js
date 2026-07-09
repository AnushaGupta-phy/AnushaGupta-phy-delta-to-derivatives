const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const velocityData = document.getElementById("velocityData");
const positionData = document.getElementById("positionData");
const integralData = document.getElementById("integralData");
const explanation = document.getElementById("explanation");

// --------------------
// Physics Functions
// --------------------

function velocity(t) {
    return 0.2 * t;
}

function position(t) {
    return 0.1 * t * t;
}

// --------------------
// Draw Everything
// --------------------

function draw() {

    const t = Number(timeSlider.value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // =====================================================
    // Car
    // =====================================================

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(50, 45);
    ctx.lineTo(650, 45);
    ctx.stroke();

    const carX = 50 + (position(t) / 10) * 600;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(carX - 12, 30, 24, 15);

    // =====================================================
    // Velocity Graph
    // =====================================================

    const gx = 60;
    const gy = 230;

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("Velocity vs Time", 250, 70);

    ctx.font = "14px Arial";
    ctx.fillText("Velocity (m/s)", 5, 130);
    ctx.fillText("Time (s)", 610, 225);

    ctx.fillStyle = "#60a5fa";
    ctx.font = "16px Arial";
    ctx.fillText("v(t) = 0.2t", 470, 90);

    // Axes

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx, 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(640, gy);
    ctx.stroke();

    // Area under curve

    ctx.beginPath();
    ctx.moveTo(gx, gy);

    for (let i = 0; i <= t * 10; i++) {

        const tt = i / 10;

        const x = gx + (tt / 10) * 560;
        const y = gy - velocity(tt) * 60;

        ctx.lineTo(x, y);

    }

    ctx.lineTo(gx + (t / 10) * 560, gy);
    ctx.closePath();

    ctx.fillStyle = "rgba(34,197,94,0.35)";
    ctx.fill();

    // Velocity line

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        const tt = i / 10;

        const x = gx + (tt / 10) * 560;
        const y = gy - velocity(tt) * 60;

        if (i === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);

    }

    ctx.stroke();

    // Current point

    ctx.beginPath();
    ctx.arc(
        gx + (t / 10) * 560,
        gy - velocity(t) * 60,
        5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#22c55e";
    ctx.fill();

    // =====================================================
    // Position Graph
    // =====================================================

    const py = 470;

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("Position vs Time", 250, 285);

    ctx.font = "14px Arial";
    ctx.fillText("Position (m)", 5, 340);
    ctx.fillText("Time (s)", 610, 475);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "16px Arial";
    ctx.fillText("x(t) = 0.1t²", 455, 305);

    // Axes

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(gx, py);
    ctx.lineTo(gx, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx, py);
    ctx.lineTo(640, py);
    ctx.stroke();

    // Position curve

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        const tt = i / 10;

        const x = gx + (tt / 10) * 560;
        const y = py - position(tt) * 14;

        if (i === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);

    }

    ctx.stroke();

    // Moving point

    ctx.beginPath();

    ctx.arc(
        gx + (t / 10) * 560,
        py - position(t) * 14,
        5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#ef4444";
    ctx.fill();

}

// --------------------
// Update
// --------------------

function update() {

    const t = Number(timeSlider.value);

    draw();

    timeValue.textContent = t.toFixed(1) + " s";

    timeData.innerHTML =
        `<strong>${t.toFixed(1)} s</strong>`;

    velocityData.innerHTML =
        `
        Function: <strong>v(t)=0.2t</strong>
        <br><br>
        Current Velocity:
        <strong>${velocity(t).toFixed(2)} m/s</strong>
        `;

    positionData.innerHTML =
        `
        Function: <strong>x(t)=0.1t²</strong>
        <br><br>
        Current Position:
        <strong>${position(t).toFixed(2)} m</strong>
        `;

    integralData.innerHTML =
        `
        <strong>∫v(t)dt = ${position(t).toFixed(2)} m</strong>
        `;

    explanation.innerHTML =
        `
        The top graph shows velocity as a function of time.

        <br><br>

        The green shaded area under the velocity graph represents the object's displacement.

        <br><br>

        The bottom graph shows the resulting position.

        <br><br>

        In calculus,

        <br><br>

        <strong>Displacement = ∫v(t)dt</strong>

        <br><br>

        Notice how the shaded area grows while the point moves along the position curve.
        `;
}

// --------------------
// Controls
// --------------------

timeSlider.addEventListener("input", update);

update();
