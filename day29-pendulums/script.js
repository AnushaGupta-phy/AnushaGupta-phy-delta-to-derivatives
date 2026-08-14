const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const gctx = graph.getContext("2d");

const lengthSlider = document.getElementById("length");
const angleSlider = document.getElementById("angle");

const lengthValue = document.getElementById("lengthValue");
const angleValue = document.getElementById("angleValue");

const periodValue = document.getElementById("periodValue");
const positionValue = document.getElementById("positionValue");
const calculus = document.getElementById("calculus");

const resetButton = document.getElementById("resetButton");


// --------------------------------------------------
// Variables
// --------------------------------------------------

let length = 2.0;
let releaseAngle = 30;

let theta = 0;
let angularVelocity = 0;

let lastTime = performance.now();

const gravity = 9.81;

let graphData = [];


// --------------------------------------------------
// Update controls
// --------------------------------------------------

function updateControls() {

    length = parseFloat(lengthSlider.value);
    releaseAngle = parseFloat(angleSlider.value);

    lengthValue.textContent =
        `${length.toFixed(1)} m`;

    angleValue.textContent =
        `${releaseAngle.toFixed(0)}°`;

}


// --------------------------------------------------
// Reset simulation
// --------------------------------------------------

function resetSimulation() {

    updateControls();

    theta = releaseAngle * Math.PI / 180;
    angularVelocity = 0;

    graphData = [];

    lastTime = performance.now();

}


// --------------------------------------------------
// Physics
// --------------------------------------------------

function updatePhysics(dt) {

    /*
        Full pendulum equation:

        θ'' = -(g/L) sin(θ)

        This is nonlinear.

        For small angles:

        sin(θ) ≈ θ

        which gives the simple harmonic
        motion approximation:

        θ'' = -(g/L)θ
    */

    const angularAcceleration =
        -(gravity / length) * Math.sin(theta);

    angularVelocity += angularAcceleration * dt;

    theta += angularVelocity * dt;

    /*
        Small numerical damping keeps the
        simulation stable over long periods.
    */

    angularVelocity *= 0.9995;


    // Record data for graph
    graphData.push(theta);

    if (graphData.length > 300) {
        graphData.shift();
    }

}


// --------------------------------------------------
// Draw pendulum
// --------------------------------------------------

