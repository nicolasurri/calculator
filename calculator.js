let runningTotal = 0;

// To keep in mind it always would be a string in the screen. JS as source of truth.
let buffer = "0";

// To hold the clicked operator
let previousOperator = null;

const screen = document.querySelector(".screen");

// What happens if a user clicks one of the butttons?
function buttonClick(value) {
    // Numbers are treated the same, but operators do different things
    if (isNaN(value)) {
        // This is not a number
        handleSymbol(value);
    } else {
        // This is a number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        // Clear out
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;
        case "=":
            if (previousOperator === null) {
                // need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else  {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    // Some maths with strings
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

// Init gets called once and it sets everything up
function init() {
    document.querySelector(".calc-buttons")
        .addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
        })
}

init();