const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const mass1Slider = document.getElementById("mass1");
const mass2Slider = document.getElementById("mass2");

const position1Slider = document.getElementById("position1");
const position2Slider = document.getElementById("position2");

const resetButton = document.getElementById("resetButton");

const mass1Value = document.getElementById("mass1Value");
const mass2Value = document.getElementById("mass2Value");

const position1Value = document.getElementById("position1Value");
const position2Value = document.getElementById("position2Value");

const centerMassValue = document.getElementById("centerMassValue");
const equation = document.getElementById("equation");
const calculus = document.getElementById("calculus");

let block1;
let block2;
let centerX;

initialize();

//----------------------------------------------------

function initialize(){

    block1={

        mass:Number(mass1Slider.value),

        x:Number(position1Slider.value),

        color:"#3b82f6"

    };

    block2={

        mass:Number(mass2Slider.value),

        x:Number(position2Slider.value),

        color:"#22c55e"

    };

    updateSimulation();

}

//----------------------------------------------------

function updateSimulation(){

    block1.mass=Number(mass1Slider.value);
    block2.mass=Number(mass2Slider.value);

    block1.x=Number(position1Slider.value);
    block2.x=Number(position2Slider.value);

    centerX=

    (

        block1.mass*block1.x+

        block2.mass*block2.x

    )/

    (

        block1.mass+

        block2.mass

    );

    mass1Value.textContent=
        block1.mass.toFixed(1)+" kg";

    mass2Value.textContent=
        block2.mass.toFixed(1)+" kg";

    position1Value.textContent=
        block1.x.toFixed(0)+" px";

    position2Value.textContent=
        block2.x.toFixed(0)+" px";

    drawScene();

}

//----------------------------------------------------

function drawScene(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    drawBeam();

    drawSupport();

    drawBlocks();

    drawCenterMass();

}

//----------------------------------------------------

function drawBeam(){

    ctx.fillStyle="#94a3b8";

    ctx.fillRect(

        60,

        250,

        780,

        10

    );

}

//----------------------------------------------------

function drawSupport(){

    ctx.fillStyle="#facc15";

    ctx.beginPath();

    ctx.moveTo(centerX,250);

    ctx.lineTo(centerX-22,310);

    ctx.lineTo(centerX+22,310);

    ctx.closePath();

    ctx.fill();

}

//----------------------------------------------------

function drawBlocks(){

    drawBlock(block1);

    drawBlock(block2);

}

function drawBlock(block){

    const size=25+block.mass*5;

    ctx.fillStyle=block.color;

    ctx.fillRect(

        block.x-size/2,

        250-size,

        size,

        size

    );

    ctx.fillStyle="white";

    ctx.font="16px Arial";

    ctx.textAlign="center";

    ctx.fillText(

        block.mass.toFixed(1)+" kg",

        block.x,

        250-size-12

    );

}

//----------------------------------------------------

function drawCenterMass(){

    ctx.beginPath();

    ctx.arc(

        centerX,

        210,

        9,

        0,

        Math.PI*2

    );

    ctx.fillStyle="#ef4444";

    ctx.fill();

    ctx.fillStyle="white";

    ctx.font="15px Arial";

    ctx.fillText(

        "Center of Mass",

        centerX,

        190

    );

}

//----------------------------------------------------

mass1Slider.oninput=updateSimulation;
mass2Slider.oninput=updateSimulation;

position1Slider.oninput=updateSimulation;
position2Slider.oninput=updateSimulation;
//----------------------------------------------------
// Live Information
//----------------------------------------------------

function updateInformation(){

    centerMassValue.innerHTML =
        `${centerX.toFixed(1)} px`;

equation.innerHTML =

`
<strong>

x<sub>cm</sub> =
(m<sub>1</sub>x<sub>1</sub> + m<sub>2</sub>x<sub>2</sub>)
/
(m<sub>1</sub> + m<sub>2</sub>)

</strong>

<br><br>

=

<br>

<strong>

(${block1.mass.toFixed(1)} × ${block1.x.toFixed(0)}

+

${block2.mass.toFixed(1)} × ${block2.x.toFixed(0)})

/

(${(block1.mass + block2.mass).toFixed(1)})

</strong>

<br><br>

=

<br>

<strong>${centerX.toFixed(1)} px</strong>

`;

    calculus.innerHTML=

    `
    For two objects, the center of mass is
    a weighted average.

    <br><br>

    As the number of particles becomes
    infinitely large, the weighted sum
    becomes an integral:

    <br><br>

    <strong>

    x<sub>cm</sub>

    =

    ∫x dm

    /

    ∫dm

    </strong>

    <br><br>

    Calculus replaces a finite sum of masses
    with infinitely many tiny pieces of mass,
    allowing us to find the balance point of
    continuous objects such as rods, plates,
    and planets.

    `;

}

//----------------------------------------------------
// Animation
//----------------------------------------------------

function animate(){

    drawScene();

    requestAnimationFrame(animate);

}

//----------------------------------------------------
// Reset Button
//----------------------------------------------------

resetButton.onclick=function(){

    mass1Slider.value=5;
    mass2Slider.value=5;

    position1Slider.value=200;
    position2Slider.value=700;

    updateSimulation();

};

//----------------------------------------------------
// Override Update
//----------------------------------------------------

function updateSimulation(){

    block1.mass=Number(mass1Slider.value);
    block2.mass=Number(mass2Slider.value);

    block1.x=Number(position1Slider.value);
    block2.x=Number(position2Slider.value);

    centerX=

    (

        block1.mass*block1.x+

        block2.mass*block2.x

    )

    /

    (

        block1.mass+

        block2.mass

    );

    mass1Value.textContent=
        block1.mass.toFixed(1)+" kg";

    mass2Value.textContent=
        block2.mass.toFixed(1)+" kg";

    position1Value.textContent=
        block1.x.toFixed(0)+" px";

    position2Value.textContent=
        block2.x.toFixed(0)+" px";

    updateInformation();

    drawScene();

}

//----------------------------------------------------

updateSimulation();

animate();
