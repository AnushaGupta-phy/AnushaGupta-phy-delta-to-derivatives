const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const forceSlider = document.getElementById("force");
const muSlider = document.getElementById("mu");
const massSlider = document.getElementById("mass");
const playButton = document.getElementById("playButton");

const forceValue = document.getElementById("forceValue");
const muValue = document.getElementById("muValue");
const massValue = document.getElementById("massValue");

const frictionForceData = document.getElementById("frictionForce");
const netForceData = document.getElementById("netForce");
const accelerationData = document.getElementById("acceleration");
const velocityData = document.getElementById("velocity");
const positionData = document.getElementById("position");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let x = 0;
let v = 0;

//--------------------------------------------

function resetSimulation() {
    x = 0;
    v = 0;
}

//--------------------------------------------

function drawScene() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Ground

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(40,360);
    ctx.lineTo(660,360);
    ctx.stroke();

    // Block

    const blockX = 60 + x * 5;

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(blockX,320,50,40);

    // Applied Force

    const F = Number(forceSlider.value);

    ctx.strokeStyle="#22c55e";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(blockX+25,290);
    ctx.lineTo(blockX+25+F*5,290);
    ctx.stroke();

    ctx.fillStyle="#22c55e";
    ctx.fillText("Applied",20,290);

    // Friction

    const friction = Number(muSlider.value) * Number(massSlider.value) * 9.8;

    ctx.strokeStyle="#ef4444";

    ctx.beginPath();
    ctx.moveTo(blockX+25,315);
    ctx.lineTo(blockX+25-friction*2,315);
    ctx.stroke();

    ctx.fillStyle="#ef4444";
    ctx.fillText("Friction",20,315);

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Sliding Box",280,40);

}

//--------------------------------------------

function update() {

    const F = Number(forceSlider.value);
    const mu = Number(muSlider.value);
    const m = Number(massSlider.value);

    const friction = mu * m * 9.8;
    const netForce = F - friction;
    const a = netForce / m;

    forceValue.textContent = `${F.toFixed(0)} N`;
    muValue.textContent = mu.toFixed(2);
    massValue.textContent = `${m.toFixed(1)} kg`;

    frictionForceData.innerHTML =
        `<strong>${friction.toFixed(2)} N</strong>`;

    netForceData.innerHTML =
        `<strong>${netForce.toFixed(2)} N</strong>`;

    accelerationData.innerHTML =
        `<strong>${a.toFixed(2)} m/s²</strong>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    positionData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    explanation.innerHTML = `
        Friction always acts opposite the direction of motion.

        <br><br>

        The friction force is

        <br><br>

        <strong>F<sub>f</sub> = μmg</strong>

        <br><br>

        The net force is

        <br><br>

        <strong>F<sub>net</sub> = F - F<sub>f</sub></strong>

        <br><br>

        Newton's Second Law then gives the acceleration:

        <br><br>

        <strong>a = F<sub>net</sub>/m</strong>
    `;

    drawScene();

}

//--------------------------------------------

forceSlider.addEventListener("input",update);
muSlider.addEventListener("input",update);
massSlider.addEventListener("input",update);

//--------------------------------------------

playButton.addEventListener("click",()=>{

    if(!playing){

        playing=true;
        playButton.textContent="⏸ Pause";

        resetSimulation();

        animation=setInterval(()=>{

            const F = Number(forceSlider.value);
            const mu = Number(muSlider.value);
            const m = Number(massSlider.value);

            const friction = mu * m * 9.8;
            const netForce = F - friction;
            const a = netForce / m;

            v += a * 0.05;

            if(v < 0) v = 0;

            x += v * 0.05;

            update();

        },30);

    }

    else{

        playing=false;
        playButton.textContent="▶ Play";

        clearInterval(animation);

    }

});

//--------------------------------------------

resetSimulation();
update();
