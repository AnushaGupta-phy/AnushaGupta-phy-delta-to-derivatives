const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");
const playButton = document.getElementById("playButton");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const velocityData = document.getElementById("velocityData");
const positionData = document.getElementById("positionData");
const integralData = document.getElementById("integralData");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

// Velocity function
function velocity(t) {
    return 0.2 * t;
}

// Position from integrating velocity
function displacement(t) {
    return 0.1 * t * t;
}

function drawScene(t) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ======================
    // Track
    // ======================

    const trackY = 70;

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(50, trackY);
    ctx.lineTo(650, trackY);
    ctx.stroke();

    const x = displacement(t);
    const carX = 50 + (x / 10) * 600;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(carX - 12, trackY - 18, 24, 14);

    // ======================
    // Graph
    // ======================

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

    // ======================
    // Shade Area
    // ======================

    ctx.beginPath();
    ctx.moveTo(gx, gy);

    for (let i = 0; i <= t * 10; i++) {

        let tt = i / 10;

        let px = gx + (tt / 10) * graphWidth;
        let py = gy - (velocity(tt) / 2) * graphHeight;

        ctx.lineTo(px, py);

    }

    ctx.lineTo(gx + (t / 10) * graphWidth, gy);
    ctx.closePath();

    ctx.fillStyle = "rgba(34,197,94,0.35)";
    ctx.fill();

    // ======================
    // Velocity Curve
    // ======================

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        let tt = i / 10;

        let px = gx + (tt / 10) * graphWidth;
        let py = gy - (velocity(tt) / 2) * graphHeight;

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
    ctx.fillStyle = "#ef4444";
    ctx.fill();

}

function update() {

    const t = Number(timeSlider.value);

    const v = velocity(t);
    const x = displacement(t);

    drawScene(t);

    timeValue.textContent = t.toFixed(1) + " s";

    timeData.innerHTML =
        `<strong>${t.toFixed(1)} s</strong>`;

    velocityData.innerHTML =
        `<strong>v(t) = 0.2t</strong><br>
         Current Velocity: ${v.toFixed(2)} m/s`;

    positionData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    integralData.innerHTML =
        `<strong>∫v(t)dt = ${x.toFixed(2)} m</strong>`;

    explanation.innerHTML = `
    The blue graph shows velocity as time changes.

    <br><br>

    The shaded green area under the curve represents the object's displacement.

    <br><br>

    In calculus,

    <br><br>

    <strong>Displacement = ∫ v(t) dt</strong>

    <br><br>

    As time increases, the shaded area grows, and the object moves farther along the track.
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
