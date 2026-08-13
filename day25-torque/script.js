const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

//----------------------------------------------------
// Controls
//----------------------------------------------------

const forceSlider = document.getElementById("force");
const leverArmSlider = document.getElementById("leverArm");
const angleSlider = document.getElementById("angle");

const forceValue = document.getElementById("forceValue");
const leverArmValue = document.getElementById("leverArmValue");
const angleValue = document.getElementById("angleValue");

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

//----------------------------------------------------
// Displays
//----------------------------------------------------

const forceDisplay = document.getElementById("forceDisplay");
const leverArmDisplay = document.getElementById("leverArmDisplay");
const torqueDisplay = document.getElementById("torqueDisplay");

const calculus = document.getElementById("calculus");
const explanation = document.getElementById("explanation");

//----------------------------------------------------
// Simulation State
//----------------------------------------------------

let running = false;
let angle = 0;
let angularVelocity = 0;

let lastTime = 0;

//----------------------------------------------------
// Physical Model
//----------------------------------------------------

const leverMass = 2;
const leverLength = 4;

const pivotX = 450;
const pivotY = 270;

const pixelsPerMeter = 80;

//----------------------------------------------------
// Reset
//----------------------------------------------------

function resetSimulation() {

    running = false;

    angle = 0;
    angularVelocity = 0;

    lastTime = 0;

    updateInformation();
    drawScene();
    drawGraph();
}

//----------------------------------------------------
// Calculate Torque
//----------------------------------------------------

function calculateTorque() {

    const F = Number(forceSlider.value);
    const r = Number(leverArmSlider.value);

    const theta =
        Number(angleSlider.value) * Math.PI / 180;

    return r * F * Math.sin(theta);
}

//----------------------------------------------------
// Update Information
//----------------------------------------------------

function updateInformation() {

    const F = Number(forceSlider.value);
    const r = Number(leverArmSlider.value);
    const theta = Number(angleSlider.value);

    const thetaRadians =
        theta * Math.PI / 180;

    const torque =
        r * F * Math.sin(thetaRadians);

    forceValue.textContent =
        `${F.toFixed(0)} N`;

    leverArmValue.textContent =
        `${r.toFixed(1)} m`;

    angleValue.textContent =
        `${theta}°`;

    forceDisplay.textContent =
        `${F.toFixed(0)} N`;

    leverArmDisplay.textContent =
        `${r.toFixed(2)} m`;

    torqueDisplay.textContent =
        `${torque.toFixed(2)} N·m`;

    //------------------------------------------------
    // Calculus Connection
    //------------------------------------------------

    calculus.innerHTML = `

        Torque describes how strongly a force
        produces rotation around a pivot.

        <br><br>

        <strong>
            τ = rF sin(θ)
        </strong>

        <br><br>

        The sine term selects the component of
        the force perpendicular to the lever arm.

        <br><br>

        In rotational dynamics, torque plays a
        role similar to force in linear motion.

    `;

    //------------------------------------------------
    // Explanation
    //------------------------------------------------

    if (theta === 0 || theta === 180) {

        explanation.innerHTML = `

            The force is directed along the lever.

            <br><br>

            Because there is no perpendicular
            component of the force, the torque
            is zero.

        `;

    } else if (theta === 90) {

        explanation.innerHTML = `

            The force is perpendicular to the lever.

            <br><br>

            This produces the maximum possible torque
            for the selected force and lever arm.

        `;

    } else {

        explanation.innerHTML = `

            Only the component of the force
            perpendicular to the lever produces
            rotation.

            <br><br>

            Changing the angle therefore changes
            the torque even when the force itself
            stays the same.

        `;
    }

    drawScene();
    drawGraph();
}

