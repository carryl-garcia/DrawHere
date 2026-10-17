const canvas = document.getElementById("firstCanvas");
const context = canvas.getContext('2d');
const color = document.getElementById("colorPicker");
const brush = document.getElementById("brushSize");
const displayBrush = document.getElementById("displaySize");
const brushBtn = document.getElementById("brush");
const eraserBTn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");

let currentColor = 0o0;
let currentBrushSize = 5;
let displaySize = 5;
let currentTool = 'brush';

let isDrawing = false;
let x = 0;
let y = 0;

brushBtn.addEventListener("click", (e)=> {
    currentTool = 'brush';
})

eraserBTn.addEventListener("click", (e)=> {
    currentTool = 'eraser';
})

clearBtn.addEventListener("click", (e)=>{
    context.clearRect(0, 0, canvas.width, canvas.height)
})


color.addEventListener("input", (e)=>{
    currentColor = e.target.value;
})

brush.addEventListener("input", (e)=>{
    currentBrushSize = e.target.value;
    displayBrush.textContent = e.target.value;
})

firstCanvas.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
});

firstCanvas.addEventListener("mousemove", (e) => {
     if(currentTool==="brush" && isDrawing) {
    context.globalCompositeOperation = "source-over";
    drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
   }
   else if (currentTool==="eraser" && isDrawing){
     context.globalCompositeOperation = "destination-out";
      drawLine(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
   }
});

window.addEventListener("mouseup", (e) => {
    if(isDrawing){
        drawLine(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
});

function drawLine(context, x1, y1, x2, y2){
    context.beginPath();
    context.strokeStyle = currentColor;
    context.lineWidth = currentBrushSize;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
    context.lineCap = "round"; }

