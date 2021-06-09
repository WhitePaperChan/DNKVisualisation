let oneVectorLength = 20;
var svg = document.getElementById('canvas');

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
let y = svg.getBoundingClientRect().height;

let start = 1;
let end = 100000;

let monoanderSolid = "#000000"; 
let monoanderC = "#800080"; 
let monoanderTU = "#0000FF";
let monoanderG = "#008000";
let monoanderA = "#FFA500"; 

let triander1Solid = "#0000FF";
let triander1C = "#800080";
let triander1TU = "#0000FF"; 
let triander1G = "#008000"; 
let triander1A = "#FFA500"; 

let triander2Solid = "#008000";
let triander2C = "#FF00FF";
let triander2TU = "#00BFFF";
let triander2G = "#00FF7F";
let triander2A = "#FF4500";

let triander3Solid = "#FF0000";
let triander3C = "#9932CC";
let triander3TU = "#000080";
let triander3G = "#00FF00"; 
let triander3A = "#FF0000";

let strokeMonoander = 0.1;
let strokeBranch1 = 0.1;
let strokeBranch2 = 0.1;
let strokeBranch3 = 0.1;

let pickerMonoanderSolid = document.getElementById('monoanderSolid');
let pickerMonoanderC = document.getElementById('monoanderC');
let pickerMonoanderTU = document.getElementById('monoanderTU');
let pickerMonoanderG = document.getElementById('monoanderG');
let pickerMonoanderA = document.getElementById('monoanderA');

let pickerTriander1Solid = document.getElementById('triander1Solid');
let pickerTriander1C = document.getElementById('triander1C');
let pickerTriander1TU = document.getElementById('triander1TU');
let pickerTriander1G = document.getElementById('triander1G');
let pickerTriander1A = document.getElementById('triander1A');

let pickerTriander2Solid = document.getElementById('triander2Solid');
let pickerTriander2C = document.getElementById('triander2C');
let pickerTriander2TU = document.getElementById('triander2TU');
let pickerTriander2G = document.getElementById('triander2G');
let pickerTriander2A = document.getElementById('triander2A');

let pickerTriander3Solid = document.getElementById('triander3Solid');
let pickerTriander3C = document.getElementById('triander3C');
let pickerTriander3TU = document.getElementById('triander3TU');
let pickerTriander3G = document.getElementById('triander3G');
let pickerTriander3A = document.getElementById('triander3A');

let strokeMonoanderInput = document.getElementById('strokeMonoander');
let strokeBranch1Input = document.getElementById('strokeBranch1');
let strokeBranch2Input = document.getElementById('strokeBranch2');
let strokeBranch3Input = document.getElementById('strokeBranch3');

[strokeMonoanderInput, strokeBranch1Input, strokeBranch2Input, strokeBranch3Input].forEach(i => i.addEventListener('input', () => redraw()));

[pickerMonoanderSolid, pickerMonoanderC, pickerMonoanderTU, pickerMonoanderG, pickerMonoanderA, 
    pickerTriander1Solid, pickerTriander1C, pickerTriander1TU, pickerTriander1G, pickerTriander1A, 
    pickerTriander2Solid, pickerTriander2C, pickerTriander2TU, pickerTriander2G, pickerTriander2A, 
    pickerTriander3Solid, pickerTriander3C, pickerTriander3TU, pickerTriander3G, pickerTriander3A
].forEach(i => i.addEventListener('change', () => redraw()));

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

[zoomNumberInput, xNumberInput, yNumberInput, 
    lengthCInput, lengthTUInput, lengthGInput, lengthAInput, startInput, endInput].forEach(i => i.addEventListener("input", redraw));
checkboxTriander.addEventListener('change', redraw);
checkboxColors.addEventListener('change', redraw);
input.addEventListener("input", redraw);
defaultButton.addEventListener("click", defaultParams);

[dirCRadio, dirTURadio, dirGRadio, dirARadio].forEach(
    j => j.forEach(
        i => i.addEventListener("click", () => {redraw(); checkSameLetters()})
    )
);

