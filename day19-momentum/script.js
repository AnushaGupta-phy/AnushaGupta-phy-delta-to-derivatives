const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const massA = document.getElementById("massA");
const velocityA = document.getElementById("velocityA");
const massB = document.getElementById("massB");
const velocityB = document.getElementById("velocityB");
const collisionType = document.getElementById("collisionType");
const startButton = document.getElementById("startButton");

const massAValue = document.getElementById("massAValue");
const velocityAValue = document.getElementById("velocityAValue");
const massBValue = document.getElementById("massBValue");
const velocityBValue = document.getElementById("velocityBValue");

const momentumA = document.getElementById("momentumA");
const momentumB = document.getElementById("momentumB");
const totalMomentum = document.getElementById("totalMomentum");
const kineticEnergy = document.getElementById("kineticEnergy");
const afterCollision = document.getElementById("afterCollision");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

let blockA;
let blockB;

let running = false;
let collided = false;

//----------------------------------------------------

function resetSimulation(){

    blockA={
        x:170,
        y:250,
        mass:Number(massA.value),
        velocity:Number(velocityA.value),
        color:"#3b82f6"
    };

    blockB={
        x:730,
        y:250,
        mass:Number(massB.value),
        velocity:Number(velocityB.value),
        color:"#22c55e"
    };

    collided=false;

    updateNumbers();

}

resetSimulation();

//----------------------------------------------------

function drawTrack(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="#94a3b8";
    ctx.lineWidth=8;

    ctx.beginPath();
    ctx.moveTo(80,280);
    ctx.lineTo(820,280);
    ctx.stroke();

}

//----------------------------------------------------

function drawBlock(block){

    const size=30+block.mass*4;

    ctx.fillStyle=block.color;

    ctx.fillRect(

        block.x-size/2,
        block.y-size/2,
        size,
        size

    );

    ctx.fillStyle="white";

    ctx.font="15px Arial";

    ctx.textAlign="center";

    ctx.fillText(

        block.mass.toFixed(1)+" kg",

        block.x,

        block.y-30

    );

    //------------------------------------------------
    // Velocity Arrow
    //------------------------------------------------

    const arrowLength=Math.abs(block.velocity)*10;

    ctx.strokeStyle="#facc15";
    ctx.lineWidth=3;

    ctx.beginPath();

    ctx.moveTo(block.x,block.y);

    if(block.velocity>=0){

        ctx.lineTo(
            block.x+arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x+arrowLength-8,
            block.y-5
        );

        ctx.moveTo(
            block.x+arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x+arrowLength-8,
            block.y+5
        );

    }

    else{

        ctx.lineTo(
            block.x-arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x-arrowLength+8,
            block.y-5
        );

        ctx.moveTo(
            block.x-arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x-arrowLength+8,
            block.y+5
        );

    }

    ctx.stroke();

}

//----------------------------------------------------

function draw(){

    drawTrack();

    drawBlock(blockA);
    drawBlock(blockB);

}

//----------------------------------------------------

function updateNumbers(){

    blockA.mass=Number(massA.value);
    blockB.mass=Number(massB.value);

    blockA.velocity=Number(velocityA.value);
    blockB.velocity=Number(velocityB.value);

    massAValue.textContent=
        blockA.mass.toFixed(1)+" kg";

    massBValue.textContent=
        blockB.mass.toFixed(1)+" kg";

    velocityAValue.textContent=
        blockA.velocity.toFixed(1)+" m/s";

    velocityBValue.textContent=
        blockB.velocity.toFixed(1)+" m/s";

    const pA=blockA.mass*blockA.velocity;
    const pB=blockB.mass*blockB.velocity;

    const keA=0.5*blockA.mass*blockA.velocity**2;
    const keB=0.5*blockB.mass*blockB.velocity**2;

    momentumA.innerHTML=
        `${pA.toFixed(2)} kg·m/s`;

    momentumB.innerHTML=
        `${pB.toFixed(2)} kg·m/s`;

    totalMomentum.innerHTML=
        `${(pA+pB).toFixed(2)} kg·m/s`;

    kineticEnergy.innerHTML=
        `${(keA+keB).toFixed(2)} J`;

    calculusView.innerHTML=

    `
    <strong>p = mv</strong>

    <br><br>

    Tomorrow we'll connect momentum
    to force through

    <br><br>

    <strong>F = dp/dt</strong>
    `;

    explanation.innerHTML=

    `
    Select a collision type,
    then press Start to see
    what quantities remain
    conserved.
    `;

    draw();

}

massA.oninput=updateNumbers;
massB.oninput=updateNumbers;
velocityA.oninput=updateNumbers;
velocityB.oninput=updateNumbers;
collisionType.onchange=updateNumbers;

