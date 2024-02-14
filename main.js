const home = document.querySelector(".home");
const game = document.querySelector(".game");
const gameOver = document.querySelector(".game-over");
const winner = document.querySelector(".winner");
const startBtns = document.querySelectorAll(".start-btn");
const squares = document.querySelectorAll(".squares");
const winnerImg = document.querySelector(".winner-img");

let player = "x";
let numClick = 0;

startBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        printStartGame();
    });
});

squares.forEach((square) => {
    square.addEventListener("click", () => {        
        numClick++;
        
        if (square.childNodes.length !== 0) return; 

        square.classList.add(player);
        square.dataset.player = player;
        const icon = makeIcon();
        print(square, icon);
        
        checkWin();
        if (numClick === 9) {
            printGameOver();
            clear();
        }
    });
});

function printStartGame() {
    hideDisplay();
    game.style.display = "grid";
}

function printGameOver() {
    hideDisplay();
    gameOver.style.display = "flex";
}

function printWinner(playerWinner) {
    clear();
    hideDisplay();
    winner.style.display = "flex";
    winnerImg.setAttribute("src", `./img/${playerWinner}.svg`);
}

function hideDisplay() {
    home.style.display = "none";
    gameOver.style.display = "none";
    game.style.display = "none";
    winner.style.display = "none";
}

function makeIcon() {
    const img = document.createElement("img");
    img.setAttribute("src", `./img/${player}.svg`);
    img.setAttribute("alt", `${player}`);
    img.classList.add("icon");
    img.classList.add(`icon-${player}`);

    if (player === "x") {
        player = "circle";
    } else if (player === "circle") {
        player = "x";
    }

    return img;
}


function print(local, data) {
    local.appendChild(data);
}

function clear() {
    player = "x";
    numClick = 0;

    for (let i = 0; i < squares.length; i++) {
        squares[i].dataset.player = i;
        if (squares[i].firstChild) squares[i].removeChild(squares[i].firstChild);
    }
}

function checkWin() {
    const squares = document.querySelectorAll(".squares");
    if (squares[0].dataset.player === squares[1].dataset.player && squares[1].dataset.player === squares[2].dataset.player) printWinner(squares[0].dataset.player);
    if (squares[3].dataset.player === squares[4].dataset.player && squares[4].dataset.player === squares[5].dataset.player) printWinner(squares[3].dataset.player);
    if (squares[6].dataset.player === squares[7].dataset.player && squares[7].dataset.player === squares[8].dataset.player) printWinner(squares[6].dataset.player);
    if (squares[0].dataset.player === squares[3].dataset.player && squares[3].dataset.player === squares[6].dataset.player) printWinner(squares[0].dataset.player);
    if (squares[1].dataset.player === squares[4].dataset.player && squares[4].dataset.player === squares[7].dataset.player) printWinner(squares[1].dataset.player);
    if (squares[2].dataset.player === squares[5].dataset.player && squares[5].dataset.player === squares[8].dataset.player) printWinner(squares[2].dataset.player);
    if (squares[0].dataset.player === squares[4].dataset.player && squares[4].dataset.player === squares[8].dataset.player) printWinner(squares[0].dataset.player);
    if (squares[2].dataset.player === squares[4].dataset.player && squares[4].dataset.player === squares[6].dataset.player) printWinner(squares[2].dataset.player);
}