function redraw(){
    let invalidInput = false;
    let invalidInputsList = "";
    var svgRect = svg.getBoundingClientRect();
    [[zoomNumberInput, "zoom"], [xNumberInput, "x"], [yNumberInput, "y"], 
    [lengthCInput, "C"], [lengthTUInput, "T/U"], [lengthGInput, "G"], [lengthAInput, "A"], 
    [startInput, "start"], [endInput, "end"], 
    [strokeMonoanderInput, "monoander stroke"], [strokeBranch1Input, "branch 1 stroke"], [strokeBranch2Input, "branch 2 stroke"], [strokeBranch3Input, "branch 3 stroke"]].forEach(
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
        y = svgRect.height - parseInt(yNumberInput.value) * oneVectorLength;
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
    if (strokeMonoanderInput.value != ""){
        strokeMonoander = parseFloat(strokeMonoanderInput.value);
    }
    if (strokeBranch1Input.value != ""){
        strokeBranch1 = parseFloat(strokeBranch1Input.value);
    }
    if (strokeBranch2Input.value != ""){
        strokeBranch2 = parseFloat(strokeBranch2Input.value);
    }
    if (strokeBranch3Input.value != ""){
        strokeBranch3 = parseFloat(strokeBranch3Input.value);
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
    monoanderSolid = pickerMonoanderSolid.value;
    monoanderC = pickerMonoanderC.value;
    monoanderTU = pickerMonoanderTU.value;
    monoanderG = pickerMonoanderG.value;
    monoanderA = pickerMonoanderA.value;

    triander1Solid = pickerTriander1Solid.value;
    triander1C = pickerTriander1C.value;
    triander1TU = pickerTriander1TU.value;
    triander1G = pickerTriander1G.value;
    triander1A = pickerTriander1A.value;

    triander2Solid = pickerTriander2Solid.value;
    triander2C = pickerTriander2C.value;
    triander2TU = pickerTriander2TU.value;
    triander2G = pickerTriander2G.value;
    triander2A = pickerTriander2A.value;

    triander3Solid = pickerTriander3Solid.value;
    triander3C = pickerTriander3C.value;
    triander3TU = pickerTriander3TU.value;
    triander3G = pickerTriander3G.value;
    triander3A = pickerTriander3A.value;

    DNK = input.value;
    DNK = DNK.toUpperCase();
    svg.innerHTML = "";

    DNK = DNK.slice(start - 1, end)
    DNK = DNK.split('');
    DNK = DNK.filter(function(value, index, arr){
        return (["A", "C", "T", "U", "G", "M", "R", "W", "S", "Y", "K", "V", "H", "D", "B", "X", "N"].includes(value));
    });
    var svgRect = svg.getBoundingClientRect();
    drawLine(0, y, svgRect.width * 50, y, "lightgray", stroke_width);
    drawLine(x, 0, x, svgRect.height * 50, "lightgray", stroke_width);
    if (checkboxTriander.checked){
        redrawTriander();
    } else {
        redrawMonoander();
    }
}

function hexToRGB(color){
    let r = color.slice(1, 3);
    let g = color.slice(3, 5);
    let b = color.slice(5);
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    return [r, g, b];
}

function middleColor(colors){
    color = [0, 0, 0];
    colors.forEach(i => {
        i = hexToRGB(i);
        color[0] += i[0]; 
        color[1] += i[1]; 
        color[2] += i[2]
    });
    color[0] /= colors.length;
    color[1] /= colors.length;
    color[2] /= colors.length;
    return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")"
}

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

function dirNameToDirXY(direction){
    if (direction == "up"){
        return {x: 0, y: -1};
    }
    if (direction == "right"){
        return {x: 1, y: 0};
    }
    if (direction == "down"){
        return {x: 0, y: 1};
    }
    if (direction == "left"){
        return {x: -1, y: 0};
    }
}

function processLetter(direction, length, coords){
    dir = dirNameToDirXY(direction);
    coords.x += dir.x * oneVectorLength * length;
    coords.y += dir.y * oneVectorLength * length;
}

function drawLine(x1, y1, x2, y2, color, stroke){
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    element.setAttributeNS(null, 'x1', x1 / 50);
    element.setAttributeNS(null, 'y1', y1 / 50);
    element.setAttributeNS(null, 'x2', x2 / 50);
    element.setAttributeNS(null, 'y2', y2 / 50);
    element.setAttributeNS(null, 'stroke', color);
    element.setAttributeNS(null, 'stroke-width', stroke);
    svg.appendChild(element);
}

function drawDNKdifferentColors(dnk, coords, colors, stroke){
    dnk.forEach(function(i){
        var oldX = coords.x;
        var oldY = coords.y;
        if (i == "C"){
            processLetter(dirC, lengthC, coords);
            drawLine(oldX, oldY, coords.x, coords.y, colors[0], stroke);
        } else if (i == "T" || i == "U"){
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, colors[1], stroke);
        } else if (i == "G"){
            processLetter(dirG, lengthG, coords);
            drawLine(oldX, oldY, coords.x, coords.y, colors[2], stroke);
        } else if (i == "A"){
            processLetter(dirA, lengthA, coords);
            drawLine(oldX, oldY, coords.x, coords.y, colors[3], stroke);
        } else if (i == "M"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[3], colors[0]]), stroke);
        } else if (i == "R"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirG, lengthG, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[3], colors[2]]), stroke);
        } else if (i == "W"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[3], colors[1]]), stroke);
        } else if (i == "S"){
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[0], colors[2]]), stroke);
        } else if (i == "Y"){
            processLetter(dirC, lengthC, coords);
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[0], colors[1]]), stroke);
        } else if (i == "K"){
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[2], colors[1]]), stroke);
        } else if (i == "V"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[3], colors[0], colors[2]]), stroke);
        } else if (i == "H"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[3], colors[0], colors[1]]), stroke);
        } else if (i == "D"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[1], colors[2], colors[3]]), stroke);
        } else if (i == "B"){
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[1], colors[2], colors[0]]), stroke);
        } else if (i == "X" || i == "N"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
            drawLine(oldX, oldY, coords.x, coords.y, middleColor([colors[0], colors[1], colors[2], colors[3]]), stroke);
        }
    });
}

