const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const functionData = document.getElementById("functionData");
const positionData = document.getElementById("positionData");
const explanation = document.getElementById("explanation");

// Position function
function position(t) {
    return 0.1 * t * t;
}

// Draw everything
function drawScene(t) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
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

    // Car (rectangle)

    const x = position(t);

    const carX = 50 + (x / 10) * 600;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(carX - 12, trackY - 18, 24, 14);

    // ==========================
    // Graph
    // ==========================

    const gx = 70;
    const gy = 450;
    const width = 560;
    const height = 260;

    // Axes

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx, gy - height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + width, gy);
    ctx.stroke();

    // Labels

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText("Position (m)", 5, 180);
    ctx.fillText("Time (s)", 590, 475);
    ctx.fillText("x(t) = 0.1t²", 470, 210);

    // Curve

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        const tt = i / 10;
        const yy = position(tt);

        const px = gx + (tt / 10) * width;
        const py = gy - (yy / 10) * height;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }

    }

    ctx.stroke();

    // Moving point

    const pointX = gx + (t / 10) * width;
    const pointY = gy - (x / 10) * height;

    ctx.beginPath();
    ctx.fillStyle = "#22c55e";
    ctx.arc(pointX, pointY, 6, 0, Math.PI * 2);
    ctx.fill();

}

// Update screen
function update() {

    const t = Number(timeSlider.value);
    const x = position(t);

    drawScene(t);

    timeValue.textContent = t.toFixed(1) + " s";

    timeData.innerHTML =
        `<strong>${t.toFixed(1)} s</strong>`;

    functionData.innerHTML =
        `<strong>x(t) = 0.1t²</strong>`;

    positionData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    explanation.innerHTML = `
        Motion can be described using a mathematical function.

        <br><br>

        Here the object's position is

        <br><br>

        <strong>x(t)=0.1t²</strong>

        <br><br>

        As time increases, the object's position follows the blue curve.

        <br><br>

        Tomorrow we'll find the slope of this curve and discover velocity.
    `;

}

// Time slider
timeSlider.addEventListener("input", update);

update();
