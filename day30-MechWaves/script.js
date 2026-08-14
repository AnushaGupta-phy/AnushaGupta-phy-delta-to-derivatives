const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");


/* ================================
   CONTROLS
================================ */

const amplitudeSlider =
    document.getElementById("amplitude");

const wavelengthSlider =
    document.getElementById("wavelength");

const frequencySlider =
    document.getElementById("frequency");


const amplitudeValue =
    document.getElementById("amplitudeValue");

const wavelengthValue =
    document.getElementById("wavelengthValue");

const frequencyValue =
    document.getElementById("frequencyValue");


const speedValue =
    document.getElementById("speedValue");

const waveValue =
    document.getElementById("waveValue");

const calculus =
    document.getElementById("calculus");


const toggleButton =
    document.getElementById("toggleButton");

const resetButton =
    document.getElementById("resetButton");


/* ================================
   STATE
================================ */

let amplitude = 50;

let wavelength = 200;

let frequency = 1;

let time = 0;

let running = true;

let lastTime = performance.now();


/* ================================
   GRAPH HISTORY
================================ */

let graphHistory = [];


/* ================================
   PHYSICS
================================ */

function getWaveNumber() {

    return (
        2 * Math.PI / wavelength
    );

}


function getAngularFrequency() {

    return (
        2 * Math.PI * frequency
    );

}


function getWaveSpeed() {

    return (
        frequency * wavelength
    );

}


/*
    Traveling wave:

    y(x,t)
    =
    A sin(kx - ωt)
*/

function getWaveY(x, t) {

    const k =
        getWaveNumber();

    const omega =
        getAngularFrequency();

    return (
        amplitude *
        Math.sin(
            k * x -
            omega * t
        )
    );

}


/* ================================
   DRAW SIMULATION
================================ */

function drawSimulation() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* Background */

    ctx.fillStyle = "#020617";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const centerY =
        canvas.height / 2;


    /* Medium line */

    ctx.beginPath();

    ctx.moveTo(
        30,
        centerY
    );

    ctx.lineTo(
        canvas.width - 30,
        centerY
    );

    ctx.strokeStyle =
        "#334155";

    ctx.lineWidth = 2;

    ctx.stroke();


    /* Wave */

    ctx.beginPath();


    for (
        let x = 0;
        x <= canvas.width;
        x += 2
    ) {

        const y =
            centerY -
            getWaveY(x, time);


        if (x === 0) {

            ctx.moveTo(
                x,
                y
            );

        } else {

            ctx.lineTo(
                x,
                y
            );

        }

    }


    ctx.strokeStyle =
        "#60a5fa";

    ctx.lineWidth = 4;

    ctx.stroke();


    /* Medium particles */

    for (
        let x = 30;
        x < canvas.width;
        x += 35
    ) {

        const displacement =
            getWaveY(x, time);


        const y =
            centerY -
            displacement;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#93c5fd";

        ctx.fill();

    }


    /* Equilibrium label */

    ctx.fillStyle =
        "#94a3b8";

    ctx.font =
        "14px Arial";

    ctx.textAlign =
        "left";

    ctx.fillText(
        "Equilibrium",
        35,
        centerY - 10
    );


    /* Wave label */

    ctx.fillStyle =
        "#60a5fa";

    ctx.font =
        "16px Arial";

    ctx.fillText(
        "y(x,t)",
        canvas.width - 80,
        35
    );

}


/* ================================
   DRAW GRAPH
================================ */

function drawGraph() {

    graphCtx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


    /* Background */

    graphCtx.fillStyle =
        "#020617";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    const left = 45;

    const right =
        graph.width - 20;

    const top = 20;

    const bottom =
        graph.height - 35;

    const centerY =
        (top + bottom) / 2;


    /* Axes */

    graphCtx.strokeStyle =
        "#475569";

    graphCtx.lineWidth = 1;


    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        centerY
    );

    graphCtx.lineTo(
        right,
        centerY
    );

    graphCtx.stroke();


    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        top
    );

    graphCtx.lineTo(
        left,
        bottom
    );

    graphCtx.stroke();


    /* Current wave profile */

    graphCtx.beginPath();


    for (
        let x = 0;
        x <= graph.width - 65;
        x += 2
    ) {

        const physicalX =
            x *
            (canvas.width /
            (graph.width - 65));


        const yValue =
            getWaveY(
                physicalX,
                time
            );


        const graphX =
            left + x;


        const graphY =
            centerY -
            (
                yValue /
                120
            ) *
            105;


        if (x === 0) {

            graphCtx.moveTo(
                graphX,
                graphY
            );

        } else {

            graphCtx.lineTo(
                graphX,
                graphY
            );

        }

    }


    graphCtx.strokeStyle =
        "#60a5fa";

    graphCtx.lineWidth = 3;

    graphCtx.stroke();


    /* Labels */

    graphCtx.fillStyle =
        "#94a3b8";

    graphCtx.font =
        "12px Arial";

    graphCtx.textAlign =
        "left";

    graphCtx.fillText(
        "Displacement",
        left + 5,
        15
    );

    graphCtx.textAlign =
        "right";

    graphCtx.fillText(
        "Position",
        right,
        graph.height - 10
    );

}


