const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const angleSlider = document.getElementById("angle");
const playButton = document.getElementById("playButton");

const angleValue = document.getElementById("angleValue");

const angleData = document.getElementById("angleData");
const accelerationData = document.getElementById("acceleration");
const velocityData = document.getElementById("velocity");
const distanceData = document.getElementById("distance");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

const g = 9.8;

let s = 0;
let v = 0;

//----------------------------------------------------

function resetSimulation() {

    s = 0;
    v = 0;

}

//----------------------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, 700, 500);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 700, 500);

    const theta = Number(angleSlider.value) * Math.PI / 180;

    const startX = 140;
    const startY = 120;
    const length = 350;

    const endX = startX + length * Math.cos(theta);
    const endY = startY + length * Math.sin(theta);

    // Ramp

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Block

    const blockX = startX + s * Math.cos(theta);
    const blockY = startY + s * Math.sin(theta);

    ctx.save();

    ctx.translate(blockX, blockY);
    ctx.rotate(theta);

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(-15, -15, 30, 30);

    ctx.restore();

    // Gravity Arrow

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(blockX, blockY);
    ctx.lineTo(blockX, blockY + 55);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(blockX, blockY + 55);
    ctx.lineTo(blockX - 5, blockY + 45);
    ctx.lineTo(blockX + 5, blockY + 45);
    ctx.closePath();

    ctx.fillStyle = "#ef4444";
    ctx.fill();

    // Labels

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("Inclined Plane", 270, 40);

}

//----------------------------------------------------

function update() {

    const thetaDegrees = Number(angleSlider.value);
    const theta = thetaDegrees * Math.PI / 180;

    const acceleration = g * Math.sin(theta);

    angleValue.textContent = thetaDegrees + "°";

    angleData.innerHTML =
        `<strong>${thetaDegrees}°</strong>`;

    accelerationData.innerHTML =
        `<strong>${acceleration.toFixed(2)} m/s²</strong><br><em>dv/dt</em>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    distanceData.innerHTML =
        `<strong>${(s / 32).toFixed(2)} m</strong>`;

    calculusView.innerHTML = `
        <strong>a = g sin(θ)</strong>

        <br><br>

        = ${acceleration.toFixed(2)} m/s²

        <br><br>

        ↓

        <br><br>

        <strong>dv/dt</strong>

        <br><br>

        ↓

        <br><br>

        <strong>Velocity = ${v.toFixed(2)} m/s</strong>

        <br><br>

        ↓

        <br><br>

        <strong>dx/dt</strong>

        <br><br>

        ↓

        <br><br>

        <strong>Distance = ${(s / 32).toFixed(2)} m</strong>
    `;

    explanation.innerHTML = `
        Gravity always points downward, but only part of it pulls the block
        along the ramp.

        <br><br>

        The acceleration down the incline is

        <br><br>

        <strong>a = g sin(θ)</strong>

        <br><br>

        A steeper ramp produces a larger acceleration.

        <br><br>

        Since acceleration is the derivative of velocity,

        <br><br>

        <strong>a = dv/dt</strong>,

        <br><br>

        increasing the angle increases the rate at which the velocity changes.

        <br><br>

        Because velocity is the derivative of position,

        <br><br>

        <strong>v = dx/dt</strong>,

        <br><br>

        the block also travels farther down the ramp in the same amount of time.
    `;

    drawScene();

}

//----------------------------------------------------

angleSlider.addEventListener("input", () => {

    resetSimulation();
    update();

});

//----------------------------------------------------

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        resetSimulation();

        animation = setInterval(() => {

            const theta = Number(angleSlider.value) * Math.PI / 180;

            const acceleration = g * Math.sin(theta);

            v += acceleration * 0.05;

            s += v * 2;

            if (s > 320) {

                s = 320;

                clearInterval(animation);

                playing = false;

                playButton.textContent = "▶ Release Block";

            }

            update();

        }, 30);

    }

    else {

        playing = false;

        playButton.textContent = "▶ Release Block";

        clearInterval(animation);

    }

});

resetSimulation();
update();
