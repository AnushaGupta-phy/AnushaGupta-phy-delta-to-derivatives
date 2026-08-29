// ==================================================
// DAY 32 — DENSITY & PRESSURE
// ==================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

const massSlider = document.getElementById("massSlider");
const volumeSlider = document.getElementById("volumeSlider");
const forceSlider = document.getElementById("forceSlider");

const massValue = document.getElementById("massValue");
const volumeValue = document.getElementById("volumeValue");
const forceValue = document.getElementById("forceValue");

const densityValue = document.getElementById("densityValue");
const pressureValue = document.getElementById("pressureValue");
const relationshipValue = document.getElementById("relationshipValue");
const calculus = document.getElementById("calculus");

const resetButton = document.getElementById("resetButton");


// ==================================================
// STATE
// ==================================================

let mass = 10;
let volume = 10;
let force = 100;

let time = 0;
let lastTime = performance.now();


// ==================================================
// PHYSICS
// ==================================================

function getDensity() {

    // 1 L = 0.001 m³

    const volumeM3 = volume * 0.001;

    return mass / volumeM3;
}


function getPressure() {

    // Approximate tank cross-sectional area.
    // This keeps the pressure visualization simple.

    const area = 0.1;

    return force / area;
}


// ==================================================
// DRAW WATER TANK
// ==================================================

function drawTank() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const width = canvas.width;
    const height = canvas.height;

    const tankLeft = 100;
    const tankRight = 500;

    const tankTop = 70;
    const tankBottom = 420;

    const tankWidth = tankRight - tankLeft;
    const tankHeight = tankBottom - tankTop;


    // ------------------------------------------------
    // Title
    // ------------------------------------------------

    ctx.fillStyle = "#f8fafc";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "Fluid Tank",
        width / 2,
        35
    );


    // ------------------------------------------------
    // Tank outline
    // ------------------------------------------------

    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        tankLeft,
        tankTop,
        tankWidth,
        tankHeight
    );


    // ------------------------------------------------
    // Water level
    // ------------------------------------------------

    const volumeFraction =
        (volume - 2) / (30 - 2);

    const waterHeight =
        80 +
        volumeFraction * 220;

    const waterTop =
        tankBottom - waterHeight;


    ctx.fillStyle = "#2563eb";

    ctx.fillRect(
        tankLeft + 4,
        waterTop,
        tankWidth - 8,
        waterHeight - 4
    );


    // ------------------------------------------------
    // Water surface
    // ------------------------------------------------

    ctx.beginPath();

    ctx.moveTo(
        tankLeft + 4,
        waterTop
    );

    ctx.lineTo(
        tankRight - 4,
        waterTop
    );

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 3;

    ctx.stroke();


    // ------------------------------------------------
    // Particles
    // ------------------------------------------------

    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {

        const x =
            tankLeft +
            20 +
            ((i * 73) % (tankWidth - 40));

        const yRange =
            Math.max(
                20,
                waterHeight - 25
            );

        const y =
            waterTop +
            20 +
            ((i * 47 + time * 18) % yRange);

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#bfdbfe";

        ctx.fill();
    }


    // ------------------------------------------------
    // Force arrow
    // ------------------------------------------------

    const arrowX = width / 2;

    const arrowBottom =
        tankTop - 10;

    const arrowLength =
        40 + (force / 300) * 80;


    ctx.beginPath();

    ctx.moveTo(
        arrowX,
        arrowBottom - arrowLength
    );

    ctx.lineTo(
        arrowX,
        arrowBottom
    );

    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 5;

    ctx.stroke();


    // Arrow head

    ctx.beginPath();

    ctx.moveTo(
        arrowX - 9,
        arrowBottom - 12
    );

    ctx.lineTo(
        arrowX,
        arrowBottom
    );

    ctx.lineTo(
        arrowX + 9,
        arrowBottom - 12
    );

    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 4;

    ctx.stroke();


    ctx.fillStyle = "#f8fafc";
    ctx.font = "15px Arial";

    ctx.fillText(
        "Applied Force",
        arrowX,
        arrowBottom - arrowLength - 12
    );


    // ------------------------------------------------
    // Labels
    // ------------------------------------------------

    ctx.textAlign = "left";

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "15px Arial";

    ctx.fillText(
        `Mass: ${mass.toFixed(0)} kg`,
        25,
        465
    );

    ctx.fillText(
        `Volume: ${volume.toFixed(0)} L`,
        220,
        465
    );

    ctx.fillText(
        `Density: ${getDensity().toFixed(0)} kg/m³`,
        390,
        465
    );
}


// ==================================================
// GRAPH
// ==================================================

