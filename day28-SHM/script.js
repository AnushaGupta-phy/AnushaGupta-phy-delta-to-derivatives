document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------
    // Elements
    // --------------------------------------------------

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const graph = document.getElementById("graph");
    const graphCtx = graph.getContext("2d");

    const kSlider = document.getElementById("kSlider");
    const massSlider = document.getElementById("massSlider");
    const amplitudeSlider = document.getElementById("amplitudeSlider");

    const kValue = document.getElementById("kValue");
    const massValue = document.getElementById("massValue");
    const amplitudeValue = document.getElementById("amplitudeValue");

    const frequencyValue = document.getElementById("frequencyValue");
    const periodValue = document.getElementById("periodValue");
    const displacementValue = document.getElementById("displacementValue");
    const calculus = document.getElementById("calculus");

    const toggleButton = document.getElementById("toggleButton");
    const resetButton = document.getElementById("resetButton");


    // --------------------------------------------------
    // State
    // --------------------------------------------------

    let k = 20;
    let mass = 2;
    let amplitude = 100;

    let time = 0;
    let running = true;

    let lastTime = performance.now();

    let graphData = [];


    // --------------------------------------------------
    // Physics
    // --------------------------------------------------

    // Angular frequency:
    //
    // ω = √(k/m)

    function getAngularFrequency() {

        return Math.sqrt(k / mass);

    }


    // Period:
    //
    // T = 2π√(m/k)

    function getPeriod() {

        return 2 * Math.PI * Math.sqrt(mass / k);

    }


    // Displacement:
    //
    // x(t) = A cos(ωt)

    function getDisplacement() {

        const omega = getAngularFrequency();

        return amplitude * Math.cos(omega * time);

    }


    // --------------------------------------------------
    // Draw Spring
    // --------------------------------------------------

    function drawSpring() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const centerY = canvas.height / 2;

        const wallX = 70;

        const equilibriumX = 380;

        const displacement = getDisplacement();

        const massX = equilibriumX + displacement;


        // Floor

        ctx.beginPath();

        ctx.moveTo(
            40,
            centerY + 90
        );

        ctx.lineTo(
            560,
            centerY + 90
        );

        ctx.strokeStyle = "#334155";

        ctx.lineWidth = 3;

        ctx.stroke();


        // Wall

        ctx.fillStyle = "#475569";

        ctx.fillRect(
            wallX,
            centerY - 100,
            15,
            200
        );


        // Spring

        const springStart = wallX + 15;

        const springEnd = massX - 35;

        const springLength = Math.max(
            springEnd - springStart,
            20
        );

        const coils = 14;

        const coilHeight = 18;


        ctx.beginPath();

        ctx.moveTo(
            springStart,
            centerY
        );


        for (let i = 1; i <= coils; i++) {

            const x =
                springStart +
                (springLength / coils) * i;

            let y = centerY;


            if (i < coils) {

                y =
                    centerY +
                    (
                        i % 2 === 0
                            ? -coilHeight
                            : coilHeight
                    );

            }


            ctx.lineTo(
                x,
                y
            );

        }


        ctx.strokeStyle = "#60a5fa";

        ctx.lineWidth = 4;

        ctx.stroke();


        // Mass

        ctx.fillStyle = "#e2e8f0";

        ctx.fillRect(
            massX - 35,
            centerY - 35,
            70,
            70
        );


        ctx.strokeStyle = "#60a5fa";

        ctx.lineWidth = 4;

        ctx.strokeRect(
            massX - 35,
            centerY - 35,
            70,
            70
        );


        // Equilibrium line

        ctx.beginPath();

        ctx.setLineDash([
            6,
            6
        ]);

        ctx.moveTo(
            equilibriumX,
            centerY - 130
        );

        ctx.lineTo(
            equilibriumX,
            centerY + 130
        );

        ctx.strokeStyle = "#64748b";

        ctx.lineWidth = 2;

        ctx.stroke();

        ctx.setLineDash([]);


        // Labels

        ctx.fillStyle = "#cbd5e1";

        ctx.font = "15px Arial";

        ctx.textAlign = "center";


        ctx.fillText(
            "Equilibrium",
            equilibriumX,
            centerY - 145
        );


        ctx.fillText(
            "Mass",
            massX,
            centerY + 125
        );


        ctx.fillText(
            "x(t)",
            massX,
            centerY - 55
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


        // Background

        graphCtx.fillStyle = "#0b1220";

        graphCtx.fillRect(
            0,
            0,
            graph.width,
            graph.height
        );


        // Axes

        graphCtx.strokeStyle = "#475569";

        graphCtx.lineWidth = 1;

        graphCtx.beginPath();

        graphCtx.moveTo(
            50,
            20
        );

        graphCtx.lineTo(
            50,
            260
        );

        graphCtx.lineTo(
            570,
            260
        );

        graphCtx.stroke();


        // Equilibrium axis

        graphCtx.beginPath();

        graphCtx.setLineDash([
            5,
            5
        ]);

        graphCtx.moveTo(
            50,
            140
        );

        graphCtx.lineTo(
            570,
            140
        );

        graphCtx.strokeStyle = "#334155";

        graphCtx.stroke();

        graphCtx.setLineDash([]);


        if (graphData.length < 2) {
            return;
        }


        // Waveform

        graphCtx.beginPath();


        graphData.forEach((point, index) => {

            const x =
                50 +
                (
                    index /
                    Math.max(
                        graphData.length - 1,
                        1
                    )
                ) *
                520;


            const y =
                140 -
                (
                    point.displacement /
                    180
                ) *
                100;


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

        });


        graphCtx.strokeStyle = "#60a5fa";

        graphCtx.lineWidth = 3;

        graphCtx.stroke();


        // Labels

        graphCtx.fillStyle = "#cbd5e1";

        graphCtx.font = "13px Arial";

        graphCtx.textAlign = "left";


        graphCtx.fillText(
            "Displacement",
            55,
            18
        );


        graphCtx.textAlign = "right";


        graphCtx.fillText(
            "Time",
            570,
            285
        );

    }


    // --------------------------------------------------
    // Information
    // --------------------------------------------------

    function updateInformation() {

        const omega =
            getAngularFrequency();

        const period =
            getPeriod();

        const displacement =
            getDisplacement();


        // Slider labels

        kValue.textContent =
            `${k.toFixed(0)} N/m`;


        massValue.textContent =
            `${mass.toFixed(1)} kg`;


        amplitudeValue.textContent =
            `${amplitude.toFixed(0)} px`;


        // Angular frequency

        frequencyValue.innerHTML = `

            \\[
            \\omega = \\sqrt{\\frac{k}{m}}
            \\]

            \\[
            \\omega =
            ${omega.toFixed(2)}
            \\ \\text{rad/s}
            \\]

        `;


        // Period

        periodValue.innerHTML = `

            \\[
            T = 2\\pi\\sqrt{\\frac{m}{k}}
            \\]

            \\[
            T =
            ${period.toFixed(2)}
            \\ \\text{s}
            \\]

        `;


        // Current displacement

        displacementValue.innerHTML = `

            \\[
            x(t) =
            ${displacement.toFixed(1)}
            \\ \\text{px}
            \\]

        `;


        // Calculus section

        calculus.innerHTML = `

            Simple harmonic motion can be described
            using a sinusoidal function:

            \\[
            x(t) = A\\cos(\\omega t)
            \\]

            Taking the derivative gives velocity:

            \\[
            v(t) =
            \\frac{dx}{dt}
            \\]

            Taking another derivative gives acceleration:

            \\[
            a(t) =
            \\frac{d^2x}{dt^2}
            \\]

            For a spring, Hooke's law gives:

            \\[
            F = -kx
            \\]

            Combining this with Newton's second law:

            \\[
            F = ma
            \\]

            gives:

            \\[
            m\\frac{d^2x}{dt^2} = -kx
            \\]

            or:

            \\[
            \\frac{d^2x}{dt^2}
            =
            -\\frac{k}{m}x
            \\]

        `;


        // Render LaTeX if MathJax is installed.

        if (
            window.MathJax &&
            typeof window.MathJax.typesetPromise === "function"
        ) {

            window.MathJax.typesetPromise([
                frequencyValue,
                periodValue,
                displacementValue,
                calculus
            ]).catch(() => {});

        }

    }


    // --------------------------------------------------
    // Animation
    // --------------------------------------------------

    function animate(currentTime) {

        const deltaTime =
            (currentTime - lastTime) / 1000;

        lastTime = currentTime;


        if (running) {

            time += deltaTime;


            graphData.push({

                displacement:
                    getDisplacement(),

                time:
                    time

            });


            if (graphData.length > 180) {

                graphData.shift();

            }

        }


        drawSpring();

        drawGraph();

        updateInformation();


        requestAnimationFrame(
            animate
        );

    }


    // --------------------------------------------------
    // Controls
    // --------------------------------------------------

    kSlider.addEventListener(
        "input",
        () => {

            k =
                parseFloat(
                    kSlider.value
                );

            updateInformation();

        }
    );


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

            k = 20;

            mass = 2;

            amplitude = 100;

            time = 0;

            graphData = [];

            kSlider.value = 20;

            massSlider.value = 2;

            amplitudeSlider.value = 100;

            running = true;

            toggleButton.textContent =
                "Pause";


            updateInformation();

        }
    );


    // --------------------------------------------------
    // Start
    // --------------------------------------------------

    updateInformation();

    drawSpring();

    drawGraph();

    requestAnimationFrame(
        animate
    );

});