updateNumbers();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const massA = document.getElementById("massA");
const velocityA = document.getElementById("velocityA");
const massB = document.getElementById("massB");
const velocityB = document.getElementById("velocityB");
const collisionType = document.getElementById("collisionType");
const startButton = document.getElementById("startButton");

const massAValue = document.getElementById("massAValue");
const velocityAValue = document.getElementById("velocityAValue");
const massBValue = document.getElementById("massBValue");
const velocityBValue = document.getElementById("velocityBValue");

const momentumA = document.getElementById("momentumA");
const momentumB = document.getElementById("momentumB");
const totalMomentum = document.getElementById("totalMomentum");
const kineticEnergy = document.getElementById("kineticEnergy");
const afterCollision = document.getElementById("afterCollision");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

let blockA;
let blockB;

let running = false;
let collided = false;

//----------------------------------------------------

function resetSimulation(){

    blockA={
        x:170,
        y:250,
        mass:Number(massA.value),
        velocity:Number(velocityA.value),
        color:"#3b82f6"
    };

    blockB={
        x:730,
        y:250,
        mass:Number(massB.value),
        velocity:Number(velocityB.value),
        color:"#22c55e"
    };

    collided=false;

    updateNumbers();

}

resetSimulation();

//----------------------------------------------------

function drawTrack(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle="#94a3b8";
    ctx.lineWidth=8;

    ctx.beginPath();
    ctx.moveTo(80,280);
    ctx.lineTo(820,280);
    ctx.stroke();

}

//----------------------------------------------------

function drawBlock(block){

    const size=30+block.mass*4;

    ctx.fillStyle=block.color;

    ctx.fillRect(

        block.x-size/2,
        block.y-size/2,
        size,
        size

    );

    ctx.fillStyle="white";

    ctx.font="15px Arial";

    ctx.textAlign="center";

    ctx.fillText(

        block.mass.toFixed(1)+" kg",

        block.x,

        block.y-30

    );

    //------------------------------------------------
    // Velocity Arrow
    //------------------------------------------------

    const arrowLength=Math.abs(block.velocity)*10;

    ctx.strokeStyle="#facc15";
    ctx.lineWidth=3;

    ctx.beginPath();

    ctx.moveTo(block.x,block.y);

    if(block.velocity>=0){

        ctx.lineTo(
            block.x+arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x+arrowLength-8,
            block.y-5
        );

        ctx.moveTo(
            block.x+arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x+arrowLength-8,
            block.y+5
        );

    }

    else{

        ctx.lineTo(
            block.x-arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x-arrowLength+8,
            block.y-5
        );

        ctx.moveTo(
            block.x-arrowLength,
            block.y
        );

        ctx.lineTo(
            block.x-arrowLength+8,
            block.y+5
        );

    }

    ctx.stroke();

}

//----------------------------------------------------

function draw(){

    drawTrack();

    drawBlock(blockA);
    drawBlock(blockB);

}

//----------------------------------------------------

function updateNumbers(){

    blockA.mass=Number(massA.value);
    blockB.mass=Number(massB.value);

    blockA.velocity=Number(velocityA.value);
    blockB.velocity=Number(velocityB.value);

    massAValue.textContent=
        blockA.mass.toFixed(1)+" kg";

    massBValue.textContent=
        blockB.mass.toFixed(1)+" kg";

    velocityAValue.textContent=
        blockA.velocity.toFixed(1)+" m/s";

    velocityBValue.textContent=
        blockB.velocity.toFixed(1)+" m/s";

    const pA=blockA.mass*blockA.velocity;
    const pB=blockB.mass*blockB.velocity;

    const keA=0.5*blockA.mass*blockA.velocity**2;
    const keB=0.5*blockB.mass*blockB.velocity**2;

    momentumA.innerHTML=
        `${pA.toFixed(2)} kg·m/s`;

    momentumB.innerHTML=
        `${pB.toFixed(2)} kg·m/s`;

    totalMomentum.innerHTML=
        `${(pA+pB).toFixed(2)} kg·m/s`;

    kineticEnergy.innerHTML=
        `${(keA+keB).toFixed(2)} J`;

    calculusView.innerHTML=

    `
    <strong>p = mv</strong>

    <br><br>

    Tomorrow we'll connect momentum
    to force through

    <br><br>

    <strong>F = dp/dt</strong>
    `;

    explanation.innerHTML=

    `
    Select a collision type,
    then press Start to see
    what quantities remain
    conserved.
    `;

    draw();

}

massA.oninput=updateNumbers;
massB.oninput=updateNumbers;
velocityA.oninput=updateNumbers;
velocityB.oninput=updateNumbers;
collisionType.onchange=updateNumbers;

updateNumbers();
