let oneVectorLength = 20;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = 800;
let height = canvas.height = 600;

let input = document.querySelector('input');

let button = document.querySelector('button');
input.addEventListener("input", redraw)

function redraw(){
    let DNK = input.value;
    DNK = DNK.toUpperCase();
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, width, height);

    function drawDNK(dnk, coords){
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
    
        dnk.forEach(function(i){
            if (i == "C"){
                coords.y -= oneVectorLength * 4;
            } else if (i == "T"){
                coords.x += oneVectorLength * 2;
            } else if (i == "U"){
                coords.x += oneVectorLength * 2;
            } else if (i == "G"){
                coords.y += oneVectorLength * 3;
            } else if (i == "A"){
                coords.x -= oneVectorLength * 1;
            }
            ctx.lineTo(coords.x, coords.y);
        });
        ctx.stroke();
        ctx.closePath();
    }

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

    var coords1 = {x: width / 4, y: 9 * height / 10};
    var coords2 = {x: coords1.x, y: coords1.y};
    var coords3 = {x: coords1.x, y: coords1.y};

    ctx.strokeStyle = "blue";
    drawDNK(DNK1, coords1);
    ctx.strokeStyle = "green";
    drawDNK(DNK2, coords2);
    ctx.strokeStyle = "red";
    drawDNK(DNK3, coords3);

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