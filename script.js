let status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const board = document.getElementById("board");
const check_Win = document.getElementById("check_Win");
const resetScoresBtn = document.getElementById("resetScoresBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const cellValues = ["","","","","","","","",""];
let isRunning = true;
let currentPlayer = "X";
let winIndexes = [];
let xScore = 0;
let oScore = 0;

const cells = document.querySelectorAll(".cell");

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!isRunning || cell.textContent !== "") return;

        cell.textContent = currentPlayer;
        cellValues[index] = currentPlayer;
        cell.classList.add(currentPlayer === "X" ? "cellX" : "cellO");

        if (!checkWin()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer} Turn`;
            status.classList.remove("playerX", "playerO");
            status.classList.add(currentPlayer === "X" ? "playerX" : "playerO");
        }
    });
});

function checkWin() {
    const winConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let condition of winConditions) {
        const [a,b,c] = condition;
        if (cellValues[a] === currentPlayer &&
            cellValues[b] === currentPlayer &&
            cellValues[c] === currentPlayer) {
            
            winIndexes = condition;
            winIndexes.forEach(cell => cells[cell].classList.add("winningCell"));

            check_Win.textContent = `Player ${currentPlayer} Wins 🎉`;
            check_Win.classList.remove("x_won", "o_won");
            check_Win.classList.add(currentPlayer === "X" ? "x_won" : "o_won");

            if (currentPlayer === "X") {
                scoreX.textContent = `Player X: ${++xScore}`;
            } else {
                scoreO.textContent = `Player O: ${++oScore}`;
            }

            isRunning = false;
            return true;
        }
    }

    if (!cellValues.includes("")) {
        check_Win.textContent = "It's Draw 😮";
        check_Win.classList.remove("x_won", "o_won");
        check_Win.classList.add("draw");
        isRunning = false;
        return true;
    }

    return false;
}
restartBtn.addEventListener("click", function (){
        cells.forEach((cell) => {cell.textContent = ""});
        status.textContent = `Player X Turn`;
        currentPlayer = "X";
        cellValues.fill("");
        check_Win.textContent = "";
        winIndexes.forEach(cell => cells[cell].classList.remove("winningCell"));
        cells.forEach((cell) => {cell.classList.remove("cellX", "cellO")});
        status.classList.remove("playerX", "playerO");
        isRunning = true;
})

resetScoresBtn.addEventListener("click", function () {
        scoreX.textContent = `Player X: ${xScore = 0}`;
        scoreO.textContent = `Player O: ${oScore = 0}`;
});