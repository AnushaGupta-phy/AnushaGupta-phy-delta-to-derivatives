const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const massSlider = document.getElementById("mass");
const velocitySlider = document.getElementById("velocity");

const massValue = document.getElementById("massValue");
const velocityValue = document.getElementById("velocityValue");

const kineticEnergy = document.getElementById("kineticEnergy");
const slope = document.getElementById("slope");
const velocityData = document.getElementById("velocityData");
const massData = document.getElementById("massData");
const explanation = document.getElementById("explanation");

//------------------------------------------------------------

function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const m = Number(massSlider.value);
    const v = Number(velocitySlider.value);

    // Graph dimensions

    const originX = 70;
    const originY = 430;

    const graphWidth = 560;
    const graphHeight = 340;

    //--------------------------------------------------------
    // Axes

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + graphWidth, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, 60);
    ctx.stroke();

    //--------------------------------------------------------
    // Labels

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText("Velocity (m/s)", 510, 465);
    ctx.fillText("KE (J)", 15, 70);

    //--------------------------------------------------------
    // Curve

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let vel = 0; vel <= 20; vel += 0.2) {

        const ke = 0.5 * m * vel * vel;

        const x = originX + vel * 28;
        const y = originY - ke * 1.6;

        if (vel === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);

    }

    ctx.stroke();

    //--------------------------------------------------------
    // Current Point

    const currentKE = 0.5 * m * v * v;

    const px = originX + v * 28;
    const py = originY - currentKE * 1.6;

    ctx.beginPath();
    ctx.fillStyle = "#22c55e";
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fill();

    //--------------------------------------------------------
    // Tangent Line

    const derivative = m * v;

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;

    ctx.beginPath();

    for (let dx = -90; dx <= 90; dx++) {

        const graphDx = dx / 28;

        const y =
            py -
            derivative * graphDx * 1.6;

        if (dx === -90)
            ctx.moveTo(px + dx, y);
        else
            ctx.lineTo(px + dx, y);

    }

    ctx.stroke();

    //--------------------------------------------------------
    // Legend

    ctx.fillStyle = "#22c55e";
    ctx.fillRect(470, 70, 15, 15);

    ctx.fillStyle = "white";
    ctx.fillText("Current KE", 495, 82);

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(470, 100, 15, 15);

    ctx.fillStyle = "white";
    ctx.fillText("Derivative", 495, 112);

}

//------------------------------------------------------------

function update() {

    const m = Number(massSlider.value);
    const v = Number(velocitySlider.value);

    const KE = 0.5 * m * v * v;

    const derivative = m * v;

    massValue.textContent = `${m.toFixed(1)} kg`;
    velocityValue.textContent = `${v.toFixed(1)} m/s`;

    kineticEnergy.innerHTML =
        `<strong>${KE.toFixed(2)} J</strong>`;

    slope.innerHTML =
        `<strong>${derivative.toFixed(2)} J/(m/s)</strong>`;

    velocityData.innerHTML =
        `<strong>${v.toFixed(2)} m/s</strong>`;

    massData.innerHTML =
        `<strong>${m.toFixed(2)} kg</strong>`;

    explanation.innerHTML = `
        Kinetic energy depends on the square of velocity.

        <br><br>

        <strong>KE = ½mv²</strong>

        <br><br>

        The graph is a parabola, so its slope changes continuously.

        <br><br>

        Taking the derivative with respect to velocity gives

        <br><br>

        <strong>d(KE)/dv = mv</strong>

        <br><br>

        As velocity increases, the tangent line becomes steeper. This shows why
        small increases in speed produce much larger increases in kinetic energy
        at high velocities.
    `;

    drawGraph();

}

//------------------------------------------------------------

massSlider.addEventListener("input", update);
velocitySlider.addEventListener("input", update);

update();
