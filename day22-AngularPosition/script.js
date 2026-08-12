const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const gctx = graph.getContext("2d");

//----------------------------------------------------
// Controls
//----------------------------------------------------

const angleSlider = document.getElementById("angle");
const radiusSlider = document.getElementById("radius");
const rateSlider = document.getElementById("rate");

const angleValue = document.getElementById("angleValue");
const radiusValue = document.getElementById("radiusValue");
const rateValue = document.getElementById("rateValue");

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

//----------------------------------------------------
// Displays
//----------------------------------------------------

const positionDisplay =
    document.getElementById("positionDisplay");

const radianDisplay =
    document.getElementById("radianDisplay");

const arcDisplay =
    document.getElementById("arcDisplay");

const calculusDisplay =
    document.getElementById("calculusDisplay");

const explanationDisplay =
    document.getElementById("explanationDisplay");

//----------------------------------------------------
// Simulation variables
//----------------------------------------------------

let angle = 0;
let radius = 120;

let running = false;
let startTime = 0;
let elapsedTime = 0;

let history = [];


//----------------------------------------------------
// Reset
//----------------------------------------------------

function resetSimulation(){

    angle = Number(angleSlider.value);

    radius = Number(radiusSlider.value);

    elapsedTime = 0;

    running = false;

    history = [];

    updateDisplays();

    drawScene();

    drawGraph();

}

resetSimulation();


//----------------------------------------------------
// Draw rotating wheel
//----------------------------------------------------

function drawScene(){

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


    //------------------------------------------------
    // Center of wheel
    //------------------------------------------------

    const centerX = canvas.width / 2;

    const centerY = 220;


    //------------------------------------------------
    // Wheel
    //------------------------------------------------

    ctx.strokeStyle = "#60a5fa";

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    //------------------------------------------------
    // Spokes
    //------------------------------------------------

    ctx.strokeStyle = "#334155";

    ctx.lineWidth = 2;

    for(let i = 0; i < 8; i++){

        const spokeAngle =
            i * Math.PI / 4;

        ctx.beginPath();

        ctx.moveTo(
            centerX,
            centerY
        );

        ctx.lineTo(
            centerX +
            radius *
            Math.cos(spokeAngle),

            centerY +
            radius *
            Math.sin(spokeAngle)
        );

        ctx.stroke();

    }


    //------------------------------------------------
    // Current point on wheel
    //------------------------------------------------

    const theta =
        angle * Math.PI / 180;

    const pointX =
        centerX +
        radius *
        Math.cos(theta);

    const pointY =
        centerY +
        radius *
        Math.sin(theta);


    //------------------------------------------------
    // Radius line
    //------------------------------------------------

    ctx.strokeStyle = "#facc15";

    ctx.lineWidth = 4;

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


    //------------------------------------------------
    // Point
    //------------------------------------------------

    ctx.fillStyle = "#22c55e";

    ctx.beginPath();

    ctx.arc(
        pointX,
        pointY,
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();


    //------------------------------------------------
    // Center point
    //------------------------------------------------

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    //------------------------------------------------
    // Angle arc
    //------------------------------------------------

    ctx.strokeStyle = "#f97316";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        centerX,
        centerY,
        45,
        0,
        theta,
        theta < 0
    );

    ctx.stroke();


    //------------------------------------------------
    // Labels
    //------------------------------------------------

    ctx.fillStyle = "white";

    ctx.font = "18px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        `θ = ${angle.toFixed(1)}°`,
        centerX,
        centerY + radius + 45
    );


    ctx.fillStyle = "#cbd5e1";

    ctx.font = "16px Arial";

    ctx.fillText(
        `r = ${radius.toFixed(0)} px`,
        centerX,
        centerY + radius + 70
    );

}


//----------------------------------------------------
// Update displays
//----------------------------------------------------

function updateDisplays(){

    angle = Number(angleSlider.value);

    radius = Number(radiusSlider.value);

    const radians =
        angle * Math.PI / 180;

    const arcLength =
        radius * radians;


    angleValue.textContent =
        `${angle.toFixed(0)}°`;

    radiusValue.textContent =
        `${radius.toFixed(0)} px`;

    rateValue.textContent =
        `${Number(rateSlider.value).toFixed(0)}°/s`;


    //------------------------------------------------
    // Position
    //------------------------------------------------

    positionDisplay.innerHTML =

    `
    <strong>

    θ = ${angle.toFixed(1)}°

    </strong>

    <br><br>

    Angular position tells us how far the
    object has rotated from its starting position.

    `;


    //------------------------------------------------
    // Radians
    //------------------------------------------------

    radianDisplay.innerHTML =

    `
    <strong>

    θ = ${radians.toFixed(3)} rad

    </strong>

    <br><br>

    Since

    <strong>

    180° = π rad

    </strong>

    the angle can be converted using

    <strong>

    θ = degrees × π / 180

    </strong>

    `;


    //------------------------------------------------
    // Arc length
    //------------------------------------------------

    arcDisplay.innerHTML =

    `
    <strong>

    s = rθ

    </strong>

    <br><br>

    = ${radius.toFixed(0)}
    × ${radians.toFixed(3)}

    <br><br>

    <strong>

    s = ${arcLength.toFixed(1)} px

    </strong>

    `;


    //------------------------------------------------
    // Calculus
    //------------------------------------------------

    calculusDisplay.innerHTML =

    `
    Angular position can now be treated
    as a function of time:

    <br><br>

    <strong>

    θ = θ(t)

    </strong>

    <br><br>

    Once position becomes a function of time,
    calculus lets us ask how quickly that
    position is changing.

    <br><br>

    <strong>

    ω(t) = dθ/dt

    </strong>

    <br><br>

    That derivative will be the focus of
    the next lesson.

    `;


    //------------------------------------------------
    // Explanation
    //------------------------------------------------

    explanationDisplay.innerHTML =

    `
    In linear motion, we describe where an
    object is using position.

    <br><br>

    Rotational motion requires a different
    coordinate: an angle.

    <br><br>

    The angle θ tells us how far the object
    has rotated, while the radius connects
    that rotation to ordinary distance.

    `;


    drawScene();

    drawGraph();

}


