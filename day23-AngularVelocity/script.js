const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

const angularVelocitySlider =
    document.getElementById("angularVelocity");

const radiusSlider =
    document.getElementById("radius");

const startingAngleSlider =
    document.getElementById("startingAngle");

const angularVelocityValue =
    document.getElementById("angularVelocityValue");

const radiusValue =
    document.getElementById("radiusValue");

const startingAngleValue =
    document.getElementById("startingAngleValue");

const angularPositionDisplay =
    document.getElementById("angularPosition");

const angularVelocityDisplay =
    document.getElementById("angularVelocityDisplay");

const linearSpeedDisplay =
    document.getElementById("linearSpeed");

const calculusDisplay =
    document.getElementById("calculus");

const explanationDisplay =
    document.getElementById("explanation");

const startButton =
    document.getElementById("startButton");

const resetButton =
    document.getElementById("resetButton");


/* ========================= */
/* Simulation State */
/* ========================= */

let running = false;

let elapsed = 0;

let angle = 0;

let animationFrame;

let graphData = [];

let lastTime = null;


/* ========================= */
/* Reset */
/* ========================= */

function resetSimulation() {

    cancelAnimationFrame(animationFrame);

    running = false;

    elapsed = 0;

    lastTime = null;

    graphData = [];

    angle =
        Number(startingAngleSlider.value) *
        Math.PI /
        180;

    updateDisplays();

    drawScene();

    drawGraph();

}


/* ========================= */
/* Update Displays */
/* ========================= */

function updateDisplays() {

    const omega =
        Number(angularVelocitySlider.value);

    const radius =
        Number(radiusSlider.value);

    const startingAngle =
        Number(startingAngleSlider.value);


    angularVelocityValue.textContent =
        omega.toFixed(1) + " rad/s";

    radiusValue.textContent =
        radius.toFixed(0) + " px";

    startingAngleValue.textContent =
        startingAngle.toFixed(0) + "°";


    const angleDegrees =
        angle * 180 / Math.PI;


    angularPositionDisplay.textContent =
        angleDegrees.toFixed(1) + "°";


    angularVelocityDisplay.textContent =
        omega.toFixed(2) + " rad/s";


    const linearSpeed =
        Math.abs(radius * omega);


    linearSpeedDisplay.textContent =
        linearSpeed.toFixed(2) + " px/s";


    calculusDisplay.innerHTML = `
        Angular velocity is the derivative
        of angular position:

        <br><br>

        <strong>ω = dθ/dt</strong>

        <br><br>

        This means angular velocity is the
        slope of the θ vs. time graph.
    `;


    explanationDisplay.innerHTML = `
        The disk rotates with angular velocity
        <strong>${omega.toFixed(2)} rad/s</strong>.

        <br><br>

        A positive angular velocity produces
        counterclockwise rotation, while a
        negative angular velocity produces
        clockwise rotation.

        <br><br>

        Watch how changing ω changes the slope
        of the angular-position graph.
    `;

}


/* ========================= */
/* Draw Simulation */
/* ========================= */

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


    const centerX = canvas.width / 2;

    const centerY = 250;

    const radius =
        Number(radiusSlider.value);


    /* Ground */

    ctx.strokeStyle = "#475569";

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(80, centerY);

    ctx.lineTo(820, centerY);

    ctx.stroke();


    /* Vertical reference */

    ctx.strokeStyle = "#334155";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(centerX, 60);

    ctx.lineTo(centerX, 440);

    ctx.stroke();


    /* Disk */

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
        6,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#facc15";

    ctx.fill();


    /* Rotating point */

    const pointX =
        centerX +
        radius * Math.cos(angle);

    const pointY =
        centerY -
        radius * Math.sin(angle);


    /* Radius line */

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


    /* Point */

    ctx.beginPath();

    ctx.arc(
        pointX,
        pointY,
        10,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#3b82f6";

    ctx.fill();


    /* Angle arc */

    ctx.strokeStyle = "#22c55e";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        55,
        0,
        -angle,
        true
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
        pointY - 18
    );


    ctx.fillStyle = "#cbd5e1";

    ctx.fillText(
        "r = " + radius + " px",
        centerX,
        centerY + radius + 30
    );

}


/* ========================= */
/* Draw Graph */
/* ========================= */

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

    const right = 40;

    const top = 35;

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
        "Angular Position θ",
        0,
        0
    );

    graphCtx.restore();


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


    /* Graph data */

    if (graphData.length < 2) {

        return;

    }


    const maxTime = 10;

    const maxAngle = 4 * Math.PI;

    const minAngle = -4 * Math.PI;


    graphCtx.strokeStyle = "#60a5fa";

    graphCtx.lineWidth = 3;

    graphCtx.beginPath();


    graphData.forEach((point, index) => {

        const x =
            left +
            (point.time / maxTime) *
            width;


        const normalized =
            (point.angle - minAngle) /
            (maxAngle - minAngle);


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

    });


    graphCtx.stroke();


    /* Current point */

    const last =
        graphData[graphData.length - 1];


    const currentX =
        left +
        (last.time / maxTime) *
        width;


    const currentNormalized =
        (last.angle - minAngle) /
        (maxAngle - minAngle);


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

}


/* ========================= */
/* Animation */
/* ========================= */

function animate(timestamp) {

    if (!running) {

        return;

    }


    if (lastTime === null) {

        lastTime = timestamp;

    }


    const deltaTime =
        Math.min(
            (timestamp - lastTime) / 1000,
            0.05
        );


    lastTime = timestamp;


    const omega =
        Number(
            angularVelocitySlider.value
        );


    elapsed += deltaTime;


    angle +=
        omega * deltaTime;


    graphData.push({

        time: elapsed,

        angle: angle

    });


    /* Keep graph at 10 seconds */

    if (elapsed >= 10) {

        running = false;

    }


    updateDisplays();

    drawScene();

    drawGraph();


    if (running) {

        animationFrame =
            requestAnimationFrame(animate);

    }

}


/* ========================= */
/* Start */
/* ========================= */

startButton.onclick = function () {

    cancelAnimationFrame(animationFrame);

    elapsed = 0;

    lastTime = null;

    graphData = [];

    angle =
        Number(
            startingAngleSlider.value
        ) *
        Math.PI /
        180;

    running = true;

    animationFrame =
        requestAnimationFrame(animate);

};


/* ========================= */
/* Reset */
/* ========================= */

resetButton.onclick = function () {

    resetSimulation();

};


/* ========================= */
/* Sliders */
/* ========================= */

angularVelocitySlider.oninput =
    function () {

        updateDisplays();

        drawScene();

        drawGraph();

    };


radiusSlider.oninput =
    function () {

        updateDisplays();

        drawScene();

    };


startingAngleSlider.oninput =
    function () {

        if (!running) {

            angle =
                Number(
                    startingAngleSlider.value
                ) *
                Math.PI /
                180;

        }

        updateDisplays();

        drawScene();

    };


/* ========================= */
/* Initial Draw */
/* ========================= */

resetSimulation();
