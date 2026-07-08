const canvas =
document.getElementById("canvas");

const ctx =
canvas.getContext("2d");


const center = {
    x: canvas.width/2,
    y: canvas.height/2
};


const sliders =
document.querySelectorAll("input");


sliders.forEach(
    slider => slider.addEventListener(
        "input",
        draw
    )
);



function arrow(x1,y1,x2,y2,color){


ctx.strokeStyle=color;
ctx.fillStyle=color;
ctx.lineWidth=5;


ctx.beginPath();

ctx.moveTo(x1,y1);

ctx.lineTo(x2,y2);

ctx.stroke();



let angle =
Math.atan2(
y2-y1,
x2-x1
);



let size=15;


ctx.beginPath();

ctx.moveTo(x2,y2);

ctx.lineTo(
x2-size*Math.cos(angle-Math.PI/6),
y2-size*Math.sin(angle-Math.PI/6)
);


ctx.lineTo(
x2-size*Math.cos(angle+Math.PI/6),
y2-size*Math.sin(angle+Math.PI/6)
);


ctx.closePath();

ctx.fill();


}



function grid(){


ctx.strokeStyle="#1e293b";

ctx.lineWidth=1;


for(let i=0;i<700;i+=50){


ctx.beginPath();

ctx.moveTo(i,0);
ctx.lineTo(i,700);

ctx.stroke();


ctx.beginPath();

ctx.moveTo(0,i);
ctx.lineTo(700,i);

ctx.stroke();


}


ctx.strokeStyle="#94a3b8";

ctx.lineWidth=2;


ctx.beginPath();

ctx.moveTo(center.x,0);

ctx.lineTo(center.x,700);

ctx.stroke();


ctx.beginPath();

ctx.moveTo(0,center.y);

ctx.lineTo(700,center.y);

ctx.stroke();



}



function draw(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);


grid();



let ax =
Number(document.getElementById("ax").value);


let ay =
Number(document.getElementById("ay").value);



let bx =
Number(document.getElementById("bx").value);


let by =
Number(document.getElementById("by").value);



let rx=ax+bx;

let ry=ay+by;



arrow(
center.x,
center.y,
center.x+ax,
center.y-ay,
"#ef4444"
);



arrow(
center.x,
center.y,
center.x+bx,
center.y-by,
"#3b82f6"
);



arrow(
center.x,
center.y,
center.x+rx,
center.y-ry,
"#22c55e"
);



let magnitude =
Math.sqrt(
rx*rx + ry*ry
);



let angle =
Math.atan2(
ry,
rx
)*180/Math.PI;



document.getElementById("info").innerHTML=`

<h2>Resultant Vector</h2>

<p>
Components:
(${rx}, ${ry})
</p>

<p>
Magnitude:
${magnitude.toFixed(2)}
</p>

<p>
Direction:
${angle.toFixed(1)}°
</p>

`;

}



draw();
