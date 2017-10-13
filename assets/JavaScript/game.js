// Pseudocode
// ==================================================================================================
// check 1) On page load, press space bar to begin game
// check 2) When game begins:
//            - a word is selected randomly, the letters in word are converted to _s, the _s
//              overwrite the #word text
// check 3) User presses keys to begin guessing the letters
// check 4) if guess appears in the word, that letter replaces the underline(s) for it
// check 5) if guess not in word, guess appears in incorrect guesses section and # incorrect guesses
//          decreases by 1
// check 6) if user repeats a guess, alert user, nothing happens to stats. important to not decrease 
//          # guesses for accidentally repeated guesses or add it to incorrect guesses more than once
// check 7) user repeats this process until 1 of 2 things happens:
//        7.1) if user guesses all letters correctly before # guesses is 0:
//         		- update result to "hockey themed win text"
//              - increase wins by 1
//              - reset # guesses to 10
//              - reset incorrect guesses to 'None yet!'
//              - immediately restart game                 
// 		   7.2) if user depletes guesses before all _s are erased:
//              - update result to 'snarky lose message'
//              - reset # guesses to 10
//              - reset incorrect guesses to 'None yet'
//              - immediately restart game
//==================================================================================================

// creating global variables
// words array
var words = ["gretzky", "lemieux", "brodeur", "messier", "slapshot", "assist", "penalty", "powerplay", 
			 "shorthanded", "puck", "goal", "bodycheck", "clapbomb", "bender", "duster", "dangles", 
			 "breakaway", "crossbar", "yzerman", "wraparound", "faceoff", "trapezoid", "fisticuffs",
			 "snipe", "jersey", "ovechkin", "crosby", "blackhawks", "forward", "defenseman", "arena",
			 "backhand", "wrister", "slashing", "crosschecking", "hooking", "knucklepuck", "spinorama",
			 "lundqvist", "mcdavid", "blocker", "boards", "crease", "saucer", "sherwood", "butterfly",
			 "chirping", "referee", "elbowing", "enforcer", "netminder", "zamboni", "stickhandling",
			 "winger", "tarasenko", "esposito", "misconduct", "snowshower", "beauty", "howitzer"];

var randomWords;

var blankWords = []; // empty blank words array

// alphabet array, needed to ensure the user's guess isn't a random key character
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
				"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var alreadyGuessed = []; // empty letters already guessed array

var wrongGuesses = []; // empty wrong guesses array

var numGuesses = 10; // # of incorrect guesses

var wins = 0; // wins

var sounds = {
	barDown: document.getElementById("barDown"),
	shotWide: document.getElementById("shotWide"),
	goalHorn: document.getElementById("goalHorn"),
	buzzer: document.getElementById("buzzer"),
	hockeyStop: document.getElementById("hockeyStop"),
};

// creating an object for writing to DOM
var html = {
	writeResult: document.getElementById("result"),
	writeInstructions: document.getElementById("instructions"),
	writeWord: document.getElementById("word"),
	writeGuesses: document.getElementById("numberGuesses"),
	writeLettersGuessed: document.getElementById("lettersGuessed"),
	writeWins: document.getElementById("wins"),
};

// functions
// choose a random word
function getRandomWord(){
	randomWords = words[Math.floor(Math.random() * words.length)];
};

// start the game
function startGame(){

	getRandomWord();

	// generating blankWords array - will be an array of _ with the same length of random word
	for (var i = 0; i < randomWords.length; i++) {
		blankWords[i] = "_";
	}

	// rewriting the html with new text for game when space key is pressed
	html.writeInstructions.innerHTML = "Press a key to guess a letter";
	html.writeWord.innerHTML = blankWords.join(""); //converts the blank words array into a string
	html.writeGuesses.innerHTML = 10;
	html.writeLettersGuessed.innerHTML = "None...yet";
	html.writeWins.innerHTML = wins;

	// log to console
	console.log("game started");
	console.log("--------------------------------");
};

