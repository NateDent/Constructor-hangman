var inquirer=require('inquirer');
var Game= require('./hang.js');
var game = new Game();

//Start
function initHangman() {
	game.startNewGame();
	game.word.displayWord();

	promptAndProcessInput();
}

function promptAndProcessInput() {
	inquirer.prompt([
		{
			type:"input",
			name:"userGuess",
			message:"Enter a guess (letters a-z)",
			validate:function(value){
				var validInputs= /[a-z]/i;
				//validation check
				if(value.length===1&&validInputs.test(value)){
					//letters guessed already
					if(game.lettersGuessed.length>0) {
						//console.log("got here!")
						for (var items in game.lettersGuessed) {
							//console.log(game.lettersGuessed[items])
							if (value.toLowerCase() === game.lettersGuessed[items]) {
								return "This letter has already been chosen.\nPlease enter a valid guess (letters a-z):"
							}
						}
					}
					return true;
				}

				return	"Please enter a valid guess (letters a-z):"
			}
		}
	]).then(function(answer){
		//Check word
		game.lettersGuessed.push(answer.userGuess);
		if(game.word.checkLetters(answer.userGuess)){
			// -- display the word
			game.word.displayWord();
			// -- ask for a new guess
			if(game.word.isGuessed()){
				winGame();
			}
			else {
				promptAndProcessInput();
			}
		}
		else{
			game.guessRemaining--;
			console.log("Guesses Remaining: "+game.guessRemaining);
			game.word.displayWord();
			if(game.guessRemaining<=0){
				loseGame();
			}
			else{
				promptAndProcessInput();
			}
		}

	})
}

function winGame(){
	game.wins++;
	console.log("You won!\nYour current record is: "+game.wins+" wins and: "+game.losses+" losses");

	playAgainPrompt();
}
function loseGame(){
	game.losses++;
	console.log("You lost!\nYour current record is: "+game.wins+" wins and: "+game.losses+" losses");
	console.log("The word you were trying to guess was: "+game.word.answerWord.join(''))
	playAgainPrompt();
}

function playAgainPrompt(){
	inquirer.prompt([
		{
			type:'confirm',
			name:'playAgain',
			message:'Would you like to play again?',
		}
	]).then(function(answer){
		if(answer.playAgain){
			initHangman();
		}
		else{
			console.log("Play again soon!");
			return;
		}
	});
}
initHangman();