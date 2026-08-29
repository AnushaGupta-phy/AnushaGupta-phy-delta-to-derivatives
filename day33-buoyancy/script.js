// ==================================================
// DAY 33 — BUOYANCY
// ==================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

const objectDensitySlider =
    document.getElementById(
        "objectDensitySlider"
    );

const fluidDensitySlider =
    document.getElementById(
        "fluidDensitySlider"
    );

const volumeSlider =
    document.getElementById(
        "volumeSlider"
    );

const objectDensityValue =
    document.getElementById(
        "objectDensityValue"
    );

const fluidDensityValue =
    document.getElementById(
        "fluidDensityValue"
    );

const volumeValue =
    document.getElementById(
        "volumeValue"
    );

const buoyantForceValue =
    document.getElementById(
        "buoyantForceValue"
    );

const weightValue =
    document.getElementById(
        "weightValue"
    );

const resultValue =
    document.getElementById(
        "resultValue"
    );

const calculus =
    document.getElementById(
        "calculus"
    );

const toggleButton =
    document.getElementById(
        "toggleButton"
    );

const resetButton =
    document.getElementById(
        "resetButton"
    );


// ==================================================
// STATE
// ==================================================

let objectDensity = 600;
let fluidDensity = 1000;
let volume = 1;

let running = true;

let objectY = 270;
let velocity = 0;

let lastTime = performance.now();


// ==================================================
// PHYSICS
// ==================================================

const g = 9.81;


function getMass() {

    return objectDensity * volume;

}


function getWeight() {

    return getMass() * g;

}


function getBuoyantForce() {

    return fluidDensity *
        volume *
        g;

}


function getNetForce() {

    return (
        getBuoyantForce() -
        getWeight()
    );

}


// ==================================================
// DRAW SIMULATION
// ==================================================

function drawSimulation() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const width = canvas.width;
    const height = canvas.height;


    // ------------------------------------------------
    // Background
    // ------------------------------------------------

    ctx.fillStyle = "#020617";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // ------------------------------------------------
    // Tank
    // ------------------------------------------------

    const tankLeft = 90;
    const tankRight = 510;

    const tankTop = 70;
    const tankBottom = 450;


    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        tankLeft,
        tankTop,
        tankRight - tankLeft,
        tankBottom - tankTop
    );


    // ------------------------------------------------
    // Water
    // ------------------------------------------------

    const waterTop = 145;


    ctx.fillStyle = "#2563eb";

    ctx.fillRect(
        tankLeft + 4,
        waterTop,
        tankRight - tankLeft - 8,
        tankBottom - waterTop - 4
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
    // Object
    // ------------------------------------------------

    const objectSize =
        55 + volume * 15;

    const objectX =
        width / 2;


    ctx.fillStyle = "#f8fafc";

    ctx.fillRect(
        objectX - objectSize / 2,
        objectY - objectSize / 2,
        objectSize,
        objectSize
    );


    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        objectX - objectSize / 2,
        objectY - objectSize / 2,
        objectSize,
        objectSize
    );


    // ------------------------------------------------
    // Buoyant force arrow
    // ------------------------------------------------

    const buoyantArrow =
        Math.min(
            getBuoyantForce() / 100,
            110
        );


    ctx.beginPath();

    ctx.moveTo(
        objectX,
        objectY - objectSize / 2
    );

    ctx.lineTo(
        objectX,
        objectY - objectSize / 2 - buoyantArrow
    );

    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 4;

    ctx.stroke();


    // Arrow head

    ctx.beginPath();

    ctx.moveTo(
        objectX - 8,
        objectY - objectSize / 2 - buoyantArrow + 12
    );

    ctx.lineTo(
        objectX,
        objectY - objectSize / 2 - buoyantArrow
    );

    ctx.lineTo(
        objectX + 8,
        objectY - objectSize / 2 - buoyantArrow + 12
    );

    ctx.stroke();


    ctx.fillStyle = "#f8fafc";
    ctx.font = "14px Arial";
    ctx.textAlign = "left";

    ctx.fillText(
        "Buoyant Force",
        objectX + 15,
        objectY - objectSize / 2 - buoyantArrow
    );


    // ------------------------------------------------
    // Weight arrow
    // ------------------------------------------------

    const weightArrow =
        Math.min(
            getWeight() / 100,
            110
        );


    ctx.beginPath();

    ctx.moveTo(
        objectX,
        objectY + objectSize / 2
    );

    ctx.lineTo(
        objectX,
        objectY + objectSize / 2 + weightArrow
    );

    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 4;

    ctx.stroke();


    // Arrow head

    ctx.beginPath();

    ctx.moveTo(
        objectX - 8,
        objectY + objectSize / 2 + weightArrow - 12
    );

    ctx.lineTo(
        objectX,
        objectY + objectSize / 2 + weightArrow
    );

    ctx.lineTo(
        objectX + 8,
        objectY + objectSize / 2 + weightArrow - 12
    );

    ctx.stroke();


    ctx.fillStyle = "#f8fafc";

    ctx.fillText(
        "Weight",
        objectX + 15,
        objectY + objectSize / 2 + weightArrow + 5
    );


    // ------------------------------------------------
    // Density label
    // ------------------------------------------------

    ctx.textAlign = "center";

    ctx.fillStyle = "#f8fafc";
    ctx.font = "19px Arial";

    ctx.fillText(
        "Buoyancy",
        width / 2,
        35
    );


    ctx.font = "15px Arial";

    ctx.fillStyle = "#cbd5e1";

    ctx.fillText(
        `${objectDensity.toFixed(0)} kg/m³ object`,
        width / 2,
        500
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


    // Background

    graphCtx.fillStyle = "#020617";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    const maxForce =
        Math.max(
            getBuoyantForce(),
            getWeight(),
            100
        );


    const scale =
        (right - left) /
        maxForce;


    // ------------------------------------------------
    // Buoyant force
    // ------------------------------------------------

    const buoyantWidth =
        getBuoyantForce() *
        scale;


    graphCtx.fillStyle = "#60a5fa";

    graphCtx.fillRect(
        left,
        top + 35,
        Math.min(
            buoyantWidth,
            right - left
        ),
        35
    );


    // ------------------------------------------------
    // Weight
    // ------------------------------------------------

    const weightWidth =
        getWeight() *
        scale;


    graphCtx.fillStyle = "#cbd5e1";

    graphCtx.fillRect(
        left,
        top + 120,
        Math.min(
            weightWidth,
            right - left
        ),
        35
    );


    // ------------------------------------------------
    // Labels
    // ------------------------------------------------

    graphCtx.fillStyle = "#f8fafc";
    graphCtx.font = "14px Arial";
    graphCtx.textAlign = "left";

    graphCtx.fillText(
        `Buoyant Force: ${getBuoyantForce().toFixed(1)} N`,
        left,
        top + 25
    );


    graphCtx.fillText(
        `Weight: ${getWeight().toFixed(1)} N`,
        left,
        top + 110
    );


    // ------------------------------------------------
    // Bottom result
    // ------------------------------------------------

    const netForce =
        getNetForce();


    graphCtx.textAlign = "center";

    graphCtx.fillStyle =
        "#f8fafc";

    graphCtx.font = "16px Arial";

    graphCtx.fillText(
        `Net Force: ${netForce.toFixed(1)} N`,
        graph.width / 2,
        bottom
    );
}


