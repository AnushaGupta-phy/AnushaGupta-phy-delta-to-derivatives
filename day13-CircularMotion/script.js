const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const speedSlider = document.getElementById("speed");
const radiusSlider = document.getElementById("radius");
const playButton = document.getElementById("playButton");

const speedValue = document.getElementById("speedValue");
const radiusValue = document.getElementById("radiusValue");

const speedData = document.getElementById("speedData");
const accelerationData = document.getElementById("acceleration");
const angularVelocityData = document.getElementById("angularVelocity");
const directionData = document.getElementById("direction");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

let playing = false;
let animation;

let theta = 0;

//------------------------------------------------------------

function drawScene() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const radius = Number(radiusSlider.value) * 20;

    const cx = 350;
    const cy = 250;

    // Orbit

    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    const x = cx + radius * Math.cos(theta);
    const y = cy + radius * Math.sin(theta);

    // Ball

    ctx.beginPath();
    ctx.fillStyle = "#3b82f6";
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Radius

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Velocity Vector (Green)

    const tx = -Math.sin(theta);
    const ty = Math.cos(theta);

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + tx * 45, y + ty * 45);
    ctx.stroke();

    // Acceleration Vector (Red)

    const rx = (cx - x);
    const ry = (cy - y);

    ctx.strokeStyle = "#ef4444";

    ctx.beginPath();
    ctx.moveTo(x, y);
   
