const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");


const graph =
    document.getElementById("graph");

const graphCtx =
    graph.getContext("2d");


/* ================================
   CONTROLS
================================ */

const frequencySlider =
    document.getElementById("frequency");

const amplitudeSlider =
    document.getElementById("amplitude");


const frequencyValue =
    document.getElementById("frequencyValue");

const amplitudeValue =
    document.getElementById("amplitudeValue");


const frequencyInfo =
    document.getElementById("frequencyInfo");

const amplitudeInfo =
    document.getElementById("amplitudeInfo");

const calculus =
    document.getElementById("calculus");


const toggleButton =
    document.getElementById("toggleButton");

const resetButton =
    document.getElementById("resetButton");


/* ================================
   STATE
================================ */

let frequency = 440;

let amplitude = 50;

let time = 0;

let running = false;

let lastTime =
    performance.now();


/* ================================
   WAVE
================================ */

function getAngularFrequency() {

    return (
        2 *
        Math.PI *
        frequency
    );

}


function getPressure(t) {

    const omega =
        getAngularFrequency();

    return (
        amplitude *
        Math.sin(
            omega * t
        )
    );

}


/* ================================
   DRAW SPEAKER
================================ */

function drawSimulation() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle =
        "#020617";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const centerY =
        canvas.height / 2;


    /* Speaker */

    const speakerX = 95;

    const speakerY =
        centerY - 90;


    ctx.fillStyle =
        "#334155";

    ctx.fillRect(
        speakerX,
        speakerY,
        75,
        180
    );


    /* Speaker cone */

    ctx.beginPath();

    ctx.moveTo(
        speakerX + 75,
        centerY - 65
    );

    ctx.lineTo(
        speakerX + 145,
        centerY - 115
    );

    ctx.lineTo(
        speakerX + 145,
        centerY + 115
    );

    ctx.lineTo(
        speakerX + 75,
        centerY + 65
    );

    ctx.closePath();

    ctx.fillStyle =
        "#475569";

    ctx.fill();

    ctx.strokeStyle =
        "#60a5fa";

    ctx.lineWidth = 3;

    ctx.stroke();


    /* Speaker center */

    ctx.beginPath();

    ctx.arc(
        speakerX + 45,
        centerY,
        28,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#60a5fa";

    ctx.fill();


    /*
        Sound pressure waves
    */

    const waveStart =
        speakerX + 160;


    for (
        let ring = 0;
        ring < 4;
        ring++
    ) {

        const phase =
            time * frequency *
            0.0015;

        const progress =
            (
                phase +
                ring * 0.25
            ) % 1;


        const radius =
            45 +
            progress * 260;


        const opacity =
            1 - progress;


        ctx.beginPath();

        ctx.arc(
            waveStart,
            centerY,
            radius,
            -Math.PI / 2,
            Math.PI / 2
        );

        ctx.strokeStyle =
            `rgba(96,165,250,${opacity})`;

        ctx.lineWidth = 4;

        ctx.stroke();

    }


    /* Pressure particles */

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const x =
            waveStart +
            20 +
            i * 26;

        const displacement =
            getPressure(
                time +
                i * 0.0008
            );


        const y =
            centerY -
            displacement * 0.55;


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


    /* Labels */

    ctx.fillStyle =
        "#cbd5e1";

    ctx.font =
        "15px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "Speaker",
        speakerX + 38,
        centerY + 125
    );


    ctx.fillStyle =
        "#60a5fa";

    ctx.fillText(
        "Air-pressure variations",
        waveStart + 170,
        centerY + 150
    );


    ctx.fillStyle =
        "#94a3b8";

    ctx.textAlign =
        "left";

    ctx.fillText(
        "Sound travels as changing pressure",
        35,
        35
    );

}


/* ================================
   GRAPH
================================ */

function drawGraph() {

    graphCtx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


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

    const top = 25;

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


    /* Wave */

    graphCtx.beginPath();


    const cycles = 3;


    for (
        let x = 0;
        x <= right - left;
        x += 2
    ) {

        const normalized =
            x /
            (right - left);


        const y =
            centerY -
            Math.sin(
                normalized *
                cycles *
                2 *
                Math.PI
            ) *
            amplitude *
            1.05;


        const graphX =
            left + x;


        if (x === 0) {

            graphCtx.moveTo(
                graphX,
                y
            );

        } else {

            graphCtx.lineTo(
                graphX,
                y
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
        "Pressure",
        left + 5,
        16
    );


    graphCtx.textAlign =
        "right";

    graphCtx.fillText(
        "Time",
        right,
        graph.height - 10
    );

}


/* ================================
   INFORMATION
================================ */

function updateInformation() {

    const omega =
        getAngularFrequency();


    frequencyValue.textContent =
        `${frequency.toFixed(0)} Hz`;


    amplitudeValue.textContent =
        `${amplitude.toFixed(0)} %`;


    frequencyInfo.innerHTML = `

        \\[
        f = ${frequency.toFixed(0)}
        \\ \\text{Hz}
        \\]

        Higher frequency means a
        higher perceived pitch.

    `;


    amplitudeInfo.innerHTML = `

        \\[
        A = ${amplitude.toFixed(0)}
        \\%
        \\]

        Greater amplitude corresponds
        to greater variation in air pressure
        and generally a louder sound.

    `;


    calculus.innerHTML = `

        Sound can be modeled using a changing
        pressure function:

        \\[
        p(t)
        =
        A\\sin(\\omega t)
        \\]

        The first derivative describes how
        pressure changes:

        \\[
        \\frac{dp}{dt}
        =
        A\\omega\\cos(\\omega t)
        \\]

        Taking another derivative gives:

        \\[
        \\frac{d^2p}{dt^2}
        =
        -A\\omega^2\\sin(\\omega t)
        \\]

        or

        \\[
        \\frac{d^2p}{dt^2}
        =
        -\\omega^2p
        \\]

        This is the same mathematical structure
        that appears in simple harmonic motion.

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
        frequencyInfo,
        amplitudeInfo,
        calculus
    ]);


    MathJax.typesetPromise([
        frequencyInfo,
        amplitudeInfo,
        calculus
    ]);

}


/* ================================
   ANIMATION
================================ */

function animate(currentTime) {

    let deltaTime =
        (
            currentTime -
            lastTime
        ) / 1000;


    lastTime =
        currentTime;


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
   PLAY / PAUSE
================================ */

toggleButton.addEventListener(
    "click",
    () => {

        running =
            !running;


        toggleButton.textContent =
            running
                ? "Pause Sound"
                : "Play Sound";

    }
);


/* ================================
   RESET
================================ */

resetButton.addEventListener(
    "click",
    () => {

        frequency = 440;

        amplitude = 50;

        time = 0;

        running = false;


        frequencySlider.value =
            440;

        amplitudeSlider.value =
            50;


        toggleButton.textContent =
            "Play Sound";


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