// ==================================================
// INFORMATION
// ==================================================

function updateInformation() {

    const buoyant =
        getBuoyantForce();

    const weight =
        getWeight();

    const net =
        getNetForce();


    objectDensityValue.textContent =
        `${objectDensity.toFixed(0)} kg/m³`;

    fluidDensityValue.textContent =
        `${fluidDensity.toFixed(0)} kg/m³`;

    volumeValue.textContent =
        `${volume.toFixed(1)} m³`;


    buoyantForceValue.innerHTML = `
        \\[
        F_B = \\rho_f V g
        \\]

        \\[
        F_B = ${buoyant.toFixed(1)}\\ \\text{N}
        \\]
    `;


    weightValue.innerHTML = `
        \\[
        W = mg
        \\]

        \\[
        W = ${weight.toFixed(1)}\\ \\text{N}
        \\]
    `;


    if (objectDensity < fluidDensity) {

        resultValue.innerHTML = `
            <strong>Floating</strong>

            \\[
            \\rho_{object} < \\rho_{fluid}
            \\]
        `;

    } else if (objectDensity > fluidDensity) {

        resultValue.innerHTML = `
            <strong>Sinking</strong>

            \\[
            \\rho_{object} > \\rho_{fluid}
            \\]
        `;

    } else {

        resultValue.innerHTML = `
            <strong>Neutrally Buoyant</strong>

            \\[
            \\rho_{object} = \\rho_{fluid}
            \\]
        `;

    }


    calculus.innerHTML = `
        Buoyancy connects force to the amount of
        fluid displaced by an object.

        \\[
        F_B = \\rho_f V g
        \\]

        The object's weight is

        \\[
        W = mg
        \\]

        Since

        \\[
        m = \\rho_{object}V
        \\]

        we can compare the two forces through density.

        The resulting motion can then be described
        using Newton's second law:

        \\[
        F_{net} = ma
        \\]
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
        buoyantForceValue,
        weightValue,
        resultValue,
        calculus
    ]);


    MathJax.typesetPromise([
        buoyantForceValue,
        weightValue,
        resultValue,
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


    if (running) {

        const acceleration =
            getNetForce() /
            getMass();


        velocity +=
            acceleration *
            deltaTime;


        objectY +=
            velocity *
            deltaTime;


        // ------------------------------------------------
        // Keep the object in the tank
        // ------------------------------------------------

        const objectSize =
            55 + volume * 15;

        const topLimit =
            150 + objectSize / 2;

        const bottomLimit =
            425 - objectSize / 2;


        if (objectY < topLimit) {

            objectY =
                topLimit;

            velocity =
                Math.abs(velocity) * 0.25;

        }


        if (objectY > bottomLimit) {

            objectY =
                bottomLimit;

            velocity =
                -Math.abs(velocity) * 0.25;

        }


        // Small damping prevents runaway motion.

        velocity *= 0.995;

    }


    drawSimulation();
    drawGraph();


    requestAnimationFrame(
        animate
    );
}


// ==================================================
// CONTROLS
// ==================================================

objectDensitySlider.addEventListener(
    "input",
    () => {

        objectDensity =
            parseFloat(
                objectDensitySlider.value
            );

        updateInformation();

    }
);


fluidDensitySlider.addEventListener(
    "input",
    () => {

        fluidDensity =
            parseFloat(
                fluidDensitySlider.value
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


resetButton.addEventListener(
    "click",
    () => {

        objectDensity = 600;
        fluidDensity = 1000;
        volume = 1;

        objectY = 270;
        velocity = 0;

        running = true;

        objectDensitySlider.value = 600;
        fluidDensitySlider.value = 1000;
        volumeSlider.value = 1;

        toggleButton.textContent =
            "Pause";

        updateInformation();

    }
);


// ==================================================
// START
// ==================================================

updateInformation();

drawSimulation();
drawGraph();

requestAnimationFrame(
    animate
);
