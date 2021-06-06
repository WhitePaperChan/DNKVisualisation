let oneVectorLength = 20;
var svg = document.getElementById('canvas');

let width = canvas.width = 800;
let height = canvas.height = 600;
let stroke_width = 0.1;

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

let importInput = document.getElementById('import');

importInput.addEventListener("change", () => {
    let file = document.getElementById('import').files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        read_result = reader.result;
        if (read_result.length < 100000){
            input.value = read_result;
        } else {
            input.value = read_result.slice(0, 100000);
        }
        redraw();
    };
});

let exportButton = document.getElementById('export');
exportButton.addEventListener("click", () => {
    var svgData = svg.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "name.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

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
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        element.setAttributeNS(null, 'x1', coords.x / 50);
        element.setAttributeNS(null, 'y1', coords.y / 50);
        if (i == "C"){
            element.setAttributeNS(null, 'stroke', colors[0]);
            processLetter(dirC, lengthC, coords);
        } else if (i == "T" || i == "U"){
            element.setAttributeNS(null, 'stroke', colors[1]);
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "G"){
            element.setAttributeNS(null, 'stroke', colors[2]);
            processLetter(dirG, lengthG, coords);
        } else if (i == "A"){
            element.setAttributeNS(null, 'stroke', colors[3]);
            processLetter(dirA, lengthA, coords);
        }
        element.setAttributeNS(null, 'x2', coords.x / 50);
        element.setAttributeNS(null, 'y2', coords.y / 50);
        element.setAttributeNS(null, 'stroke-width', stroke_width);
        svg.appendChild(element);
    });
}

function drawDNK(dnk, coords, color){

    dnk.forEach(function(i){
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        element.setAttributeNS(null, 'x1', coords.x / 50);
        element.setAttributeNS(null, 'y1', coords.y / 50);
        if (i == "C"){
            processLetter(dirC, lengthC, coords);
        } else if (i == "T" || i == "U"){
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "G"){
            processLetter(dirG, lengthG, coords);
        } else if (i == "A"){
            processLetter(dirA, lengthA, coords);
        }
        element.setAttributeNS(null, 'x2', coords.x / 50);
        element.setAttributeNS(null, 'y2', coords.y / 50);
        element.setAttributeNS(null, 'stroke', color);
        element.setAttributeNS(null, 'stroke-width', stroke_width);
        svg.appendChild(element);
    });
}

function redrawTriander(){
    let DNK = input.value;
    DNK = DNK.toUpperCase();

    svg.innerHTML = "";


    DNK = DNK.slice(start - 1, end)
    DNK = DNK.split('');
    DNK = DNK.filter(function(value, index, arr){
        return (value == "A" || value == "C" || value == "T" || value == "U" || value == "G");
    });

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

    var svgRect = svg.getBoundingClientRect();
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    element.setAttributeNS(null, 'x1', 0);
    element.setAttributeNS(null, 'y1', coords1.y / 50);
    element.setAttributeNS(null, 'x2', svgRect.width);
    element.setAttributeNS(null, 'y2', coords1.y / 50);
    element.setAttributeNS(null, 'stroke', "lightgray");
    element.setAttributeNS(null, 'stroke-width', stroke_width);
    svg.appendChild(element);

    
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    element.setAttributeNS(null, 'x1', coords1.x / 50);
    element.setAttributeNS(null, 'y1', 0);
    element.setAttributeNS(null, 'x2', coords1.x / 50);
    element.setAttributeNS(null, 'y2', svgRect.height);
    element.setAttributeNS(null, 'stroke', "lightgray");
    element.setAttributeNS(null, 'stroke-width', stroke_width);
    svg.appendChild(element);

    if (checkboxColors.checked){
        drawDNKdifferentColors(DNK1, coords1, ["purple", "blue", "green", "orange"])
        drawDNKdifferentColors(DNK2, coords2, ["magenta", "deepskyblue", "springgreen", "orangered"])
        drawDNKdifferentColors(DNK3, coords3, ["darkorchid", "navy", "lime", "red"])
    } else {
        drawDNK(DNK1, coords1, "blue");
        drawDNK(DNK2, coords2, "green");
        drawDNK(DNK3, coords3, "red");
    }

}

function redrawMonoander(){
    let DNK = input.value;
    DNK = DNK.toUpperCase();
    svg.innerHTML = "";

    DNK = DNK.slice(start - 1, end)
    DNK = DNK.split('');
    DNK = DNK.filter(function(value, index, arr){
        return (value == "A" || value == "C" || value == "T" || value == "U" || value == "G");
    });

    coords = {x: x, y: y}
    
    var svgRect = svg.getBoundingClientRect();
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    element.setAttributeNS(null, 'x1', 0);
    element.setAttributeNS(null, 'y1', coords.y / 50);
    element.setAttributeNS(null, 'x2', svgRect.width);
    element.setAttributeNS(null, 'y2', coords.y / 50);
    element.setAttributeNS(null, 'stroke', "lightgray");
    element.setAttributeNS(null, 'stroke-width', stroke_width);
    svg.appendChild(element);

    
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    element.setAttributeNS(null, 'x1', coords.x / 50);
    element.setAttributeNS(null, 'y1', 0);
    element.setAttributeNS(null, 'x2', coords.x / 50);
    element.setAttributeNS(null, 'y2', svgRect.height);
    element.setAttributeNS(null, 'stroke', "lightgray");
    element.setAttributeNS(null, 'stroke-width', stroke_width);
    svg.appendChild(element);
    if (checkboxColors.checked){
        drawDNKdifferentColors(DNK, coords, ["purple", "blue", "green", "orange"]);
    } else {
        drawDNK(DNK, coords, "black");
    }
}

redraw();
checkSameLetters();