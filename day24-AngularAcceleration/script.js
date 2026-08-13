const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

const angularAccelerationSlider =
    document.getElementById("angularAcceleration");

const initialVelocitySlider =
    document.getElementById("initialVelocity");

const startingAngleSlider =
    document.getElementById("startingAngle");

const angularAccelerationValue =
    document.getElementById("angularAccelerationValue");

const initialVelocityValue =
    document.getElementById("initialVelocityValue");

const startingAngleValue =
    document.getElementById("startingAngleValue");

const angularPositionDisplay =
    document.getElementById("angularPosition");

const angularVelocityDisplay =
    document.getElementById("angularVelocity");

const angularAccelerationDisplay =
    document.getElementById("angularAccelerationDisplay");

const calculusDisplay =
    document.getElementById("calculus");

const explanationDisplay =
    document.getElementById("explanation");

const startButton =
    document.getElementById("startButton");

const resetButton =
    document.getElementById("resetButton");


/* =========================
   Simulation State
========================= */

let running = false;

let elapsed = 0;

let angle = 0;

let angularVelocity = 0;

let animationFrame;

let lastTime = null;

let graphData = [];


/* =========================
   Constants
========================= */

const radius = 170;

const maxTime = 10;


/* =========================
   Reset
========================= */

function resetSimulation() {

    cancelAnimationFrame(animationFrame);

    running = false;

    elapsed = 0;

    lastTime = null;

    graphData = [];

    angle =
        Number(startingAngleSlider.value) *
        Math.PI / 180;

    angularVelocity =
        Number(initialVelocitySlider.value);

    updateDisplays();

    drawScene();

    drawGraph();
}


/* =========================
   Update Displays
========================= */

function updateDisplays() {

    const alpha =
        Number(angularAccelerationSlider.value);

    const initialVelocity =
        Number(initialVelocitySlider.value);

    const startingAngle =
        Number(startingAngleSlider.value);


    angularAccelerationValue.textContent =
        alpha.toFixed(1) + " rad/s²";


    initialVelocityValue.textContent =
        initialVelocity.toFixed(1) + " rad/s";


    startingAngleValue.textContent =
        startingAngle.toFixed(0) + "°";


    const angleDegrees =
        angle * 180 / Math.PI;


    angularPositionDisplay.textContent =
        angleDegrees.toFixed(1) + "°";


    angularVelocityDisplay.textContent =
        angularVelocity.toFixed(2) +
        " rad/s";


    angularAccelerationDisplay.textContent =
        alpha.toFixed(2) +
        " rad/s²";


    calculusDisplay.innerHTML = `

        Angular acceleration is the derivative
        of angular velocity:

        <br><br>

        <strong>
            α = dω/dt
        </strong>

        <br><br>

        Since angular velocity is

        <br><br>

        <strong>
            ω = dθ/dt
        </strong>

        <br><br>

        angular acceleration can also be written as

        <br><br>

        <strong>
            α = d²θ/dt²
        </strong>

    `;


    explanationDisplay.innerHTML = `

        Angular acceleration describes how quickly
        the angular velocity changes.

        <br><br>

        Currently:

        <strong>
            α = ${alpha.toFixed(2)} rad/s²
        </strong>

        <br><br>

        The rotating object starts with an angular
        velocity of

        <strong>
            ${initialVelocity.toFixed(2)} rad/s
        </strong>.

        <br><br>

        Watch how the slope of the
        <strong>ω vs. t</strong> graph represents
        the angular acceleration.

    `;

}


/* =========================
   Draw Simulation
========================= */

