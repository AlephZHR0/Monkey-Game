function atualizaContador() {
    contador++;
    // document.getElementById("timer-value").innerHTML = contador;
}

function generateBoard(rows, cols) {
    var allBoardIDs = [];
    let board = document.getElementById("board");
    board.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
    board.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
    let boardSize = rows * cols;
    let colNum = 1;
    let rowNum = 1;
    for (var i = 0; i < boardSize; i++) {
        var newDiv = document.createElement("div");
        let divID = "r" + rowNum + "c" + colNum
        newDiv.setAttribute("id", divID);
        newDiv.setAttribute("class", "cell");
        newDiv.style.width = (board.offsetWidth / cols) + "px";
        newDiv.style.height = (board.offsetHeight / rows) + "px";
        // newDiv.style.border = "1px solid black";
        var newP = document.createElement("p");
        newP.classList.add("number");
        newP.style.lineHeight = newDiv.style.height;
        newP.setAttribute("onclick", "onPlayerClick(" + divID + ")");
        newDiv.style.fontSize = (newDiv.offsetHeight * 0.8) + "px";
        newDiv.appendChild(newP);
        board.appendChild(newDiv);
        allBoardIDs.push(divID);
        colNum++;
        if (colNum > cols) {
            colNum = 1;
            rowNum++;
        }
    }
    return allBoardIDs;
}


function placeNumbers(rows, cols) {
    let numbersToPlace = ["x¹", "x²", "x³", "x⁴", "x⁵", "x⁶", "x⁷", "x⁸", "x⁹"];
    let numbersToWork = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let idAndValue = [];
    let availableIDs = allBoardIDs;
    var board = document.getElementById("board");
    while (numbersToPlace.length != 0) {
        randomIndex = Math.floor(Math.random() * availableIDs.length)
        choosenID = availableIDs[randomIndex];
        availableIDs.splice(randomIndex, 1);
        let target = document.querySelector("#" + choosenID + " p")
        target.textContent = numbersToPlace.pop();
        idAndValue.push(choosenID);
        idAndValue.push(numbersToWork.pop())
    }
    return idAndValue;
}

function formatGame() {
    var numbers = document.getElementsByClassName("number");
    for (var i = 0; i < numbers.length; i++) {
        let element = numbers[i]
        if (element.textContent == ""){} else{
            numbers[i].style.opacity = 0
            numbers[i].parentElement.style.backgroundColor = "#D3D3D3";
        }
    }
}

function checkChoosenNumber(choosenNumber) {
    lastIndex = listOfNumbers.length - 1;
    lastNumber = listOfNumbers[lastIndex];
    if (lastNumber == choosenNumber - 1) {
        return true;
    } else {
        return false;
    };
}

function onPlayerClick(id) {
    id = id.id
    index = idAndValue.indexOf(id);
    let divID = idAndValue[index];
    let playerNumber = idAndValue[index + 1]
    if (checkChoosenNumber(playerNumber)) {
        listOfNumbers.push(playerNumber);
        div = document.querySelector("#" + divID)
        div.style.visibility = "hidden";
    } else {
        let finalScore = listOfNumbers.length - 1
        alert("Você perdeu com " + contador + " segundos e " + finalScore + " pontos!");
        window.location.href = "../index.html";
    }
    console.log(listOfNumbers)
        if (listOfNumbers.length == 10) {
            alert("Você ganhou com " + contador + " segundos");
            window.location.href = "../index.html";
        }
}

function primeiroClique() {
    const intervalo = setInterval(atualizaContador, 1000);
    formatGame();
    document.removeEventListener('click', primeiroClique);
    toggleBoxesBgColor();
}

let contador = 0;
var urlParams = new URLSearchParams(window.location.search);
var rows = parseInt(urlParams.get('rows')) || 3;
var cols = parseInt(urlParams.get('cols')) || 3;
var allBoardIDs = generateBoard(rows, cols);
var idAndValue = placeNumbers(rows, cols, allBoardIDs);
var listOfNumbers = [0];
document.addEventListener('click', primeiroClique);