const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["","","","","","","","",""];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleClick() {
    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {

    let won = false;

    winningConditions.forEach(condition => {
        const [a,b,c] = condition;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){
            won = true;
        }
    });

    if(won){
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent = "Game Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
}

function restartGame(){
    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X Turn";

    cells.forEach(cell=>{
        cell.textContent="";
    });
}

cells.forEach(cell=>{
    cell.addEventListener("click",handleClick);
});

restartBtn.addEventListener("click",restartGame);
