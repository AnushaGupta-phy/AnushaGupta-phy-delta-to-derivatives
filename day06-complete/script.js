const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");
const playButton = document.getElementById("playButton");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const positionData = document.getElementById("positionData");
const velocityData = document.getElementById("velocityData");
const accelerationData = document.getElementById("accelerationData");
const relationshipData = document.getElementById("relationshipData");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

// =====================================
// Functions
// =====================================

function position(t){
    return 0.1*t*t;
}

function velocity(t){
    return 0.2*t;
}

function acceleration(t){
    return 0.2;
}

// =====================================
// Draw
// =====================================

function draw(){

    const t = Number(timeSlider.value);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // =========================
    // Track
    // =========================

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(50,40);
    ctx.lineTo(650,40);
    ctx.stroke();

    const carX=50+(position(t)/10)*600;

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(carX-12,25,24,15);

    // ==================================================
    // POSITION GRAPH
    // ==================================================

    let gx=60;
    let gy=240;

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Position vs Time",230,70);

    ctx.font="14px Arial";
    ctx.fillText("Position",5,130);
    ctx.fillText("Time",610,235);

    ctx.fillStyle="#f59e0b";
    ctx.fillText("x(t)=0.1t²",470,90);

    ctx.strokeStyle="white";

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(gx,90);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(640,gy);
    ctx.stroke();

    ctx.strokeStyle="#f59e0b";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let i=0;i<=100;i++){

        let tt=i/10;

        let x=gx+(tt/10)*560;
        let y=gy-position(tt)*14;

        if(i===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        gx+(t/10)*560,
        gy-position(t)*14,
        5,
        0,
        Math.PI*2
    );
    ctx.fillStyle="#ef4444";
    ctx.fill();

    // ==================================================
    // VELOCITY GRAPH
    // ==================================================

    gy=460;

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Velocity vs Time",230,285);

    ctx.font="14px Arial";
    ctx.fillText("Velocity",5,350);
    ctx.fillText("Time",610,455);

    ctx.fillStyle="#60a5fa";
    ctx.fillText("v(t)=0.2t",475,305);

    ctx.strokeStyle="white";

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(gx,310);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(640,gy);
    ctx.stroke();

    ctx.strokeStyle="#60a5fa";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let i=0;i<=100;i++){

        let tt=i/10;

        let x=gx+(tt/10)*560;
        let y=gy-velocity(tt)*60;

        if(i===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        gx+(t/10)*560,
        gy-velocity(t)*60,
        5,
        0,
        Math.PI*2
    );
    ctx.fillStyle="#22c55e";
    ctx.fill();

    // ==================================================
    // ACCELERATION GRAPH
    // ==================================================

    gy=680;

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Acceleration vs Time",205,505);

    ctx.font="14px Arial";
    ctx.fillText("Acceleration",5,570);
    ctx.fillText("Time",610,675);

    ctx.fillStyle="#f87171";
    ctx.fillText("a(t)=0.2",475,525);

    ctx.strokeStyle="white";

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(gx,530);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(640,gy);
    ctx.stroke();

    ctx.strokeStyle="#ef4444";
    ctx.lineWidth=3;

    ctx.beginPath();

    ctx.moveTo(gx,680-0.2*120);
    ctx.lineTo(640,680-0.2*120);

    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        gx+(t/10)*560,
        680-0.2*120,
        5,
        0,
        Math.PI*2
    );

    ctx.fillStyle="#ef4444";
    ctx.fill();

}

// =====================================
// Update
// =====================================

function update(){

    const t=Number(timeSlider.value);

    draw();

    timeValue.textContent=t.toFixed(1)+" s";

    timeData.innerHTML=
    "<strong>"+t.toFixed(1)+" s</strong>";

    positionData.innerHTML=
    "x(t)=0.1t²<br><strong>"+position(t).toFixed(2)+" m</strong>";

    velocityData.innerHTML=
    "v(t)=0.2t<br><strong>"+velocity(t).toFixed(2)+" m/s</strong>";

    accelerationData.innerHTML=
    "a(t)=0.2<br><strong>"+acceleration(t).toFixed(2)+" m/s²</strong>";

    relationshipData.innerHTML=
    `
    dx/dt = v(t)

    <br><br>

    dv/dt = a(t)

    <br><br>

    ∫a(t)dt = v(t)

    <br><br>

    ∫v(t)dt = x(t)
    `;

    explanation.innerHTML=
    `
    This dashboard combines everything from the past week.

    <br><br>

    The top graph shows position.

    <br><br>

    The middle graph shows velocity, which is the derivative of position.

    <br><br>

    The bottom graph shows acceleration, which is the derivative of velocity.

    <br><br>

    Every graph describes the same motion from a different perspective.
    `;

}

timeSlider.addEventListener("input",update);

playButton.addEventListener("click",()=>{

    if(!playing){

        playing=true;
        playButton.textContent="⏸ Pause";

        animation=setInterval(()=>{

            let t=parseFloat(timeSlider.value);

            t+=0.05;

            if(t>10)
                t=0;

            timeSlider.value=t.toFixed(1);

            update();

        },30);

    }else{

        playing=false;
        playButton.textContent="▶ Play";

        clearInterval(animation);

    }

});

update();
