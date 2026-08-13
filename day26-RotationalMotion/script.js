const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");


//----------------------------------------------------
// Controls
//----------------------------------------------------

const massSlider = document.getElementById("mass");
const radiusSlider = document.getElementById("radius");
const omegaSlider = document.getElementById("omega");

const massValue = document.getElementById("massValue");
const radiusValue = document.getElementById("radiusValue");
const omegaValue = document.getElementById("omegaValue");

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");


//----------------------------------------------------
// Displays
//----------------------------------------------------

const inertiaDisplay =
    document.getElementById("inertiaDisplay");

const omegaDisplay =
    document.getElementById("omegaDisplay");

const energyDisplay =
    document.getElementById("energyDisplay");

const calculus =
    document.getElementById("calculus");


//----------------------------------------------------
// State
//----------------------------------------------------

let angle = 0;

let running = false;

let energyHistory = [];

let lastTime = null;


//----------------------------------------------------
// Flywheel
//----------------------------------------------------

let wheel = {

    centerX: canvas.width / 2,

    centerY: canvas.height / 2,

    radius: 100

};


//----------------------------------------------------
// Reset
//----------------------------------------------------

function resetSimulation() {

    angle = 0;

    running = false;

    energyHistory = [];

    lastTime = null;

    update();

}


//----------------------------------------------------
// Draw Scene
//----------------------------------------------------

function drawScene() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    //------------------------------------------------
    // Background
    //------------------------------------------------

    ctx.fillStyle = "#0f172a";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    //------------------------------------------------
    // Wheel
    //------------------------------------------------

    const radius =
        Number(radiusSlider.value);


    wheel.radius = radius;


    ctx.save();

    ctx.translate(
        wheel.centerX,
        wheel.centerY
    );


    ctx.rotate(angle);


    //------------------------------------------------
    // Flywheel
    //------------------------------------------------

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#334155";

    ctx.fill();


    ctx.strokeStyle = "#60a5fa";

    ctx.lineWidth = 5;

    ctx.stroke();


    //------------------------------------------------
    // Inner ring
    //------------------------------------------------

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        radius * 0.65,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "#64748b";

    ctx.lineWidth = 3;

    ctx.stroke();


    //------------------------------------------------
    // Spokes
    //------------------------------------------------

    ctx.strokeStyle = "#94a3b8";

    ctx.lineWidth = 5;

    for (let i = 0; i < 6; i++) {

        const spokeAngle =
            i * Math.PI / 3;

        ctx.beginPath();

        ctx.moveTo(0, 0);

        ctx.lineTo(
            Math.cos(spokeAngle) * radius,
            Math.sin(spokeAngle) * radius
        );

        ctx.stroke();

    }


    //------------------------------------------------
    // Marker
    //------------------------------------------------

    ctx.fillStyle = "#facc15";

    ctx.beginPath();

    ctx.arc(
        radius * 0.82,
        0,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();


    //------------------------------------------------
    // Center
    //------------------------------------------------

    ctx.beginPath();

    ctx.arc(
        wheel.centerX,
        wheel.centerY,
        12,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#60a5fa";

    ctx.fill();


    //------------------------------------------------
    // Labels
    //------------------------------------------------

    ctx.fillStyle = "#cbd5e1";

    ctx.font = "16px Arial";

    ctx.fillText(
        "Flywheel",
        20,
        30
    );

}


//----------------------------------------------------
// Physics
//----------------------------------------------------

function getPhysics() {

    const mass =
        Number(massSlider.value);

    const radius =
        Number(radiusSlider.value) / 100;

    const omega =
        Number(omegaSlider.value);


    //------------------------------------------------
    // Solid disk
    //
    // I = 1/2 MR²
    //------------------------------------------------

    const inertia =
        0.5 * mass * radius * radius;


    //------------------------------------------------
    // Rotational kinetic energy
    //
    // K = 1/2 Iω²
    //------------------------------------------------

    const energy =
        0.5 * inertia * omega * omega;


    return {

        mass,
        radius,
        omega,
        inertia,
        energy

    };

}


//----------------------------------------------------
// Update Information
//----------------------------------------------------

function updateInformation() {

    const physics =
        getPhysics();


    massValue.textContent =
        physics.mass.toFixed(1) + " kg";


    radiusValue.textContent =
        (physics.radius * 100).toFixed(0) + " px";


    omegaValue.textContent =
        physics.omega.toFixed(1) + " rad/s";


    inertiaDisplay.innerHTML =
        `${physics.inertia.toFixed(3)} kg·m²`;


    omegaDisplay.innerHTML =
        `${physics.omega.toFixed(2)} rad/s`;


    energyDisplay.innerHTML =
        `${physics.energy.toFixed(3)} J`;


    calculus.innerHTML =

    `
    For a solid disk, the moment of inertia is

    <br><br>

    <strong>
    I = ½MR²
    </strong>

    <br><br>

    Rotational kinetic energy is

    <br><br>

    <strong>
    K<sub>rot</sub> = ½Iω²
    </strong>

    <br><br>

    This has the same structure as linear kinetic
    energy, K = ½mv², but mass is replaced by
    moment of inertia and velocity is replaced
    by angular velocity.

    <br><br>

    The moment of inertia comes from summing
    contributions from every small piece of mass:

    <br><br>

    <strong>
    I = ∫r² dm
    </strong>

    <br><br>

    Calculus therefore lets us extend the idea
    of rotational inertia from individual particles
    to continuous objects.
    `;

}


//----------------------------------------------------
// Main Update
//----------------------------------------------------

function update() {

    updateInformation();

    drawScene();

    drawGraph();

}


//----------------------------------------------------
// Graph
//----------------------------------------------------

function drawGraph() {

    graphCtx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


    //------------------------------------------------
    // Background
    //------------------------------------------------

    graphCtx.fillStyle = "#0f172a";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    //------------------------------------------------
    // Axes
    //------------------------------------------------

    const left = 50;

    const bottom = 230;

    const width = 420;

    const height = 180;


    graphCtx.strokeStyle = "#cbd5e1";

    graphCtx.lineWidth = 2;


    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        bottom - height
    );

    graphCtx.lineTo(
        left,
        bottom
    );

    graphCtx.lineTo(
        left + width,
        bottom
    );

    graphCtx.stroke();


    //------------------------------------------------
    // Labels
    //------------------------------------------------

    graphCtx.fillStyle = "#cbd5e1";

    graphCtx.font = "14px Arial";


    graphCtx.fillText(
        "Energy (J)",
        5,
        bottom - height + 15
    );


    graphCtx.fillText(
        "ω (rad/s)",
        left + width - 60,
        bottom + 25
    );


    //------------------------------------------------
    // Energy curve
    //------------------------------------------------

    const physics =
        getPhysics();


    const maxOmega = 10;

    const maxEnergy =
        Math.max(
            1,
            0.5 *
            physics.inertia *
            maxOmega *
            maxOmega
        );


    graphCtx.strokeStyle =
        "#60a5fa";

    graphCtx.lineWidth = 3;


    graphCtx.beginPath();


    for (
        let i = 0;
        i <= 100;
        i++
    ) {

        const omega =
            (i / 100) * maxOmega;


        const energy =
            0.5 *
            physics.inertia *
            omega *
            omega;


        const x =
            left +
            (omega / maxOmega) *
            width;


        const y =
            bottom -
            (energy / maxEnergy) *
            height;


        if (i === 0) {

            graphCtx.moveTo(
                x,
                y
            );

        } else {

            graphCtx.lineTo(
                x,
                y
            );

        }

    }


    graphCtx.stroke();


    //------------------------------------------------
    // Current point
    //------------------------------------------------

    const currentOmega =
        physics.omega;


    const currentEnergy =
        physics.energy;


    const pointX =
        left +
        (currentOmega / maxOmega) *
        width;


    const pointY =
        bottom -
        (currentEnergy / maxEnergy) *
        height;


    graphCtx.fillStyle =
        "#facc15";


    graphCtx.beginPath();

    graphCtx.arc(
        pointX,
        pointY,
        6,
        0,
        Math.PI * 2
    );

    graphCtx.fill();

}


