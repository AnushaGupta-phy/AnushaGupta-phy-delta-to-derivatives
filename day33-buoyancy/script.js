const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const graphCtx = graph.getContext("2d");

const objectDensitySlider =
    document.getElementById("objectDensitySlider");

const fluidDensitySlider =
    document.getElementById("fluidDensitySlider");

const volumeSlider =
    document.getElementById("volumeSlider");

const objectDensityValue =
    document.getElementById("objectDensityValue");

const fluidDensityValue =
    document.getElementById("fluidDensityValue");

const volumeValue =
    document.getElementById("volumeValue");

const buoyantForceValue =
    document.getElementById("buoyantForceValue");

const weightValue =
    document.getElementById("weightValue");

const resultValue =
    document.getElementById("resultValue");

const calculus =
    document.getElementById("calculus");

const toggleButton =
    document.getElementById("toggleButton");

const resetButton =
    document.getElementById("resetButton");


// --------------------------------------------------
// State
// --------------------------------------------------

let objectDensity = 600;

let fluidDensity = 1000;

let volume = 1;

let time = 0;

let running = true;

let lastTime = performance.now();


// --------------------------------------------------
// Physics
// --------------------------------------------------

const g = 9.81;


// Mass:
//
// m = ρV

function getMass() {

    return objectDensity * volume;

}


// Weight:
//
// W = mg

function getWeight() {

    return getMass() * g;

}


// Buoyant force:
//
// F_b = ρ_fluid g V_displaced

function getBuoyantForce() {

    const displacedVolume =
        getDisplacedVolume();

    return fluidDensity *
        g *
        displacedVolume;

}


// --------------------------------------------------
// Floating Physics
// --------------------------------------------------

function getDisplacedVolume() {

    const densityRatio =
        objectDensity / fluidDensity;


    // Object is less dense than fluid.
    // It floats partially submerged.

    if (objectDensity < fluidDensity) {

        return volume * densityRatio;

    }


    // Object is exactly neutrally buoyant.

    if (objectDensity === fluidDensity) {

        return volume;

    }


    // Object is denser than the fluid.
    // It sinks completely.

    return volume;

}


// --------------------------------------------------
// Result
// --------------------------------------------------

function getState() {

    if (objectDensity < fluidDensity) {

        return "Floating";

    }


    if (Math.abs(objectDensity - fluidDensity) < 0.01) {

        return "Neutrally Buoyant";

    }


    return "Sinking";

}


// --------------------------------------------------
// Draw Simulation
// --------------------------------------------------

