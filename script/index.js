const winnerDisplay = document.querySelector('.winner-text');
const cellConatiner = document.querySelector('.cell-container');

let gameIsActive = true;
let currentPlayer = "X";
let cellList = ["", "", "", "", "", "", "", "", ""];

for (let i = 0; i < 9; i++) {
    cell = document.createElement("div")
    cell.setAttribute("id", `${i}`)
    cell.setAttribute("class", "cell")
    cellConatiner.appendChild(cell)
}

winnerDisplay.innerHTML =  `Now ${currentPlayer}'s turn`

const cellWinningPlaces = [[0, 1, 2], [0, 3, 6], [0, 4, 8],[1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];

function handleMove(clickedCell, clickedCellIndex) {
    cellList[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function changeCurrentPlayer() {
    if (currentPlayer === "X") currentPlayer = "O"
    else currentPlayer = "X"
    winnerDisplay.innerHTML =  `Now ${currentPlayer}'s turn`

}

function validateGameStatus() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winningPlacesIndexes = cellWinningPlaces[i];
        let x = cellList[winningPlacesIndexes[0]];
        let y = cellList[winningPlacesIndexes[1]];
        let z = cellList[winningPlacesIndexes[2]];
        if (x === '' || y === '' || z === '') continue;
        if (x === y && y === z) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        winnerDisplay.innerHTML = `The ${currentPlayer} has WON!`;
        gameIsActive = false;
        return;
    }

    let roundDraw = !cellList.includes("");
    if (roundDraw) {
        winnerDisplay.innerHTML = "It's a DRAW!";
        gameIsActive = false;
        return;
    }

    changeCurrentPlayer();
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellID = parseInt(clickedCell.getAttribute('id'));
    const clickedCellIDInt = parseInt(clickedCellID);
    console.log(`HAS CLICKED ${clickedCellIDInt}`)
    if (cellList[clickedCellIDInt] !== "" || !gameIsActive) {
        return;
    }

    handleMove(clickedCell, clickedCellIDInt);
    validateGameStatus();
}

function restartGame() {
    gameIsActive = true;
    currentPlayer = "X";
    winnerDisplay.innerHTML =  `Now ${currentPlayer}'s turn`

    cellList = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.restart-btn').addEventListener('click', restartGame);
