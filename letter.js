
var regEx= /[a-z]/i;
function Letter(givenChar){

	//properties
	this.displayLetter="_";
	this.secretValue=givenChar;
	this.correct=false;
	//actions
	this.returnCorrect=function () {
		if(this.correct){
			return this.secretValue;
		}
		else if(!regEx.test(this.secretValue)){
			return this.secretValue;
		}
		else{
			return this.displayLetter;
		}
	}
}

module.exports = Letter;