function drawSimulation() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Background

    ctx.fillStyle = "#020617";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const waterTop = 220;

    const waterBottom = 470;


    // Water

    ctx.fillStyle = "#172554";

    ctx.fillRect(
        0,
        waterTop,
        canvas.width,
        waterBottom - waterTop
    );


    // Water surface

    ctx.beginPath();

    ctx.moveTo(0, waterTop);

    for (
        let x = 0;
        x <= canvas.width;
        x += 8
    ) {

        const y =
            waterTop +
            Math.sin(
                x * 0.035 +
                time * 2
            ) * 3;

        ctx.lineTo(x, y);

    }

    ctx.lineTo(
        canvas.width,
        waterTop
    );

    ctx.closePath();

    ctx.fillStyle = "#1e40af";

    ctx.fill();


    // Labels

    ctx.fillStyle = "#cbd5e1";

    ctx.font = "15px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        "Fluid",
        25,
        waterTop + 35
    );


    // Object position

    let objectX = 300;

    let objectY = 150;


    const state = getState();


    // Floating

    if (state === "Floating") {

        const displacedFraction =
            getDisplacedVolume() / volume;


        const objectHeight = 100;

        const submergedHeight =
            objectHeight *
            displacedFraction;


        objectY =
            waterTop -
            (objectHeight - submergedHeight) -
            15;

    }


    // Neutral

    else if (
        state === "Neutrally Buoyant"
    ) {

        objectY = 285;

    }


    // Sinking

    else {

        const sinkMotion =
            Math.sin(time * 0.8) * 10;

        objectY =
            300 +
            sinkMotion;

    }


    const objectWidth = 130;

    const objectHeight = 100;


    // Object

    ctx.fillStyle = "#60a5fa";

    ctx.fillRect(
        objectX,
        objectY,
        objectWidth,
        objectHeight
    );


    ctx.strokeStyle = "#bfdbfe";

    ctx.lineWidth = 3;

    ctx.strokeRect(
        objectX,
        objectY,
        objectWidth,
        objectHeight
    );


    // Object label

    ctx.fillStyle = "#f8fafc";

    ctx.font = "bold 16px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "Object",
        objectX + objectWidth / 2,
        objectY + objectHeight / 2 + 5
    );


    // --------------------------------------------------
    // Force arrows
    // --------------------------------------------------

    const centerX =
        objectX + objectWidth / 2;

    const centerY =
        objectY + objectHeight / 2;


    const buoyantForce =
        getBuoyantForce();

    const weight =
        getWeight();


    const maxForce =
        Math.max(
            buoyantForce,
            weight,
            1
        );


    const forceScale = 90 / maxForce;


    // Upward buoyant force

    drawArrow(
        centerX,
        centerY,
        centerX,
        centerY -
            Math.max(
                30,
                buoyantForce * forceScale
            ),
        "#38bdf8"
    );


    // Downward weight

    drawArrow(
        centerX,
        centerY,
        centerX,
        centerY +
            Math.max(
                30,
                weight * forceScale
            ),
        "#f87171"
    );


    // Force labels

    ctx.font = "14px Arial";

    ctx.fillStyle = "#38bdf8";

    ctx.fillText(
        "Buoyant Force",
        centerX + 85,
        centerY - 55
    );


    ctx.fillStyle = "#f87171";

    ctx.fillText(
        "Weight",
        centerX + 65,
        centerY + 60
    );


    // State

    ctx.font = "bold 20px Arial";

    ctx.fillStyle = "#f8fafc";

    ctx.fillText(
        state,
        canvas.width / 2,
        55
    );

}


// --------------------------------------------------
// Arrow Helper
// --------------------------------------------------

function drawArrow(
    x1,
    y1,
    x2,
    y2,
    color
) {

    const angle =
        Math.atan2(
            y2 - y1,
            x2 - x1
        );


    ctx.beginPath();

    ctx.moveTo(
        x1,
        y1
    );

    ctx.lineTo(
        x2,
        y2
    );

    ctx.strokeStyle = color;

    ctx.lineWidth = 4;

    ctx.stroke();


    const headLength = 10;


    ctx.beginPath();

    ctx.moveTo(
        x2,
        y2
    );

    ctx.lineTo(
        x2 -
            headLength *
            Math.cos(angle - Math.PI / 6),

        y2 -
            headLength *
            Math.sin(angle - Math.PI / 6)
    );

    ctx.lineTo(
        x2 -
            headLength *
            Math.cos(angle + Math.PI / 6),

        y2 -
            headLength *
            Math.sin(angle + Math.PI / 6)
    );

    ctx.closePath();

    ctx.fillStyle = color;

    ctx.fill();

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


    // Background

    graphCtx.fillStyle = "#020617";

    graphCtx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    const left = 60;

    const right =
        graph.width - 30;

    const top = 30;

    const bottom =
        graph.height - 45;


    const centerY =
        (top + bottom) / 2;


    // Zero line

    graphCtx.beginPath();

    graphCtx.moveTo(
        left,
        centerY
    );

    graphCtx.lineTo(
        right,
        centerY
    );

    graphCtx.strokeStyle = "#475569";

    graphCtx.lineWidth = 1;

    graphCtx.stroke();


    // Current forces

    const buoyant =
        getBuoyantForce();

    const weight =
        getWeight();


    const maxForce =
        Math.max(
            buoyant,
            weight,
            1
        );


    const scale =
        85 / maxForce;


    // Buoyant force bar

    const buoyantHeight =
        buoyant * scale;


    graphCtx.fillStyle = "#38bdf8";

    graphCtx.fillRect(
        150,
        centerY - buoyantHeight,
        100,
        buoyantHeight
    );


    // Weight bar

    const weightHeight =
        weight * scale;


    graphCtx.fillStyle = "#f87171";

    graphCtx.fillRect(
        350,
        centerY - weightHeight,
        100,
        weightHeight
    );


    // Labels

    graphCtx.fillStyle = "#e2e8f0";

    graphCtx.font = "14px Arial";

    graphCtx.textAlign = "center";

    graphCtx.fillText(
        "Buoyant Force",
        200,
        bottom + 25
    );


    graphCtx.fillText(
        "Weight",
        400,
        bottom + 25
    );


    graphCtx.fillText(
        `${buoyant.toFixed(1)} N`,
        200,
        centerY - buoyantHeight - 10
    );


    graphCtx.fillText(
        `${weight.toFixed(1)} N`,
        400,
        centerY - weightHeight - 10
    );

}


