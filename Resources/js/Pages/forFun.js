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
    RANDOM_WORD = chooseRandomWord();
    gameState = GameState.CONTINUE;
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
    console.log("GAME: the word is: " + word);
    return word;
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

function guessLetter(letter) {
    guessedLetters.push(letter);

}


function validateInput(input) {
    var regex = /^[A-Z]$/
    return regex.test(input);
}

function win() {
    gameState = GameState.WIN;
    render();
    //set text to play again?
    //When button is clicked, it will reset it (but the last game will stay there so they can see the word or be done)
}

function userGuess(event) {
    event.preventDefault();
    var userInput = document.getElementById("userGuess").value.toUpperCase().trim();
    if (validateInput(userInput)) { //validate input
        //guess input
        guessLetter(userInput);
    } else {
        //show error message if it is invalid input
        setStatusMessage("Please enter a valid letter! (and just one please)");
    }





    //show results
}

var inputForm = document.getElementById("inputForm");
inputForm.addEventListener("submit", userGuess, false);






startGame();