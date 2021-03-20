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
    DNK = DNK.toUpperCase();
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, width, height);

    DNK = DNK.split('');

    let DNK1 = [];
    let DNK2 = [];
    let DNK3 = [];

    for (i = 0; i < DNK.length; i++){
        j = i % 3;
        if (j == 0){
            DNK1.push(DNK[i]);
        } else if (j == 1){
            DNK2.push(DNK[i]);
        } else {
            DNK3.push(DNK[i]);
        }
    }

    x1 = width / 4
    y1 = 9 * height / 10
    x2 = x1
    y2 = y1
    x3 = x1
    y3 = y1
    ctx.beginPath();
    ctx.moveTo(x1, y1);

    DNK1.forEach(function(i){
        if (i == "C"){
            y1 -= oneVectorLength * 4;
        } else if (i == "T"){
            x1 += oneVectorLength * 2;
        } else if (i == "U"){
            x1 += oneVectorLength * 2;
        } else if (i == "G"){
            y1 += oneVectorLength * 3;
        } else if (i == "A"){
            x1 -= oneVectorLength * 1;
        }
        ctx.lineTo(x1, y1);
    });
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x2, y2);

    DNK2.forEach(function(i){
        if (i == "C"){
            y2 -= oneVectorLength * 4;
        } else if (i == "T"){
            x2 += oneVectorLength * 2;
        } else if (i == "U"){
            x2 += oneVectorLength * 2;
        } else if (i == "G"){
            y2 += oneVectorLength * 3;
        } else if (i == "A"){
            x2 -= oneVectorLength * 1;
        }
        ctx.lineTo(x2, y2);
    });
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x3, y3);

    DNK3.forEach(function(i){
        if (i == "C"){
            y3 -= oneVectorLength * 4;
        } else if (i == "T"){
            x3 += oneVectorLength * 2;
        } else if (i == "U"){
            x3 += oneVectorLength * 2;
        } else if (i == "G"){
            y3 += oneVectorLength * 3;
        } else if (i == "A"){
            x3 -= oneVectorLength * 1;
        }
        ctx.lineTo(x3, y3);
    });
    ctx.stroke();
    ctx.closePath();
}

function redrawMonoander(){
    let DNK = input.value;
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