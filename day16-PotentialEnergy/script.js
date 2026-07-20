const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const heightSlider = document.getElementById("height");
const massSlider = document.getElementById("mass");

const heightValue = document.getElementById("heightValue");
const massValue = document.getElementById("massValue");

const potentialEnergyData = document.getElementById("potentialEnergy");
const slopeData = document.getElementById("slope");
const forceData = document.getElementById("force");
const calculusData = document.getElementById("calculus");
const explanation = document.getElementById("explanation");

const g = 9.8;

//------------------------------------------------------------

function drawScene() {

    ctx.clearRect(0,0,700,500);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,700,500);

    const h = Number(heightSlider.value);
    const m = Number(massSlider.value);

    //--------------------------------------------------------
    // Elevator
    //--------------------------------------------------------

    const baseX = 130;
    const baseY = 420;
    const shaftHeight = 320;

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(baseX,baseY);
    ctx.lineTo(baseX,baseY-shaftHeight);
    ctx.stroke();

    const y = baseY-(h/10)*shaftHeight;

    ctx.beginPath();
    ctx.fillStyle="#22c55e";
    ctx.arc(baseX,y,14,0,Math.PI*2);
    ctx.fill();

    ctx.setLineDash([6,6]);

    ctx.strokeStyle="#facc15";

    ctx.beginPath();
    ctx.moveTo(baseX,y);
    ctx.lineTo(70,y);
    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle="white";
    ctx.font="16px Arial";

    ctx.fillText("Height",35,90);
    ctx.fillText(h.toFixed(1)+" m",25,y-10);

    //--------------------------------------------------------
// Graph
//--------------------------------------------------------

const graphX = 350;
const graphY = 420;

const graphWidth = 280;
const graphHeight = 300;

// Axes

ctx.strokeStyle = "white";
ctx.lineWidth = 2;

ctx.beginPath();

// Y-axis
ctx.moveTo(graphX, graphY);
ctx.lineTo(graphX, graphY - graphHeight);

// X-axis
ctx.moveTo(graphX, graphY);
ctx.lineTo(graphX + graphWidth, graphY);

ctx.stroke();

// Labels

ctx.fillStyle = "white";
ctx.font = "16px Arial";

ctx.fillText("U (J)", graphX - 35, graphY - graphHeight + 20);
ctx.fillText("Height (m)", graphX + 170, graphY + 30);

// Graph line

const maxU = 500;

ctx.strokeStyle = "#3b82f6";
ctx.lineWidth = 3;

ctx.beginPath();

for (let height = 0; height <= 10; height += 0.1) {

    const U = m * g * height;

    const gx = graphX + (height / 10) * graphWidth;
    const gy = graphY - (U / maxU) * graphHeight;

    if (height === 0)
        ctx.moveTo(gx, gy);
    else
        ctx.lineTo(gx, gy);

}

ctx.stroke();

// Current point

const U = m * g * h;

const px = graphX + (h / 10) * graphWidth;
const py = graphY - (U / maxU) * graphHeight;

ctx.beginPath();
ctx.fillStyle = "#ef4444";
ctx.arc(px, py, 7, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Potential Energy", 410, 40);

}

//------------------------------------------------------------

function update(){

    const h=Number(heightSlider.value);
    const m=Number(massSlider.value);

    const U=m*g*h;

    const slope=m*g;

    const force=-slope;

    heightValue.textContent=h.toFixed(1)+" m";
    massValue.textContent=m.toFixed(1)+" kg";

    potentialEnergyData.innerHTML=
    `<strong>${U.toFixed(2)} J</strong>`;

    slopeData.innerHTML=
    `<strong>${slope.toFixed(2)} J/m</strong>`;

    forceData.innerHTML=
    `<strong>${force.toFixed(2)} N</strong>`;

    calculusData.innerHTML=
    `
    U(h)=mgh

    <br><br>

    dU/dh = ${slope.toFixed(2)}

    <br><br>

    F=-dU/dh

    <br><br>

    = ${force.toFixed(2)} N
    `;

    explanation.innerHTML=
    `
    Potential energy increases linearly with height.

    <br><br>

    The graph of
    <strong>U=mgh</strong>
    is a straight line.

    <br><br>

    Its slope is

    <br><br>

    <strong>dU/dh=mg</strong>

    <br><br>

    Gravity acts in the direction of decreasing potential energy.

    <br><br>

    Therefore,

    <strong>F=-dU/dh</strong>.
    `;

    drawScene();

}

heightSlider.addEventListener("input",update);
massSlider.addEventListener("input",update);

update();
