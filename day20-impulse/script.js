const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const forceSlider = document.getElementById("force");
const timeSlider = document.getElementById("time");
const massSlider = document.getElementById("mass");

const forceValue = document.getElementById("forceValue");
const timeValue = document.getElementById("timeValue");
const massValue = document.getElementById("massValue");

const startButton = document.getElementById("startButton");

const impulseDisplay = document.getElementById("impulse");
const deltaMomentumDisplay = document.getElementById("deltaMomentum");
const velocityDisplay = document.getElementById("velocity");
const momentumDisplay = document.getElementById("momentum");
const calculusDisplay = document.getElementById("calculus");
const explanationDisplay = document.getElementById("explanation");

let block;

let running = false;
let elapsed = 0;

resetSimulation();

//----------------------------------------------------

function resetSimulation(){

    block={

        x:100,
        y:150,

        size:40,

        velocity:0

    };

    elapsed=0;

    running=false;

    updateDisplays();

}

//----------------------------------------------------

function drawScene(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    drawTrack();

    drawBlock();

    drawGraph();

}

//----------------------------------------------------

function drawTrack(){

    ctx.strokeStyle="#94a3b8";
    ctx.lineWidth=6;

    ctx.beginPath();
    ctx.moveTo(50,180);
    ctx.lineTo(850,180);
    ctx.stroke();

}

//----------------------------------------------------

function drawBlock(){

    ctx.fillStyle="#3b82f6";

    ctx.fillRect(

        block.x,
        block.y-block.size/2,
        block.size,
        block.size

    );

    if(running){

        const arrowLength =
        Number(forceSlider.value)*1.5;

        ctx.strokeStyle="#facc15";
        ctx.lineWidth=3;

        ctx.beginPath();

        ctx.moveTo(
            block.x+block.size,
            block.y
        );

        ctx.lineTo(
            block.x+block.size+arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x+block.size+arrowLength-10,
            block.y-6
        );

        ctx.moveTo(
            block.x+block.size+arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x+block.size+arrowLength-10,
            block.y+6
        );

        ctx.stroke();

    }

}

//----------------------------------------------------
// Force-Time Graph
//----------------------------------------------------

function drawGraph(){

    const left = 80;
    const bottom = 460;

    const width = 720;

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(left,280);
    ctx.lineTo(left,bottom);
    ctx.lineTo(left+width,bottom);
    ctx.stroke();

    ctx.fillStyle="white";
    ctx.font="16px Arial";

    ctx.fillText("Force",20,300);
    ctx.fillText("Time",left+width-20,bottom+25);

    const graphHeight =
        (Number(forceSlider.value)/100)*140;

    const totalWidth =
        (Number(timeSlider.value)/5)*width;

    const currentWidth =
        Math.min(
            elapsed/Number(timeSlider.value),
            1
        )*totalWidth;

    ctx.fillStyle="rgba(96,165,250,.45)";

    ctx.fillRect(

        left,
        bottom-graphHeight,

        currentWidth,

        graphHeight

    );

    ctx.strokeStyle="#60a5fa";

    ctx.strokeRect(

        left,

        bottom-graphHeight,

        totalWidth,

        graphHeight

    );

    ctx.fillStyle="#60a5fa";

    ctx.fillText(

        "Impulse",

        left+totalWidth/2-28,

        bottom-graphHeight-10

    );

}

//----------------------------------------------------

function updateDisplays(){

    const F=Number(forceSlider.value);
    const t=Number(timeSlider.value);
    const m=Number(massSlider.value);

    const impulse=F*t;

    const velocity=impulse/m;

    const momentum=m*velocity;

    forceValue.textContent=F.toFixed(0)+" N";
    timeValue.textContent=t.toFixed(1)+" s";
    massValue.textContent=m.toFixed(1)+" kg";

    impulseDisplay.innerHTML=
        `${impulse.toFixed(2)} N·s`;

    deltaMomentumDisplay.innerHTML=
        `${impulse.toFixed(2)} kg·m/s`;

    velocityDisplay.innerHTML=
        `${velocity.toFixed(2)} m/s`;

    momentumDisplay.innerHTML=
        `${momentum.toFixed(2)} kg·m/s`;

    calculusDisplay.innerHTML=`
        <strong>J = ∫F dt</strong>
        <br><br>
        The shaded area under the graph equals the change in momentum.
        <br><br>
        <strong>J = Δp</strong>
    `;

    explanationDisplay.innerHTML=`
        Apply a force for a certain amount of time.
        <br><br>
        Increasing either the force or the duration increases the impulse and therefore the object's momentum.
    `;

    drawScene();

}

forceSlider.oninput=updateDisplays;
timeSlider.oninput=updateDisplays;
massSlider.oninput=updateDisplays;

updateDisplays();
//----------------------------------------------------
// Animation
//----------------------------------------------------

function animate(){

    if(!running) return;

    const F = Number(forceSlider.value);
    const T = Number(timeSlider.value);
    const M = Number(massSlider.value);

    const dt = 0.02;

    elapsed += dt;

    //------------------------------------------------
    // Apply force only while it is active
    //------------------------------------------------

    if(elapsed <= T){

        const acceleration = F / M;

        block.velocity += acceleration * dt;

    }

    //------------------------------------------------
    // Continue moving after the force ends
    //------------------------------------------------

    block.x += block.velocity;

    //------------------------------------------------
    // Stop after leaving the screen
    //------------------------------------------------

    if(block.x > canvas.width + block.size){

        running = false;

    }

    drawScene();

    requestAnimationFrame(animate);

}

//----------------------------------------------------
// Start Button
//----------------------------------------------------

startButton.onclick = function(){

    resetSimulation();

    running = true;

    animate();

};

//----------------------------------------------------
// Live Updating Values
//----------------------------------------------------

setInterval(function(){

    const m = Number(massSlider.value);

    const momentum = m * block.velocity;

    impulseDisplay.innerHTML =
        `${(Number(forceSlider.value) * Number(timeSlider.value)).toFixed(2)} N·s`;

    deltaMomentumDisplay.innerHTML =
        `${momentum.toFixed(2)} kg·m/s`;

    velocityDisplay.innerHTML =
        `${block.velocity.toFixed(2)} m/s`;

    momentumDisplay.innerHTML =
        `${momentum.toFixed(2)} kg·m/s`;

},30);