function drawGraph() {

    graphCtx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


    const left = 60;
    const right = graph.width - 25;

    const top = 25;
    const bottom = graph.height - 45;

    const centerY =
        (top + bottom) / 2;


    // Background

    graphCtx.fillStyle = "#020617";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    // Center line

    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        centerY
    );

    graphCtx.lineTo(
        right,
        centerY
    );

    graphCtx.strokeStyle = "#334155";
    graphCtx.lineWidth = 1;

    graphCtx.stroke();


    // Pressure indicator

    const pressure =
        getPressure();

    const maxPressure = 3000;

    const barWidth =
        (pressure / maxPressure) *
        (right - left);

    graphCtx.fillStyle = "#60a5fa";

    graphCtx.fillRect(
        left,
        centerY - 30,
        Math.min(
            barWidth,
            right - left
        ),
        30
    );


    // Density indicator

    const density =
        getDensity();

    const densityRatio =
        Math.min(
            density / 15000,
            1
        );

    graphCtx.fillStyle = "#93c5fd";

    graphCtx.fillRect(
        left,
        centerY + 20,
        densityRatio *
            (right - left),
        30
    );


    // Labels

    graphCtx.fillStyle = "#f8fafc";
    graphCtx.font = "14px Arial";
    graphCtx.textAlign = "left";

    graphCtx.fillText(
        `Pressure: ${pressure.toFixed(0)} Pa`,
        left,
        centerY - 38
    );

    graphCtx.fillText(
        `Density: ${density.toFixed(0)} kg/m³`,
        left,
        centerY + 62
    );

    graphCtx.fillStyle = "#94a3b8";

    graphCtx.fillText(
        "Pressure",
        right - 65,
        centerY - 38
    );

    graphCtx.fillText(
        "Density",
        right - 60,
        centerY + 62
    );
}


// ==================================================
// INFORMATION
// ==================================================

function updateInformation() {

    const density =
        getDensity();

    const pressure =
        getPressure();


    massValue.textContent =
        `${mass.toFixed(0)} kg`;

    volumeValue.textContent =
        `${volume.toFixed(0)} L`;

    forceValue.textContent =
        `${force.toFixed(0)} N`;


    densityValue.innerHTML = `
        \\[
        \\rho = \\frac{m}{V}
        \\]

        \\[
        \\rho = ${density.toFixed(0)}\\ \\text{kg/m}^3
        \\]
    `;


    pressureValue.innerHTML = `
        \\[
        P = \\frac{F}{A}
        \\]

        \\[
        P = ${pressure.toFixed(0)}\\ \\text{Pa}
        \\]
    `;


    relationshipValue.innerHTML = `
        Increasing mass increases density.

        \\[
        \\rho \\propto m
        \\]

        Increasing volume decreases density.

        \\[
        \\rho \\propto \\frac{1}{V}
        \\]

        Increasing force increases pressure.

        \\[
        P \\propto F
        \\]
    `;


    calculus.innerHTML = `
        Density and pressure are both built from
        rates and ratios.

        \\[
        \\rho = \\frac{m}{V}
        \\]

        Pressure is force distributed across an area:

        \\[
        P = \\frac{F}{A}
        \\]

        These relationships can be viewed as
        functions of changing quantities.

        Calculus lets us study how quickly these
        quantities change when mass, volume, force,
        or area changes.
    `;


    renderMath();
}


// ==================================================
// MATHJAX
// ==================================================

let mathRendering = false;

function renderMath() {

    if (!window.MathJax) {
        return;
    }

    if (mathRendering) {
        return;
    }

    mathRendering = true;


    MathJax.typesetClear([
        densityValue,
        pressureValue,
        relationshipValue,
        calculus
    ]);


    MathJax.typesetPromise([
        densityValue,
        pressureValue,
        relationshipValue,
        calculus
    ])
    .catch(() => {})
    .finally(() => {

        mathRendering = false;

    });
}


// ==================================================
// ANIMATION
// ==================================================

function animate(currentTime) {

    const deltaTime =
        Math.min(
            (currentTime - lastTime) / 1000,
            0.05
        );

    lastTime = currentTime;

    time += deltaTime;


    drawTank();
    drawGraph();


    requestAnimationFrame(
        animate
    );
}


// ==================================================
// CONTROLS
// ==================================================

massSlider.addEventListener(
    "input",
    () => {

        mass =
            parseFloat(
                massSlider.value
            );

        updateInformation();

    }
);


volumeSlider.addEventListener(
    "input",
    () => {

        volume =
            parseFloat(
                volumeSlider.value
            );

        updateInformation();

    }
);


forceSlider.addEventListener(
    "input",
    () => {

        force =
            parseFloat(
                forceSlider.value
            );

        updateInformation();

    }
);


resetButton.addEventListener(
    "click",
    () => {

        mass = 10;
        volume = 10;
        force = 100;

        massSlider.value = 10;
        volumeSlider.value = 10;
        forceSlider.value = 100;

        updateInformation();

    }
);


// ==================================================
// START
// ==================================================

updateInformation();

drawTank();
drawGraph();

requestAnimationFrame(
    animate
);
