const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const velocitySlider = document.getElementById("velocity");
const frictionSlider = document.getElementById("friction");
const playButton = document.getElementById("playButton");

const velocityValue = document.getElementById("velocityValue");
const frictionValue = document.getElementById("frictionValue");

const currentVelocity = document.getElementById("currentVelocity");
const netForceData = document.getElementById("netForce");
const accelerationData = document.getElementById("acceleration");
const distanceData = document.getElementById("distance");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

const mass = 1;

let playing = false;
let animation;

let t = 0;
let x = 0;
let v = 10;

//--------------------------------------------------------

function resetSimulation() {

    t = 0;
    x = 0;
    v = Number(velocitySlider.value);

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
    ctx.fillText("Newton's First Law", 240, 40);

    // Block

    const drawX = 60 + x * 10;

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(drawX, 320, 50, 40);

    // Velocity Arrow

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(drawX + 25, 300);
    ctx.lineTo(drawX + 25 + v * 6, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(drawX + 25 + v * 6, 300);
    ctx.lineTo(drawX + 18 + v * 6, 295);
    ctx.lineTo(drawX + 18 + v * 6, 305);
    ctx.closePath();
    ctx.fillStyle = "#22c55e";
    ctx.fill();

}

//--------------------------------------------------------

function updateInfo() {

    const friction = Number(frictionSlider.value);

    const netForce = -friction * v;
    const acceleration = netForce / mass;

    velocityValue.textContent =
        Number(velocitySlider.value).toFixed(1) + " m/s";

    frictionValue.textContent =
        friction.toFixed(2);

    currentVelocity.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    netForceData.innerHTML =
        `<strong>${netForce.toFixed(2)} N</strong>`;

    accelerationData.innerHTML =
        `<strong>${acceleration.toFixed(2)} m/s²</strong><br><em>dv/dt</em>`;

    distanceData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    calculusView.innerHTML = `
        <strong>F = ${netForce.toFixed(2)} N</strong>

        <br><br>

        ↓

        <br><br>

        <strong>a = ${acceleration.toFixed(2)} m/s²</strong>

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

    if (friction === 0) {

        explanation.innerHTML = `
            Newton's First Law says that if the net force is zero,
            an object's velocity does not change.

            <br><br>

            Since

            <strong>F = 0</strong>,

            Newton's Second Law gives

            <br><br>

            <strong>a = F/m = 0</strong>

            <br><br>

            Acceleration is the derivative of velocity,

            <br><br>

            <strong>a = dv/dt</strong>

            <br><br>

            so

            <strong>dv/dt = 0</strong>.

            The velocity remains constant, meaning the object's
            position increases at a constant rate.
        `;

    }

    else {

        explanation.innerHTML = `
            Friction creates a backward force that opposes motion.

            <br><br>

            A negative net force produces a negative acceleration.

            <br><br>

            Since

            <strong>a = dv/dt</strong>,

            the slope of the velocity curve is now negative.

            <br><br>

            As time passes, the object's velocity decreases until
            it eventually comes to rest.
        `;

    }

    drawScene();

}

//--------------------------------------------------------

velocitySlider.addEventListener("input", () => {

    resetSimulation();
    updateInfo();

});

frictionSlider.addEventListener("input", updateInfo);

//--------------------------------------------------------

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        resetSimulation();

        animation = setInterval(() => {

            const friction = Number(frictionSlider.value);

            const netForce = -friction * v;
            const acceleration = netForce / mass;

            v += acceleration * 0.05;

            if (v < 0) {

                v = 0;

            }

            x += v * 0.05;

            t += 0.05;

            updateInfo();

            if (v === 0 && friction > 0) {

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
