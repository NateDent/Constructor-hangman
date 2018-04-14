
var Word= require('./word.js');

var wordBank=["Biggie","Tupac","JayZ","Migos","Drake","CardiB","Boat","Weezy","Birdman","Bigsean","Kanye","Lupe Fiasco","Rza","Wu tang"];
//construct for score
function Game() {
	this.wins=0;
	this.losses=0;
	this.guessRemaining=0;
	this.lettersGuessed = [];
	this.word=null;
	//replay ability
	this.startNewGame =function(){
		this.guessRemaining=10;
		this.lettersGuessed=[];
		this.word=this.generateRandWord();
		console.log("Lets start Rappers delight hangman!");
	};
	//generate a new random word object
	this.generateRandWord=function () {
		var randWord = wordBank[Math.floor(Math.random()*wordBank.length)];
		var newWord= new Word(randWord);
		newWord.generateGuessWord();
		return newWord;
	};
};


module.exports = Game;