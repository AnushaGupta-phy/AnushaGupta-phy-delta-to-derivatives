const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const forceSlider = document.getElementById("force");
const distanceSlider = document.getElementById("distance");
const timeASlider = document.getElementById("timeA");
const timeBSlider = document.getElementById("timeB");

const forceValue = document.getElementById("forceValue");
const distanceValue = document.getElementById("distanceValue");
const timeAValue = document.getElementById("timeAValue");
const timeBValue = document.getElementById("timeBValue");

const workData = document.getElementById("work");
const powerAData = document.getElementById("powerA");
const powerBData = document.getElementById("powerB");
const winnerData = document.getElementById("winner");
const calculusData = document.getElementById("calculus");
const explanation = document.getElementById("explanation");

let animationTime = 0;

//------------------------------------------------------------

function drawScene(progressA, progressB){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //--------------------------------------------------------
    // Titles
    //--------------------------------------------------------

    ctx.fillStyle="white";
    ctx.font="20px Arial";

    ctx.fillText("Engine A",90,70);
    ctx.fillText("Engine B",90,270);

    //--------------------------------------------------------
    // Tracks
    //--------------------------------------------------------

    ctx.strokeStyle="#94a3b8";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(120,120);
    ctx.lineTo(780,120);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(120,320);
    ctx.lineTo(780,320);
    ctx.stroke();

    //--------------------------------------------------------
    // Finish Lines
    //--------------------------------------------------------

    ctx.strokeStyle="#facc15";

    ctx.beginPath();
    ctx.moveTo(780,95);
    ctx.lineTo(780,145);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(780,295);
    ctx.lineTo(780,345);
    ctx.stroke();

    //--------------------------------------------------------
    // Blocks
    //--------------------------------------------------------

    const xA = 120 + progressA * 660;
    const xB = 120 + progressB * 660;

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(xA-15,105,30,30);

    ctx.fillStyle="#22c55e";
    ctx.fillRect(xB-15,305,30,30);

    //--------------------------------------------------------
    // Force Arrows
    //--------------------------------------------------------

    ctx.strokeStyle="#ef4444";
    ctx.lineWidth=3;

    ctx.beginPath();
    ctx.moveTo(xA-40,120);
    ctx.lineTo(xA-5,120);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xB-40,320);
    ctx.lineTo(xB-5,320);
    ctx.stroke();

    //--------------------------------------------------------
    // Labels
    //--------------------------------------------------------

    ctx.fillStyle="white";
    ctx.font="16px Arial";

    ctx.fillText("Start",95,155);
    ctx.fillText("Finish",760,155);

    ctx.fillText("Start",95,355);
    ctx.fillText("Finish",760,355);

}
//------------------------------------------------------------
// Update
//------------------------------------------------------------

function update(){

    const force = Number(forceSlider.value);
    const distance = Number(distanceSlider.value);
    const timeA = Number(timeASlider.value);
    const timeB = Number(timeBSlider.value);

    forceValue.textContent = force.toFixed(0) + " N";
    distanceValue.textContent = distance.toFixed(1) + " m";
    timeAValue.textContent = timeA.toFixed(1) + " s";
    timeBValue.textContent = timeB.toFixed(1) + " s";

    //--------------------------------------------------------

    const work = force * distance;

    const powerA = work / timeA;
    const powerB = work / timeB;

    //--------------------------------------------------------
    // Animation Progress
    //--------------------------------------------------------

    let progressA = animationTime / timeA;
    let progressB = animationTime / timeB;

    if(progressA > 1) progressA = 1;
    if(progressB > 1) progressB = 1;

    //--------------------------------------------------------
    // Live Data
    //--------------------------------------------------------

    workData.innerHTML =
        `<strong>${work.toFixed(1)} J</strong>`;

    powerAData.innerHTML =
        `<strong>${powerA.toFixed(1)} W</strong>`;

    powerBData.innerHTML =
        `<strong>${powerB.toFixed(1)} W</strong>`;

    if(powerA > powerB){

        winnerData.innerHTML =
        `<strong>Engine A</strong><br>${powerA.toFixed(1)} W`;

    }

    else if(powerB > powerA){

        winnerData.innerHTML =
        `<strong>Engine B</strong><br>${powerB.toFixed(1)} W`;

    }

    else{

        winnerData.innerHTML =
        `<strong>Tie!</strong>`;

    }

    //--------------------------------------------------------

    calculusData.innerHTML = `

        Average Power:

        <br><br>

        <strong>P = W/t</strong>

        <br><br>

        Calculus defines

        <br><br>

        <strong>P = dW/dt</strong>

        <br><br>

        Power is the rate at which
        work is done.

    `;

    explanation.innerHTML = `

        Both engines push the block
        through the same distance
        with the same force.

        <br><br>

        Since

        <br>

        <strong>W = Fd</strong>

        <br><br>

        they perform the same work.

        <br><br>

        The only difference is
        how long they take.

        <br><br>

        An engine that performs
        the same work in less time
        has a greater power output.

    `;

    //--------------------------------------------------------

    drawScene(progressA, progressB);

}

//------------------------------------------------------------
// Animation
//------------------------------------------------------------

function animate(){

    animationTime += 0.02;

    const maxTime = Math.max(
        Number(timeASlider.value),
        Number(timeBSlider.value)
    );

    if(animationTime > maxTime + 1){

        animationTime = 0;

    }

    update();

    requestAnimationFrame(animate);

}

//------------------------------------------------------------
// Sliders
//------------------------------------------------------------

forceSlider.addEventListener("input", () => {

    animationTime = 0;
    update();

});

distanceSlider.addEventListener("input", () => {

    animationTime = 0;
    update();

});

timeASlider.addEventListener("input", () => {

    animationTime = 0;
    update();

});

timeBSlider.addEventListener("input", () => {

    animationTime = 0;
    update();

});

//------------------------------------------------------------

update();
animate();