//----------------------------------------------------
// Draw Main Scene
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
    // Title
    //------------------------------------------------

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";

    ctx.fillText(
        "Torque Simulation",
        30,
        35
    );

    //------------------------------------------------
    // Pivot
    //------------------------------------------------

    ctx.fillStyle = "#94a3b8";

    ctx.beginPath();

    ctx.arc(
        pivotX,
        pivotY,
        14,
        0,
        Math.PI * 2
    );

    ctx.fill();

    //------------------------------------------------
    // Lever
    //------------------------------------------------

    const r =
        Number(leverArmSlider.value);

    const leverPixels =
        r * pixelsPerMeter;

    const endX =
        pivotX +
        Math.cos(angle) * leverPixels;

    const endY =
        pivotY +
        Math.sin(angle) * leverPixels;

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 14;

    ctx.beginPath();

    ctx.moveTo(
        pivotX,
        pivotY
    );

    ctx.lineTo(
        endX,
        endY
    );

    ctx.stroke();

    //------------------------------------------------
    // Lever End
    //------------------------------------------------

    ctx.fillStyle = "#3b82f6";

    ctx.beginPath();

    ctx.arc(
        endX,
        endY,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();

    //------------------------------------------------
    // Force Arrow
    //------------------------------------------------

    if (running) {

        drawForceArrow(
            endX,
            endY
        );
    }

    //------------------------------------------------
    // Pivot Label
    //------------------------------------------------

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "16px Arial";

    ctx.fillText(
        "Pivot",
        pivotX - 25,
        pivotY + 35
    );

    //------------------------------------------------
    // Lever Arm Label
    //------------------------------------------------

    const labelX =
        (pivotX + endX) / 2;

    const labelY =
        (pivotY + endY) / 2 - 15;

    ctx.fillText(
        `r = ${r.toFixed(1)} m`,
        labelX,
        labelY
    );

    //------------------------------------------------
    // Torque Display
    //------------------------------------------------

    const torque =
        calculateTorque();

    ctx.fillStyle = "#facc15";
    ctx.font = "bold 22px Arial";

    ctx.fillText(
        `Torque = ${torque.toFixed(2)} N·m`,
        30,
        75
    );
}

//----------------------------------------------------
// Force Arrow
//----------------------------------------------------

function drawForceArrow(x, y) {

    const F =
        Number(forceSlider.value);

    const theta =
        Number(angleSlider.value) *
        Math.PI / 180;

    const arrowLength =
        50 + F * 1.5;

    //------------------------------------------------
    // Force direction
    //
    // Perpendicular to the lever
    //------------------------------------------------

    const dx =
        -Math.sin(theta);

    const dy =
        Math.cos(theta);

    const endX =
        x + dx * arrowLength;

    const endY =
        y + dy * arrowLength;

    //------------------------------------------------
    // Arrow Line
    //------------------------------------------------

    ctx.strokeStyle = "#facc15";
    ctx.fillStyle = "#facc15";
    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(
        x,
        y
    );

    ctx.lineTo(
        endX,
        endY
    );

    ctx.stroke();

    //------------------------------------------------
    // Arrow Head
    //------------------------------------------------

    const headLength = 14;

    const sideAngle = Math.PI / 6;

    ctx.beginPath();

    ctx.moveTo(
        endX,
        endY
    );

    ctx.lineTo(
        endX -
        headLength *
        Math.cos(Math.atan2(dy, dx) - sideAngle),

        endY -
        headLength *
        Math.sin(Math.atan2(dy, dx) - sideAngle)
    );

    ctx.lineTo(
        endX -
        headLength *
        Math.cos(Math.atan2(dy, dx) + sideAngle),

        endY -
        headLength *
        Math.sin(Math.atan2(dy, dx) + sideAngle)
    );

    ctx.closePath();

    ctx.fill();

    //------------------------------------------------
    // Label
    //------------------------------------------------

    ctx.font = "17px Arial";

    ctx.fillText(
        `F = ${F} N`,
        endX + 10,
        endY
    );
}

