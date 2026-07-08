const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");
const speedSlider = document.getElementById("speed");
const playButton = document.getElementById("playButton");

const timeValue = document.getElementById("timeValue");
const speedValue = document.getElementById("speedValue");

const timeData = document.getElementById("timeData");
const functionData = document.getElementById("functionData");
const positionData = document.getElementById("positionData");
const explanation = document.getElementById("explanation");

let playing = false;
let timer;

// Position function
function position(t) {
    return 0.1 * t * t;
}

function drawScene(t) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ===========================
    // Track
    // ===========================

    const startX = 60;
    const endX = 640;
    const trackY = 90;

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(startX, trackY);
    ctx.lineTo(endX, trackY);
    ctx.stroke();

    // Car

    const pos = position(t);

    const carX = startX + (endX - startX) * (pos / 10);

    ctx.font = "34px Arial";
    ctx.fillText("🚗", carX - 15, trackY - 18);

    // ===========================
    // Graph
    // ===========================

    const gx = 70;
    const gy = 450;
    const gw = 560;
    const gh = 280;

    // Axes

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx, gy - gh);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + gw, gy);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText("Position", 5, 180);
    ctx.fillText("Time", 610, 475);

    // Draw curve

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        const tt = i / 10;
        const yy = position(tt);

        const px = gx + (tt / 10) * gw;
        const py = gy - (yy / 10) * gh;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }

    }

    ctx.stroke();

    // Current point

    const pointX = gx + (t / 10) * gw;
    const pointY = gy - (pos / 10) * gh;

    ctx.beginPath();
    ctx.fillStyle = "#22c55e";
    ctx.arc(pointX, pointY, 7, 0, Math.PI * 2);
    ctx.fill();

}

function update() {

    const t = Number(timeSlider.value);

    const pos = position(t);

    timeValue.textContent = t.toFixed(1) + " s";
    speedValue.textContent = speedSlider.value + "×";

    drawScene(t);

    timeData.innerHTML = t.toFixed(1) + " s";

    functionData.innerHTML =
        "<strong>x(t) = 0.1t²</strong>";

    positionData.innerHTML =
        pos.toFixed(2) + " m";

    explanation.innerHTML = `
    The object's position is described by the function

    <br><br>

    <strong>x(t)=0.1t²</strong>

    <br><br>

    As time increases, the object's position changes according to this equation.

    <br><br>

    The blue curve is the graph of the position function.

    <br><br>

    The green dot shows the object's current position on the graph.

    <br><br>

    Tomorrow we'll use calculus to find the slope of this graph and discover velocity.
    `;

}

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        timer = setInterval(() => {

            let t = Number(timeSlider.value);

            t += 0.05 * Number(speedSlider.value);

            if (t > 10) {
                t = 0;
            }

            timeSlider.value = t;
            update();

        }, 30);

    } else {

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(timer);

    }

});

timeSlider.addEventListener("input", update);
speedSlider.addEventListener("input", update);

update();
