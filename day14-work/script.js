const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const distanceSlider = document.getElementById("distance");

const distanceValue = document.getElementById("distanceValue");

const distanceData = document.getElementById("distanceData");
const forceData = document.getElementById("forceData");
const averageForceData = document.getElementById("averageForce");
const workData = document.getElementById("workData");
const explanation = document.getElementById("explanation");

//----------------------------------------------------
// Force Function
//----------------------------------------------------

function force(x){

    return 2 + 0.15 * x * x;

}

//----------------------------------------------------
// Numerical Integration (Trapezoidal Rule)
//----------------------------------------------------

function work(distance){

    let area = 0;
    const dx = 0.05;

    for(let x=0;x<distance;x+=dx){

        area += (force(x)+force(x+dx))/2 * dx;

    }

    return area;

}

//----------------------------------------------------
// Draw Scene
//----------------------------------------------------

function drawScene(d){

    ctx.clearRect(0,0,700,500);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,700,500);

    const gx = 80;
    const gy = 430;
    const width = 560;
    const height = 300;

    //----------------------------------------
    // Axes
    //----------------------------------------

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(gx,gy-height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(gx+width,gy);
    ctx.stroke();

    //----------------------------------------
    // Labels
    //----------------------------------------

    ctx.fillStyle="white";
    ctx.font="16px Arial";

    ctx.fillText("Force (N)",10,170);
    ctx.fillText("Distance (m)",560,460);
    ctx.fillText("F(x) = 2 + 0.5x",470,80);

    //----------------------------------------
    // Shade Area
    //----------------------------------------

    ctx.fillStyle="rgba(34,197,94,0.35)";

    ctx.beginPath();

    ctx.moveTo(gx,gy);

    for(let x=0;x<=d;x+=0.05){

        const px = gx + x/10*width;
        const py = gy - force(x)/8*height;

        ctx.lineTo(px,py);

    }

    ctx.lineTo(gx+d/10*width,gy);
    ctx.closePath();
    ctx.fill();

    //----------------------------------------
    // Graph
    //----------------------------------------

    ctx.strokeStyle="#60a5fa";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let x=0;x<=10;x+=0.05){

        const px = gx + x/10*width;
        const py = gy - force(x)/8*height;

        if(x===0){

            ctx.moveTo(px,py);

        }

        else{

            ctx.lineTo(px,py);

        }

    }

    ctx.stroke();

    //----------------------------------------
    // Moving Point
    //----------------------------------------

    const pointX = gx + d/10*width;
    const pointY = gy - force(d)/8*height;

    ctx.beginPath();
    ctx.fillStyle="#22c55e";
    ctx.arc(pointX,pointY,6,0,Math.PI*2);
    ctx.fill();

}

//----------------------------------------------------
// Update
//----------------------------------------------------

function update(){

    const d = Number(distanceSlider.value);

    const F = force(d);
    const W = work(d);
    const avg = d===0 ? 0 : W/d;

    distanceValue.textContent = d.toFixed(1)+" m";

    distanceData.innerHTML =
        `<strong>${d.toFixed(2)} m</strong>`;

    forceData.innerHTML =
        `<strong>${F.toFixed(2)} N</strong>`;

    averageForceData.innerHTML =
        `<strong>${avg.toFixed(2)} N</strong>`;

    workData.innerHTML =
        `<strong>${W.toFixed(2)} J</strong>`;

    explanation.innerHTML=`

        The force is no longer constant.

        <br><br>

        Instead it changes with position:

        <br><br>

        <strong>F(x)=2+0.5x</strong>

        <br><br>

        Every tiny movement contributes a tiny amount of work

        <br><br>

        <strong>dW = F(x)dx</strong>

        <br><br>

        Adding all of those tiny pieces gives

        <br><br>

        <strong>W = ∫F(x)dx</strong>

        <br><br>

        The shaded region under the graph is the total work done on the object.

    `;

    drawScene(d);

}

//----------------------------------------------------
// Controls
//----------------------------------------------------

distanceSlider.addEventListener("input",update);

update();