//----------------------------------------------------
// Graph
//----------------------------------------------------

function drawGraph(){

    gctx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );


    gctx.fillStyle = "#0f172a";

    gctx.fillRect(
        0,
        0,
        graph.width,
        graph.height
    );


    const left = 70;
    const right = 30;
    const top = 30;
    const bottom = 50;

    const width =
        graph.width -
        left -
        right;

    const height =
        graph.height -
        top -
        bottom;


    //------------------------------------------------
    // Axes
    //------------------------------------------------

    gctx.strokeStyle = "#94a3b8";

    gctx.lineWidth = 2;

    gctx.beginPath();

    gctx.moveTo(
        left,
        top
    );

    gctx.lineTo(
        left,
        top + height
    );

    gctx.lineTo(
        left + width,
        top + height
    );

    gctx.stroke();


    //------------------------------------------------
    // Labels
    //------------------------------------------------

    gctx.fillStyle = "white";

    gctx.font = "15px Arial";

    gctx.fillText(
        "θ (degrees)",
        10,
        top + 10
    );

    gctx.fillText(
        "Time (s)",
        left + width - 55,
        graph.height - 15
    );


    //------------------------------------------------
    // No history yet
    //------------------------------------------------

    if(history.length < 2){

        gctx.fillStyle = "#94a3b8";

        gctx.fillText(
            "Press Start Rotation to generate the graph.",
            left + 40,
            top + height / 2
        );

        return;

    }


    //------------------------------------------------
    // Determine graph range
    //------------------------------------------------

    const maxTime =
        Math.max(
            5,
            history[history.length - 1].time
        );

    const maxAngle =
        Math.max(
            180,
            ...history.map(
                point => point.angle
            )
        );


    //------------------------------------------------
    // Draw grid
    //------------------------------------------------

    gctx.strokeStyle =
        "rgba(148,163,184,0.2)";

    gctx.lineWidth = 1;

    for(let i = 1; i < 5; i++){

        const x =
            left +
            (width * i / 5);

        gctx.beginPath();

        gctx.moveTo(
            x,
            top
        );

        gctx.lineTo(
            x,
            top + height
        );

        gctx.stroke();

    }


    //------------------------------------------------
    // Draw curve
    //------------------------------------------------

    gctx.strokeStyle = "#60a5fa";

    gctx.lineWidth = 3;

    gctx.beginPath();


    history.forEach(
        (point,index)=>{

            const x =
                left +
                (point.time / maxTime)
                * width;

            const y =
                top +
                height -
                (point.angle / maxAngle)
                * height;


            if(index === 0){

                gctx.moveTo(
                    x,
                    y
                );

            }

            else{

                gctx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    gctx.stroke();


    //------------------------------------------------
    // Current point
    //------------------------------------------------

    const last =
        history[history.length - 1];

    const lastX =
        left +
        (last.time / maxTime)
        * width;

    const lastY =
        top +
        height -
        (last.angle / maxAngle)
        * height;


    gctx.fillStyle = "#22c55e";

    gctx.beginPath();

    gctx.arc(
        lastX,
        lastY,
        5,
        0,
        Math.PI * 2
    );

    gctx.fill();

}


//----------------------------------------------------
// Sliders
//----------------------------------------------------

angleSlider.oninput = function(){

    if(!running){

        updateDisplays();

    }

};


radiusSlider.oninput = updateDisplays;

rateSlider.oninput = updateDisplays;


//----------------------------------------------------
// Start
//----------------------------------------------------

startButton.onclick = function(){

    angle = Number(angleSlider.value);

    running = true;

    elapsedTime = 0;

    history = [];

    startTime = performance.now();

    requestAnimationFrame(animate);

};


//----------------------------------------------------
// Reset
//----------------------------------------------------

resetButton.onclick = function(){

    angleSlider.value = 0;

    resetSimulation();

};


//----------------------------------------------------
// Animation
//----------------------------------------------------

function animate(timestamp){

    if(!running) return;


    const dt =
        1 / 60;

    const rate =
        Number(rateSlider.value);


    //------------------------------------------------
    // Update angle
    //------------------------------------------------

    angle += rate * dt;

    elapsedTime += dt;


    //------------------------------------------------
    // Stop after two full rotations
    //------------------------------------------------

    if(angle >= 720){

        angle = 720;

        running = false;

    }


    //------------------------------------------------
    // Update slider
    //------------------------------------------------

    angleSlider.value =
        angle;


    //------------------------------------------------
    // Record history
    //------------------------------------------------

    history.push({

        time: elapsedTime,

        angle: angle

    });


    //------------------------------------------------
    // Update displays
    //------------------------------------------------

    updateDisplays();


    //------------------------------------------------
    // Continue
    //------------------------------------------------

    if(running){

        requestAnimationFrame(animate);

    }

}


//----------------------------------------------------
// Initial display
//----------------------------------------------------

updateDisplays();
