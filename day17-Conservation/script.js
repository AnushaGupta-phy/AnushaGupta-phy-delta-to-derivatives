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

let t = 0;

//------------------------------------------------------------

function drawScene(currentHeight, KE, PE, totalEnergy){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //--------------------------------------------------------
    // Ramp
    //--------------------------------------------------------

    const startX = 80;
    const startY = 380;

    const endX = 350;
    const endY = 150;

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();

    //--------------------------------------------------------
    // Block
    //--------------------------------------------------------

    const startHeight = Number(heightSlider.value);

    const progress = t;

    const blockX = startX + (endX-startX)*progress;
    const blockY = startY + (endY-startY)*progress;

    ctx.save();

    ctx.translate(blockX,blockY);

    ctx.rotate(-Math.PI/4);

    ctx.fillStyle="#3b82f6";
    ctx.fillRect(-15,-15,30,30);

    ctx.restore();

    //--------------------------------------------------------
    // Graph axes
    //--------------------------------------------------------

    const gx = 470;
    const gy = 420;

    const gw = 350;
    const gh = 260;

    ctx.strokeStyle="white";
    ctx.lineWidth=2;

    ctx.beginPath();

    ctx.moveTo(gx,gy-gh);
    ctx.lineTo(gx,gy);

    ctx.lineTo(gx+gw,gy);

    ctx.stroke();

    ctx.fillStyle="white";
    ctx.font="16px Arial";

    ctx.fillText("Energy",gx-30,gy-gh-10);
    ctx.fillText("Position",gx+250,gy+30);

    //--------------------------------------------------------
    // Energy curves
    //--------------------------------------------------------

    const maxEnergy =
        Number(massSlider.value)*g*10;

    // Potential

    ctx.strokeStyle="#22c55e";
    ctx.lineWidth=3;

    ctx.beginPath();

    for(let i=0;i<=100;i++){

        const p=i/100;

        const h=startHeight*(1-p);

        const pe=
            Number(massSlider.value)*g*h;

        const x=gx+p*gw;

        const y=gy-(pe/maxEnergy)*gh;

        if(i===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

    // Kinetic

    ctx.strokeStyle="#3b82f6";

    ctx.beginPath();

    for(let i=0;i<=100;i++){

        const p=i/100;

        const h=startHeight*(1-p);

        const pe=
            Number(massSlider.value)*g*h;

        const ke=maxEnergy*(startHeight/10)-pe;

        const x=gx+p*gw;

        const y=gy-(ke/maxEnergy)*gh;

        if(i===0)
            ctx.moveTo(x,y);
        else
            ctx.lineTo(x,y);

    }

    ctx.stroke();

    // Total

    ctx.strokeStyle="#facc15";

    ctx.beginPath();

    const totalY=
        gy-(totalEnergy/maxEnergy)*gh;

    ctx.moveTo(gx,totalY);
    ctx.lineTo(gx+gw,totalY);

    ctx.stroke();
        //--------------------------------------------------------
    // Moving points on graph
    //--------------------------------------------------------

    const progressX = gx + progress * gw;

    // Potential Energy point
    ctx.beginPath();
    ctx.fillStyle = "#22c55e";
    ctx.arc(
        progressX,
        gy - (PE / maxEnergy) * gh,
        6,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Kinetic Energy point
    ctx.beginPath();
    ctx.fillStyle = "#3b82f6";
    ctx.arc(
        progressX,
        gy - (KE / maxEnergy) * gh,
        6,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Total Energy point
    ctx.beginPath();
    ctx.fillStyle = "#facc15";
    ctx.arc(
        progressX,
        totalY,
        6,
        0,
        Math.PI * 2
    );
    ctx.fill();

    //--------------------------------------------------------
    // Legend
    //--------------------------------------------------------

    ctx.font = "14px Arial";

    ctx.fillStyle = "#22c55e";
    ctx.fillText("Potential Energy", 520, 40);

    ctx.fillStyle = "#3b82f6";
    ctx.fillText("Kinetic Energy", 520, 65);

    ctx.fillStyle = "#facc15";
    ctx.fillText("Total Energy", 520, 90);

}

//------------------------------------------------------------

function update(){

    const startHeight = Number(heightSlider.value);
    const mass = Number(massSlider.value);

    heightValue.textContent = startHeight.toFixed(1) + " m";
    massValue.textContent = mass.toFixed(1) + " kg";

    const currentHeight = startHeight * (1 - t);

    const PE = mass * g * currentHeight;

    const totalEnergy = mass * g * startHeight;

    const KE = totalEnergy - PE;

    const speed = Math.sqrt((2 * KE) / mass);

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
        E = KE + PE

        <br><br>

        dE/dt = 0

        <br><br>

        Energy changes form,

        <br>

        but the total stays constant.
    `;

    explanation.innerHTML = `
        As the block slides downward,
        its height decreases.

        <br><br>

        This causes its
        <strong>Potential Energy</strong>
        to decrease.

        <br><br>

        That lost potential energy is converted into
        <strong>Kinetic Energy</strong>.

        <br><br>

        The yellow line shows that the
        <strong>Total Mechanical Energy</strong>
        remains constant throughout the motion.

        <br><br>

        In calculus,

        <br><br>

        <strong>dE/dt = 0</strong>

        <br><br>

        meaning the total energy does not change with time.
    `;

    drawScene(currentHeight, KE, PE, totalEnergy);

}

//------------------------------------------------------------

function animate(){

    t += 0.004;

    if(t > 1){
        t = 0;
    }

    update();

    requestAnimationFrame(animate);

}

//------------------------------------------------------------

heightSlider.addEventListener("input", () => {

    t = 0;
    update();

});

massSlider.addEventListener("input", () => {

    update();

});

update();
animate();
