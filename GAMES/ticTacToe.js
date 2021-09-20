const log = console.log; // shortcut for console.log

const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC

TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC

TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`.slice(1);

pc.text(title, 5, 6);

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`.slice(1); // slice off the first newline character

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`.slice(1);

const gridX = 26;
const gridY = 3;

/* PART A: finish the grid of 9x8 spaces */
pc.text('─'.repeat(26), gridX, gridY + 7);
pc.text('─'.repeat(26), gridX, gridY + 15); // draw another horizontal line

pc.text('│\n'.repeat(23), gridX + 8, gridY);
pc.text('│\n'.repeat(23), gridX + 17, gridY); // draw another vertical line

// board stores the game data
// in a two dimensional array of spaces
let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

let gameOver = false;
let turnX = true;
let singlePlayer = false;
let scoreX = 0;
let scoreO = 0;

function displayTurn() {
	if (turnX) {
		pc.text("it is X's turn!", 55, 3);
	} else {
		pc.text("it is O's turn!", 55, 3);
	}
}

function displayScore() {
	pc.text("Player X's Score: " + scoreX, 55, 5);
	pc.text("Player O's Score: " + scoreO, 55, 7);
}

function checkDraw() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				return false;
			}
		}
	}
	return true;
}

function checkWinner(mark) {
	for (let i = 0; i < 3; i++) {
		if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
			return true;
		}

		if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
			return true;
		}
	}

	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	}

	if (board[2][0] == mark && board[1][1] == mark && board[0][2] == mark) {
		return true;
	}
	return false;
}

async function takeTurn(row, col) {
	if (gameOver) {
		return;
	}
	if (board[row][col] != ' ') {
		await pc.alert("This space is occupied!", 55, 20, 20);
		return;
	}
	console.log(row, col);
	let x = gridX + 9 * col;
	let y = gridY + 8 * row;

	let mark;
	if (turnX) {
		mark = 'x';
		await pc.text(bigX, x, y);
	} else {
		mark = 'o';
		await pc.text(bigO, x, y);
	}
	board[row][col] = mark;
	console.log(board.join('\n'));

	if (checkWinner(mark)) {
		gameOver = true;
		await pc.alert("Player " + mark + " you have won!", 55, 20, 20);

		if (turnX) {
			scoreX++;
		} else {
			scoreO++;
		}
		displayScore();

		reset();
		return;
	}

	if (checkDraw()) {
		gameOver = true;
		await pc.alert("It is a draw!", 55, 20, 20);
		reset();
		return;
	}

	turnX = !turnX; // change turns by flipping true/false
	displayTurn();

	if (!turnX && singlePlayer) {
		aiTurn();
	}
}

function aiTurn() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				takeTurn(row, col);
				return;
			}
		}
	}
}

async function reset() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			let x = gridX + 9 * col;
			let y = gridY + 8 * row;
			await pc.text(bigSpace, x, y);
			board[row][col] = ' ';
		}
	}
	gameOver = false;
	startGame();
}

function startGame() {
	turnX = Math.random() < .5;
	if (turnX == false) {
		aiTurn();
	}
}

async function setupGame() {
	await pc.eraseRect(55, 10, 1, 3);
	/* PART A: Make the buttons in the grid */
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			let x = gridX + 9 * col;
			let y = gridY + 8 * row;
			pc.button(bigSpace, x, y, () => {
				takeTurn(row, col);
			});
		}
	}
	displayTurn();
	displayScore();
	startGame();
}

pc.button('Single Player', 55, 10, () => {
	singlePlayer = true;
	setupGame();
});

pc.button('Multi Player', 55, 12, () => {
	setupGame();
});
