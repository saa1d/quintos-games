(async () => { // wrapper

	// generates random number 1 to 100
	let num = Math.random() * 100;
	// rounds up to nearest integer
	num = Math.ceil(num);

	let guess = -1;

	for (let i = 0; guess != num; i++) {
		if (i > 7) {
			await alert("You ran out of attempts");
			break;
		}
		// asks user to guess number
		guess = await prompt("Guess The Number 1-100");

		/* If the user enters a number outside the range of 1 to 100, tell them "Invalid guess" but don't count it against them. They should still have the same amount of valid guess attempts no matter how many invalid guess attempts they make. */


		if (guess == num) {
			await alert("You Got It!");
		} else if (guess < num) {
			await alert("You Guessed to Low");
		} else if (guess > num) {
			await alert("You Guessed to High");
		}
	}

	exit();
})(); // end of wrapper
