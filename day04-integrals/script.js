const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timeSlider = document.getElementById("time");
const playButton = document.getElementById("playButton");

const timeValue = document.getElementById("timeValue");
const timeData = document.getElementById("timeData");
const velocityData = document.getElementById("velocityData");
const positionData = document.getElementById("positionData");
const integralData = document.getElementById("integralData");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

// Physics

function velocity(t){
    return 0.2 * t;
}

function position(t){
    return 0.1 * t * t;
}

function draw(){

    const t = Number(timeSlider.value);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Background

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,700,500);

    // =====================
    // Car
    // =====================

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(650,50);
    ctx.stroke();

    const carX=50+(position(t)/10)*600;

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(carX-12,35,24,15);

    // =====================
    // Velocity Graph
    // =====================

    const gx=60;
    const gy=220;

    ctx.strokeStyle="white";

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(gx,80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx,gy);
    ctx.lineTo(640,gy);
    ctx.stroke();

    // Shade Area

    ctx.fillStyle="rgba(34,197,94,0.3)";

    ctx.beginPath();
    ctx.moveTo(gx,gy);

    for(let i=0;i<=t*10;i++){

        let tt=i/10;

        let x=gx+(tt/10)*560;
        let y=gy-velocity(tt)*60;

        ctx.lineTo(x,y);

    }

    ctx.lineTo(gx+(t/10)*560,gy);
    ctx.closePath();
    ctx.fill();

    // Velocity Line

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

    // =====================
    // Position Graph
    // =====================

    const py=470;

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(gx,py);
    ctx.lineTo(gx,300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(gx,py);
    ctx.lineTo(640,py);
    ctx.stroke();

    ctx.strokeStyle="#f59e0b";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let i=0;i<=100;i++){

        let tt=i/10;

        let x=gx+(tt/10)*560;
        let y=py-position(tt)*14;

        if(i===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

    // Moving Point

    ctx.beginPath();
    ctx.arc(
        gx+(t/10)*560,
        py-position(t)*14,
        5,
        0,
        Math.PI*2
    );

    ctx.fillStyle="#ef4444";
    ctx.fill();

}

function update(){

    const t=Number(timeSlider.value);

    draw();

    timeValue.textContent=t.toFixed(1)+" s";

    timeData.innerHTML=t.toFixed(1)+" s";

    velocityData.innerHTML=
    "v(t)=0.2t<br><strong>"+velocity(t).toFixed(2)+" m/s</strong>";

    positionData.innerHTML=
    "<strong>"+position(t).toFixed(2)+" m</strong>";

    integralData.innerHTML=
    "∫v(t)dt = <strong>"+position(t).toFixed(2)+" m</strong>";

    explanation.innerHTML=
    "The blue graph shows velocity.<br><br>"+
    "The green shaded area under the graph represents displacement.<br><br>"+
    "The orange graph below shows the object's position.<br><br>"+
    "<strong>Area under velocity = Change in position.</strong>";

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
