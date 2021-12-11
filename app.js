const buttons = document.querySelectorAll('#qwerty');       //Onscreen Keyboard
const phrase = document.querySelector('#phrase');
const startGame = document.getElementById('btn_reset');    //Start Button
const overlay = document.getElementById('overlay');       //Start, Win and Lose Screen
var button = document.getElementsByTagName('button');
var hearts = document.querySelector('#lives');
const title = document.getElementById('title');
var phraseLetterArray = document.querySelectorAll('div#phrase > li');
var missed = 0;
var characterArray;
var phraseLetterItem;
var buttonArr;


/*****************
 * `phrases` array
 *****************/
const phrases = [ 'tuskegee', 'hillman', 'howard', 'hampton', 'spelman', 'morehouse', 'morgan state', 'xavier', 'famu', 'alabama state', 'bowie', 'umes', 'fisk', 'bethune cookman', 'bennet', 'fort valley state', 'miles', 'albany state'];

/***************************
 * Start Game Event Listener
 ***************************/
//Hides overlay changing it's display value to none  
startGame.addEventListener('click', function () {

    if (overlay.className = 'start') {
        addPhraseToDisplay();
        activateButtons();
        overlay.style.display = 'none';
    } else if (overlay.className = 'win' || 'lose') {
        resetButtons();
        resetPhrase();
        resetScore();
        addPhraseToDisplay();   
        overlay.style.display = 'none';
        console.log('Loser!')
    }
});


/***********************************
 * `getRandomPhraseAsArray` function
 ***********************************/
function getRandomPhraseAsArray () {
    let max = phrases.length;
    let index = Math.floor(Math.random()*(max));
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
    characterArray = randomPhrase.split('');
    //Loops through the characterArray creating a new list item for each index
    for (let i = 0; i < randomPhrase.length; i++) {
        //Creates new list item
        phraseLetterItem = document.createElement('li');
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
    return phraseLetterItem;
}

//addPhraseToDisplay();
/*************************
 * `checkLetter` function
 ************************/
/***
 * Checks to see if the letter coresponding to the button seleccted matches any of the letters of the hidden phrase.
 ***/
function checkLetter (clickedBtn) {
    phraseLetterArray = document.querySelectorAll('div#phrase > li');
    let clickBtnText = clickedBtn.innerText;
    let match = null;
    //Loops through array holding phrase letters
    for (let i = 0; i < phraseLetterArray.length; i++) {
        let phraseLetterText = phraseLetterArray[i].innerText;
        //Letters match and reveal letter on the gameboard
        if (clickBtnText === phraseLetterText.toLowerCase()) {
            phraseLetterArray[i].classList.add('show');
            match = true; 
        }
    }
    //No match swaps the live heart with the lost and increments the `missed` counter.
    if (match === null) {
        hearts = document.querySelector('#lives');
        lostHeart = document.createElement('li');
        hearts.firstElementChild.remove();
        lostHeart.className = 'spentLives'; 
        lostHeart.innerHTML = '<img src="images/lostHeart.png" height="35px" width="30px">';
        hearts.append(lostHeart);
        missed ++;
    }
    checkWin();
}

/***********************************
 * On-screen keyboard event listener
 ***********************************/
/*** 
 * Adds listeners to the onboard keyboard which disables the button upon clicking
***/
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

/*********************
 * `checkWin` function
 *********************/
/***
 * Checks to see if the the game is won or lost based on the correct guesses and the missed counter.
 */
 function checkWin () {
    correctLetters = document.getElementsByClassName('show').length;
    totalLetters = document.getElementsByClassName('letter').length;
    //Lost - based on missed counter 
     if (missed === 5) {
        title.innerHTML = 'You lost!';
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        startGame.style.display = 'none';
        document.getElementById('btn_reset').innerText = 'Try Again?';
     } else if 
        //Won based on if all of the letters are correctly guessed
        (correctLetters === totalLetters) {
         setTimeout( function() {
        title.innerHTML = 'You Won!';
        overlay.style.display = 'flex';
        overlay.className = 'win';
        startGame.style.display = 'none';
        document.getElementById('btn_reset').innerText = 'Play Again?';
        }, 750)
     }
}


/********************************************************************************************
 ************************************  New Game Functions ***********************************
 *******************************************************************************************/

/*************************
 * `resetButtons` function
 ************************/
function resetButtons () {

    for (let i = 0; i < button.length; i++) {
        button[i].disabled = false;
        button[i].classList.remove('chosen');
    } 
}

/***********************
 * `resePhrase` function
 **********************/
function resetPhrase () {
    
    for (i = 0; i < phraseLetterArray.length; i++) {
        phraseLetterArray[i].remove();
    }
    addPhraseToDisplay();
}

/*********************
 * `resetScore` function
 *********************/
function resetScore () {
    missed = 0;
    let oldLostHearts = document.getElementsByClassName('spentLives');
    let i = 0;

    while (oldLostHearts.length > 0) {
        oldLostHearts[i].remove(); 
        let newLives = document.createElement('li');   
        newLives.className = 'tries'; 
        newLives.innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
        hearts.append(newLives);
    }
}

/*********************
 * `newGame` function
 *********************/
function newGame () {
    resetPhrase();
    resetButtons();
    resetScore();
}