//----------------------------------------------------
// Torque vs Force Graph
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
    // Graph Dimensions
    //------------------------------------------------

    const left = 70;
    const right = 40;
    const top = 40;
    const bottom = 55;

    const width =
        graph.width - left - right;

    const height =
        graph.height - top - bottom;

    //------------------------------------------------
    // Maximum Values
    //------------------------------------------------

    const maxForce = 100;

    const r =
        Number(leverArmSlider.value);

    const theta =
        Number(angleSlider.value) *
        Math.PI / 180;

    const maxTorque =
        r * maxForce * Math.sin(theta);

    const graphMaxTorque =
        Math.max(20, maxTorque * 1.2);

    //------------------------------------------------
    // Axes
    //------------------------------------------------

    graphCtx.strokeStyle = "#94a3b8";
    graphCtx.lineWidth = 2;

    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        top
    );

    graphCtx.lineTo(
        left,
        top + height
    );

    graphCtx.lineTo(
        left + width,
        top + height
    );

    graphCtx.stroke();

    //------------------------------------------------
    // Axis Labels
    //------------------------------------------------

    graphCtx.fillStyle = "#ffffff";
    graphCtx.font = "15px Arial";

    graphCtx.fillText(
        "Torque (N·m)",
        10,
        top + 10
    );

    graphCtx.fillText(
        "Force (N)",
        left + width - 70,
        top + height + 40
    );

    //------------------------------------------------
    // Grid Lines
    //------------------------------------------------

    graphCtx.strokeStyle =
        "rgba(148,163,184,0.2)";

    graphCtx.lineWidth = 1;

    for (let i = 1; i <= 5; i++) {

        const y =
            top +
            height -
            (height * i / 5);

        graphCtx.beginPath();

        graphCtx.moveTo(
            left,
            y
        );

        graphCtx.lineTo(
            left + width,
            y
        );

        graphCtx.stroke();
    }

    //------------------------------------------------
    // Torque Curve
    //------------------------------------------------

    graphCtx.strokeStyle = "#60a5fa";
    graphCtx.lineWidth = 4;

    graphCtx.beginPath();

    for (let F = 0; F <= maxForce; F++) {

        const torque =
            r *
            F *
            Math.sin(theta);

        const x =
            left +
            (F / maxForce) * width;

        const y =
            top +
            height -
            (torque / graphMaxTorque) *
            height;

        if (F === 0) {

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
    // Current Point
    //------------------------------------------------

    const currentForce =
        Number(forceSlider.value);

    const currentTorque =
        calculateTorque();

    const currentX =
        left +
        (currentForce / maxForce) *
        width;

    const currentY =
        top +
        height -
        (currentTorque / graphMaxTorque) *
        height;

    graphCtx.fillStyle = "#facc15";

    graphCtx.beginPath();

    graphCtx.arc(
        currentX,
        currentY,
        7,
        0,
        Math.PI * 2
    );

    graphCtx.fill();

    //------------------------------------------------
    // Current Values
    //------------------------------------------------

    graphCtx.fillStyle = "#cbd5e1";
    graphCtx.font = "14px Arial";

    graphCtx.fillText(
        `F = ${currentForce.toFixed(0)} N`,
        currentX + 10,
        currentY - 10
    );

    graphCtx.fillText(
        `τ = ${currentTorque.toFixed(1)} N·m`,
        currentX + 10,
        currentY + 12
    );
}

//----------------------------------------------------
// Animation
//----------------------------------------------------

function animate(timestamp) {

    if (!running) return;

    if (!lastTime) {
        lastTime = timestamp;
    }

    const dt =
        Math.min(
            (timestamp - lastTime) / 1000,
            0.05
        );

    lastTime = timestamp;

    //------------------------------------------------
    // Torque
    //------------------------------------------------

    const torque =
        calculateTorque();

    //------------------------------------------------
    // Simple rotational dynamics
    //
    // τ = Iα
    //
    // Treat the lever as a simple rod:
    //
    // I = (1/3)ML²
    //------------------------------------------------

    const L =
        Number(leverArmSlider.value);

    const momentOfInertia =
        (1 / 3) *
        leverMass *
        L *
        L;

    const angularAcceleration =
        torque /
        momentOfInertia;

    //------------------------------------------------
    // Update Angular Velocity
    //------------------------------------------------

    angularVelocity +=
        angularAcceleration *
        dt;

    //------------------------------------------------
    // Update Angular Position
    //------------------------------------------------

    angle +=
        angularVelocity *
        dt;

    //------------------------------------------------
    // Keep Angle Manageable
    //------------------------------------------------

    if (Math.abs(angle) > Math.PI * 2) {

        angle %= Math.PI * 2;
    }

    //------------------------------------------------
    // Redraw
    //------------------------------------------------

    drawScene();

    requestAnimationFrame(
        animate
    );
}

//----------------------------------------------------
// Start
//----------------------------------------------------

startButton.onclick = function () {

    running = true;

    lastTime = 0;

    requestAnimationFrame(
        animate
    );
};

//----------------------------------------------------
// Reset
//----------------------------------------------------

resetButton.onclick = function () {

    resetSimulation();
};

//----------------------------------------------------
// Sliders
//----------------------------------------------------

forceSlider.oninput =
    updateInformation;

leverArmSlider.oninput =
    updateInformation;

angleSlider.oninput =
    updateInformation;

//----------------------------------------------------
// Initial State
//----------------------------------------------------

resetSimulation();
