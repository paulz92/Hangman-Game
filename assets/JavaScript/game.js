// Pseudocode
// ============================================================================================
// 1) On page load, user reads html and is instructed to press space bar to begin the game
// 2) When space key pressed:
//        - #instructions changes to 'Press a key to guess a letter'  
//        - a word is selected randomly, the letters in word are converted to _s, the _s
//          overwrite the #word text
// 3) At this point, game begins for the user. User presses keys to begin guessing the letters
// 4) if guess appears in the word, that letter replaces the underline(s) for it and # guesses
//    decreases by 1
// 5) if guess not in word, guess appears in incorrect guesses section and # guesses decreases
//    by 1
// 6) if user repeats a guess, nothing happens. important to not decrease # guesses for
//    accidentally repeated guesses or add it to incorrect guesses more than once
// 7) user repeats this process until 1 of 2 things happens:
// 		7.1) if user guesses all letters correctly before # guesses is 0:
//        		- update result to "Goal!! Nice Shot. You win."
//		  		- update instructions back to 'Press space bar to drop the puck!'
//              - increase wins by 1
//              - when space is pressed to play again, do everything listed in 2) and also
//              - change result back to 'Put the biscuit in the basket!' 
//              - reset # guesses to 10
//              - reset incorrect guesses to 'None yet!'
// 		7.2) if user depletes guesses before all _s are erased:
//              - update result to 'Head to the penalty box. You lose.'
//              - update instructions back to 'Press space bar to drop the puck!'
//              - when space is pressed to play again, do everything listed in 2) and also
//              - change result back to 'Put the biscuit in the basket!' 
//              - reset # guesses to 10
//              - reset incorrect guesses to 'None yet!'
//=============================================================================================