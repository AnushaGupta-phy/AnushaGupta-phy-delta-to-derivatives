const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");
const playButton = document.getElementById("playButton");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const velocityData = document.getElementById("velocityData");
const accelerationData = document.getElementById("accelerationData");
const derivativeData = document.getElementById("derivativeData");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

// Physics Functions

function velocity(t) {
    return 0.2 * t;
}

function acceleration() {
    return 0.2;
}

function position(t) {
    return 0.1 * t * t;
}

function drawScene(t) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // =====================
    // Track
    // =====================

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

    // =====================
    // Graph
    // =====================

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

    // Velocity Graph

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        const tt = i / 10;

        const px = gx + (tt / 10) * graphWidth;
        const py = gy - (velocity(tt) / 2) * graphHeight;

        if (i === 0)
            ctx.moveTo(px, py);
        else
            ctx.lineTo(px, py);

    }

    ctx.stroke();

    // Current Point

    const pointX = gx + (t / 10) * graphWidth;
    const pointY = gy - (velocity(t) / 2) * graphHeight;

    ctx.beginPath();
    ctx.arc(pointX, pointY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#22c55e";
    ctx.fill();

    // Tangent Line

    const slope = acceleration();

    const pixelsPerSecond = graphWidth / 10;
    const pixelsPerVelocity = graphHeight / 2;

    const dx = 80;
    const dy = slope * (dx / pixelsPerSecond) * pixelsPerVelocity;

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(pointX - dx, pointY + dy);
    ctx.lineTo(pointX + dx, pointY - dy);
    ctx.stroke();

}

function update() {

    const t = Number(timeSlider.value);

    const v = velocity(t);
    const a = acceleration();

    drawScene(t);

    timeValue.textContent = t.toFixed(1) + " s";

    timeData.innerHTML =
        `<strong>${t.toFixed(1)} s</strong>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    accelerationData.innerHTML =
        `<strong>${a.toFixed(2)} m/s²</strong>`;

    derivativeData.innerHTML =
        `<strong>dv/dt = ${a.toFixed(2)}</strong>`;

    explanation.innerHTML = `
        The blue graph shows the object's velocity.

        <br><br>

        The red tangent line shows the slope of the graph.

        <br><br>

        The slope of a velocity-time graph is called the acceleration.

        <br><br>

        Since the graph is a straight line, the slope stays constant.

        <br><br>

        <strong>a = dv/dt = 0.2 m/s²</strong>
    `;

}

timeSlider.addEventListener("input", update);

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        animation = setInterval(() => {

            let t = parseFloat(timeSlider.value);

            t += 0.05;

            if (t >= 10)
                t = 0;

            timeSlider.value = t.toFixed(1);

            update();

        }, 30);

    } else {

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(animation);

    }

});

update();
