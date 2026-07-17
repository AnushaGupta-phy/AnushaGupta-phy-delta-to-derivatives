const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const massASlider = document.getElementById("massA");
const massBSlider = document.getElementById("massB");
const forceSlider = document.getElementById("force");
const playButton = document.getElementById("playButton");

const massAValue = document.getElementById("massAValue");
const massBValue = document.getElementById("massBValue");
const forceValue = document.getElementById("forceValue");

const accelerationA = document.getElementById("accelerationA");
const accelerationB = document.getElementById("accelerationB");
const velocityA = document.getElementById("velocityA");
const velocityB = document.getElementById("velocityB");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let xA, xB;
let vA, vB;

//-------------------------------------

function resetSimulation() {

    xA = 250;
    xB = 400;

    vA = 0;
    vB = 0;

}

//-------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ice

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(40, 380);
    ctx.lineTo(660, 380);
    ctx.stroke();

    // Skater A

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(xA, 320, 40, 60);

    // Skater B

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(xB, 320, 40, 60);

    // Force arrows

    const F = Number(forceSlider.value);

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 4;

    // A

    ctx.beginPath();
    ctx.moveTo(xA + 20, 300);
    ctx.lineTo(xA + 20 - F * 3, 300);
    ctx.stroke();

    // B

    ctx.beginPath();
    ctx.moveTo(xB + 20, 300);
    ctx.lineTo(xB + 20 + F * 3, 300);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("Equal & Opposite Forces", 220, 40);

}

//-------------------------------------

function update() {

    const mA = Number(massASlider.value);
    const mB = Number(massBSlider.value);
    const F = Number(forceSlider.value);

    const aA = -F / mA;
    const aB = F / mB;

    massAValue.textContent = mA.toFixed(1) + " kg";
    massBValue.textContent = mB.toFixed(1) + " kg";
    forceValue.textContent = F.toFixed(0) + " N";

    accelerationA.innerHTML =
        `<strong>${aA.toFixed(2)} m/s²</strong>`;

    accelerationB.innerHTML =
        `<strong>${aB.toFixed(2)} m/s²</strong>`;

    velocityA.innerHTML =
        `<strong>${vA.toFixed(2)} m/s</strong>`;

    velocityB.innerHTML =
        `<strong>${vB.toFixed(2)} m/s</strong>`;

    explanation.innerHTML = `
        Newton's Third Law states that every action has an equal and opposite reaction.

        <br><br>

        Both skaters experience the same force, but because they have different masses,
        they accelerate differently.

        <br><br>

        Since

        <strong>F = ma</strong>,

        the lighter skater experiences the larger acceleration.
    `;

    drawScene();

}

//-------------------------------------

massASlider.addEventListener("input", update);
massBSlider.addEventListener("input", update);
forceSlider.addEventListener("input", update);

//-------------------------------------

playButton.addEventListener("click", () => {

    if (!playing) {

        playing = true;
        playButton.textContent = "⏸ Pause";

        resetSimulation();

        animation = setInterval(() => {

            const F = Number(forceSlider.value);

            const aA = -F / Number(massASlider.value);
            const aB = F / Number(massBSlider.value);

            vA += aA * 0.05;
            vB += aB * 0.05;

            xA += vA * 2;
            xB += vB * 2;

            update();

        }, 30);

    } else {

        playing = false;
        playButton.textContent = "▶ Push Off";

        clearInterval(animation);

    }

});

resetSimulation();
update();
