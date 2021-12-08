const buttons = document.querySelectorAll('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.getElementById('btn_reset');
const overlay = document.getElementById('overlay');
var missed = 0;


/*****************
 * `phrases` array
 *****************/
const phrases = [ 'Tuskegee', 'Howard', 'Hampton', 'Spellman', 'Morehouse'];

/***************************
 * Start Game Event Listener
 ***************************/
//Hides overlay changing it's display value to none  
startGame.addEventListener("click", function () {
    overlay.style.display = 'none';
});

/***********************************
 * `getRandomPhraseAsArray` function
 ***********************************/
function getRandomPhraseAsArray () {
    max = phrases.length;
    index = Math.floor(Math.random()*(max));
    return console.log(`${phrases[index]}`);
}
//console.log(getRandomPhraseAsArray());
getRandomPhraseAsArray();
//console.log(getRandomPhraseAsArray());
/*******************************
 * `addPhraseToDisplay` function
 ******************************/
function addPhraseToDisplay () {
    var randomPhrase = getRandomPhraseAsArray()
}

/*************************
 * `checkLetter` function
 ************************/
function checkLetter () {

}

/***********************************
 * On-screen keyboard event listener
 ***********************************/


/*********************
 * `checkWin` function
 *********************/
