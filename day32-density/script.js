const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");


// --------------------------------------------------
// Controls
// --------------------------------------------------

const massSlider =
    document.getElementById("massSlider");

const volumeSlider =
    document.getElementById("volumeSlider");

const forceSlider =
    document.getElementById("forceSlider");


const massValue =
    document.getElementById("massValue");

const volumeValue =
    document.getElementById("volumeValue");

const forceValue =
    document.getElementById("forceValue");


const densityValue =
    document.getElementById("densityValue");

const pressureValue =
    document.getElementById("pressureValue");

const relationshipValue =
    document.getElementById("relationshipValue");

const calculus =
    document.getElementById("calculus");

const resetButton =
    document.getElementById("resetButton");


// --------------------------------------------------
// State
// --------------------------------------------------

let mass = 10;
let volume = 10;
let force = 100;


// History for graph

let graphData = [];


// --------------------------------------------------
// Physics
// --------------------------------------------------

// Density:
//
// ρ = m / V

function getDensity() {

    return mass / volume;

}


// Pressure:
//
// P = F / A
//
// We use the tank's bottom area
// as the contact area.

function getArea() {

    return 2.5;

}


function getPressure() {

    return force / getArea();

}


// --------------------------------------------------
// Draw Tank
// --------------------------------------------------

