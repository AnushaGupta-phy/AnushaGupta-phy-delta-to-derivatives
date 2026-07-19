const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const heightSlider = document.getElementById("height");
const massSlider = document.getElementById("mass");

const heightValue = document.getElementById("heightValue");
const massValue = document.getElementById("massValue");

const heightData = document.getElementById("heightData");
const potentialEnergyData = document.getElementById("potentialEnergy");
const slopeData = document.getElementById("slope");
const forceData = document.getElementById("force");
const calculusData = document.getElementById("calculus");
const explanation = document.getElementById("explanation");

const g = 9.8;

//--------------------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(100, 430);
    ctx.lineTo(620, 430);
    ctx.stroke();

    // Hill
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(120, 430);
    ctx.lineTo(320, 230);
    ctx.stroke();

    const h = Number(heightSlider.value);

    // Object position
    const t = h / 10;

    const x = 120 + t * 200;
    const y = 430 - t * 200;

    ctx.beginPath();
    ctx.fillStyle = "#22c55e";
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();

    // Height line
    ctx.strokeStyle = "#facc15";
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, 430);
    ctx.stroke();

    ctx.setLineDash([]);

    // Graph

    const graphX = 420;
    const graphY = 390;
    const graphW = 220;
    const graphH = 180;

    // Axes

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(graphX, graphY);
    ctx.lineTo(graphX, graphY - graphH);
    ctx.lineTo(graphX + graphW, graphY - graphH);
    ctx.stroke();

    // U = mgh graph

    const m = Number(massSlider.value);

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;

    ctx.beginPath();

    for (let i = 0; i <= 100; i++) {

        const height = i / 10;

        const U = m * g * height;

        const gx = graphX + height * 20;
        const gy = graphY - (U / (20 * 9.8 * 10)) * graphH;

        if (i === 0)
            ctx.moveTo(gx, gy);
        else
            ctx.lineTo(gx, gy);

    }

    ctx.stroke();

    // Current point

    const U = m * g * h;

    const px = graphX + h * 20;
    const py = graphY - (U / (20 * 9.8 * 10)) * graphH;

    ctx.beginPath();
    ctx.fillStyle = "#ef4444";
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();

    // Labels

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("Potential Energy Graph", 405, 40);

    ctx.font = "14px Arial";
    ctx.fillText("Height", graphX + 150, graphY + 25);
    ctx.fillText("U", graphX - 20, graphY - graphH + 10);

}

//--------------------------------------------------

function update() {

    const h = Number(heightSlider.value);
    const m = Number(massSlider.value);

    const U = m * g * h;

    const slope = m * g;

    const force = -slope;

    heightValue.textContent = h.toFixed(1) + " m";
    massValue.textContent = m.toFixed(1) + " kg";

    heightData.innerHTML =
        `<strong>${h.toFixed(2)} m</strong>`;

    potentialEnergyData.innerHTML =
        `<strong>${U.toFixed(2)} J</strong>`;

    slopeData.innerHTML =
        `<strong>${slope.toFixed(2)} J/m</strong>`;

    forceData.innerHTML =
        `<strong>${force.toFixed(2)} N</strong>`;

    calculusData.innerHTML =
        `
        U(h) = mgh

        <br><br>

        dU/dh = ${slope.toFixed(2)}

        <br><br>

        F = -dU/dh = ${force.toFixed(2)} N
        `;

    explanation.innerHTML =
        `
        Potential energy depends entirely on an object's position.

        <br><br>

        As the object moves higher, its gravitational potential energy
        increases linearly:

        <br><br>

        <strong>U = mgh</strong>

        <br><br>

        Calculus tells us that the slope of this graph is

        <br><br>

        <strong>dU/dh = mg</strong>

        <br><br>

        Since gravity always acts downward,

        <br><br>

        <strong>F = -dU/dh</strong>

        <br><br>

        The negative sign means the force points toward decreasing
        potential energy.
        `;

    drawScene();

}

//--------------------------------------------------

heightSlider.addEventListener("input", update);
massSlider.addEventListener("input", update);

update();
