const target =
	" .d88b. \n" +
	".8P  Y8.\n" +
	"88    88\n" +
	"88    88\n" +
	"'8b  d8'\n" +
	" 'Y88P' ";

/* PART A: change the values of x and y to be random */
// screen size is 80w x 30h
// target is 8w x 6h
// drawing starts from top left corner
// we want to draw the target within the bounds of the frame
// 80 screen width - 8 target width - 1 frame line = 71
// 30 screen height - 6 target height - 1 frame line = 23

let btn;
let times = [];

async function calcStats() {
	// TODO calculate average response time
	let speeds = [];
	for (let i = 0; i < 19; i++) {
		speeds.push(times[i + 1] - times[i]);
	}
	console.log(speeds);

	let sum = 0;
	for (let i = 0; i < speeds.length; i++) {
		sum = sum + speeds[i];
	}
	let average = Math.round(sum / speeds.length);

	// put the first number in the array as
	// lowest and highest, until proven wrong
	let lowest = speeds[0];
	let highest = speeds[0];

	// try to find new lowext/highest number
	for (let i = 0; i < speeds.length; i++) {
		if (speeds[i] < lowest) {
			lowest = speeds[i];
		}
		if (speeds[i] > highest) {
			highest = speeds[i];
		}
	}

	await alert("Your average response time was " + average + "ms\n" +
		"Your fastest response time was: " + lowest + "ms\n" +
		"Your slowest response time was: " + highest + "ms");
}

async function btnClick() {
	console.log("You clicked the button!");
	if (btn) {
		btn.erase();
		times.push(Date.now());
		console.log(times);
	}
	if (times.length == 20) {
		calcStats();
		return;
	}
	let x = Math.ceil(Math.random() * 55);
	let y = Math.ceil(Math.random() * 23);
	btn = pc.button(target, x, y, btnClick);
}


async function startGame() {
	await pc.alert("You have to click the circle 20 times to see how much miliseconds it took you to click them on average, your fastest time, and your slowest")
	btnClick();
}
startGame();

/* PART A: Use recursion to make a new button after clicking a button */