function drawDNK(dnk, coords, color, stroke){

    dnk.forEach(function(i){
        var oldX = coords.x;
        var oldY = coords.y;
        if (i == "C"){
            processLetter(dirC, lengthC, coords);
        } else if (i == "T" || i == "U"){
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "G"){
            processLetter(dirG, lengthG, coords);
        } else if (i == "A"){
            processLetter(dirA, lengthA, coords);
        } else if (i == "M"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
        } else if (i == "R"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirG, lengthG, coords);
        } else if (i == "W"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "S"){
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
        } else if (i == "Y"){
            processLetter(dirC, lengthC, coords);
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "K"){
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "V"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
        } else if (i == "H"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "D"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "B"){
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
        } else if (i == "X" || i == "N"){
            processLetter(dirA, lengthA, coords);
            processLetter(dirC, lengthC, coords);
            processLetter(dirG, lengthG, coords);
            processLetter(dirTU, lengthTU, coords);
        }
        drawLine(oldX, oldY, coords.x, coords.y, color, stroke);
    });
}

function redrawTriander(){

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
        drawDNKdifferentColors(DNK1, coords1, [triander1C, triander1TU, triander1G, triander1A], strokeBranch1);
        drawDNKdifferentColors(DNK2, coords2, [triander2C, triander2TU, triander2G, triander2A], strokeBranch2);
        drawDNKdifferentColors(DNK3, coords3, [triander3C, triander3TU, triander3G, triander3A], strokeBranch3);
    } else {
        drawDNK(DNK1, coords1, triander1Solid, strokeBranch1);
        drawDNK(DNK2, coords2, triander2Solid, strokeBranch2);
        drawDNK(DNK3, coords3, triander3Solid, strokeBranch3);
    }

}

function redrawMonoander(){

    coords = {x: x, y: y}
    
    if (checkboxColors.checked){
        drawDNKdifferentColors(DNK, coords, [monoanderC, monoanderTU, monoanderG, monoanderA], strokeMonoander);
    } else {
        drawDNK(DNK, coords, monoanderSolid, strokeMonoander);
    }
}

redraw();
checkSameLetters();