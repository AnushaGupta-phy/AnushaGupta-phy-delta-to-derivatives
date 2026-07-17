const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const forceSlider = document.getElementById("force");
const mass1Slider = document.getElementById("mass1");
const mass2Slider = document.getElementById("mass2");

const forceValue = document.getElementById("forceValue");
const mass1Value = document.getElementById("mass1Value");
const mass2Value = document.getElementById("mass2Value");

const playButton = document.getElementById("playButton");

const leftAcceleration = document.getElementById("leftAcceleration");
const rightAcceleration = document.getElementById("rightAcceleration");
const leftVelocity = document.getElementById("leftVelocity");
const rightVelocity = document.getElementById("rightVelocity");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let x1 = 260;
let x2 = 390;

let v1 = 0;
let v2 = 0;

//---------------------------------------------------------

function resetSimulation(){

    x1 = 260;
    x2 = 390;

    v1 = 0;
    v2 = 0;

}

//---------------------------------------------------------

function drawScene(){

    ctx.clearRect(0,0,700,500);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,700,500);

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.moveTo(40,360);
    ctx.lineTo(660,360);
    ctx.stroke();

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(x1,320,50,40);

    ctx.fillStyle="#ef4444";
    ctx.fillRect(x2,320,50,40);

    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText("Newton's Third Law",225,40);

}

//---------------------------------------------------------

function updateInfo(){

    const F = Number(forceSlider.value);

    const m1 = Number(mass1Slider.value);
    const m2 = Number(mass2Slider.value);

    const a1 = F/m1;
    const a2 = -F/m2;

    forceValue.textContent = `${F} N`;
    mass1Value.textContent = `${m1.toFixed(1)} kg`;
    mass2Value.textContent = `${m2.toFixed(1)} kg`;

    leftAcceleration.innerHTML =
        `<strong>${a1.toFixed(2)} m/s²</strong><br><em>dv₁/dt</em>`;

    rightAcceleration.innerHTML =
        `<strong>${a2.toFixed(2)} m/s²</strong><br><em>dv₂/dt</em>`;

    leftVelocity.innerHTML =
        `<strong>${v1.toFixed(2)} m/s</strong>`;

    rightVelocity.innerHTML =
        `<strong>${v2.toFixed(2)} m/s</strong>`;

    calculusView.innerHTML = `
    Left Object

    <br><br>

    <strong>F = ${F.toFixed(1)} N</strong>

    <br>

    ↓

    <br>

    <strong>dv₁/dt = ${(a1).toFixed(2)}</strong>

    <br><br>

    Right Object

    <br><br>

    <strong>F = ${(-F).toFixed(1)} N</strong>

    <br>

    ↓

    <br>

    <strong>dv₂/dt = ${(a2).toFixed(2)}</strong>
    `;

    explanation.innerHTML=`
    Newton's Third Law says every force has an equal and opposite partner.

    <br><br>

    The two forces are equal in magnitude, but they act on different objects.

    <br><br>

    Since

    <strong>F = ma</strong>

    and

    <strong>a = dv/dt</strong>,

    each object has its own rate of change of velocity.

    <br><br>

    The lighter skater experiences a larger acceleration because the same force
    is divided by a smaller mass.
    `;

    drawScene();

}

//---------------------------------------------------------

forceSlider.addEventListener("input",updateInfo);
mass1Slider.addEventListener("input",updateInfo);
mass2Slider.addEventListener("input",updateInfo);

//---------------------------------------------------------

playButton.addEventListener("click",()=>{

    if(!playing){

        playing=true;
        playButton.textContent="⏸ Pause";

        resetSimulation();

        animation=setInterval(()=>{

            const F=Number(forceSlider.value);

            const m1=Number(mass1Slider.value);
            const m2=Number(mass2Slider.value);

            const a1=F/m1;
            const a2=-F/m2;

            v1-=a1*0.05;
            v2-=a2*0.05;

            x1+=v1*0.05*15;
            x2+=v2*0.05*15;

            updateInfo();

        },30);

    }

    else{

        playing=false;
        playButton.textContent="▶ Push Apart";

        clearInterval(animation);

    }

});

resetSimulation();
updateInfo();
