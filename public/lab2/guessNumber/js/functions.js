var randomNumber = Math.floor(Math.random() * 99) + 1;
var guesses = document.querySelector('#guesses');
var lastResult = document.querySelector('#lastResult');
var lowOrHi = document.querySelector('#lowOrHi');

const validationFeedback = $("#validationFeedback")[0];
const attemptNumber = $("#attemptNumber")[0];

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var resetButton = document.querySelector('#reset');
guessField.focus();

resetButton.style.display = 'none';

const gamesWon = $("#gamesWon")[0];
const gamesLost = $("#gamesLost")[0];
let wins = 0;
let losses = 0;

const inputValidation = () => {
    const input = guessField.value;
    if (!isNaN(input) && input >= 0 && input <= 99) {
        checkGuess();
        validationFeedback.innerHTML = "";
    } else {
        validationFeedback.innerHTML = "You must enter a number between 0 and 99";
        lastResult.innerHTML = "";
    }
};

const viewAttempt = () => {
    if (guessCount >= 7) {
        attemptNumber.innerHTML = '7';
    } else {
        attemptNumber.innerHTML = guessCount;
    }
};

const updateScoreboard = () => {
    gamesWon.innerHTML = wins;
    gamesLost.innerHTML = losses;
};

function checkGuess() {
    var userGuess = Number(guessField.value);
    if(guessCount ===1) {
        guesses.innerHTML = 'Previous guesses: ';
    }
    guesses.innerHTML += userGuess + ' ';

    if(userGuess === randomNumber){
        lastResult.innerHTML = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.innerHTML = '';
        wins++;
        setGameOver();
    } else if(guessCount === 7) {
        lastResult.innerHTML = 'Sorry You Lost!';
        losses++;
        setGameOver();
    } else {
        lastResult.innerHTML = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randomNumber){
            lowOrHi.innerHTML = 'Last guess was too low!';
        } else if(userGuess > randomNumber) {
            lowOrHi.innerHTML = 'Last guess was too high';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
    viewAttempt();
}

guessSubmit.addEventListener('click', inputValidation);

$(guessField).on("focus", viewAttempt());

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.style.display = 'inline';
    resetButton.addEventListener('click', resetGame);
    updateScoreboard();
}

function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');
    for(var i = 0; i < resetParas.length; i++){
        resetParas[i].textContent = '';
    }

    resetButton.style.display = 'none';

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 99) + 1;
}