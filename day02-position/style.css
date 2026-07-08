* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #111827;
    color: white;
    line-height: 1.6;
}

/* ---------- Header ---------- */

header {
    text-align: center;
    padding: 35px 20px;
}

header h1 {
    color: #60a5fa;
    font-size: 2.7rem;
}

header h2 {
    margin-top: 10px;
    color: #f3f4f6;
}

header p {
    max-width: 700px;
    margin: 15px auto;
    color: #cbd5e1;
}

/* ---------- Layout ---------- */

main {
    width: min(1400px, 95%);
    margin: auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "journal journal"
        "canvas controls"
        "info info";
    gap: 25px;
    margin-bottom: 40px;
}

.journal {
    grid-area: journal;
}

.canvas-section {
    grid-area: canvas;
    display: flex;
    justify-content: center;
}

.controls {
    grid-area: controls;
}

.info {
    grid-area: info;
}

/* ---------- Cards ---------- */

.journal,
.controls,
.info {
    background: #1f2937;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0,0,0,.35);
}

.journal h2,
.controls h3,
.info h3 {
    color: #60a5fa;
    margin-bottom: 12px;
}

.coming-soon {
    color: #d1d5db;
}

/* ---------- Canvas ---------- */

canvas {
    width: 100%;
    max-width: 700px;
    background: #0f172a;
    border: 2px solid #374151;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(96,165,250,.2);
}

/* ---------- Controls ---------- */

label {
    display: block;
    margin-top: 20px;
}

input[type="range"] {
    width: 100%;
    margin-top: 8px;
}

span {
    display: inline-block;
    margin-top: 5px;
    color: #60a5fa;
    font-weight: bold;
}

button {
    width: 100%;
    margin: 20px 0;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background: #3b82f6;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.2s;
}

button:hover {
    background: #2563eb;
    transform: translateY(-2px);
}

/* ---------- Info Cards ---------- */

.card {
    background: #111827;
    margin-bottom: 18px;
    padding: 15px;
    border-radius: 10px;
    border-left: 5px solid #3b82f6;
}

.card h4 {
    margin-bottom: 8px;
}

.explanation {
    border-left-color: #22c55e;
}

/* ---------- Footer ---------- */

footer {
    text-align: center;
    color: #9ca3af;
    padding: 30px;
}

strong {
    color: #60a5fa;
}

/* ---------- Mobile ---------- */

@media (max-width: 950px) {

    main {
        grid-template-columns: 1fr;
        grid-template-areas:
            "journal"
            "canvas"
            "controls"
            "info";
    }

    canvas {
        max-width: 100%;
    }

}
