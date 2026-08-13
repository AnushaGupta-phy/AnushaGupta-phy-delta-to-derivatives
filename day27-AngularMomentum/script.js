const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

const armSlider = document.getElementById("armSlider");
const omegaSlider = document.getElementById("omegaSlider");

const armValue = document.getElementById("armValue");
const omegaValue = document.getElementById("omegaValue");

const inertiaValue = document.getElementById("inertiaValue");
const currentOmega = document.getElementById("currentOmega");
const momentumValue = document.getElementById("momentumValue");
const calculus = document.getElementById("calculus");

const toggleButton = document.getElementById("toggleButton");
const resetButton = document.getElementById("resetButton");


// --------------------------------------------------
// Constants
// --------------------------------------------------

const mass = 60;

// Distance from center when arms are extended
const extendedRadius = 130;

// Distance from center when arms are pulled in
const contractedRadius = 55;


// --------------------------------------------------
// State
// --------------------------------------------------

let armPosition = 1;

let initialOmega = 2;

let angle = 0;

let running = true;

let lastTime = performance.now();

let graphData = [];


// --------------------------------------------------
// Physics
// --------------------------------------------------

function getRadius() {

    return contractedRadius +
        (extendedRadius - contractedRadius) * armPosition;

}


function getMomentOfInertia() {

    const radius = getRadius();

    return mass * radius * radius;

}


function getAngularMomentum() {

    const I = getMomentOfInertia();

    return I * initialOmega;

}


function getAngularVelocity() {

    const I = getMomentOfInertia();

    const L = getAngularMomentum();

    return L / I;

}


// --------------------------------------------------
// Drawing the skater
// --------------------------------------------------

function drawSkater() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;


    const radius = getRadius();


    // Background circle

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        190,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 2;

    ctx.stroke();


    // Rotation direction arrows

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        165,
        -0.7,
        0.7
    );

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 4;

    ctx.stroke();


    // Head

    const headY = centerY - 70;

    ctx.beginPath();

    ctx.arc(
        centerX,
        headY,
        18,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#f8fafc";

    ctx.fill();


    // Body

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        headY + 18
    );

    ctx.lineTo(
        centerX,
        centerY + 65
    );

    ctx.strokeStyle = "#60a5fa";

    ctx.lineWidth = 12;

    ctx.lineCap = "round";

    ctx.stroke();


    // Arms

    const armAngle = angle;

    const leftX =
        centerX +
        Math.cos(armAngle + Math.PI) * radius;

    const leftY =
        centerY +
        Math.sin(armAngle + Math.PI) * radius;

    const rightX =
        centerX +
        Math.cos(armAngle) * radius;

    const rightY =
        centerY +
        Math.sin(armAngle) * radius;


    ctx.beginPath();

    ctx.moveTo(centerX, centerY - 10);

    ctx.lineTo(leftX, leftY);

    ctx.moveTo(centerX, centerY - 10);

    ctx.lineTo(rightX, rightY);

    ctx.strokeStyle = "#f8fafc";

    ctx.lineWidth = 8;

    ctx.stroke();


    // Hands

    ctx.beginPath();

    ctx.arc(
        leftX,
        leftY,
        7,
        0,
        Math.PI * 2
    );

    ctx.arc(
        rightX,
        rightY,
        7,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#f8fafc";

    ctx.fill();


    // Legs

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        centerY + 65
    );

    ctx.lineTo(
        centerX - 35,
        centerY + 125
    );

    ctx.moveTo(
        centerX,
        centerY + 65
    );

    ctx.lineTo(
        centerX + 35,
        centerY + 125
    );

    ctx.strokeStyle = "#f8fafc";

    ctx.lineWidth = 8;

    ctx.stroke();


    // Center point

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        6,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#ef4444";

    ctx.fill();


    // Labels

    ctx.fillStyle = "#cbd5e1";

    ctx.font = "16px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "Axis of rotation",
        centerX,
        centerY + 180
    );

}


// --------------------------------------------------
// Graph
// --------------------------------------------------