//----------------------------------------------------
// Animation
//----------------------------------------------------

function animate(timestamp) {

    if (!running) {

        lastTime = timestamp;

        return;

    }


    if (lastTime === null) {

        lastTime = timestamp;

    }


    const dt =
        (timestamp - lastTime) / 1000;


    lastTime = timestamp;


    const omega =
        Number(omegaSlider.value);


    //------------------------------------------------
    // θ = ωt
    //------------------------------------------------

    angle += omega * dt;


    //------------------------------------------------
    // Keep angle manageable
    //------------------------------------------------

    if (Math.abs(angle) > Math.PI * 2) {

        angle %= Math.PI * 2;

    }


    drawScene();


    requestAnimationFrame(
        animate
    );

}


//----------------------------------------------------
// Buttons
//----------------------------------------------------

startButton.onclick = function() {

    running = !running;

    if (running) {

        startButton.textContent =
            "Pause";

        lastTime = null;

        requestAnimationFrame(
            animate
        );

    } else {

        startButton.textContent =
            "Start";

    }

};


resetButton.onclick = function() {

    startButton.textContent =
        "Start";

    resetSimulation();

};


//----------------------------------------------------
// Sliders
//----------------------------------------------------

massSlider.oninput = update;

radiusSlider.oninput = update;

omegaSlider.oninput = update;


//----------------------------------------------------
// Initial State
//----------------------------------------------------

resetSimulation();
