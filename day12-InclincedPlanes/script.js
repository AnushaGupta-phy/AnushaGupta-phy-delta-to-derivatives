const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const angleSlider = document.getElementById("angle");
const massSlider = document.getElementById("mass");
const muSlider = document.getElementById("mu");
const playButton = document.getElementById("playButton");

const angleValue = document.getElementById("angleValue");
const massValue = document.getElementById("massValue");
const muValue = document.getElementById("muValue");

const parallelForceData = document.getElementById("parallelForce");
const normalForceData = document.getElementById("normalForce");
const netForceData = document.getElementById("netForce");
const accelerationData = document.getElementById("acceleration");
const velocityData = document.getElementById("velocity");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let s = 0;
let v = 0;

const g = 9.8;

//-----------------------------------------

function resetSimulation() {

    s = 0;
    v = 0;

}

//-----------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, 700, 500);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 700, 500);

    const angle = Number(angleSlider.value) * Math.PI / 180;

    const startX = 140;
    const startY = 120;
    const length = 350;

    const endX = startX + length * Math.cos(angle);
    const endY = startY + length * Math.sin(angle);

    // Ramp

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Block

    const x = startX + s * Math.cos(angle);
    const y = startY + s * Math.sin(angle);

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(-15, -15, 30, 30);

    ctx.restore();

    // Labels

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("Inclined Plane", 250, 40);

}

//-----------------------------------------

function update() {

    const theta = Number(angleSlider.value) * Math.PI / 180;
    const m = Number(massSlider.value);
    const mu = Number(muSlider.value);

    const Fparallel = m * g * Math.sin(theta);
    const Fnormal = m * g * Math.cos(theta);
    const Ffriction = mu * Fnormal;

    const Fnet = Fparallel - Ffriction;

    const a = Fnet / m;

    angleValue.textContent = angleSlider.value + "°";
    massValue.textContent = m.toFixed(1) + " kg";
    muValue.textContent = mu.toFixed(2);

    parallelForceData.innerHTML =
        `<strong>${Fparallel.toFixed(2)} N</strong>`;

    normalForceData.innerHTML =
        `<strong>${Fnormal.toFixed(2)} N</strong>`;

    netForceData.innerHTML =
        `<strong>${Fnet.toFixed(2)} N</strong>`;

    accelerationData.innerHTML =
        `<strong>${a.toFixed(2)} m/s²</strong>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    explanation.innerHTML = `
        Gravity can be separated into two components.

        <br><br>

        <strong>mg sin(θ)</strong> pulls the object down the ramp.

        <br><br>

        <strong>mg cos(θ)</strong> pushes the object into the ramp.

        <br><br>

        Friction opposes the motion, so the net force is

        <br><br>

        <strong>F<sub>net</sub> = mg sin(θ) − μmg cos(θ)</strong>

        <br><br>

        Newton's Second Law gives the acceleration.
    `;

    drawScene();

}

//-----------------------------------------

angleSlider.addEventListener("input", update);
massSlider.addEventListener("input", update);
muSlider.addEventListener("input", update);

//-----------------------------------------

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        resetSimulation();

        animation = setInterval(() => {

            const theta = Number(angleSlider.value) * Math.PI / 180;
            const m = Number(massSlider.value);
            const mu = Number(muSlider.value);

            const Fparallel = m * g * Math.sin(theta);
            const Fnormal = m * g * Math.cos(theta);
            const Ffriction = mu * Fnormal;

            const Fnet = Fparallel - Ffriction;

            const a = Fnet / m;

            v += a * 0.05;
            s += v * 2;

            if (s > 320) {

                s = 320;
                clearInterval(animation);

                playing = false;
                playButton.textContent = "▶ Play";

            }

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
