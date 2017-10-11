// Pseudocode
// ==================================================================================================
// check 1) On page load, user reads html and is instructed to press space bar to begin the game
// check 2) When space key pressed:
//            - #instructions changes to 'Press a key to guess a letter'  
//            - a word is selected randomly, the letters in word are converted to _s, the _s
//              overwrite the #word text
// check 3) At this point, game begins for the user. User presses keys to begin guessing the letters
// do it 4) if guess appears in the word, that letter replaces the underline(s) for it
// bug   5) if guess not in word, guess appears in incorrect guesses section and # incorrect guesses
//          decreases by 1
// check 6) if user repeats a guess, alert user, nothing happens to stats. important to not decrease 
//          # guesses for accidentally repeated guesses or add it to incorrect guesses more than once
// have  7) user repeats this process until 1 of 2 things happens:
// not	   7.1) if user guesses all letters correctly before # guesses is 0:
// tried   		- update result to "Goal!! Nice Shot. You win."
// yet	  		- update instructions back to 'Press space bar to drop the puck!'
//              - increase wins by 1
//              - when space is pressed to play again, do everything listed in 2) and also
//              - change result back to 'Put the biscuit in the basket!' 
//              - reset # guesses to 10
//              - reset incorrect guesses to 'None yet!'
// 		   7.2) if user depletes guesses before all _s are erased:
//              - update result to 'Head to the penalty box. You lose.'
//              - update instructions back to 'Press space bar to drop the puck!'
//              - when space is pressed to play again, do everything listed in 2) and also
//              - change result back to 'Put the biscuit in the basket!' 
//              - reset # guesses to 10
//              - reset incorrect guesses to 'None yet'
//==================================================================================================

// creating global variables
// creating wins variable
var wins = 0;

// creating guesses variable
var guesses = 10;

// creating the words array
var words = ["gretzky", "lemieux", "brodeur", "messier", "slapshot", "assist", "penalty", "powerplay", 
			 "shorthanded", "puck", "goal", "bodycheck", "clapbomb", "bender", "duster", "dangles", 
			 "breakaway", "crossbar", "yzerman", "wraparound", "faceoff", "trapezoid", "fisticuffs",
			 "snipe", "jersey", "ovechkin", "crosby", "blackhawks", "forward", "defenseman"];

// creating a random number generating variable. will be a # between 0 and final index in a array
var random = Math.floor(Math.random() * words.length);

// combine the words and random variable which will choose a random word
var randomWords = words[random];

// creating a variable which converts all the letters to _s
// randomWords will be the random word for which to replace the characters with _s
// replace method does exactly what's needed. 
// first parameter identifies the characters to replace - in this case the entire english alphabet.
// ...g ensures all characters are selected, not just the first character. i is case insensitive
// second parameter is the character to replace the characters in parameter 1.
var blankWords = randomWords.replace(/[a-z]/gi, "_");

// alphabet array, needed to ensure the user's guess isn't a random key character
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
				"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// creating an empty letters already guessed array
var alreadyGuessed = [];

// creating an empty wrong guesses array
var wrongGuesses = [];

// game code
document.onkeyup = function(key) {

	// game code only runs if the user first selects the spacebar, hence entire game will be...
	//...nested in this if statement. 32 is JS key code for space bar
	if (key.keyCode === 32) {

		// rewriting the html with new text for game when space key is pressed
		document.getElementById("result").innerHTML = "Put the biscuit in the basket";
		document.getElementById("instructions").innerHTML = "Press a key to guess a letter";
		document.getElementById("word").innerHTML = blankWords;
		document.getElementById("numberGuesses").innerHTML = 10;
		document.getElementById("lettersGuessed").innerHTML = "None yet";
		document.getElementById("wins").innerHTML = wins;
		console.log("The puck is dropped, here we go!");
		console.log("--------------------------------");

		// actual user gameplay begins here when space key is pressed. otherwise nothing happens
		document.onkeyup = function(event) {
			
			// defining variable for user pick and ensuring it's always lowercase if user...
			// ...accidentally has caps lock on or shift pressed
			var userGuess = event.key.toLowerCase();

			//actual gameplay only runs if user selection is contained within the english alphabet
			if (alphabet.indexOf(userGuess) === -1) {
				// alerting user that selection wasn't a letter
				alert("Puck out of play! Select a letter in the English alphabet.");
              
              // if user selects a letter, and the letter is not contained within the random word...
              // ...AND if the letter isn't already in the letters guessed array, then
			} else if ((randomWords.indexOf(userGuess) === -1) && (alreadyGuessed.indexOf(userGuess) === -1)) {
				// push that letter to the wrongGuesses and alreadyGuessed arrays
				wrongGuesses.push(userGuess);
				alreadyGuessed.push(userGuess);

				// display, 'shot wide' to result
				document.getElementById("result").innerHTML = "Shot wide.";

				// display the wrongGuesses array in the letters guessed ID
				var wrong = document.getElementById("lettersGuessed");
                wrong.innerHTML = wrongGuesses.join(" ");

// bug here     // subtract 1 from number guesses remaining
//////////      // BUG. no deduction for the first wrong guess. deductions for all wrong guesses after though.
                document.getElementById("numberGuesses").innerHTML = guesses--;

                // log to console
                console.log("Not in word. Guess again.");
				console.log("wrong guesses: " + wrongGuesses);
				console.log("already guessed: " + alreadyGuessed);
				console.log("--------------------------------");

			  // if user selects a letter, and the letter is contained within the random word,...
			  // ...AND if the letter isn't already in the letters guessed array, then
			} else if ((randomWords.indexOf(userGuess) > -1) && (alreadyGuessed.indexOf(userGuess) === -1)) {
			    // push that letter to the alreadyGuessed array.					
				alreadyGuessed.push(userGuess);

				// display 'Goal! What a shot' to result
				document.getElementById("result").innerHTML = "Goal! What a shot.";
// do this
//////////		// replace the blanks with the guess based on where the guess appears


				// log it to console
				console.log("Nice! It's in the word. Guess again.");
				console.log("wrong guesses: " + wrongGuesses);
				console.log("alreday guessed: " + alreadyGuessed);
				console.log("--------------------------------");

		      // display an alert if user guesses a letter that's already been guessed		
			} else if (alreadyGuessed.indexOf(userGuess) > -1) {
				alert("You already guessed that letter! Try again.");
			}

		//closing the game play function
		}

	// closing main if statement	
	}

// closing game code function	
}	





