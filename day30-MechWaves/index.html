const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

const kSlider = document.getElementById("kSlider");
const massSlider = document.getElementById("massSlider");
const amplitudeSlider = document.getElementById("amplitudeSlider");

const kValue = document.getElementById("kValue");
const massValue = document.getElementById("massValue");
const amplitudeValue = document.getElementById("amplitudeValue");

const frequencyValue = document.getElementById("frequencyValue");
const periodValue = document.getElementById("periodValue");
const displacementValue = document.getElementById("displacementValue");
const calculus = document.getElementById("calculus");

const toggleButton = document.getElementById("toggleButton");
const resetButton = document.getElementById("resetButton");


// --------------------------------------------------
// State
// --------------------------------------------------

let k = 20;
let mass = 2;
let amplitude = 100;

let time = 0;
let running = true;

let lastTime = performance.now();

let graphData = [];

const GRAPH_TIME = 5;


// --------------------------------------------------
// Physics
// --------------------------------------------------

function getAngularFrequency() {
    return Math.sqrt(k / mass);
}


function getPeriod() {
    return 2 * Math.PI * Math.sqrt(mass / k);
}


function getDisplacement() {
    const omega = getAngularFrequency();

    return amplitude * Math.cos(omega * time);
}


// --------------------------------------------------
// Draw Spring
// --------------------------------------------------

function drawSpring() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const centerY = canvas.height / 2;

    const wallX = 70;
    const equilibriumX = 380;

    const displacement = getDisplacement();

    const massX = equilibriumX + displacement;


    // Floor

    ctx.beginPath();

    ctx.moveTo(40, centerY + 90);
    ctx.lineTo(560, centerY + 90);

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 3;

    ctx.stroke();


    // Wall

    ctx.fillStyle = "#475569";

    ctx.fillRect(
        wallX,
        centerY - 100,
        15,
        200
    );


    // Spring

    const springStart = wallX + 15;
    const springEnd = massX - 35;

    const springLength = springEnd - springStart;

    const coils = 14;
    const coilHeight = 18;


    ctx.beginPath();

    ctx.moveTo(
        springStart,
        centerY
    );


    for (let i = 1; i <= coils; i++) {

        const x =
            springStart +
            (springLength / coils) * i;

        let y = centerY;

        if (i < coils) {

            y =
                centerY +
                (i % 2 === 0
                    ? -coilHeight
                    : coilHeight);

        }

        ctx.lineTo(x, y);
    }


    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 4;

    ctx.stroke();


    // Mass

    ctx.fillStyle = "#e2e8f0";

    ctx.fillRect(
        massX - 35,
        centerY - 35,
        70,
        70
    );

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        massX - 35,
        centerY - 35,
        70,
        70
    );


    // Equilibrium line

    ctx.beginPath();

    ctx.setLineDash([6, 6]);

    ctx.moveTo(
        equilibriumX,
        centerY - 130
    );

    ctx.lineTo(
        equilibriumX,
        centerY + 130
    );

    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.setLineDash([]);


    // Labels

    ctx.fillStyle = "#334155";

    ctx.font = "15px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "Equilibrium",
        equilibriumX,
        centerY - 145
    );

    ctx.fillText(
        "Mass",
        massX,
        centerY + 125
    );

    ctx.fillText(
        "x(t)",
        massX,
        centerY - 55
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


    const left = 55;
    const right = graph.width - 25;

    const top = 25;
    const bottom = graph.height - 40;

    const centerY =
        (top + bottom) / 2;


    // Background

    graphCtx.fillStyle = "#fafafa";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    // Zero line

    graphCtx.beginPath();

    graphCtx.moveTo(left, centerY);
    graphCtx.lineTo(right, centerY);

    graphCtx.strokeStyle = "#cbd5e1";
    graphCtx.lineWidth = 1;

    graphCtx.stroke();


    // Y axis

    graphCtx.beginPath();

    graphCtx.moveTo(left, top);
    graphCtx.lineTo(left, bottom);

    graphCtx.strokeStyle = "#64748b";

    graphCtx.stroke();


    // X axis

    graphCtx.beginPath();

    graphCtx.moveTo(left, bottom);
    graphCtx.lineTo(right, bottom);

    graphCtx.strokeStyle = "#64748b";

    graphCtx.stroke();


    if (graphData.length < 2) {
        return;
    }


    // Find time range

    const newestTime =
        graphData[graphData.length - 1].time;

    const oldestTime =
        Math.max(0, newestTime - GRAPH_TIME);


    // Plot displacement

    graphCtx.beginPath();


    graphData.forEach((point, index) => {

        if (point.time < oldestTime) {
            return;
        }


        const progress =
            (point.time - oldestTime) /
            GRAPH_TIME;


        const x =
            left +
            progress *
            (right - left);


        const y =
            centerY -
            (point.displacement / 180) *
            95;


        if (index === 0 || point.time === oldestTime) {

            graphCtx.moveTo(x, y);

        } else {

            graphCtx.lineTo(x, y);

        }

    });


    graphCtx.strokeStyle = "#60a5fa";
    graphCtx.lineWidth = 3;

    graphCtx.stroke();


    // Labels

    graphCtx.fillStyle = "#334155";

    graphCtx.font = "13px Arial";
    graphCtx.textAlign = "left";

    graphCtx.fillText(
        "Displacement",
        left + 5,
        17
    );

    graphCtx.textAlign = "right";

    graphCtx.fillText(
        "Time",
        right,
        graph.height - 12
    );
}


