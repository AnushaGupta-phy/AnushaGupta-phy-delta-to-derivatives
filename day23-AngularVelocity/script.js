const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const gctx = graph.getContext("2d");

//----------------------------------------------------
// Controls
//----------------------------------------------------

const angularVelocitySlider =
    document.getElementById("angularVelocity");

const radiusSlider =
    document.getElementById("radius");

const startingAngleSlider =
    document.getElementById("startingAngle");

const velocityValue =
    document.getElementById("velocityValue");

const radiusValue =
    document.getElementById("radiusValue");

const angleValue =
    document.getElementById("angleValue");

const startButton =
    document.getElementById("startButton");

const resetButton =
    document.getElementById("resetButton");

//----------------------------------------------------
// Displays
//----------------------------------------------------

const positionDisplay =
    document.getElementById("positionDisplay");

const velocityDisplay =
    document.getElementById("velocityDisplay");

const linearSpeedDisplay =
    document.getElementById("linearSpeedDisplay");

const calculusDisplay =
    document.getElementById("calculusDisplay");

const explanationDisplay =
    document.getElementById("explanationDisplay");

//----------------------------------------------------
// Simulation variables
//----------------------------------------------------

let theta = 0;

let angularVelocity = 45;

let radius = 120;

let elapsedTime = 0;

let running = false;

let history = [];

let lastTimestamp = null;


//----------------------------------------------------
// Reset simulation
//----------------------------------------------------

function resetSimulation(){

    theta =
        Number(startingAngleSlider.value);

    angularVelocity =
        Number(angularVelocitySlider.value);

    radius =
        Number(radiusSlider.value);

    elapsedTime = 0;

    running = false;

    history = [];

    lastTimestamp = null;

    updateDisplays();

    drawScene();

    drawGraph();

}


//----------------------------------------------------
// Draw rotating disk
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
    // Center
    //------------------------------------------------

    const centerX =
        canvas.width / 2;

    const centerY =
        canvas.height / 2;


    //------------------------------------------------
    // Disk
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
    // Convert degrees → radians
    //------------------------------------------------

    const radians =
        theta * Math.PI / 180;


    //------------------------------------------------
    // Rotating point
    //------------------------------------------------

    const pointX =
        centerX +
        radius *
        Math.cos(radians);

    const pointY =
        centerY +
        radius *
        Math.sin(radians);


    //------------------------------------------------
    // Radius vector
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
    // Tangential velocity arrow
    //------------------------------------------------

    const speedSign =
        angularVelocity >= 0 ? 1 : -1;

    const tangentX =
        -Math.sin(radians) *
        speedSign;

    const tangentY =
        Math.cos(radians) *
        speedSign;

    const arrowLength =
        Math.min(
            100,
            Math.abs(angularVelocity) * 0.5
        );


    if(Math.abs(angularVelocity) > 0){

        const arrowStartX =
            pointX;

        const arrowStartY =
            pointY;

        const arrowEndX =
            pointX +
            tangentX * arrowLength;

        const arrowEndY =
            pointY +
            tangentY * arrowLength;


        ctx.strokeStyle = "#22c55e";

        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.moveTo(
            arrowStartX,
            arrowStartY
        );

        ctx.lineTo(
            arrowEndX,
            arrowEndY
        );

        ctx.stroke();


        //------------------------------------------------
        // Arrow head
        //------------------------------------------------

        const headSize = 9;

        const angle =
            Math.atan2(
                arrowEndY - arrowStartY,
                arrowEndX - arrowStartX
            );


        ctx.beginPath();

        ctx.moveTo(
            arrowEndX,
            arrowEndY
        );

        ctx.lineTo(
            arrowEndX -
            headSize *
            Math.cos(angle - Math.PI / 6),

            arrowEndY -
            headSize *
            Math.sin(angle - Math.PI / 6)
        );

        ctx.lineTo(
            arrowEndX -
            headSize *
            Math.cos(angle + Math.PI / 6),

            arrowEndY -
            headSize *
            Math.sin(angle + Math.PI / 6)
        );

        ctx.closePath();

        ctx.fillStyle = "#22c55e";

        ctx.fill();

    }


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
    // Rotating point
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
    // Labels
    //------------------------------------------------

    ctx.fillStyle = "white";

    ctx.font = "18px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        `θ = ${normalizeAngle(theta).toFixed(1)}°`,
        centerX,
        centerY + radius + 40
    );


    ctx.fillStyle = "#22c55e";

    ctx.fillText(
        `ω = ${angularVelocity.toFixed(1)}°/s`,
        centerX,
        centerY + radius + 68
    );


    ctx.fillStyle = "#cbd5e1";

    ctx.font = "15px Arial";

    ctx.fillText(
        "Green arrow = tangential velocity direction",
        centerX,
        30
    );

}


