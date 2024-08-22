/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8]
  ]

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls =  document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");



/*-------------------------------- Functions --------------------------------*/
function init () {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'x';
    winner = false;
    tie = false;

    render();
} 

function render(){
    updateBoard();
    updateMessage();
}

function updateBoard(){
    for(let i = 0; i < board.length; i++){
        const currCell = board[i];
        const currSqrElement = squareEls[i];
        currSqrElement.innerText = currCell;
    }
}

function updateMessage(){
    // If both winner and tie have a value of false (meaning the game is still in progress), render whose turn it is
    if(!winner && !tie){
        messageEl.innerText = turn;
    }
    // if winner is false, but tie is true, render a tie message.
    else if(!winner && tie){
        messageEl.innerText = "It's a tie!";
    } else {
        messageEl.innerText = "Congrats " + turn + " you have won!";
    }

}

function handleClick(event){
    const squareIndex = event.target.id;
    if(board[squareIndex] === 'x' || board[squareIndex] === 'o' || winner){
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie(); 
    switchPlayerTurn();
    render();
}


function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        if(board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]){
            winner = true;
        }
    })
}

function checkForTie() {
    if(winner){
        return;
    }
    let containsEmpty = false;
    board.forEach((cell) => {
        if(cell === ''){
            containsEmpty = true;
        }
    })
    if(!containsEmpty){
        tie = true;
    }
}

function switchPlayerTurn() {
    if(winner){
        return;
    }   
    if(turn === 'x') {
        turn = 'o';
    } else {
        turn = 'x';
    }    
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(cell => {
    cell.addEventListener('click', handleClick )
})

resetBtnEl.addEventListener('click', init)

/*----------------------------- Start Game -----------------------------*/
init()