function drawTank() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const tankX = 110;
    const tankY = 80;

    const tankWidth = 380;
    const tankHeight = 330;


    // ----------------------------------------------
    // Background
    // ----------------------------------------------

    ctx.fillStyle = "#020617";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ----------------------------------------------
    // Tank
    // ----------------------------------------------

    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        tankX,
        tankY,
        tankWidth,
        tankHeight
    );


    // ----------------------------------------------
    // Water
    // ----------------------------------------------

    const waterHeight =
        70 + (volume / 30) * 190;

    const waterY =
        tankY + tankHeight - waterHeight;


    ctx.fillStyle = "#1d4ed8";

    ctx.fillRect(
        tankX + 4,
        waterY,
        tankWidth - 8,
        waterHeight - 4
    );


    // ----------------------------------------------
    // Water surface
    // ----------------------------------------------

    ctx.beginPath();

    ctx.moveTo(
        tankX + 4,
        waterY
    );

    ctx.lineTo(
        tankX + tankWidth - 4,
        waterY
    );

    ctx.strokeStyle = "#93c5fd";
    ctx.lineWidth = 3;

    ctx.stroke();


    // ----------------------------------------------
    // Pressure arrows
    // ----------------------------------------------

    const arrowCount = 7;

    for (let i = 0; i < arrowCount; i++) {

        const x =
            tankX +
            45 +
            i *
            ((tankWidth - 90) / (arrowCount - 1));

        const bottomY =
            tankY +
            tankHeight -
            20;

        const arrowLength =
            20 +
            (force / 300) * 45;


        ctx.beginPath();

        ctx.moveTo(
            x,
            bottomY - arrowLength
        );

        ctx.lineTo(
            x,
            bottomY
        );

        ctx.strokeStyle = "#60a5fa";
        ctx.lineWidth = 2;

        ctx.stroke();


        // Arrowhead

        ctx.beginPath();

        ctx.moveTo(
            x - 5,
            bottomY - 8
        );

        ctx.lineTo(
            x,
            bottomY
        );

        ctx.lineTo(
            x + 5,
            bottomY - 8
        );

        ctx.stroke();
    }


    // ----------------------------------------------
    // Labels
    // ----------------------------------------------

    ctx.fillStyle = "#e2e8f0";

    ctx.font = "16px Arial";

    ctx.textAlign = "center";


    ctx.fillText(
        "Water",
        canvas.width / 2,
        waterY + 35
    );


    ctx.fillText(
        `ρ = ${getDensity().toFixed(2)} kg/L`,
        canvas.width / 2,
        waterY + 60
    );


    ctx.fillText(
        `P = ${getPressure().toFixed(1)} Pa`,
        canvas.width / 2,
        tankY + tankHeight + 45
    );


    // ----------------------------------------------
    // Mass label
    // ----------------------------------------------

    ctx.textAlign = "left";

    ctx.fillStyle = "#94a3b8";

    ctx.fillText(
        `Mass: ${mass.toFixed(0)} kg`,
        tankX,
        45
    );


    ctx.textAlign = "right";

    ctx.fillText(
        `Volume: ${volume.toFixed(0)} L`,
        tankX + tankWidth,
        45
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

    const top = 30;
    const bottom = graph.height - 45;


    // Background

    graphCtx.fillStyle = "#020617";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    // Axes

    graphCtx.strokeStyle = "#64748b";
    graphCtx.lineWidth = 1;


    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        top
    );

    graphCtx.lineTo(
        left,
        bottom
    );

    graphCtx.lineTo(
        right,
        bottom
    );

    graphCtx.stroke();


    // Zero/reference line

    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        bottom / 2 + top / 2
    );

    graphCtx.lineTo(
        right,
        bottom / 2 + top / 2
    );

    graphCtx.strokeStyle = "#334155";

    graphCtx.stroke();


    if (graphData.length < 2) {
        return;
    }


    // Density history

    graphCtx.beginPath();


    graphData.forEach(
        (point, index) => {

            const x =
                left +
                (index /
                    Math.max(
                        graphData.length - 1,
                        1
                    )) *
                (right - left);


            const y =
                bottom -
                Math.min(
                    point.density / 3,
                    1
                ) *
                (bottom - top);


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


    graphCtx.strokeStyle = "#60a5fa";
    graphCtx.lineWidth = 3;

    graphCtx.stroke();


    // Label

    graphCtx.fillStyle = "#cbd5e1";

    graphCtx.font = "13px Arial";

    graphCtx.textAlign = "left";

    graphCtx.fillText(
        "Density over time",
        left + 5,
        18
    );
}


// --------------------------------------------------
// Information
// --------------------------------------------------

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
        \\rho = ${density.toFixed(2)}
        \\ \\text{kg/L}
        \\]
    `;


    pressureValue.innerHTML = `
        \\[
        P = \\frac{F}{A}
        \\]

        \\[
        P = ${pressure.toFixed(1)}
        \\ \\text{Pa}
        \\]
    `;


    relationshipValue.innerHTML = `
        Increasing mass while keeping volume fixed
        increases density.

        \\[
        \\rho \\propto m
        \\]

        Increasing the applied force over the same
        area increases pressure.

        \\[
        P \\propto F
        \\]
    `;


    calculus.innerHTML = `
        Density and pressure are both ratios.

        Density describes how much mass is contained
        in a given volume:

        \\[
        \\rho = \\frac{m}{V}
        \\]

        Pressure describes how force is distributed
        over an area:

        \\[
        P = \\frac{F}{A}
        \\]

        These relationships are closely connected to
        the calculus idea of a rate or ratio between
        changing quantities.

        More generally, calculus lets us describe how
        physical quantities change with respect to one
        another:

        \\[
        \\frac{dQ}{dX}
        \\]

        This idea becomes especially important as we
        move from simple ratios to continuously varying
        fluid systems.
    `;


    if (window.MathJax) {

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
        ]);
    }
}


// --------------------------------------------------
// Store Graph Data
// --------------------------------------------------

function recordData() {

    graphData.push({

        density:
            getDensity(),

        time:
            performance.now()

    });


    if (graphData.length > 120) {

        graphData.shift();

    }
}


// --------------------------------------------------
// Animation
// --------------------------------------------------

function animate() {

    drawTank();

    drawGraph();

    requestAnimationFrame(
        animate
    );
}


// --------------------------------------------------
// Controls
// --------------------------------------------------

massSlider.addEventListener(
    "input",
    () => {

        mass =
            parseFloat(
                massSlider.value
            );

        recordData();

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

        recordData();

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


// --------------------------------------------------
// Reset
// --------------------------------------------------

resetButton.addEventListener(
    "click",
    () => {

        mass = 10;
        volume = 10;
        force = 100;

        massSlider.value = 10;
        volumeSlider.value = 10;
        forceSlider.value = 100;

        graphData = [];

        updateInformation();

    }
);


// --------------------------------------------------
// Start
// --------------------------------------------------

updateInformation();

recordData();

animate();
