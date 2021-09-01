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

let turnX = true;

async function btnClicked(row, col) {
	if (board[row][col] != ' ') {
		await pc.alert("This space is occupied!")
		return;
	}
	console.log(row, col);
	let x = gridX + 9 * col;
	let y = gridY + 8 * row;

	if (turnX == true) {
		board[row][col] = 'x';
		pc.text(bigX, x, y);
	} else {
		board[row][col] = 'o';
		pc.text(bigO, x, y);
	}
	console.log(board.join('\n'));

	turnX = !turnX; // change turns by flipping true/false
}

/* PART A: Make the buttons in the grid */
for (let row = 0; row < 3; row++) {
	for (let col = 0; col < 3; col++) {
		let x = gridX + 9 * col;
		let y = gridY + 8 * row;
		pc.button(bigSpace, x, y, () => {
			btnClicked(row, col);
		});
	}
}