function drawPendulum() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const pivotX = canvas.width / 2;
    const pivotY = 70;

    /*
        Scale the physical length so all
        possible lengths fit on screen.
    */

    const scale = 85;

    const bobLength = length * scale;

    const bobX =
        pivotX + bobLength * Math.sin(theta);

    const bobY =
        pivotY + bobLength * Math.cos(theta);


    // Background grid

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;

    for (let x = 0; x < canvas.width; x += 50) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

    }

    for (let y = 0; y < canvas.height; y += 50) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

    }


    // Vertical equilibrium line

    ctx.setLineDash([6, 6]);

    ctx.strokeStyle = "#475569";
    ctx.beginPath();

    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX, pivotY + bobLength + 50);

    ctx.stroke();

    ctx.setLineDash([]);


    // Equilibrium label

    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px Arial";

    ctx.fillText(
        "Equilibrium",
        pivotX + 10,
        pivotY + bobLength + 40
    );


    // Ceiling

    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(pivotX - 70, pivotY);
    ctx.lineTo(pivotX + 70, pivotY);
    ctx.stroke();


    // Pendulum string

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();


    // Pivot

    ctx.fillStyle = "#60a5fa";

    ctx.beginPath();
    ctx.arc(
        pivotX,
        pivotY,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Bob

    ctx.fillStyle = "#f87171";

    ctx.beginPath();

    ctx.arc(
        bobX,
        bobY,
        22,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Bob highlight

    ctx.fillStyle = "#fecaca";

    ctx.beginPath();

    ctx.arc(
        bobX - 7,
        bobY - 7,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Angle arc

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
        pivotX,
        pivotY,
        45,
        Math.PI / 2 - theta,
        Math.PI / 2
    );

    ctx.stroke();


    // Length label

    const labelX =
        (pivotX + bobX) / 2 + 10;

    const labelY =
        (pivotY + bobY) / 2;

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "15px Arial";

    ctx.fillText(
        `L = ${length.toFixed(1)} m`,
        labelX,
        labelY
    );


    // Angle label

    ctx.fillStyle = "#60a5fa";

    ctx.fillText(
        `θ = ${(theta * 180 / Math.PI).toFixed(1)}°`,
        pivotX + 55,
        pivotY + 35
    );

}


// --------------------------------------------------
// Draw graph
// --------------------------------------------------

function drawGraph() {

    gctx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


    const w = graph.width;
    const h = graph.height;


    // Grid

    gctx.strokeStyle = "#334155";
    gctx.lineWidth = 1;

    for (let x = 0; x < w; x += 50) {

        gctx.beginPath();
        gctx.moveTo(x, 0);
        gctx.lineTo(x, h);
        gctx.stroke();

    }

    for (let y = 0; y < h; y += 50) {

        gctx.beginPath();
        gctx.moveTo(0, y);
        gctx.lineTo(w, y);
        gctx.stroke();

    }


    // Center line

    gctx.strokeStyle = "#64748b";

    gctx.beginPath();

    gctx.moveTo(0, h / 2);
    gctx.lineTo(w, h / 2);

    gctx.stroke();


    if (graphData.length < 2) {
        return;
    }


    // Graph

    gctx.strokeStyle = "#60a5fa";
    gctx.lineWidth = 2;

    gctx.beginPath();

    graphData.forEach((value, index) => {

        const x =
            index * (w / 300);

        const maxAngle =
            Math.PI / 3;

        const normalized =
            value / maxAngle;

        const y =
            h / 2 -
            normalized * (h * 0.4);


        if (index === 0) {
            gctx.moveTo(x, y);
        } else {
            gctx.lineTo(x, y);
        }

    });

    gctx.stroke();


    // Labels

    gctx.fillStyle = "#94a3b8";
    gctx.font = "12px Arial";

    gctx.fillText(
        "+θ",
        8,
        20
    );

    gctx.fillText(
        "0",
        8,
        h / 2 - 5
    );

    gctx.fillText(
        "-θ",
        8,
        h - 8
    );

}


// --------------------------------------------------
// Information
// --------------------------------------------------

function updateInformation() {

    const period =
        2 * Math.PI *
        Math.sqrt(length / gravity);


    const angleDegrees =
        theta * 180 / Math.PI;


    periodValue.innerHTML = `
        <strong>
            ${period.toFixed(2)} s
        </strong>

        <br><br>

        Approximate small-angle period:
        <br>

        T = 2π√(L/g)
    `;


    positionValue.innerHTML = `
        <strong>
            ${angleDegrees.toFixed(1)}°
        </strong>

        <br><br>

        Angular displacement from equilibrium.
    `;


    calculus.innerHTML = `

        The pendulum is governed by the
        differential equation

        <br><br>

        <strong>
        θ'' = −(g/L) sin(θ)
        </strong>

        <br><br>

        This equation is nonlinear because of
        the sine term.

        <br><br>

        For small angles, we can use the
        approximation

        <br><br>

        <strong>
        sin(θ) ≈ θ
        </strong>

        <br><br>

        which turns the equation into

        <br><br>

        <strong>
        θ'' = −(g/L)θ
        </strong>

        <br><br>

        This has the same mathematical form
        as simple harmonic motion. The pendulum
        therefore connects today's physics
        directly to the spring oscillator from
        Day 28.

    `;

}


// --------------------------------------------------
// Animation loop
// --------------------------------------------------

function animate(currentTime) {

    const dt =
        Math.min(
            (currentTime - lastTime) / 1000,
            0.03
        );

    lastTime = currentTime;


    updatePhysics(dt);

    drawPendulum();
    drawGraph();
    updateInformation();


    requestAnimationFrame(animate);

}


// --------------------------------------------------
// Event listeners
// --------------------------------------------------

lengthSlider.addEventListener(
    "input",
    updateControls
);

angleSlider.addEventListener(
    "input",
    updateControls
);

resetButton.addEventListener(
    "click",
    resetSimulation
);


// --------------------------------------------------
// Start
// --------------------------------------------------

resetSimulation();

requestAnimationFrame(animate);