function winGame(){
	// if _ doesn't appear in blankWords array, win
	if (blankWords.indexOf("_") === -1) {
		wins++;
		html.writeWins.innerHTML = wins;
		html.writeResult.innerHTML = "You win! Keep the streak alive.";
		wrongGuesses = [];    // resetting global variables that have been changed
		alreadyGuessed = [];  // ..
		blankWords = [];      // ..
		numGuesses = 10;      // ..
		sounds.goalHorn.play(); // play goal horn sound
		console.log("win");  
		console.log("======================");
		startGame(); //restarts game
	}
};

function loseGame(){
	// if numGuesses is 0, lose	
	if (numGuesses === 0) {
		html.writeResult.innerHTML = "You lose. Maybe try to win this time?";
		wrongGuesses = [];   // resetting global variables that have been changed
		alreadyGuessed = []; // ..
		blankWords = [];     // ..
		numGuesses = 10;     // ..
		sounds.buzzer.play(); // play buzzer sound
		console.log("loss");
		console.log("======================");
		startGame(); //restarts game
	}
};

// space bar begins game ONLY on page load
document.onkeyup = function(space) {

	// 32 is the char code for space bar
	if (space.keyCode === 32) {

		startGame();

		// play hockeyStop sound
		sounds.hockeyStop.play();

		// user gameplay begins here
		document.onkeyup = function playGame(event) {
					
			// variable for user pick and ensuring it's always lowercase
			var userGuess = event.key.toLowerCase();

			// user selection must contained within the alphabet
			if (alphabet.indexOf(userGuess) === -1) {

				// alerting user that selection wasn't a letter
				alert("Puck out of play! Select a letter in the English alphabet.");
		              
		      // if letter is not in random word AND not in alreadyGuessed array
			} else if ((randomWords.indexOf(userGuess) === -1) && (alreadyGuessed.indexOf(userGuess) === -1)) {

				// push letter to the wrongGuesses and alreadyGuessed arrays
				wrongGuesses.push(userGuess);
				alreadyGuessed.push(userGuess);

				// play shot wide sound
				sounds.shotWide.play();

				// display, 'shot wide' to result
				html.writeResult.innerHTML = "Shot wide.";

				// display the wrongGuesses array with a space between letters
		        html.writeLettersGuessed.innerHTML = wrongGuesses.join(" ");

		        // subtract 1 from number guesses remaining, display it
		        numGuesses--;
		        html.writeGuesses.innerHTML = numGuesses;

		        // log to console
		        console.log(userGuess + " not in mystery word");
		        console.log("wrong guesses: " + wrongGuesses);
		        console.log("already guessed: " + alreadyGuessed);
		        console.log("====================================")

			  // if letter is in random word AND not in alreadyGuessed array
			} else if ((randomWords.indexOf(userGuess) > -1) && (alreadyGuessed.indexOf(userGuess) === -1)) {

			    // push letter to the alreadyGuessed array.					
				alreadyGuessed.push(userGuess);

				// play barDown sound
				sounds.barDown.play();	

				// display 'Goal! What a shot' to result
				html.writeResult.innerHTML = "Goal! Bar down.";
			
				// replace the blanks with the guess based on where the guess appears, display it
				for (var j = 0; j < randomWords.length; j++) {
					if (randomWords[j] === userGuess) {
						blankWords[j] = userGuess;
					}
				}

				html.writeWord.innerHTML = blankWords.join(""); // writing the string of blankWords array

				// log to console
		        console.log(userGuess + " is in mystery word");
		        console.log("wrong guesses: " + wrongGuesses);
		        console.log("already guessed: " + alreadyGuessed);
		        console.log("====================================")

		      // if letter already guessed display alert to user		
			} else if (alreadyGuessed.indexOf(userGuess) > -1) {

				alert("You already guessed that letter! Try again.");
			}

			winGame();
			loseGame();

		// closing the game play function
		};

	// closing space bar if statement
	};

// closing space bar begin function	
};