/* ================================
   UPDATE INFORMATION
================================ */

function updateInformation() {

    const speed =
        getWaveSpeed();


    amplitudeValue.textContent =
        `${amplitude.toFixed(0)} px`;


    wavelengthValue.textContent =
        `${wavelength.toFixed(0)} px`;


    frequencyValue.textContent =
        `${frequency.toFixed(1)} Hz`;


    speedValue.innerHTML = `

        \\[
        v = f\\lambda
        \\]

        \\[
        v =
        ${frequency.toFixed(1)}
        \\times
        ${wavelength.toFixed(0)}
        =
        ${speed.toFixed(1)}
        \\text{ px/s}
        \\]

    `;


    waveValue.innerHTML = `

        \\[
        k =
        \\frac{2\\pi}{\\lambda}
        \\]

        \\[
        \\omega =
        2\\pi f
        \\]

    `;


    calculus.innerHTML = `

        A traveling wave can be written as:

        \\[
        y(x,t)
        =
        A\\sin(kx-\\omega t)
        \\]

        Taking the derivative with respect to position
        gives the slope of the wave:

        \\[
        \\frac{\\partial y}{\\partial x}
        =
        Ak\\cos(kx-\\omega t)
        \\]

        Taking the derivative with respect to time
        describes how the displacement changes:

        \\[
        \\frac{\\partial y}{\\partial t}
        =
        -A\\omega\\cos(kx-\\omega t)
        \\]

        So calculus lets us describe both the
        shape of the wave and how that shape changes
        as the wave travels.

    `;


    renderMath();
}


/* ================================
   MATHJAX
================================ */

function renderMath() {

    if (!window.MathJax) {
        return;
    }


    MathJax.typesetClear([
        speedValue,
        waveValue,
        calculus
    ]);


    MathJax.typesetPromise([
        speedValue,
        waveValue,
        calculus
    ]);

}


/* ================================
   ANIMATION
================================ */

function animate(currentTime) {

    let deltaTime =
        (currentTime - lastTime) /
        1000;


    lastTime =
        currentTime;


    /* Prevent huge jumps after tab switching */

    deltaTime =
        Math.min(
            deltaTime,
            0.05
        );


    if (running) {

        time += deltaTime;

    }


    drawSimulation();

    drawGraph();


    requestAnimationFrame(
        animate
    );

}


/* ================================
   AMPLITUDE
================================ */

amplitudeSlider.addEventListener(
    "input",
    () => {

        amplitude =
            parseFloat(
                amplitudeSlider.value
            );

        updateInformation();

    }
);


/* ================================
   WAVELENGTH
================================ */

wavelengthSlider.addEventListener(
    "input",
    () => {

        wavelength =
            parseFloat(
                wavelengthSlider.value
            );

        updateInformation();

    }
);


/* ================================
   FREQUENCY
================================ */

frequencySlider.addEventListener(
    "input",
    () => {

        frequency =
            parseFloat(
                frequencySlider.value
            );

        updateInformation();

    }
);


/* ================================
   PAUSE / PLAY
================================ */

toggleButton.addEventListener(
    "click",
    () => {

        running =
            !running;


        toggleButton.textContent =
            running
                ? "Pause"
                : "Play";

    }
);


/* ================================
   RESET
================================ */

resetButton.addEventListener(
    "click",
    () => {

        amplitude = 50;

        wavelength = 200;

        frequency = 1;

        time = 0;

        running = true;


        amplitudeSlider.value = 50;

        wavelengthSlider.value = 200;

        frequencySlider.value = 1;


        toggleButton.textContent =
            "Pause";


        updateInformation();

    }
);


/* ================================
   START
================================ */

updateInformation();

requestAnimationFrame(
    animate
);
