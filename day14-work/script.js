const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const forceSlider = document.getElementById("force");
const massSlider = document.getElementById("mass");
const playButton = document.getElementById("playButton");

const forceValue = document.getElementById("forceValue");
const massValue = document.getElementById("massValue");

const distanceData = document.getElementById("distance");
const velocityData = document.getElementById("velocity");
const accelerationData = document.getElementById("acceleration");
const workData = document.getElementById("work");
const energyData = document.getElementById("energy");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let x = 0;
let v = 0;

function resetSimulation() {

    x = 0;
    v = 0;

}

function drawScene() {

    ctx.clearRect(0,0,700,500);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,700,500);

    // Ground

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(40,360);
    ctx.lineTo(660,360);
    ctx.stroke();

    // Block

    const drawX = 60 + x * 5;

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(drawX,320,50,40);

    // Force Arrow

    const F = Number(forceSlider.value);

    ctx.strokeStyle="#ef4444";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(drawX+25,300);
    ctx.lineTo(drawX+25+F*5,300);
    ctx.stroke();

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Work = Force × Distance",210,40);

}

function update() {

    const F = Number(forceSlider.value);
    const m = Number(massSlider.value);

    const a = F / m;
    const work = F * x;
    const KE = 0.5 * m * v * v;

    forceValue.textContent = `${F.toFixed(0)} N`;
    massValue.textContent = `${m.toFixed(1)} kg`;

    distanceData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    accelerationData.innerHTML =
        `<strong>${a.toFixed(2)} m/s²</strong>`;

    workData.innerHTML =
        `<strong>${work.toFixed(2)} J</strong>`;

    energyData.innerHTML =
        `<strong>${KE.toFixed(2)} J</strong>`;

    explanation.innerHTML = `
        A force transfers energy when it moves an object.

        <br><br>

        <strong>W = Fd</strong>

        <br><br>

        As the block moves farther, more work is done.

        <br><br>

        That work becomes kinetic energy:

        <br><br>

        <strong>KE = ½mv²</strong>

        <br><br>

        Notice how the work done and the kinetic energy increase together.
    `;

    drawScene();

}

forceSlider.addEventListener("input", update);
massSlider.addEventListener("input", update);

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

            if (x > 120) {

                x = 120;

                clearInterval(animation);

                playing = false;
                playButton.textContent = "▶ Play";

            }

            update();

        },30);

    }

    else {

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(animation);

    }

});

resetSimulation();
update();