// --------------------------------------------------
// Information
// --------------------------------------------------

function updateInformation() {

    const buoyant =
        getBuoyantForce();

    const weight =
        getWeight();

    const state =
        getState();


    objectDensityValue.textContent =
        `${objectDensity.toFixed(0)} kg/m³`;


    fluidDensityValue.textContent =
        `${fluidDensity.toFixed(0)} kg/m³`;


    volumeValue.textContent =
        `${volume.toFixed(1)} m³`;


    buoyantForceValue.innerHTML = `

        \\[
        F_B = \\rho_f g V_d
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


    resultValue.innerHTML = `

        <strong>${state}</strong>

        <br><br>

        Object density:
        ${objectDensity.toFixed(0)}
        kg/m³

        <br>

        Fluid density:
        ${fluidDensity.toFixed(0)}
        kg/m³

    `;


    calculus.innerHTML = `

        Buoyancy comes from the pressure difference
        between the top and bottom of an object in a fluid.

        The net upward force is the buoyant force:

        \\[
        F_B = \\rho_f g V_d
        \\]

        where \\(\\rho_f\\) is the fluid density and
        \\(V_d\\) is the displaced volume.

        The object's weight is:

        \\[
        W = mg
        \\]

        Since mass can be written as

        \\[
        m = \\rho_o V
        \\]

        the object's weight becomes

        \\[
        W = \\rho_o Vg
        \\]

        This gives us a direct comparison between
        object density and fluid density.

        If the object is less dense than the fluid,
        it floats.

        If the densities are equal, it is neutrally buoyant.

        If the object is more dense than the fluid,
        it sinks.

        The calculus connection comes from thinking
        about pressure as a quantity that changes with
        position inside the fluid. The net force is
        obtained by combining those changing pressure
        contributions across the object's surface.
    `;


    if (window.MathJax) {

        MathJax.typesetClear([
            buoyantForceValue,
            weightValue,
            calculus
        ]);

        MathJax.typesetPromise([
            buoyantForceValue,
            weightValue,
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

    }


    drawSimulation();

    drawGraph();


    requestAnimationFrame(animate);

}


// --------------------------------------------------
// Controls
// --------------------------------------------------

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

        objectDensity = 600;

        fluidDensity = 1000;

        volume = 1;

        time = 0;

        running = true;


        objectDensitySlider.value = 600;

        fluidDensitySlider.value = 1000;

        volumeSlider.value = 1;


        toggleButton.textContent =
            "Pause";


        updateInformation();

    }
);


// --------------------------------------------------
// Start
// --------------------------------------------------

updateInformation();

requestAnimationFrame(animate);
