const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const forceSlider = document.getElementById("force");
const massSlider = document.getElementById("mass");
const playButton = document.getElementById("playButton");

const forceValue = document.getElementById("forceValue");
const massValue = document.getElementById("massValue");

const forceData = document.getElementById("forceData");
const accelerationData = document.getElementById("acceleration");
const velocityData = document.getElementById("velocity");
const positionData = document.getElementById("position");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let x = 0;
let v = 0;
let t = 0;

//--------------------------------------------------------

function resetSimulation() {

    x = 0;
    v = 0;
    t = 0;

}

//--------------------------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, 700, 500);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 700, 500);

    // Ground

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(40, 360);
    ctx.lineTo(660, 360);
    ctx.stroke();

    // Title

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("Newton's Second Law", 230, 40);

    // Block

    const drawX = 60 + x * 4;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(drawX, 320, 50, 40);

    // Force Arrow

    const F = Number(forceSlider.value);

    if (F !== 0) {

        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.moveTo(drawX + 25, 300);
        ctx.lineTo(drawX + 25 + F * 5, 300);

        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(drawX + 25 + F * 5, 300);

        if (F > 0) {

            ctx.lineTo(drawX + 18 + F * 5, 295);
            ctx.lineTo(drawX + 18 + F * 5, 305);

        } else {

            ctx.lineTo(drawX + 32 + F * 5, 295);
            ctx.lineTo(drawX + 32 + F * 5, 305);

        }

        ctx.closePath();
        ctx.fillStyle = "#ef4444";
        ctx.fill();

    }

}

//--------------------------------------------------------

function updateInfo() {

    const F = Number(forceSlider.value);
    const m = Number(massSlider.value);

    const a = F / m;

    forceValue.textContent = `${F.toFixed(0)} N`;
    massValue.textContent = `${m.toFixed(1)} kg`;

    forceData.innerHTML =
        `<strong>${F.toFixed(2)} N</strong>`;

    accelerationData.innerHTML =
        `<strong>${a.toFixed(2)} m/s²</strong><br><em>dv/dt</em>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    positionData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    calculusView.innerHTML = `
        <strong>F = ${F.toFixed(2)} N</strong>

        <br><br>

        ↓

        <br><br>

        <strong>a = ${a.toFixed(2)} m/s²</strong>

        <br>

        <em>dv/dt</em>

        <br><br>

        ↓

        <br><br>

        <strong>v = ${v.toFixed(2)} m/s</strong>

        <br>

        <em>dx/dt</em>

        <br><br>

        ↓

        <br><br>

        <strong>x = ${x.toFixed(2)} m</strong>
    `;

    explanation.innerHTML = `
        Newton's Second Law tells us that a net force produces an acceleration.

        <br><br>

        <strong>F = ma</strong>

        <br><br>

        Using calculus, acceleration is the derivative of velocity,

        <br><br>

        <strong>a = dv/dt</strong>

        <br><br>

        so Newton's Second Law can be written as

        <br><br>

        <strong>F = m(dv/dt)</strong>

        <br><br>

        Notice that the applied force does not directly change the object's
        position—it first changes the acceleration, which changes the velocity,
        which then changes the position.
    `;

    drawScene();

}

//--------------------------------------------------------

forceSlider.addEventListener("input", updateInfo);
massSlider.addEventListener("input", updateInfo);

//--------------------------------------------------------

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        resetSimulation();

        animation = setInterval(() => {

            const F = Number(forceSlider.value);
            const m = Number(massSlider.value);

            const a = F / m;

            v += a * 0.05;
            x += v * 0.05;

            t += 0.05;

            updateInfo();

            if (x > 150 || x < -5) {

                clearInterval(animation);

                playing = false;
                playButton.textContent = "▶ Play";

            }

        }, 30);

    }

    else {

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(animation);

    }

});

resetSimulation();
updateInfo();
