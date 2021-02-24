let oneVectorLength = 20;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = 800;
let height = canvas.height = 600;

let input = document.querySelector('input');

let button = document.querySelector('button');
//button.addEventListener("click", redraw)
input.addEventListener("input", redraw)
//DNK = input.value;

function redraw(){
    let DNK = input.value;
    if (DNK.length > 10000){
        return;
    }
    DNK = DNK.toUpperCase();
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, width, height);

    DNK = DNK.split('');

    x = width / 4
    y = 9 * height / 10
    ctx.beginPath();
    ctx.moveTo(x, y);

    DNK.forEach(function(i){
        if (i == "C"){
            y -= oneVectorLength * 4;
        } else if (i == "T"){
            x += oneVectorLength * 2;
        } else if (i == "U"){
            x += oneVectorLength * 2;
        } else if (i == "G"){
            y += oneVectorLength * 3;
        } else if (i == "A"){
            x -= oneVectorLength * 1;
        }
        ctx.lineTo(x, y);
    });

    ctx.stroke();
}

redraw();

console.log(canvas.width);
console.log(canvas.height);