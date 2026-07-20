const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const heightSlider = document.getElementById("height");
const massSlider = document.getElementById("mass");

const heightValue = document.getElementById("heightValue");
const massValue = document.getElementById("massValue");

const currentHeightData = document.getElementById("currentHeight");
const potentialEnergyData = document.getElementById("potentialEnergy");
const kineticEnergyData = document.getElementById("kineticEnergy");
const totalEnergyData = document.getElementById("totalEnergy");
const speedData = document.getElementById("speed");
const calculusData = document.getElementById("calculus");
const explanation = document.getElementById("explanation");

const g = 9.8;

let progress = 0;

//------------------------------------------------------------

function drawScene(currentHeight, PE, KE, totalEnergy){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //--------------------------------------------------------
    // Ramp
    //--------------------------------------------------------

    const topX = 100;
    const topY = 120;

    const bottomX = 360;
    const bottomY = 380;

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(topX,topY);
    ctx.lineTo(bottomX,bottomY);
    ctx.stroke();

    //--------------------------------------------------------
    // Block
    //--------------------------------------------------------

    const blockX =
        topX + (bottomX-topX)*progress;

    const blockY =
        topY + (bottomY-topY)*progress;

    ctx.save();

    ctx.translate(blockX,blockY);

    ctx.rotate(Math.PI/4);

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(-16,-16,32,32);

    ctx.restore();

    //--------------------------------------------------------
    // Energy Graph
    //--------------------------------------------------------

    const gx=470;
    const gy=420;

    const gw=350;
    const gh=250;

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();

    ctx.moveTo(gx,gy-gh);
    ctx.lineTo(gx,gy);

    ctx.lineTo(gx+gw,gy);

    ctx.stroke();

    ctx.fillStyle="white";
    ctx.font="16px Arial";

    ctx.fillText("Energy",gx-25,gy-gh-10);
    ctx.fillText("Position",gx+250,gy+30);

    const maxEnergy=2000;

    //--------------------------------------------------------
    // Potential Energy Curve
    //--------------------------------------------------------

    ctx.strokeStyle="#22c55e";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let p=0;p<=1;p+=0.01){

        const h=
        Number(heightSlider.value)*(1-p);

        const pe=
        Number(massSlider.value)*g*h;

        const x=
        gx+p*gw;

        const y=
        gy-(pe/maxEnergy)*gh;

        if(p===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

    //--------------------------------------------------------
    // Kinetic Curve
    //--------------------------------------------------------

    ctx.strokeStyle="#3b82f6";

    ctx.beginPath();

    const total=
    Number(massSlider.value)*
    g*
    Number(heightSlider.value);

    for(let p=0;p<=1;p+=0.01){

        const h=
        Number(heightSlider.value)*(1-p);

        const pe=
        Number(massSlider.value)*g*h;

        const ke=
        total-pe;

        const x=
        gx+p*gw;

        const y=
        gy-(ke/maxEnergy)*gh;

        if(p===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

    //--------------------------------------------------------
    // Total Energy
    //--------------------------------------------------------

    ctx.strokeStyle="#facc15";

    const totalY=
    gy-(total/maxEnergy)*gh;

    ctx.beginPath();
    ctx.moveTo(gx,totalY);
    ctx.lineTo(gx+gw,totalY);
    ctx.stroke();

    //--------------------------------------------------------
    // Moving Dots
    //--------------------------------------------------------

    const dotX=
    gx+progress*gw;

    ctx.beginPath();
    ctx.fillStyle="#22c55e";
    ctx.arc(
        dotX,
        gy-(PE/maxEnergy)*gh,
        6,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle="#3b82f6";
    ctx.arc(
        dotX,
        gy-(KE/maxEnergy)*gh,
        6,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle="#facc15";
    ctx.arc(
        dotX,
        totalY,
        6,
        0,
        Math.PI*2
    );
    ctx.fill();

}
//------------------------------------------------------------
// Update Physics + UI
//------------------------------------------------------------

function update(){

    const startHeight = Number(heightSlider.value);
    const mass = Number(massSlider.value);

    heightValue.textContent = startHeight.toFixed(1) + " m";
    massValue.textContent = mass.toFixed(1) + " kg";

    // Height decreases as the block slides down
    const currentHeight = startHeight * (1 - progress);

    // Total Mechanical Energy
    const totalEnergy = mass * g * startHeight;

    // Potential Energy
    const PE = mass * g * currentHeight;

    // Kinetic Energy
    const KE = totalEnergy - PE;

    // Speed from KE = 1/2 mv²
    const speed = Math.sqrt(Math.max(0, (2 * KE) / mass));

    //--------------------------------------------------------

    currentHeightData.innerHTML =
        `<strong>${currentHeight.toFixed(2)} m</strong>`;

    potentialEnergyData.innerHTML =
        `<strong>${PE.toFixed(2)} J</strong>`;

    kineticEnergyData.innerHTML =
        `<strong>${KE.toFixed(2)} J</strong>`;

    totalEnergyData.innerHTML =
        `<strong>${totalEnergy.toFixed(2)} J</strong>`;

    speedData.innerHTML =
        `<strong>${speed.toFixed(2)} m/s</strong>`;

    calculusData.innerHTML = `
        <strong>E = KE + PE</strong>

        <br><br>

        Since no energy is lost,

        <br><br>

        <strong>dE/dt = 0</strong>

        <br><br>

        Total mechanical energy
        stays constant.
    `;

    explanation.innerHTML = `
        As the block slides down the ramp,
        its height decreases.

        <br><br>

        The loss in
        <strong>Potential Energy</strong>
        becomes
        <strong>Kinetic Energy</strong>.

        <br><br>

        Notice that the yellow line
        (Total Energy)
        never changes.

        <br><br>

        This is the
        <strong>Conservation of Energy</strong>.

        <br><br>

        Calculus describes this by saying

        <br><br>

        <strong>dE/dt = 0</strong>.
    `;

    drawScene(currentHeight, PE, KE, totalEnergy);

}

//------------------------------------------------------------
// Animation
//------------------------------------------------------------

function animate(){

    progress += 0.0025;

    if(progress >= 1){

        progress = 0;

    }

    update();

    requestAnimationFrame(animate);

}

//------------------------------------------------------------
// Sliders
//------------------------------------------------------------

heightSlider.addEventListener("input", () => {

    progress = 0;
    update();

});

massSlider.addEventListener("input", () => {

    progress = 0;
    update();

});

//------------------------------------------------------------

update();
animate();
