const log = console.log; // shortcut for console.log

const astronaut = `
                     <>______________________
       .-"""-.       ||-._\`-._ :| |: _.-'_.-|
      /= ___  \\      ||   \`-._\`:| |:\`_.-'   |
     |- /~~~\\  |     ||-------\`-' '-'-------|
     |=( '.' ) |     ||------_.-. .-._------|
     \\__\\_=_/__/     ||  _.-'_.:| |:._\`-._  |
      {_______}      ||-'_.-'  :| |:  \`-._\`-|
    /\` *       \`'--._||~~~~~~~~~~~~~~~~~~~~~~
   /= .     [] .     { >
  /  /|ooo     |\`'--'||
 (   )\\_______/      ||
  \\\`\`\\/       \\      ||
   \`-| ==    \\_|     ||
     /         |     ||
    |=   >\\  __/     ||
    \\   \\ |- --|     ||
     \\ __| \\___/     ||
     _{__} _{__}     ||
    (    )(    )     ||
^^~  \`"""  \`"""  ~^^^~^^~~~^^^~^^^~^^^~^^~^
For the first time in history with new technology,
we can go through the black hole`;

const pirateFlag = `
 ___
 \\_/
  |._
  |'."-._.-""--.-"-.__.-'/
  |  \\       .-.        (
  |   |     (@.@)        )
  |   |   '=.|m|.='     /
  |  /    .='\`"\`\`=.    /
  |.'                 (
  |.-"-.__.-""-.__.-"-.)
  |
  |
  |
  Travel the seas with
  Jack Sparrow`;

let choice = -1; // initialize choice to -1, user has not made any choice yet

async function choosePage() {
	let msg = ''; // message string
	let opt = [-1]; // options array

	if (choice == -1) {
		/* START YOUR STORY */
		msg = "Will you walk onto a pirate ship or step into outer space? Your story starts here and it's up to you to choose where the story goes. What should you do?";
		opt = [0, 1];

		function btn0Click() {
			choice = 0;
			btn0.erase();
			btn1.erase();
			choosePage();
		}

		function btn1Click() {
			choice = 1;
			btn0.erase();
			btn1.erase();
			choosePage();
		}

		let btn1 = pc.button(astronaut, 2, 5, btn1Click);
		let btn0 = pc.button(pirateFlag, 48, 7, btn0Click);

	} else if (choice == 0) {
		/* PART A: continue the story */
		msg = "You chose to travel with Jack Sparrow, you decided to get some spices from Singapore, the Route is to go through the bermuda triangle but you dont think its a great idea because of the rumors\n\t" +
			"3:Tell him this is rather not the brightest plan \n\t" +
			"4:Tell him, full speed, we are going to see the wonders of the bermuda triangle ";
		opt = [3, 4];
	} else if (choice == 1) {
		msg = "You decided to take on the black hole, for that you would need training.\n\t" +
			"5: prepare for the unknown and spend 6 Months in a harsh training regime\n\t" +
			"6: sneak past the security and fly by youself";
		opt = [5, 6];
	} else if (choice == 3) {
		msg = "Sparrow desides to rethink the plan and you go to the Arctic";
		opt = [];
	} else if (choice == 4) {
		msg = "As you enter, you see what you think is the lands of Singapore, this early? It was a trap! Now, you have been sucked in under the thousands of miles of water into a human aquarium";
		opt = [];
	} else if (choice == 5) {
		msg = " Your long training is complete and you are fully prepared for the unknown, you head in the massive ship full of adrenaline and excitement but things go south when you see the other end ...";
		opt = [];
	} else if (choice == 6) {
		msg = "You barely made it past security and now your in the massive ship, as you search for the cotroll book you accidently switch a lever, now the ship is going full forward into an undiscovered part of space";
		opt = [];
	}
	// prompt the player to make choices

	let input;
	if (choice == -1) {
		pc.text(msg, 2, 1, 76);
	} else if (opt.length > 0) {
		input = await pc.prompt(msg, 2, 1, 76);
		/* PART B: check if the player made a valid choice */
		input = Number(input);

		if (opt.includes(input)) {
			choice = input;
		} else {
			await alert("Your choice was invlaid, type the numbers shown");
		}
		choosePage();
	} else {
		await alert(msg);
		exit(); // end of game
	}
}

choosePage();
