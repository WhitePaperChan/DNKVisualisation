let oneVectorLength = 20;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = 800;
let height = canvas.height = 600;

let input = document.querySelector('input');

let lengthC = 4;
let lengthTU = 2;
let lengthG = 3;
let lengthA = 1;

let x = 0; 
let y = height;

let checkbox = document.querySelector('input[id="triander"]');
let zoomNumberInput = document.querySelector('input[id="zoom"]');
let xNumberInput = document.querySelector('input[id="x"]');
let yNumberInput = document.querySelector('input[id="y"]');

checkbox.addEventListener('change', () => {
    if (checkbox.checked){
        redrawTriander();
    } else {
        redrawMonoander();
    }
})

input.addEventListener("input", () => {
    if (checkbox.checked){
        redrawTriander();
    } else {
        redrawMonoander();
    }
})

zoomNumberInput.addEventListener("input", () => {
    if (checkbox.checked){
        redrawTriander();
    } else {
        redrawMonoander();
    }
})

xNumberInput.addEventListener("input", () => {
    if (checkbox.checked){
        redrawTriander();
    } else {
        redrawMonoander();
    }
})

yNumberInput.addEventListener("input", () => {
    if (checkbox.checked){
        redrawTriander();
    } else {
        redrawMonoander();
    }
})

function drawDNK(dnk, coords){
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);

    dnk.forEach(function(i){
        if (i == "C"){
            coords.y -= oneVectorLength * lengthC;
        } else if (i == "T" || i == "U"){
            coords.x += oneVectorLength * lengthTU;
        } else if (i == "G"){
            coords.y += oneVectorLength * lengthG;
        } else if (i == "A"){
            coords.x -= oneVectorLength * lengthA;
        }
        ctx.lineTo(coords.x, coords.y);
    });
    ctx.stroke();
    ctx.closePath();
}

function redrawTriander(){
    let DNK = input.value;
    DNK = DNK.toUpperCase();

    if (zoomNumberInput.value != ""){
        oneVectorLength = parseInt(zoomNumberInput.value);
    }

    if (xNumberInput.value != ""){
        x = -parseInt(xNumberInput.value) * oneVectorLength;
    }

    if (yNumberInput.value != ""){
        y = height - parseInt(yNumberInput.value) * oneVectorLength;
    }


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

    var coords1 = {x: x, y: y};
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

    coords = {x: x, y: y}
    ctx.strokeStyle = "black";
    drawDNK(DNK, coords);
}

if (checkbox.checked){
    redrawTriander();
} else {
    redrawMonoander();
}

console.log(canvas.width);
console.log(canvas.height);