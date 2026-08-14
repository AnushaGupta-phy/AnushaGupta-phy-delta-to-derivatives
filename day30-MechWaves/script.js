const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const graph = document.getElementById("graph");
const gctx = graph.getContext("2d");

const amplitudeSlider = document.getElementById("amplitude");
const wavelengthSlider = document.getElementById("wavelength");
const frequencySlider = document.getElementById("frequency");

const amplitudeValue = document.getElementById("amplitudeValue");
const wavelengthValue = document.getElementById("wavelengthValue");
const frequencyValue = document.getElementById("frequencyValue");

const speedValue = document.getElementById("speedValue");
const waveValue = document.getElementById("waveValue");
const calculus = document.getElementById("calculus");

const resetButton = document.getElementById("resetButton");

let amplitude = 50;
let wavelength = 200;
let frequency = 1;

let time = 0;
let lastTime = performance.now();

function updateInformation() {

    const waveSpeed = wavelength * frequency;

    amplitudeValue.textContent =
        `${amplitude.toFixed(0)} px`;

    wavelengthValue.textContent =
        `${wavelength.toFixed(0)} px`;

    frequencyValue.textContent =
        `${frequency.toFixed(1)} Hz`;

    speedValue.innerHTML =
        `
        <strong>
        v = fλ
        </strong>

        <br><br>

        ${frequency.toFixed(1)}
        ×
        ${wavelength.toFixed(0)}

        =

        <strong>
        ${waveSpeed.toFixed(0)} px/s
        </strong>
        `;

    waveValue.innerHTML =
        `
        <strong>Amplitude:</strong>
        ${amplitude.toFixed(0)} px

        <br>

        <strong>Wavelength:</strong>
        ${wavelength.toFixed(0)} px

        <br>

        <strong>Frequency:</strong>
        ${frequency.toFixed(1)} Hz
        `;

    calculus.innerHTML =
        `
        A traveling wave can be written as

        <br><br>

        <strong>
        y(x,t) = A\\sin(kx-\\omega t)
        </strong>

        <br><br>

        where the wave's position changes with both
        space and time.

        <br><br>

        Taking derivatives with respect to time gives
        the vertical velocity of the medium, while a
        second derivative describes its acceleration.

        <br><br>

        The wave equation connects these derivatives:

        <br><br>

        <strong>
        \\frac{\\partial^2 y}{\\partial t^2}
        =
        v^2
        \\frac{\\partial^2 y}{\\partial x^2}
        </strong>

        <br><br>

        So calculus lets us describe how the shape of
        a wave changes through both space and time.
        `;
}

function drawWave() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;

    // Background
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);

    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Medium particles
    for (let x = 0; x < canvas.width; x += 25) {

        const y =
            centerY +
            amplitude *
            Math.sin(
                (2 * Math.PI * x / wavelength)
                - (2 * Math.PI * frequency * time)
            );

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#333";
        ctx.fill();
    }

    // Wave curve
    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x++) {

        const y =
            centerY +
            amplitude *
            Math.sin(
                (2 * Math.PI * x / wavelength)
                - (2 * Math.PI * frequency * time)
            );

        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#222";
    ctx.font = "16px Arial";

    ctx.fillText(
        "Traveling wave",
        20,
        30
    );

    ctx.fillText(
        "Equilibrium",
        20,
        centerY - 10
    );
}

function drawGraph() {

    gctx.clearRect(
        0,
        0,
        graph.width,
        graph.height
    );

    const centerY = graph.height / 2;

    // Axis
    gctx.beginPath();

    gctx.moveTo(0, centerY);
    gctx.lineTo(graph.width, centerY);

    gctx.strokeStyle = "#cccccc";
    gctx.lineWidth = 1;

    gctx.stroke();

    // Graph wave
    gctx.beginPath();

    for (let x = 0; x <= graph.width; x++) {

        const y =
            centerY +
            (amplitude * 0.7) *
            Math.sin(
                (2 * Math.PI * x / wavelength)
                - (2 * Math.PI * frequency * time)
            );

        if (x === 0) {
            gctx.moveTo(x, y);
        } else {
            gctx.lineTo(x, y);
        }
    }

    gctx.strokeStyle = "#111";
    gctx.lineWidth = 2.5;

    gctx.stroke();

    gctx.fillStyle = "#222";
    gctx.font = "14px Arial";

    gctx.fillText(
        "y",
        10,
        20
    );

    gctx.fillText(
        "x",
        graph.width - 15,
        centerY - 10
    );
}

function animate(currentTime) {

    const deltaTime =
        (currentTime - lastTime) / 1000;

    lastTime = currentTime;

    time += deltaTime;

    drawWave();
    drawGraph();

    requestAnimationFrame(animate);
}

amplitudeSlider.addEventListener(
    "input",
    () => {

        amplitude =
            Number(amplitudeSlider.value);

        updateInformation();
    }
);

wavelengthSlider.addEventListener(
    "input",
    () => {

        wavelength =
            Number(wavelengthSlider.value);

        updateInformation();
    }
);

frequencySlider.addEventListener(
    "input",
    () => {

        frequency =
            Number(frequencySlider.value);

        updateInformation();
    }
);

resetButton.addEventListener(
    "click",
    () => {

        amplitude = 50;
        wavelength = 200;
        frequency = 1;

        amplitudeSlider.value = amplitude;
        wavelengthSlider.value = wavelength;
        frequencySlider.value = frequency;

        time = 0;

        updateInformation();
    }
);

updateInformation();

requestAnimationFrame(animate);