// --------------------------------------------------
// Information + LaTeX
// --------------------------------------------------

function updateInformation() {

    const omega =
        getAngularFrequency();

    const period =
        getPeriod();

    const displacement =
        getDisplacement();


    kValue.textContent =
        `${k.toFixed(0)} N/m`;

    massValue.textContent =
        `${mass.toFixed(1)} kg`;

    amplitudeValue.textContent =
        `${amplitude.toFixed(0)} px`;


    frequencyValue.innerHTML = `
        \\[
        \\omega = \\sqrt{\\frac{k}{m}}
        \\]

        \\[
        \\omega = ${omega.toFixed(2)}\\ \\text{rad/s}
        \\]
    `;


    periodValue.innerHTML = `
        \\[
        T = 2\\pi\\sqrt{\\frac{m}{k}}
        \\]

        \\[
        T = ${period.toFixed(2)}\\ \\text{s}
        \\]
    `;


    displacementValue.innerHTML = `
        \\[
        x(t) = ${displacement.toFixed(1)}\\ \\text{px}
        \\]
    `;


    calculus.innerHTML = `
        Simple harmonic motion can be described
        using a sinusoidal function:

        \\[
        x(t) = A\\cos(\\omega t)
        \\]

        Taking the derivative gives velocity:

        \\[
        v(t) = \\frac{dx}{dt}
        \\]

        Taking another derivative gives acceleration:

        \\[
        a(t) = \\frac{d^2x}{dt^2}
        \\]

        For a spring, Hooke's law gives:

        \\[
        F = -kx
        \\]

        Combining this with Newton's second law gives:

        \\[
        m\\frac{d^2x}{dt^2} = -kx
        \\]

        or

        \\[
        \\frac{d^2x}{dt^2}
        +
        \\frac{k}{m}x
        = 0
        \\]
    `;


    if (window.MathJax) {

        MathJax.typesetClear([
            frequencyValue,
            periodValue,
            displacementValue,
            calculus
        ]);

        MathJax.typesetPromise([
            frequencyValue,
            periodValue,
            displacementValue,
            calculus
        ]);
    }
}


// --------------------------------------------------
// Animation
// --------------------------------------------------

function animate(currentTime) {

    const deltaTime =
        Math.min(
            (currentTime - lastTime) / 1000,
            0.05
        );

    lastTime = currentTime;


    if (running) {

        time += deltaTime;


        graphData.push({
            time: time,
            displacement: getDisplacement()
        });


        // Keep enough data for the graph
        // without allowing the array to grow forever.

        while (
            graphData.length > 0 &&
            graphData[0].time < time - GRAPH_TIME
        ) {

            graphData.shift();

        }

    }


    drawSpring();
    drawGraph();


    // Update text separately from the animation
    // so MathJax does not get hammered every frame.

    if (
        !window.__lastInfoUpdate ||
        currentTime - window.__lastInfoUpdate > 100
    ) {

        updateInformation();

        window.__lastInfoUpdate = currentTime;
    }


    requestAnimationFrame(animate);
}


// --------------------------------------------------
// Controls
// --------------------------------------------------

kSlider.addEventListener(
    "input",
    () => {

        k =
            parseFloat(kSlider.value);

        updateInformation();

    }
);


massSlider.addEventListener(
    "input",
    () => {

        mass =
            parseFloat(massSlider.value);

        updateInformation();

    }
);


amplitudeSlider.addEventListener(
    "input",
    () => {

        amplitude =
            parseFloat(amplitudeSlider.value);

        updateInformation();

    }
);


toggleButton.addEventListener(
    "click",
    () => {

        running = !running;

        toggleButton.textContent =
            running
                ? "Pause"
                : "Play";

    }
);


resetButton.addEventListener(
    "click",
    () => {

        k = 20;
        mass = 2;
        amplitude = 100;

        time = 0;

        graphData = [];

        kSlider.value = 20;
        massSlider.value = 2;
        amplitudeSlider.value = 100;

        running = true;

        toggleButton.textContent = "Pause";

        updateInformation();

    }
);


// --------------------------------------------------
// Start
// --------------------------------------------------

updateInformation();

requestAnimationFrame(animate);
