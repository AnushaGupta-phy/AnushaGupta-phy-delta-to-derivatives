const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const speedSlider = document.getElementById("speed");
const angleSlider = document.getElementById("angle");
const playButton = document.getElementById("playButton");

const speedValue = document.getElementById("speedValue");
const angleValue = document.getElementById("angleValue");

const vxData = document.getElementById("vxData");
const vyData = document.getElementById("vyData");
const heightData = document.getElementById("heightData");
const rangeData = document.getElementById("rangeData");
const explanation = document.getElementById("explanation");

const g = 9.8;

let t = 0;
let playing = false;
let animation;

// =====================================
// Draw Scene
// =====================================

function draw() {

    const speed = Number(speedSlider.value);
    const angle = Number(angleSlider.value) * Math.PI / 180;

    const vx = speed * Math.cos(angle);
    const vy = speed * Math.sin(angle);

    const x = vx * t;
    const y = vy * t - 0.5 * g * t * t;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,700,500);

    // Ground

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(40,440);
    ctx.lineTo(680,440);
    ctx.stroke();

    // Title

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Projectile Motion",250,35);

    // Trajectory

    ctx.strokeStyle="#60a5fa";
    ctx.lineWidth=3;

    ctx.beginPath();

    let first=true;

    for(let tt=0;tt<=t;tt+=0.05){

        let px=vx*tt;
        let py=vy*tt-0.5*g*tt*tt;

        if(py<0) break;

        let drawX=60+px*8;
        let drawY=440-py*8;

        if(first){
            ctx.moveTo(drawX,drawY);
            first=false;
        }else{
            ctx.lineTo(drawX,drawY);
        }

    }

    ctx.stroke();

    // Projectile

    if(y>=0){

        ctx.beginPath();

        ctx.arc(
            60+x*8,
            440-y*8,
            6,
            0,
            Math.PI*2
        );

        ctx.fillStyle="#ef4444";
        ctx.fill();

    }

}

// =====================================
// Update
// =====================================

function update(){

    const speed=Number(speedSlider.value);
    const angleDeg=Number(angleSlider.value);
    const angle=angleDeg*Math.PI/180;

    const vx=speed*Math.cos(angle);
    const vy=speed*Math.sin(angle);

    const maxHeight=(vy*vy)/(2*g);
    const range=(speed*speed*Math.sin(2*angle))/g;

    speedValue.textContent=speed+" m/s";
    angleValue.textContent=angleDeg+"°";

    vxData.innerHTML=
    "<strong>"+vx.toFixed(2)+" m/s</strong>";

    vyData.innerHTML=
    "<strong>"+vy.toFixed(2)+" m/s</strong>";

    heightData.innerHTML=
    "<strong>"+maxHeight.toFixed(2)+" m</strong>";

    rangeData.innerHTML=
    "<strong>"+range.toFixed(2)+" m</strong>";

    explanation.innerHTML=
    `
    The projectile's motion is made from two independent components.

    <br><br>

    Horizontal motion has constant velocity.

    <br><br>

    Vertical motion accelerates downward because of gravity.

    <br><br>

    Together they produce the curved trajectory shown on the screen.
    `;

    draw();

}

// =====================================
// Controls
// =====================================

speedSlider.addEventListener("input",update);
angleSlider.addEventListener("input",update);

playButton.addEventListener("click",()=>{

    if(!playing){

        playing=true;
        playButton.textContent="⏸ Pause";

        t=0;

        animation=setInterval(()=>{

            t+=0.05;

            const speed=Number(speedSlider.value);
            const angle=Number(angleSlider.value)*Math.PI/180;

            const vy=speed*Math.sin(angle);

            const y=vy*t-0.5*g*t*t;

            if(y<0){

                clearInterval(animation);

                playing=false;
                playButton.textContent="▶ Launch";

                return;

            }

            draw();

        },30);

    }else{

        clearInterval(animation);

        playing=false;
        playButton.textContent="▶ Launch";

    }

});

update();
