const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");
const speedSlider = document.getElementById("speed");
const playButton = document.getElementById("playButton");

const timeValue = document.getElementById("timeValue");
const speedValue = document.getElementById("speedValue");

const timeData = document.getElementById("timeData");
const positionData = document.getElementById("positionData");
const velocityData = document.getElementById("velocityData");
const explanation = document.getElementById("explanation");

let playing = false;
let timer;

// Position function
function position(t) {
    return 0.1 * t * t;
}

// Velocity (derivative)
function velocity(t) {
    return 0.2 * t;
}

function drawScene(t) {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Background
    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //----------------------------------
    // Track
    //----------------------------------

    const startX=60;
    const endX=640;
    const trackY=110;

    ctx.strokeStyle="#9ca3af";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(startX,trackY);
    ctx.lineTo(endX,trackY);
    ctx.stroke();

    // Tick marks

    ctx.fillStyle="white";
    ctx.font="14px Arial";

    for(let i=0;i<=10;i++){

        const x=startX+(endX-startX)*(i/10);

        ctx.beginPath();
        ctx.moveTo(x,trackY-8);
        ctx.lineTo(x,trackY+8);
        ctx.stroke();

        ctx.fillText(i,x-3,trackY+28);

    }

    //----------------------------------
    // Car
    //----------------------------------

    const pos=position(t);

    const carX=startX+(endX-startX)*(pos/10);

    ctx.font="34px Arial";
    ctx.fillText("🚗",carX-15,trackY-18);

    //----------------------------------
    // Graph
    //----------------------------------

    const graphX=70;
    const graphY=430;
    const graphW=560;
    const graphH=220;

    // Axes

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(graphX,graphY);
    ctx.lineTo(graphX,graphY-graphH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(graphX,graphY);
    ctx.lineTo(graphX+graphW,graphY);
    ctx.stroke();

    ctx.fillStyle="white";
    ctx.fillText("Position",10,220);
    ctx.fillText("Time",620,450);

    // Curve

    ctx.strokeStyle="#60a5fa";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let x=0;x<=100;x++){

        const tt=x/10;
        const yy=position(tt);

        const px=graphX+tt/10*graphW;
        const py=graphY-yy/10*graphH;

        if(x===0){
            ctx.moveTo(px,py);
        }else{
            ctx.lineTo(px,py);
        }

    }

    ctx.stroke();

    // Current point

    const px=graphX+t/10*graphW;
    const py=graphY-position(t)/10*graphH;

    ctx.beginPath();
    ctx.fillStyle="#22c55e";
    ctx.arc(px,py,6,0,Math.PI*2);
    ctx.fill();

}

function update(){

    const t=Number(timeSlider.value);

    timeValue.textContent=t.toFixed(1)+" s";
    speedValue.textContent=speedSlider.value+"×";

    drawScene(t);

    const pos=position(t);
    const vel=velocity(t);

    timeData.innerHTML=t.toFixed(1)+" s";

    positionData.innerHTML=
    pos.toFixed(2)+" m";

    velocityData.innerHTML=
    vel.toFixed(2)+" m/s";

    explanation.innerHTML=
    `
    The object's position follows the function

    <br><br>

    <strong>x(t)=0.1t²</strong>

    <br><br>

    As time increases, the graph becomes steeper.

    <br><br>

    The slope of the position graph is the velocity.

    <br><br>

    At <strong>${t.toFixed(1)} s</strong>,
    the velocity is
    <strong>${vel.toFixed(2)} m/s</strong>.
    `;

}

playButton.addEventListener("click",()=>{

    if(!playing){

        playing=true;
        playButton.textContent="⏸ Pause";

        timer=setInterval(()=>{

            let t=Number(timeSlider.value);

            t+=0.05*Number(speedSlider.value);

            if(t>10)t=0;

            timeSlider.value=t;

            update();

        },30);

    }else{

        playing=false;
        playButton.textContent="▶ Play";

        clearInterval(timer);

    }

});

timeSlider.addEventListener("input",update);
speedSlider.addEventListener("input",update);

update();
