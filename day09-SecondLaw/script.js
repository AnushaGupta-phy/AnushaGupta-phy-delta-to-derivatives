const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const forceSlider = document.getElementById("force");
const massSlider = document.getElementById("mass");
const playButton = document.getElementById("playButton");

const forceValue = document.getElementById("forceValue");
const massValue = document.getElementById("massValue");

const accelerationData = document.getElementById("acceleration");
const velocityData = document.getElementById("velocity");
const positionData = document.getElementById("position");
const netForceData = document.getElementById("netForce");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let t = 0;
let x = 0;
let v = 0;

//---------------------------------------------

function acceleration() {
    return Number(forceSlider.value) / Number(massSlider.value);
}

//---------------------------------------------

function resetSimulation() {

    t = 0;
    x = 0;
    v = 0;

}

//---------------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(40, 360);
    ctx.lineTo(660, 360);
    ctx.stroke();

    // Block
    const blockX = 60 + x * 5;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(blockX, 320, 50, 40);

    // Force Arrow
    const F = Number(forceSlider.value);

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(blockX + 25, 300);
    ctx.lineTo(blockX + 25 + F * 8, 300);
    ctx.stroke();

    if (F !== 0) {

        ctx.beginPath();

        if (F > 0) {

            ctx.moveTo(blockX + 25 + F * 8, 300);
            ctx.lineTo(blockX + 18 + F * 8, 295);
            ctx.lineTo(blockX + 18 + F * 8, 305);

        } else {

            ctx.moveTo(blockX + 25 + F * 8, 300);
            ctx.lineTo(blockX + 32 + F * 8, 295);
            ctx.lineTo(blockX + 32 + F * 8, 305);

        }

        ctx.closePath();
        ctx.fillStyle = "#ef4444";
        ctx.fill();

    }

    // Velocity Arrow

    ctx.strokeStyle = "#22c55e";

    ctx.beginPath();
    ctx.moveTo(blockX + 25, 280);
    ctx.lineTo(blockX + 25 + v * 5, 280);
    ctx.stroke();

    if (Math.abs(v) > 0.1) {

        ctx.beginPath();

        if (v > 0) {

            ctx.moveTo(blockX + 25 + v * 5, 280);
            ctx.lineTo(blockX + 18 + v * 5, 275);
            ctx.lineTo(blockX + 18 + v * 5, 285);

        } else {

            ctx.moveTo(blockX + 25 + v * 5, 280);
            ctx.lineTo(blockX + 32 + v * 5, 275);
            ctx.lineTo(blockX + 32 + v * 5, 285);

        }

        ctx.closePath();
        ctx.fillStyle = "#22c55e";
        ctx.fill();

    }

    // Labels

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("Force", 50, 250);
    ctx.fillText("Velocity", 50, 430);

}

//---------------------------------------------

function update() {

    const F = Number(forceSlider.value);
    const m = Number(massSlider.value);
    const a = acceleration();

    forceValue.textContent = F.toFixed(0) + " N";
    massValue.textContent = m.toFixed(1) + " kg";

    accelerationData.innerHTML =
        `<strong>${a.toFixed(2)} m/s²</strong>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    positionData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    netForceData.innerHTML =
        `<strong>${F.toFixed(2)} N</strong>`;

    explanation.innerHTML = `
        Newton's Second Law states that

        <br><br>

        <strong>F = ma</strong>

        <br><br>

        Increasing the force increases the acceleration.

        Increasing the mass decreases the acceleration.

        <br><br>

        As the object accelerates, its velocity and position change over time.
    `;

    drawScene();

}

//---------------------------------------------

forceSlider.addEventListener("input", update);
massSlider.addEventListener("input", update);

//---------------------------------------------

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        resetSimulation();

        animation = setInterval(() => {

            const a = acceleration();

            v += a * 0.05;
            x += v * 0.05;

            if (x > 120) x = 120;
            if (x < 0) x = 0;

            t += 0.05;

            update();

        }, 30);

    } else {

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(animation);

    }

});

resetSimulation();
update();
