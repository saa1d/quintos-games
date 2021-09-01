// no wrapper this time, use your own async functions!

const log = console.log; // shortcut for printing to console using console.log

const hangman = [`
  +---+
  |   |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`];

let words = `abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quips quiz quizzes quorum razzmatazz rhubarb rhythm scratch snazzy sphinx squawk staff strength stretch stronghold stymied subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth triphthong unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie`;

words = words.split(' ');

let random = Math.floor(Math.random() * words.length);
const word = words[random];
log(word); // don't look! no cheating! jk ;P

let guesses = [];
for (let i = 0; i < word.length; i++) {
	guesses.push('_');
}

/* PART A1: make a function to display the guess lines */
// example: word = 'quiz'
// displayGuesses() -> '_ _ _ _'
function displayGuesses() {
	let text = "";

	for (let i = 0; i < guesses.length; i++) {
		text += guesses[i] + ' ';
	}
	return text;
}

let wrong_guesses = 0;

/* PART A: implement game logic, don't use the hangman until part B */
async function startGame() {

	while (guesses.includes('_')) {
		if (wrong_guesses > 6) {
			await alert("To many guesses are wrong. Better luck next time, the word was " + word);
			return;
		}
		/* PART B: display the hangman in the prompt */
		/* PART A0: make the prompt */
		let guess = await prompt(hangman[wrong_guesses] + '\n' +
			displayGuesses());
		log(guess);

		if (guess == word) {
			break;
		}

		let wasCorrect = false;
		for (let i = 0; i < word.length; i++) {
			if (guess == word[i]) {
				guesses[i] = guess;
				wasCorrect = true;
			}
		}

		if (wasCorrect == false) {
			wrong_guesses++;
		}
	} // end of while loop

	await alert("Congradulations, You got it!");

}

startGame();

/* PART B: change one of your loops to a "for of" or "for in" loop */
