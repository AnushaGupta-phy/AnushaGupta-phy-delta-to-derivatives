const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const velocitySlider = document.getElementById("velocity");
const frictionSlider = document.getElementById("friction");
const playButton = document.getElementById("playButton");

const velocityValue = document.getElementById("velocityValue");
const frictionValue = document.getElementById("frictionValue");

const currentVelocity = document.getElementById("currentVelocity");
const accelerationData = document.getElementById("acceleration");
const netForceData = document.getElementById("netForce");
const distanceData = document.getElementById("distance");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let t = 0;
let x = 0;
let v = 10;

const mass = 1;

//---------------------------------------------

function resetSimulation() {

    t = 0;
    x = 0;
    v = Number(velocitySlider.value);

}

//---------------------------------------------

function draw() {

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

    // Labels

    ctx.fillStyle="white";
    ctx.font="18px Arial";

    ctx.fillText("Newton's First Law",240,35);

    // Block

    const drawX=60+x*10;

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(drawX,320,50,40);

    // Velocity Arrow

    ctx.strokeStyle="#22c55e";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(drawX+25,300);
    ctx.lineTo(drawX+25+v*6,300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(drawX+25+v*6,300);
    ctx.lineTo(drawX+18+v*6,295);
    ctx.lineTo(drawX+18+v*6,305);
    ctx.closePath();
    ctx.fillStyle="#22c55e";
    ctx.fill();

}

//---------------------------------------------

function updateInfo(){

    const friction = Number(frictionSlider.value);

    const netForce = -friction * v;
    const acceleration = netForce / mass;

    velocityValue.textContent =
        Number(velocitySlider.value).toFixed(1)+" m/s";

    frictionValue.textContent =
        friction.toFixed(2);

    currentVelocity.innerHTML =
        "<strong>"+v.toFixed(2)+" m/s</strong>";

    accelerationData.innerHTML =
        "<strong>"+acceleration.toFixed(2)+" m/s²</strong>";

    netForceData.innerHTML =
        "<strong>"+netForce.toFixed(2)+" N</strong>";

    distanceData.innerHTML =
        "<strong>"+x.toFixed(2)+" m</strong>";

    explanation.innerHTML=`
    With zero friction, the net force is zero, so the acceleration is zero.
    The block continues moving at a constant velocity.

    <br><br>

    As friction increases, a backward force appears.

    <br><br>

    This creates a negative acceleration, causing the velocity to decrease
    over time until the block stops.
    `;

    draw();

}

//---------------------------------------------

velocitySlider.addEventListener("input",()=>{

    resetSimulation();
    updateInfo();

});

frictionSlider.addEventListener("input",updateInfo);

//---------------------------------------------

playButton.addEventListener("click",()=>{

    if(!playing){

        playing=true;
        playButton.textContent="⏸ Pause";

        resetSimulation();

        animation=setInterval(()=>{

            const friction=Number(frictionSlider.value);

            const force=-friction*v;
            const a=force/mass;

            v+=a*0.05;

            if(v<0)
                v=0;

            x+=v*0.05;

            t+=0.05;

            updateInfo();

            if(v===0 && friction>0){

                clearInterval(animation);

                playing=false;
                playButton.textContent="▶ Play";

            }

        },30);

    }

    else{

        playing=false;

        playButton.textContent="▶ Play";

        clearInterval(animation);

    }

});

resetSimulation();
updateInfo();