function drawGraph() {

    graphCtx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


    // Axes

    graphCtx.strokeStyle = "#475569";

    graphCtx.lineWidth = 1;

    graphCtx.beginPath();

    graphCtx.moveTo(50, 20);

    graphCtx.lineTo(50, 260);

    graphCtx.lineTo(570, 260);

    graphCtx.stroke();


    if (graphData.length < 2) {
        return;
    }


    const maxValue = Math.max(
        ...graphData.map(point => point.omega),
        1
    );


    graphCtx.beginPath();


    graphData.forEach((point, index) => {

        const x =
            50 +
            (index / Math.max(graphData.length - 1, 1)) * 520;

        const y =
            260 -
            (point.omega / maxValue) * 220;


        if (index === 0) {

            graphCtx.moveTo(x, y);

        } else {

            graphCtx.lineTo(x, y);

        }

    });


    graphCtx.strokeStyle = "#60a5fa";

    graphCtx.lineWidth = 3;

    graphCtx.stroke();


    graphCtx.fillStyle = "#cbd5e1";

    graphCtx.font = "13px Arial";

    graphCtx.textAlign = "left";

    graphCtx.fillText(
        "Angular velocity",
        55,
        18
    );


    graphCtx.fillText(
        "Time",
        530,
        285
    );

}


// --------------------------------------------------
// Information
// --------------------------------------------------

function updateInformation() {

    const radius = getRadius();

    const I = getMomentOfInertia();

    const L = getAngularMomentum();

    const omega = getAngularVelocity();


    // Arm label

    if (armPosition > 0.7) {

        armValue.textContent = "Extended";

    } else if (armPosition < 0.3) {

        armValue.textContent = "Pulled In";

    } else {

        armValue.textContent = "Partially In";

    }


    omegaValue.textContent =
        `${initialOmega.toFixed(1)} rad/s`;


    inertiaValue.innerHTML =

        `I = mr²<br><br>
        I = ${mass} × (${radius.toFixed(1)})²
        <br><br>
        <strong>I = ${I.toFixed(0)} kg·m²</strong>`;


    currentOmega.innerHTML =

        `<strong>
        ${omega.toFixed(2)} rad/s
        </strong>`;


    momentumValue.innerHTML =

        `L = Iω
        <br><br>
        <strong>
        L = ${L.toFixed(0)} kg·m²/s
        </strong>`;


    calculus.innerHTML =

        `
        Angular momentum is

        <br><br>

        <strong>
        L = Iω
        </strong>

        <br><br>

        For a continuous object, the moment of inertia
        is found by adding the contribution of every
        tiny piece of mass:

        <br><br>

        <strong>
        I = ∫r² dm
        </strong>

        <br><br>

        This is another example of calculus turning
        an enormous collection of tiny pieces into one
        useful physical quantity.

        <br><br>

        If no external torque acts on the system,
        angular momentum remains constant.
        `;

}


// --------------------------------------------------
// Animation
// --------------------------------------------------

function animate(time) {

    const deltaTime =
        (time - lastTime) / 1000;

    lastTime = time;


    if (running) {

        const omega = getAngularVelocity();

        angle += omega * deltaTime;


        graphData.push({
            time: time,
            omega: omega
        });


        if (graphData.length > 150) {

            graphData.shift();

        }

    }


    drawSkater();

    drawGraph();

    updateInformation();


    requestAnimationFrame(animate);

}


// --------------------------------------------------
// Controls
// --------------------------------------------------

armSlider.addEventListener(
    "input",
    () => {

        armPosition =
            parseFloat(armSlider.value);

    }
);


omegaSlider.addEventListener(
    "input",
    () => {

        initialOmega =
            parseFloat(omegaSlider.value);

    }
);


toggleButton.addEventListener(
    "click",
    () => {

        running = !running;

        toggleButton.textContent =
            running ? "Pause" : "Play";

    }
);


resetButton.addEventListener(
    "click",
    () => {

        armPosition = 1;

        initialOmega = 2;

        angle = 0;

        graphData = [];

        armSlider.value = 1;

        omegaSlider.value = 2;

        running = true;

        toggleButton.textContent = "Pause";

    }
);


// --------------------------------------------------
// Start
// --------------------------------------------------

updateInformation();

requestAnimationFrame(animate);
