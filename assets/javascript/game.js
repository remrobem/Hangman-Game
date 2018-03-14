// Initialize global variables
let wordCount = 0;
let input = "";
let wrongGuess = [];
let wins = 0;

//load audio 
var audioElementMiss = document.createElement("audio");
audioElementMiss.setAttribute("src", "assets/audio/Disapointed Crowd Oh.mp3");
//audioElementMiss.play();


var audioElementLeave = document.createElement("audio");
audioElementLeave.setAttribute("src", "assets/audio/nocurve.mp3");
//audioElementLeave.play();

var audioElementHit = document.createElement("audio");
audioElementHit.setAttribute("src", "assets/audio/nocurve.mp3");
//audioElementHit.play();

// array of words for the user to guess
const wordList = ["strikeout", "glove", "error", "shortstop", "catcher", "foul", "umpire",
    "take me out to the ballpark", "triple", "dugout"
];

// build an array of the words with underscores.
const wordDisplayArray = wordList.map(word => {
    word = word.toLowerCase().replace(/[a-z0-9]/g, '_');
    return word;
});

let word = wordList[wordCount];
let displayLine = wordDisplayArray[wordCount];

// hide inputs until play button clicked

document.getElementById("continue-button").style.visibility = "hidden";
document.getElementById("restart-button").style.visibility = "hidden";
document.getElementById("playArea").style.visibility = "hidden";

//event listners for buttons
let startButton = document.getElementById("start-button");
let continueButton = document.getElementById("continue-button");

startButton.addEventListener("click", playGame);
continueButton.addEventListener("click", continueGame);

function continueGame() {

    wordCount++;
    if (wordCount > wordList.length) {
        wordCount = 0;
    };

    word = wordList[wordCount];
    displayLine = wordDisplayArray[wordCount];
    input = "";
    wrongGuess = [];

    setGameDisplay();
}


// play the game
function playGame() {

    setGameDisplay();
    let inputLetter = document.getElementById("inputLetter");
    inputLetter.addEventListener("keyup", playerGuess);

};

function playerGuess(e) {

    // handle player input
    input = e.key;
    input = input.toLowerCase();

    // clear the input field
    document.getElementById("form").reset();

    // initialize variables
    let letterIndex = 0;
    let letterMatch = 0;

    // Look for input letter in the word to guess
    letterIndex = word.indexOf(input, letterIndex);

    // if the letter is not found, display in the not found array
    if (letterIndex === -1) {
        wrongGuess.push(input);
        document.getElementById("wrongGuess").textContent = wrongGuess;
        audioElementMiss.play();
    } else {
        // if the letter is found, then a do/while loop to find any other occurances and show them in the word 
        do {
            console.log(letterIndex, letterMatch);
            displayLine = replaceAt(displayLine, letterIndex, input);
            letterIndex++;
            letterIndex = word.indexOf(input, letterIndex);
        } while (letterIndex > -1);

        // update the word display line with the correctly guessed letter
        document.getElementById("guessInput").textContent = displayLine;
    }
    // check to see if any _ left to be guessed
    letterIndex = displayLine.indexOf("_");

    // winner, winner, chicken dinner
    if (letterIndex === -1) {
        console.log('here');
        document.getElementById("currentPlayInfo").style.visibility = "hidden";
        document.getElementById("continue-button").style.visibility = "visible";
        wins++;
        document.getElementById("wins").textContent = wins;
    };

};

function setGameDisplay() {
    //change buttons and data displyed on screen when game starts

    document.getElementById("start-button").style.visibility = "hidden";
    document.getElementById("continue-button").style.visibility = "hidden";

    document.getElementById("restart-button").style.visibility = "visible";
    document.getElementById("playArea").style.visibility = "visible";
    document.getElementById("currentPlayInfo").style.visibility = "visible";

    document.getElementById("guessInput").textContent = displayLine;
    document.getElementById("wrongGuess").textContent = "";
    wrongGuess = [];

    document.getElementById("inputLetter").focus();

};

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}