//----------------------------------------------------
// Normalize angle for display
//----------------------------------------------------

function normalizeAngle(value){

    let result =
        value % 360;

    if(result < 0){

        result += 360;

    }

    return result;

}


//----------------------------------------------------
// Update information
//----------------------------------------------------

function updateDisplays(){

    angularVelocity =
        Number(angularVelocitySlider.value);

    radius =
        Number(radiusSlider.value);


    const radians =
        theta * Math.PI / 180;


    //------------------------------------------------
    // Linear speed
    //
    // v = rω
    //
    // ω must be in rad/s
    //------------------------------------------------

    const angularVelocityRad =
        angularVelocity *
        Math.PI /
        180;

    const linearSpeed =
        radius *
        Math.abs(angularVelocityRad);


    //------------------------------------------------
    // Control values
    //------------------------------------------------

    velocityValue.textContent =
        `${angularVelocity.toFixed(0)}°/s`;

    radiusValue.textContent =
        `${radius.toFixed(0)} px`;

    angleValue.textContent =
        `${normalizeAngle(theta).toFixed(0)}°`;


    //------------------------------------------------
    // Angular position
    //------------------------------------------------

    positionDisplay.innerHTML =

    `
    <strong>

    θ(t) = ${theta.toFixed(2)}°

    </strong>

    <br><br>

    Angular position describes the object's
    location around the circle.

    `;


    //------------------------------------------------
    // Angular velocity
    //------------------------------------------------

    velocityDisplay.innerHTML =

    `
    <strong>

    ω = ${angularVelocity.toFixed(2)}°/s

    </strong>

    <br><br>

    In radians:

    <strong>

    ω = ${angularVelocityRad.toFixed(3)} rad/s

    </strong>

    `;


    //------------------------------------------------
    // Linear speed
    //------------------------------------------------

    linearSpeedDisplay.innerHTML =

    `
    <strong>

    v = rω

    </strong>

    <br><br>

    = ${radius.toFixed(0)}
    × ${Math.abs(angularVelocityRad).toFixed(3)}

    <br><br>

    <strong>

    v = ${linearSpeed.toFixed(2)} px/s

    </strong>

    `;


    //------------------------------------------------
    // Calculus connection
    //------------------------------------------------

    calculusDisplay.innerHTML =

    `
    Yesterday we described angular position
    as a function of time:

    <br><br>

    <strong>

    θ = θ(t)

    </strong>

    <br><br>

    Today we take its derivative:

    <br><br>

    <strong>

    ω(t) = dθ/dt

    </strong>

    <br><br>

    Angular velocity is therefore the
    <strong>slope of the θ vs. time graph</strong>.

    `;


    //------------------------------------------------
    // Explanation
    //------------------------------------------------

    explanationDisplay.innerHTML =

    `
    A steeper θ(t) graph means the angle is
    changing more quickly.

    <br><br>

    A positive slope corresponds to
    counterclockwise rotation, while a
    negative slope corresponds to
    clockwise rotation.

    <br><br>

    This is the rotational equivalent of
    velocity being the slope of a position-time
    graph.

    `;


    drawScene();

    drawGraph();

}


