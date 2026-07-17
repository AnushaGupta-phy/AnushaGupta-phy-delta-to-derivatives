const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const velocitySlider = document.getElementById("velocity");
const frictionSlider = document.getElementById("friction");
const playButton = document.getElementById("playButton");

const velocityValue = document.getElementById("velocityValue");
const frictionValue = document.getElementById("frictionValue");

const currentVelocity = document.getElementById("currentVelocity");
const frictionForceData = document.getElementById("frictionForce");
const accelerationData = document.getElementById("acceleration");
const distanceData = document.getElementById("distance");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

const g = 9.8;
const mass = 1;

let playing = false;
let animation;

let x = 0;
let v = 12;
let t = 0;

//----------------------------------------------------

function resetSimulation(){

    x = 0;
    t = 0;
    v = Number(velocitySlider.value);

}

//----------------------------------------------------

function drawScene(){

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

    // Title

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Friction",305,40);

    // Block

    const drawX = 60 + x * 8;

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(drawX,320,50,40);

    // Velocity Arrow

    ctx.strokeStyle="#22c55e";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(drawX+25,300);
    ctx.lineTo(drawX+25+v*5,300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(drawX+25+v*5,300);
    ctx.lineTo(drawX+18+v*5,295);
    ctx.lineTo(drawX+18+v*5,305);
    ctx.closePath();

    ctx.fillStyle="#22c55e";
    ctx.fill();

    // Friction Arrow

    ctx.strokeStyle="#ef4444";

    ctx.beginPath();
    ctx.moveTo(drawX+25,385);
    ctx.lineTo(drawX-25,385);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(drawX-25,385);
    ctx.lineTo(drawX-18,380);
    ctx.lineTo(drawX-18,390);
    ctx.closePath();

    ctx.fillStyle="#ef4444";
    ctx.fill();

}

//----------------------------------------------------

function updateInfo(){

    const mu = Number(frictionSlider.value);

    const frictionForce = -mu * mass * g;
    const acceleration = frictionForce / mass;

    velocityValue.textContent =
        Number(velocitySlider.value).toFixed(1) + " m/s";

    frictionValue.textContent =
        mu.toFixed(2);

    currentVelocity.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    frictionForceData.innerHTML =
        `<strong>${frictionForce.toFixed(2)} N</strong>`;

    accelerationData.innerHTML =
        `<strong>${acceleration.toFixed(2)} m/s²</strong><br><em>dv/dt</em>`;

    distanceData.innerHTML =
        `<strong>${x.toFixed(2)} m</strong>`;

    calculusView.innerHTML = `
        <strong>F<sub>friction</sub> = ${frictionForce.toFixed(2)} N</strong>

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

        <em>Negative slope</em>

        <br><br>

        ↓

        <br><br>

        <strong>x = ${x.toFixed(2)} m</strong>
    `;

    explanation.innerHTML = `
        Friction always acts opposite the direction of motion.

        <br><br>

        The friction force creates a constant negative acceleration.

        <br><br>

        Since

        <strong>a = dv/dt</strong>,

        the slope of the velocity function is negative.

        <br><br>

        A steeper negative slope means the object loses speed more quickly.

        <br><br>

        Increasing the coefficient of friction increases the magnitude of the
        friction force, making the velocity decrease even faster.
    `;

    drawScene();

}

//----------------------------------------------------

velocitySlider.addEventListener("input",()=>{

    resetSimulation();
    updateInfo();

});

frictionSlider.addEventListener("input",updateInfo);

//----------------------------------------------------

playButton.addEventListener("click",()=>{

    if(!playing){

        playing = true;
        playButton.textContent = "⏸ Pause";

        resetSimulation();

        animation = setInterval(()=>{

            const mu = Number(frictionSlider.value);

            const frictionForce = -mu * mass * g;
            const acceleration = frictionForce / mass;

            v += acceleration * 0.05;

            if(v < 0){

                v = 0;

            }

            x += v * 0.05;
            t += 0.05;

            updateInfo();

            if(v === 0){

                clearInterval(animation);

                playing = false;
                playButton.textContent = "▶ Play";

            }

        },30);

    }

    else{

        playing = false;
        playButton.textContent = "▶ Play";

        clearInterval(animation);

    }

});

resetSimulation();
updateInfo();
