const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning conditions
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }

    // Check for a draw
    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    }
}

// Function to handle cell clicks
function cellClicked(event) {
    const index = event.target.dataset.index;

    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) {
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetButton.addEventListener("click", resetGame);