function drawScene() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "#0f172a";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const centerX =
        canvas.width / 2;

    const centerY = 260;


    /* Reference circle */

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#1e3a5f";

    ctx.fill();

    ctx.strokeStyle = "#60a5fa";

    ctx.lineWidth = 3;

    ctx.stroke();


    /* Center */

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        7,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#facc15";

    ctx.fill();


    /* Radius */

    const pointX =
        centerX +
        radius * Math.cos(angle);

    const pointY =
        centerY -
        radius * Math.sin(angle);


    ctx.strokeStyle = "#94a3b8";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        centerY
    );

    ctx.lineTo(
        pointX,
        pointY
    );

    ctx.stroke();


    /* Rotating point */

    ctx.beginPath();

    ctx.arc(
        pointX,
        pointY,
        12,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#3b82f6";

    ctx.fill();


    /* Angular velocity direction */

    const velocityArrow =
        Math.min(
            Math.abs(angularVelocity) * 15,
            100
        );


    if (Math.abs(angularVelocity) > 0.05) {

        const direction =
            angularVelocity > 0 ? 1 : -1;

        const arrowStartX =
            pointX -
            direction * 20 *
            Math.sin(angle);

        const arrowStartY =
            pointY -
            direction * 20 *
            Math.cos(angle);


        const tangentX =
            direction *
            velocityArrow *
            Math.cos(angle);

        const tangentY =
            direction *
            velocityArrow *
            -Math.sin(angle);


        ctx.strokeStyle = "#facc15";

        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.moveTo(
            arrowStartX,
            arrowStartY
        );

        ctx.lineTo(
            arrowStartX + tangentX,
            arrowStartY + tangentY
        );

        ctx.stroke();


        /* Arrowhead */

        const endX =
            arrowStartX + tangentX;

        const endY =
            arrowStartY + tangentY;


        const arrowSize = 9;


        ctx.beginPath();

        ctx.moveTo(
            endX,
            endY
        );

        ctx.lineTo(
            endX -
            arrowSize *
            Math.cos(angle - direction * 0.6),

            endY -
            arrowSize *
            -Math.sin(angle - direction * 0.6)
        );

        ctx.moveTo(
            endX,
            endY
        );

        ctx.lineTo(
            endX -
            arrowSize *
            Math.cos(angle + direction * 0.6),

            endY -
            arrowSize *
            -Math.sin(angle + direction * 0.6)
        );

        ctx.stroke();

    }


    /* Angle arc */

    ctx.strokeStyle = "#22c55e";

    ctx.lineWidth = 3;

    const displayedAngle =
        angle % (Math.PI * 2);


    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        55,
        0,
        -displayedAngle,
        displayedAngle > 0
    );

    ctx.stroke();


    /* Labels */

    ctx.fillStyle = "white";

    ctx.font = "16px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "θ",
        centerX + 70,
        centerY - 25
    );


    ctx.fillStyle = "#60a5fa";

    ctx.fillText(
        "Rotating Point",
        pointX,
        pointY - 20
    );


    ctx.fillStyle = "#cbd5e1";

    ctx.fillText(
        "Angular velocity: " +
        angularVelocity.toFixed(2) +
        " rad/s",
        centerX,
        45
    );


    ctx.fillText(
        "Angular acceleration: " +
        Number(
            angularAccelerationSlider.value
        ).toFixed(2) +
        " rad/s²",
        centerX,
        70
    );

}


/* =========================
   Draw Graph
========================= */

