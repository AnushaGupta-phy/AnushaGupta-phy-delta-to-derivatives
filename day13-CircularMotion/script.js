const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const speedSlider = document.getElementById("speed");
const radiusSlider = document.getElementById("radius");

const speedValue = document.getElementById("speedValue");
const radiusValue = document.getElementById("radiusValue");

const speedData = document.getElementById("speedData");
const accelerationData = document.getElementById("acceleration");
const angularVelocityData = document.getElementById("angularVelocity");
const directionData = document.getElementById("direction");
const calculusView = document.getElementById("calculusView");
const explanation = document.getElementById("explanation");

let theta = 0;

//------------------------------------------------------------

function drawScene() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const r = Number(radiusSlider.value) * 22;

    const cx = 350;
    const cy = 250;

    // Orbit

    ctx.strokeStyle="#64748b";
    ctx.lineWidth=2;

    ctx.beginPath();
    ctx.arc(cx,cy,r,0,Math.PI*2);
    ctx.stroke();

    // Center

    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.arc(cx,cy,4,0,Math.PI*2);
    ctx.fill();

    // Ball

    const x = cx + r*Math.cos(theta);
    const y = cy + r*Math.sin(theta);

    ctx.beginPath();
    ctx.fillStyle="#3b82f6";
    ctx.arc(x,y,12,0,Math.PI*2);
    ctx.fill();

    // Radius

    ctx.strokeStyle="white";

    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(x,y);
    ctx.stroke();

    // Velocity vector

    const tx = -Math.sin(theta);
    const ty = Math.cos(theta);

    ctx.strokeStyle="#22c55e";
    ctx.lineWidth=4;

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(
        x + tx*45,
        y + ty*45
    );
    ctx.stroke();

    // Arrowhead

    ctx.beginPath();
    ctx.arc(
        x + tx*45,
        y + ty*45,
        3,
        0,
        Math.PI*2
    );
    ctx.fillStyle="#22c55e";
    ctx.fill();

    // Acceleration vector

    const nx = cx-x;
    const ny = cy-y;

    const len = Math.sqrt(nx*nx+ny*ny);

    ctx.strokeStyle="#ef4444";

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(
        x + (nx/len)*45,
        y + (ny/len)*45
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        x + (nx/len)*45,
        y + (ny/len)*45,
        3,
        0,
        Math.PI*2
    );
    ctx.fillStyle="#ef4444";
    ctx.fill();

    // Labels

    ctx.fillStyle="#60a5fa";
    ctx.font="22px Arial";
    ctx.fillText("Circular Motion",245,35);

}

//------------------------------------------------------------

function updateInfo(){

    const v = Number(speedSlider.value);
    const r = Number(radiusSlider.value);

    const a = (v*v)/r;
    const omega = v/r;

    speedValue.textContent = v.toFixed(1)+" m/s";
    radiusValue.textContent = r.toFixed(1)+" m";

    speedData.innerHTML =
        "<strong>"+v.toFixed(2)+" m/s</strong>";

    accelerationData.innerHTML =
        "<strong>"+a.toFixed(2)+" m/s²</strong>";

    angularVelocityData.innerHTML =
        "<strong>"+omega.toFixed(2)+" rad/s</strong>";

    const angle =
        ((theta*180/Math.PI)%360+360)%360;

    directionData.innerHTML =
        "<strong>"+angle.toFixed(1)+"°</strong>";

    calculusView.innerHTML =
        "<strong>a = d<strong>v</strong>/dt</strong><br><br>" +
        "The speed stays constant, but the velocity vector continuously changes direction.";

    explanation.innerHTML = `
    Circular motion is one of the best examples of vector calculus.

    <br><br>

    Even though the object's speed stays constant, its velocity changes because its direction changes every instant.

    <br><br>

    The derivative of the velocity vector points toward the center of the circle, producing the centripetal acceleration.

    <br><br>

    <strong>a = v²/r</strong>
    `;

    drawScene();

}

//------------------------------------------------------------

speedSlider.addEventListener("input",updateInfo);
radiusSlider.addEventListener("input",updateInfo);

//------------------------------------------------------------

function animate(){

    const v = Number(speedSlider.value);
    const r = Number(radiusSlider.value);

    theta += (v/r)*0.03;

    updateInfo();

    requestAnimationFrame(animate);

}

animate();
