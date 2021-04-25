let oneVectorLength = 20;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = 800;
let height = canvas.height = 600;

let input = document.querySelector('input');

let button = document.querySelector('button');

let lengthC = 4;
let lengthTU = 2;
let lengthG = 3;
let lengthA = 1;

let checkbox = document.querySelector('input[id="triander"]')
let zoomNumberInput = document.querySelector('input[id="zoom"]')
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
    let value = zoomNumberInput.value;
    if (value == ""){
        console.log("There are no text...");
    } else {
        oneVectorLength = parseInt(value);
        if (checkbox.checked){
            redrawTriander();
        } else {
            redrawMonoander();
        }
        console.log(parseInt(value));
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

    coords = {x: width / 4, y: 9 * height / 10}
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