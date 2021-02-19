//VARIABLES
var wordBank = [
    "PROGRAMMER",
    "COMPUTING",
    "TECHIE",
    "PERL",
    "JAVASCRIPT",
    "SOFTWARE ENGINEERING",
    "COMPILER",
    "SCRIPTING",
    "DEBUGGING",
    "PROCESSOR",
    "ELECTRONIC",
    "CYBER",
    "SCREENSAVER",
    "NETWORKS",
    "INTERNET",
    "MOUSECLICK",
    "TRIGONOMETRY",
    "APPLICATION",
    "GAMING",
    "VISUAL STUDIO",
    "NETBEANS",
]; //21 words; 20 indexes
var pictureStates = [
    "../Resources/images/hangman/0.png",
    "../Resources/images/hangman/1.png",
    "../Resources/images/hangman/2.png",
    "../Resources/images/hangman/3.png",
    "../Resources/images/hangman/4.png",
    "../Resources/images/hangman/5.png",
    "../Resources/images/hangman/6.png",
    "../Resources/images/hangman/7.png",
    "../Resources/images/hangman/8.png"
];
//Constants
const maxLives = 7; //should correlate with the max pictures - 1 (in case I add or remove pictures)
const dashSymbol = "-";

//Game Vars
var lives = maxLives; //(head, body, leg, leg, arm, arm, eyes); might have to make it 6,
var guessedLetters = [];
var guessedRight = [];
var guessRequired = 0;
var RANDOM_WORD = "";
const GameState = {
    CONTINUE: 0,
    WIN: 1,
    LOSE: 2
};
Object.freeze(GameState);
var gameState = GameState.CONTINUE;
var wordToGuess = "";
//END VARIABLES

//GAME FUNCTIONS
///Reset variables and render
function startGame() {
    restart();
    render();
}
///Reset variables
function restart() {
    //reset variables
    lives = 7;
    guessedLetters = [];
    guessedRight = [];
    RANDOM_WORD = chooseRandomWord();
    guessRequired = getRequiredRight();
    gameState = GameState.CONTINUE;
    playAgainButton.style.display = "none";
    setStatusMessage("");
}

///display current state of the game
function render() {
    var imageTag = document.getElementById("hangPic");
    //update picture
    imageTag.src = getPicture();
    //update letters and dashes
    document.getElementById("dashSpan").innerHTML = setDashes();
    document.getElementById("guessLetterDiv").innerHTML = setLettersGuessed();
}
///Get the picture path based off of current lives
function getPicture() {
    if (gameState === GameState.WIN) {
        return pictureStates[maxLives + 1];
    } else if (gameState === GameState.LOSE) {
        //technically this is redundant but makes it clearer  
        return pictureStates[maxLives];
    } else {
        return pictureStates[maxLives - lives];
    }
}

function chooseRandomWord() {
    //we don't need to worry about an index out of range, because the Math.floor() will make any number that is the max number - 1
    var word = wordBank[(Math.floor(Math.random() * wordBank.length))];
    return word;
}

function getRequiredRight() {
    var letters = [];
    for (var i = 0; i < RANDOM_WORD.length; i++) {
        if (!letters.includes(RANDOM_WORD[i])) {
            if (RANDOM_WORD[i] != " ") {
                letters.push(RANDOM_WORD[i]);
            }
        }
    }
    return letters.length;
}

function setDashes() {
    var output = "";
    var success = false;
    for (var i = 0; i < RANDOM_WORD.length; i++) {
        if (RANDOM_WORD[i] === " ") {
            output += " ";
            continue;
        } else {
            for (var j = 0; j < guessedLetters.length; j++) {
                if (guessedLetters[j] === RANDOM_WORD[i]) {
                    output += guessedLetters[j];
                    success = true;
                    break;
                }
            }
            if (!success) {
                output += dashSymbol;
            }
            success = false;
        }
    }
    return output;
}

function setLettersGuessed() {
    var output = "";
    for (var i = 0; i < guessedLetters.length; i++) {
        output += guessedLetters[i] + " ";
    }
    return output;
}

function setStatusMessage(message) {
    document.getElementById("statusMessage").innerHTML = message;
}

function checkCorrect(letter) {
    for (var i = 0; i < RANDOM_WORD.length; i++) {
        if (letter === RANDOM_WORD[i]) return true;
    }
    return false;
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter)) {
        setStatusMessage("You've already guessed that letter!");
    } else {
        //set status message if there is one or not...
        guessedLetters.push(letter);
        if (checkCorrect(letter)) {
            guessedRight.push(letter);
            setStatusMessage("You got a " + letter);
        } else {
            setStatusMessage("Sorry! No " + letter + "'s");
            lives--;
        }
    }

}

function validateInput(input) {
    var regex = /^[A-Z]$/
    return regex.test(input);
}

function checkWin() {
    if (guessedRight.length === guessRequired) {
        gameState = GameState.WIN;
        return true;
    }
    return false;
}

function win() {
    playAgainButton.style.display = "inline-block";
}

function lose() {
    setStatusMessage("The word was '" + RANDOM_WORD + "'");
    playAgainButton.style.display = "inline-block";
}

///the main brain behind everything
function userGuess(event) {
    event.preventDefault();
    if (gameState === GameState.LOSE) {
        return false;
    }
    var userInput = document.getElementById("userGuess").value.toUpperCase().trim();
    if (validateInput(userInput)) {
        guessLetter(userInput);
    } else {
        setStatusMessage("Please enter a valid letter! (and just one please)");
    }

    inputForm.reset();
    inputForm.focus();
    if (lives <= 0) {
        gameState = GameState.LOSE;
        lose();
    }
    if (checkWin()) {
        setStatusMessage("Congrats! You Win!");
        win();
    }
    render();
}

var inputForm = document.getElementById("inputForm");
inputForm.addEventListener("submit", userGuess, false);

var playAgainButton = document.getElementById("playAgainButton");
playAgainButton.addEventListener("click", function(event) {
    event.preventDefault();
    startGame();
}, false);

///when the script loads, startGame();
startGame();