//----------------------------------------------------
// Draw θ vs time graph
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
        "θ",
        30,
        top + 10
    );

    gctx.fillText(
        "Time",
        left + width - 45,
        graph.height - 15
    );


    //------------------------------------------------
    // Empty graph
    //------------------------------------------------

    if(history.length < 2){

        gctx.fillStyle = "#94a3b8";

        gctx.fillText(
            "Press Start Rotation to generate the graph.",
            left + 100,
            top + height / 2
        );

        return;

    }


    //------------------------------------------------
    // Graph ranges
    //------------------------------------------------

    const maxTime =
        Math.max(
            5,
            history[history.length - 1].time
        );


    const angles =
        history.map(
            point => point.theta
        );


    const minAngle =
        Math.min(
            0,
            ...angles
        );


    const maxAngle =
        Math.max(
            180,
            ...angles
        );


    const angleRange =
        Math.max(
            180,
            maxAngle - minAngle
        );


    //------------------------------------------------
    // Zero line
    //------------------------------------------------

    if(minAngle < 0 && maxAngle > 0){

        const zeroY =
            top +
            height -
            ((0 - minAngle) /
            angleRange) *
            height;

        gctx.strokeStyle =
            "rgba(148,163,184,0.35)";

        gctx.beginPath();

        gctx.moveTo(
            left,
            zeroY
        );

        gctx.lineTo(
            left + width,
            zeroY
        );

        gctx.stroke();

    }


    //------------------------------------------------
    // Draw θ curve
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
                ((point.theta - minAngle) /
                angleRange) *
                height;


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
    // Tangent/slope indicator
    //------------------------------------------------

    if(history.length >= 2){

        const last =
            history[history.length - 1];

        const previous =
            history[history.length - 2];


        const x1 =
            left +
            (previous.time / maxTime)
            * width;

        const y1 =
            top +
            height -
            ((previous.theta - minAngle) /
            angleRange) *
            height;


        const x2 =
            left +
            (last.time / maxTime)
            * width;

        const y2 =
            top +
            height -
            ((last.theta - minAngle) /
            angleRange) *
            height;


        gctx.strokeStyle = "#22c55e";

        gctx.lineWidth = 2;

        gctx.beginPath();

        gctx.moveTo(
            x1,
            y1
        );

        gctx.lineTo(
            x2,
            y2
        );

        gctx.stroke();


        //------------------------------------------------
        // Current point
        //------------------------------------------------

        gctx.fillStyle = "#22c55e";

        gctx.beginPath();

        gctx.arc(
            x2,
            y2,
            5,
            0,
            Math.PI * 2
        );

        gctx.fill();

    }


    //------------------------------------------------
    // Angular velocity label
    //------------------------------------------------

    gctx.fillStyle = "#22c55e";

    gctx.font = "15px Arial";

    gctx.fillText(
        `Slope = ω = ${angularVelocity.toFixed(1)}°/s`,
        left + 15,
        top + 20
    );

}


//----------------------------------------------------
// Slider events
//----------------------------------------------------

angularVelocitySlider.oninput =
    function(){

        angularVelocity =
            Number(
                angularVelocitySlider.value
            );

        updateDisplays();

    };


radiusSlider.oninput =
    function(){

        radius =
            Number(
                radiusSlider.value
            );

        updateDisplays();

    };


startingAngleSlider.oninput =
    function(){

        if(!running){

            theta =
                Number(
                    startingAngleSlider.value
                );

            updateDisplays();

        }

    };


//----------------------------------------------------
// Start button
//----------------------------------------------------

startButton.onclick =
    function(){

        theta =
            Number(
                startingAngleSlider.value
            );

        elapsedTime = 0;

        history = [];

        running = true;

        lastTimestamp = null;

        requestAnimationFrame(
            animate
        );

    };


//----------------------------------------------------
// Reset button
//----------------------------------------------------

resetButton.onclick =
    function(){

        startingAngleSlider.value = 0;

        resetSimulation();

    };


//----------------------------------------------------
// Animation
//----------------------------------------------------

function animate(timestamp){

    if(!running){

        return;

    }


    if(lastTimestamp === null){

        lastTimestamp = timestamp;

    }


    let dt =
        (timestamp - lastTimestamp) /
        1000;


    lastTimestamp = timestamp;


    //------------------------------------------------
    // Prevent huge jumps
    //------------------------------------------------

    dt =
        Math.min(
            dt,
            0.05
        );


    //------------------------------------------------
    // Update angle
    //------------------------------------------------

    theta +=
        angularVelocity *
        dt;


    elapsedTime += dt;


    //------------------------------------------------
    // Record
    //------------------------------------------------

    history.push({

        time: elapsedTime,

        theta: theta

    });


    //------------------------------------------------
    // Keep graph readable
    //------------------------------------------------

    if(history.length > 1000){

        history.shift();

    }


    //------------------------------------------------
    // Continue
    //------------------------------------------------

    updateDisplays();


    requestAnimationFrame(
        animate
    );

}


//----------------------------------------------------
// Initial state
//----------------------------------------------------

updateDisplays();

drawScene();

drawGraph();
