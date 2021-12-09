const buttons = document.querySelectorAll('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.getElementById('btn_reset');
const overlay = document.getElementById('overlay');
var button = document.getElementsByTagName('button')
var missed = 0;


/*****************
 * `phrases` array
 *****************/
const phrases = [ 'Tuskegee', 'Howard', 'Hampton', 'Spellman', 'Morehouse', 'Morgan State', 'Xavier'];

/***************************
 * Start Game Event Listener
 ***************************/
//Hides overlay changing it's display value to none  
startGame.addEventListener('click', function () {
    overlay.style.display = 'none';
});

/***********************************
 * `getRandomPhraseAsArray` function
 ***********************************/
function getRandomPhraseAsArray () {
    max = phrases.length;
    index = Math.floor(Math.random()*(max));
    return phrases[index];
}

/*******************************
 * `addPhraseToDisplay` function
 ******************************/
/***
 * This function splits the randomly chosen phrase into individual characters, stores them into an arra
 ***/
function addPhraseToDisplay () {
    //Calls 'getRandomPhraseAsArray' function and stores the resulting phrase in the 'randomPhrase' variable
    var randomPhrase = getRandomPhraseAsArray()
    console.log(randomPhrase);
    //Splits the random phrase into singular characters and stores them in an array
    var characterArray = randomPhrase.split("");
    //Loops through the characterArray creating a new list item for each index
    for (let i = 0; i < randomPhrase.length; i++) {
        //Creates new list item
        let phraseLetterItem = document.createElement('li');
        //Adds the character from current index to the list item
        phraseLetterItem.textContent = `${characterArray[i]}`;
        //Conditional statements which assign class name based on the character type
        if (characterArray[i] === ' ') {
            phraseLetterItem.className = 'space'
        } else {
            phraseLetterItem.className = 'letter'
        }        
        //Adds the new list item to the DOM
        document.getElementById('phrase').append(phraseLetterItem);
    }
}
addPhraseToDisplay();
/*************************
 * `checkLetter` function
 ************************/
function checkLetter (clickedBtn) {
    let phraseLetterArray = document.querySelectorAll('div#phrase > li');
    let clickBtnText = clickedBtn.innerText;
    let match = null;
    for (let i = 0; i < phraseLetterArray.length; i++) {
        let phraseLetterText = phraseLetterArray[i].innerText;

        if (clickBtnText === phraseLetterText.toLowerCase()) {
            phraseLetterArray[i].classList.add('show');
            match = phraseLetterArray[i].innerText;
        } 
    console.log(phraseLetterText.toLowerCase());
    }
}

/***********************************
 * On-screen keyboard event listener
 ***********************************/
function activateButtons () {
    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', function (e) {
            let clickedBtn = e.target;
                clickedBtn.classList.add('chosen');
                clickedBtn.disabled = true;
                checkLetter(clickedBtn);
            })
        }
}

activateButtons();
/*********************
 * `checkWin` function
 *********************/
