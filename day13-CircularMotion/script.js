const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const speedSlider = document.getElementById("speed");
const radiusSlider = document.getElementById("radius");
const massSlider = document.getElementById("mass");
const playButton = document.getElementById("playButton");

const speedValue = document.getElementById("speedValue");
const radiusValue = document.getElementById("radiusValue");
const massValue = document.getElementById("massValue");

const accelerationData = document.getElementById("acceleration");
const forceData = document.getElementById("force");
const omegaData = document.getElementById("omega");
const periodData = document.getElementById("period");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let theta = 0;

//--------------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const radius = Number(radiusSlider.value) * 20;

    const cx = 350;
    const cy = 250;

    // Circle

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Ball

    const x = cx + radius * Math.cos(theta);
    const y = cy + radius * Math.sin(theta);

    ctx.beginPath();
    ctx.fillStyle = "#3b82f6";
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();

    // String

    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Centripetal force arrow

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
        x - (x - cx) * 0.35,
        y - (y - cy) * 0.35
    );
    ctx.stroke();

    // Velocity arrow

    const tangentX = -Math.sin(theta);
    const tangentY = Math.cos(theta);

    ctx.strokeStyle = "#22c55e";

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
        x + tangentX * 45,
        y + tangentY * 45
    );
    ctx.stroke();

    // Labels

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("Circular Motion", 260, 35);

}

//--------------------------------------------

function update() {

    const v = Number(speedSlider.value);
    const r = Number(radiusSlider.value);
    const m = Number(massSlider.value);

    const a = (v * v) / r;
    const F = m * a;
    const omega = v / r;
    const period = (2 * Math.PI * r) / v;

    speedValue.textContent = `${v.toFixed(1)} m/s`;
    radiusValue.textContent = `${r.toFixed(1)} m`;
    massValue.textContent = `${m.toFixed(1)} kg`;

    accelerationData.innerHTML =
        `<strong>${a.toFixed(2)} m/s²</strong>`;

    forceData.innerHTML =
        `<strong>${F.toFixed(2)} N</strong>`;

    omegaData.innerHTML =
        `<strong>${omega.toFixed(2)} rad/s</strong>`;

    periodData.innerHTML =
        `<strong>${period.toFixed(2)} s</strong>`;

    explanation.innerHTML = `
        An object moving in a circle is constantly changing direction.

        <br><br>

        Even if its speed stays constant, its velocity changes, meaning it has
        an acceleration directed toward the center of the circle.

        <br><br>

        <strong>a = v²/r</strong>

        <br><br>

        This inward acceleration requires a centripetal force:

        <br><br>

        <strong>F = mv²/r</strong>
    `;

    drawScene();

}

//--------------------------------------------

speedSlider.addEventListener("input", update);
radiusSlider.addEventListener("input", update);
massSlider.addEventListener("input", update);

//--------------------------------------------

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        animation = setInterval(() => {

            const v = Number(speedSlider.value);
            const r = Number(radiusSlider.value);

            theta += (v / r) * 0.03;

            update();

        }, 30);

    } else {

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(animation);

    }

});

//--------------------------------------------

update();
