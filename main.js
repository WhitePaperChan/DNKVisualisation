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

let dirC = "up";
let dirTU = "right";
let dirG = "down";
let dirA = "left";

let x = 0; 
let y = height;

let start = 1;
let end = 100000;

let checkboxTriander = document.querySelector('input[id="triander"]');
let checkboxColors = document.querySelector('input[id="colors"]');

let zoomNumberInput = document.querySelector('input[id="zoom"]');
let xNumberInput = document.querySelector('input[id="x"]');
let yNumberInput = document.querySelector('input[id="y"]');

let lengthCInput = document.querySelector('input[id="lengthC"]');
let lengthTUInput = document.querySelector('input[id="lengthTU"]');
let lengthGInput = document.querySelector('input[id="lengthG"]');
let lengthAInput = document.querySelector('input[id="lengthA"]');

let dirCRadio = document.querySelectorAll('input[name="directionC"]');
let dirTURadio = document.querySelectorAll('input[name="directionTU"]');
let dirGRadio = document.querySelectorAll('input[name="directionG"]');
let dirARadio = document.querySelectorAll('input[name="directionA"]');

let dirCLabels = document.querySelectorAll('label[for^="directionC"]');
let dirTULabels = document.querySelectorAll('label[for^="directionTU"]');
let dirGLabels = document.querySelectorAll('label[for^="directionG"]');
let dirALabels = document.querySelectorAll('label[for^="directionA"]');

let defaultButton = document.querySelector('input[id="defaultButton"]');

let startInput = document.querySelector('input[id="start"]');
let endInput = document.querySelector('input[id="end"]');

let warningSizeText = document.getElementById('warningSize');
let warningLettersText = document.getElementById('warningLetters');

function defaultParams(){
    lengthCInput.value = 4;
    lengthTUInput.value = 2;
    lengthGInput.value = 3;
    lengthAInput.value = 1;
    dirCRadio.forEach(i => {if (i.value == "up"){i.checked = true;} else {i.checked = false;}})
    dirTURadio.forEach(i => {if (i.value == "right"){i.checked = true;} else {i.checked = false;}})
    dirGRadio.forEach(i => {if (i.value == "down"){i.checked = true;} else {i.checked = false;}})
    dirARadio.forEach(i => {if (i.value == "left"){i.checked = true;} else {i.checked = false;}})
    redraw();
    checkSameLetters();
}

function redraw(){
    let invalidInput = false;
    let invalidInputsList = "";
    [[zoomNumberInput, "zoom"], [xNumberInput, "x"], [yNumberInput, "y"], 
    [lengthCInput, "C"], [lengthTUInput, "T/U"], [lengthGInput, "G"], [lengthAInput, "A"], 
    [startInput, "start"], [endInput, "end"]].forEach(
            i => {
                if (!i[0].validity.valid){
                    invalidInput = true; 
                    if (invalidInputsList != "") {
                        invalidInputsList += ", "
                    }
                    invalidInputsList += i[1]
                }
            }
        );
    if (invalidInput){
        warningSizeText.textContent = "Invalid value of " + invalidInputsList + "!";
    } else {
        warningSizeText.textContent = "";
    }
    if (zoomNumberInput.value != ""){
        oneVectorLength = parseInt(zoomNumberInput.value);
    }
    if (xNumberInput.value != ""){
        x = -parseInt(xNumberInput.value) * oneVectorLength;
    }
    if (yNumberInput.value != ""){
        y = height - parseInt(yNumberInput.value) * oneVectorLength;
    }
    if (lengthCInput.value != ""){
        lengthC = parseInt(lengthCInput.value);
    }
    if (lengthTUInput.value != ""){
        lengthTU = parseInt(lengthTUInput.value);
    }
    if (lengthGInput.value != ""){
        lengthG = parseInt(lengthGInput.value);
    }
    if (lengthAInput.value != ""){
        lengthA = parseInt(lengthAInput.value);
    }
    dirCRadio.forEach(i => {if (i.checked){dirC = i.value}})
    dirTURadio.forEach(i => {if (i.checked){dirTU = i.value}})
    dirGRadio.forEach(i => {if (i.checked){dirG = i.value}})
    dirARadio.forEach(i => {if (i.checked){dirA = i.value}})
    if (startInput.value != ""){
        start = parseInt(startInput.value);
    }
    if (endInput.value != ""){
        end = parseInt(endInput.value);
    }
    if (checkboxTriander.checked){
        redrawTriander();
    } else {
        redrawMonoander();
    }
}

[zoomNumberInput, xNumberInput, yNumberInput, 
    lengthCInput, lengthTUInput, lengthGInput, lengthAInput, startInput, endInput].forEach(i => i.addEventListener("input", redraw));
