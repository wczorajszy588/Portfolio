window.addEventListener("load", handleSite);

function handleSite() {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    [lastX, lastY] = [0, 0];
    let isDrawing = false;
    let color = {};
    let isPenGrow = true;

    canvas.addEventListener("mousedown", (e) => {
        if (e.buttons == 1) { //if left mouse button pressed
            isDrawing = true;
            [lastX, lastY] = [e.clientX, e.clientY];
            color = setRandomColor();
            draw(e); //to draw also on single click
        }  
    } )
    canvas.addEventListener("mousemove", (e)=> {
        if (isDrawing) {
            draw(e);
            managePenChangeSize();
        }
        [lastX, lastY] = [e.clientX, e.clientY];   
    });
    canvas.addEventListener("mouseup", e => isDrawing = false);
    canvas.addEventListener("mouseout", e => isDrawing = false);

    function draw(e) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.stroke();
    }
    function setRandomColor() {
        return {
            r: Math.floor(Math.random() * 250),
            g: Math.floor(Math.random() * 250),
            b: Math.floor(Math.random() * 250)
        }
    }
    function managePenChangeSize() {
        if ( ctx.lineWidth < 1  || ctx.lineWidth > 40 ) {
            isPenGrow = !isPenGrow;
        }
        ctx.lineWidth = isPenGrow ? ctx.lineWidth + 0.3 : ctx.lineWidth - 0.3;
    }
}