function drawGraph() {

    graphCtx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


    graphCtx.fillStyle = "#0f172a";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    const left = 70;

    const right = 35;

    const top = 30;

    const bottom = 55;

    const width =
        graph.width - left - right;

    const height =
        graph.height - top - bottom;


    /* Axes */

    graphCtx.strokeStyle = "#94a3b8";

    graphCtx.lineWidth = 2;

    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        top
    );

    graphCtx.lineTo(
        left,
        graph.height - bottom
    );

    graphCtx.lineTo(
        graph.width - right,
        graph.height - bottom
    );

    graphCtx.stroke();


    /* Grid */

    graphCtx.strokeStyle = "#1e293b";

    graphCtx.lineWidth = 1;


    for (let i = 0; i <= 5; i++) {

        const x =
            left +
            (width / 5) * i;


        graphCtx.beginPath();

        graphCtx.moveTo(
            x,
            top
        );

        graphCtx.lineTo(
            x,
            graph.height - bottom
        );

        graphCtx.stroke();

    }


    for (let i = 0; i <= 4; i++) {

        const y =
            top +
            (height / 4) * i;


        graphCtx.beginPath();

        graphCtx.moveTo(
            left,
            y
        );

        graphCtx.lineTo(
            graph.width - right,
            y
        );

        graphCtx.stroke();

    }


    /* Labels */

    graphCtx.fillStyle = "white";

    graphCtx.font = "15px Arial";

    graphCtx.textAlign = "center";


    graphCtx.fillText(
        "Time (s)",
        graph.width / 2,
        graph.height - 15
    );


    graphCtx.save();

    graphCtx.translate(
        18,
        graph.height / 2
    );

    graphCtx.rotate(-Math.PI / 2);

    graphCtx.fillText(
        "Angular Velocity ω",
        0,
        0
    );

    graphCtx.restore();


    if (graphData.length < 2) {

        return;

    }


    const alpha =
        Number(
            angularAccelerationSlider.value
        );


    const initialVelocity =
        Number(
            initialVelocitySlider.value
        );


    const velocities =
        graphData.map(
            point => point.velocity
        );


    const minimum =
        Math.min(
            -1,
            ...velocities
        );


    const maximum =
        Math.max(
            1,
            ...velocities
        );


    const padding =
        Math.max(
            2,
            (maximum - minimum) * 0.15
        );


    const minVelocity =
        minimum - padding;

    const maxVelocity =
        maximum + padding;


    graphCtx.strokeStyle = "#60a5fa";

    graphCtx.lineWidth = 3;

    graphCtx.beginPath();


    graphData.forEach(
        (point, index) => {

            const x =
                left +
                (point.time / maxTime) *
                width;


            const normalized =
                (point.velocity - minVelocity) /
                (maxVelocity - minVelocity);


            const y =
                graph.height -
                bottom -
                normalized * height;


            if (index === 0) {

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
    );


    graphCtx.stroke();


    /* Current point */

    const last =
        graphData[
            graphData.length - 1
        ];


    const currentX =
        left +
        (last.time / maxTime) *
        width;


    const currentNormalized =
        (last.velocity - minVelocity) /
        (maxVelocity - minVelocity);


    const currentY =
        graph.height -
        bottom -
        currentNormalized * height;


    graphCtx.beginPath();

    graphCtx.arc(
        currentX,
        currentY,
        5,
        0,
        Math.PI * 2
    );

    graphCtx.fillStyle = "#facc15";

    graphCtx.fill();


    /* Slope label */

    graphCtx.fillStyle = "#22c55e";

    graphCtx.font = "14px Arial";

    graphCtx.textAlign = "left";

    graphCtx.fillText(
        "Slope = α = " +
        alpha.toFixed(2) +
        " rad/s²",
        left + 15,
        top + 20
    );

}


/* =========================
   Animation
========================= */

function animate(timestamp) {

    if (!running) {
        return;
    }


    if (lastTime === null) {

        lastTime = timestamp;

    }


    const dt =
        Math.min(
            (timestamp - lastTime) / 1000,
            0.05
        );


    lastTime = timestamp;


    const alpha =
        Number(
            angularAccelerationSlider.value
        );


    elapsed += dt;


    /*
        α = dω/dt

        Therefore:

        ω(t) = ω₀ + αt
    */

    angularVelocity +=
        alpha * dt;


    /*
        ω = dθ/dt

        Therefore:

        θ(t) += ω dt
    */

    angle +=
        angularVelocity * dt;


    graphData.push({

        time: elapsed,

        velocity: angularVelocity,

        angle: angle

    });


    /* Stop after 10 seconds */

    if (elapsed >= maxTime) {

        running = false;

    }


    updateDisplays();

    drawScene();

    drawGraph();


    if (running) {

        animationFrame =
            requestAnimationFrame(
                animate
            );

    }

}


/* =========================
   Start Button
========================= */

startButton.onclick = function () {

    cancelAnimationFrame(
        animationFrame
    );


    elapsed = 0;

    lastTime = null;

    graphData = [];


    angle =
        Number(
            startingAngleSlider.value
        ) *
        Math.PI / 180;


    angularVelocity =
        Number(
            initialVelocitySlider.value
        );


    running = true;


    animationFrame =
        requestAnimationFrame(
            animate
        );

};


/* =========================
   Reset Button
========================= */

resetButton.onclick = function () {

    resetSimulation();

};


/* =========================
   Slider Events
========================= */

angularAccelerationSlider.oninput =
    function () {

        if (!running) {

            updateDisplays();

            drawScene();

            drawGraph();

        } else {

            updateDisplays();

        }

    };


initialVelocitySlider.oninput =
    function () {

        if (!running) {

            angularVelocity =
                Number(
                    initialVelocitySlider.value
                );

        }

        updateDisplays();

        drawScene();

        drawGraph();

    };


startingAngleSlider.oninput =
    function () {

        if (!running) {

            angle =
                Number(
                    startingAngleSlider.value
                ) *
                Math.PI / 180;

        }

        updateDisplays();

        drawScene();

        drawGraph();

    };


/* =========================
   Initial Setup
========================= */

resetSimulation();