checkboxTriander.addEventListener('change', redraw);
checkboxColors.addEventListener('change', redraw);
input.addEventListener("input", redraw);
defaultButton.addEventListener("click", defaultParams);

dirCRadio.forEach(i => i.addEventListener("click", () => {redraw(); checkSameLetters()}));
dirTURadio.forEach(i => i.addEventListener("click", () => {redraw(); checkSameLetters()}));
dirGRadio.forEach(i => i.addEventListener("click", () => {redraw(); checkSameLetters()}));
dirARadio.forEach(i => i.addEventListener("click", () => {redraw(); checkSameLetters()}));

function checkSameLetters(){
    var labels = [dirCLabels, dirTULabels, dirGLabels, dirALabels];
    var dirs = [dirC, dirTU, dirG, dirA];
    var letters = ["C", "T/U", "G", "A"]
    var hasSameLetters = false;
    var sameLetters = "";
    labels.forEach(i => i.forEach(j => j.style.color = "black"));
    for (let i = 0; i < 4; i++){
        for (let j = i+1; j < 4; j++){
            if (dirs[i] == dirs[j]){
                hasSameLetters = true;
                if (sameLetters != ""){
                    sameLetters += ", ";
                }
                sameLetters += letters[i] + " and " + letters[j];
                if (dirs[i] == "right"){
                    labels[i][0].style.color = "red";
                    labels[j][0].style.color = "red";
                }
                if (dirs[i] == "left"){
                    labels[i][1].style.color = "red";
                    labels[j][1].style.color = "red";
                }
                if (dirs[i] == "up"){
                    labels[i][2].style.color = "red";
                    labels[j][2].style.color = "red";
                }
                if (dirs[i] == "down"){
                    labels[i][3].style.color = "red";
                    labels[j][3].style.color = "red";
                }
            }
            if (hasSameLetters){
                warningLettersText.textContent = "Some letters (" + sameLetters + ") have the same direction!";
            } else {
                warningLettersText.textContent = "";
            }
        }
    }
}

function processLetter(direction, length, coords){
    if (direction == "up"){
        coords.y -= oneVectorLength * length;
    } else if (direction == "right"){
        coords.x += oneVectorLength * length;
    } else if (direction == "down"){
        coords.y += oneVectorLength * length;
    } else if (direction == "left"){
        coords.x -= oneVectorLength * length;
    }
}

function drawDNKdifferentColors(dnk, coords, colors){
    dnk.forEach(function(i){
        ctx.beginPath();
        ctx.moveTo(coords.x, coords.y);
        if (i == "C"){
            ctx.strokeStyle = colors[0];
            processLetter(dirC, lengthC, coords);
        } else if (i == "T" || i == "U"){
            ctx.strokeStyle = colors[1];
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "G"){
            ctx.strokeStyle = colors[2];
            processLetter(dirG, lengthG, coords);
        } else if (i == "A"){
            ctx.strokeStyle = colors[3];
            processLetter(dirA, lengthA, coords);
        }
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        ctx.closePath();
    });
}

function drawDNK(dnk, coords){
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);

    dnk.forEach(function(i){
        if (i == "C"){
            processLetter(dirC, lengthC, coords);
        } else if (i == "T" || i == "U"){
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "G"){
            processLetter(dirG, lengthG, coords);
        } else if (i == "A"){
            processLetter(dirA, lengthA, coords);
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

    DNK = DNK.slice(start - 1, end)
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

    if (checkboxColors.checked){
        drawDNKdifferentColors(DNK1, coords1, ["purple", "blue", "green", "orange"])
        drawDNKdifferentColors(DNK2, coords2, ["magenta", "deepskyblue", "springgreen", "orangered"])
        drawDNKdifferentColors(DNK3, coords3, ["darkorchid", "navy", "lime", "red"])
    } else {
        ctx.strokeStyle = "blue";
        drawDNK(DNK1, coords1);
        ctx.strokeStyle = "green";
        drawDNK(DNK2, coords2);
        ctx.strokeStyle = "red";
        drawDNK(DNK3, coords3);
    }

}

function redrawMonoander(){
    let DNK = input.value;
    DNK = DNK.toUpperCase();
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, width, height);

    DNK = DNK.slice(start - 1, end)
    DNK = DNK.split('');

    coords = {x: x, y: y}
    ctx.strokeStyle = "black";
    if (checkboxColors.checked){
        drawDNKdifferentColors(DNK, coords, ["purple", "blue", "green", "orange"]);
    } else {
        drawDNK(DNK, coords);
    }
}

redraw();
checkSameLetters();