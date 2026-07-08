const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");
const speedSlider = document.getElementById("speed");

const timeValue = document.getElementById("timeValue");
const speedValue = document.getElementById("speedValue");

const timeData = document.getElementById("timeData");
const positionData = document.getElementById("positionData");
const explanation = document.getElementById("explanation");

const playButton = document.getElementById("playButton");

let playing = false;
let animation;

// Draw the scene
function drawScene(t) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Track
    const startX = 60;
    const endX = 640;
    const y = 150;

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(endX, y);
    ctx.stroke();

    // Tick marks
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    for (let i = 0; i <= 10; i++) {

        const x = startX + (endX - startX) * (i / 10);

        ctx.beginPath();
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x, y + 10);
        ctx.stroke();

        ctx.fillText(i + " m", x - 12, y + 35);
    }

    // Car position
    const carX = startX + (endX - startX) * (t / 10);

    ctx.font = "34px Arial";
    ctx.fillText("🚗", carX - 15, y - 20);

}

// Update everything
function update() {

    const t = Number(timeSlider.value);

    timeValue.textContent = t.toFixed(1) + " s";
    speedValue.textContent = speedSlider.value + "×";

    drawScene(t);

    timeData.innerHTML = `${t.toFixed(1)} s`;

    positionData.innerHTML = `${t.toFixed(1)} m`;

    explanation.innerHTML = `
        At <strong>${t.toFixed(1)} seconds</strong>,
        the object is located at
        <strong>${t.toFixed(1)} meters</strong> from the origin.

        <br><br>

        Position simply tells us <strong>where</strong> an object is.

        <br><br>

        Tomorrow we'll learn how to determine
        <strong>how fast</strong> that position is changing.
    `;
}

// Play / Pause
playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        animation = setInterval(() => {

            let t = Number(timeSlider.value);

            t += 0.05 * Number(speedSlider.value);

            if (t >= 10) {

                t = 0;

            }

            timeSlider.value = t;
            update();

        }, 30);

    } else {

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(animation);

    }

});

// Slider events
timeSlider.addEventListener("input", update);
speedSlider.addEventListener("input", update);

update();
