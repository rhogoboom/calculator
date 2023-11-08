let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = null;
let firstClick = true;
const MAXDIGITS = 20;


const display = document.querySelector('.screen') 
const digitButtons = [...document.querySelectorAll('button.digit')]
const operationButtons = [...document.querySelectorAll('button.operation')];
const operateButton = document.querySelector('#operate');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');

digitButtons.forEach(btn => btn.addEventListener('click', addDigitToDisplay));
operationButtons.forEach(btn => btn.addEventListener('click', handleOperationClick));
operateButton.addEventListener('click', handleOperateClick);
clearButton.addEventListener('click', handleClearClick);
backspaceButton.addEventListener('click', handleBackspace);
window.addEventListener('keydown', handleKeydown);

const operators = {
    add: function add (x, y) {
        return x + y;
    },
    subtract: function subtract(x, y) {
        return x - y;
    }
    ,
    multiply: function multiply(x, y) {
        return x * y;
    },
    divide: function divide(x, y) {
        return x / y;
    },
}

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

function addDigitToDisplay(e) {
    if (firstClick) {
        updateDisplayValue('');
        renderDisplay();
    }
    let thisDigit;
    if (e.type === 'click') {
        thisDigit = e.target.textContent
    }
    if (e.type === 'keydown') {
        thisDigit = e.key
    }
    const currentDisplayValue = getCurrentDisplayValue();
    if (!((thisDigit === "0" && ((currentDisplayValue === '0' || currentDisplayValue === '') && operator === null)) || (checkDecimal(currentDisplayValue) && checkDecimal(thisDigit))) && currentDisplayValue.length < MAXDIGITS) {
        if (checkDecimal(thisDigit) && currentDisplayValue === '') {
            updateDisplayValue('0' + currentDisplayValue + thisDigit);
        } else {
            updateDisplayValue(currentDisplayValue + thisDigit);
        }
        
        renderDisplay();
        firstClick = false;
    }
    
}

function checkDecimal(str) {
    return str.includes('.');
}

function updateDisplayValue(newValue) {
    displayValue = newValue;
    return;
}

function renderDisplay() {
    display.textContent = displayValue
}

function getCurrentDisplayValue() {
    if(displayValue === null) {
        updateDisplayValue('0');
    }
    return displayValue;
    
}

function handleOperationClick(e) {
    if (firstNumber !== null && operator !== null) {
        doOperation();
    } else {
        firstNumber = parseFloat(getCurrentDisplayValue());
        if (e.type === 'click') {
            operator = operators[e.target.id];
        }
        if (e.type === 'keydown') {8*8
            console.log(e.type);
            console.log(e.key)
            operator = operators[operatorkeyPresses[e.key]]
            console.log(operator);
        }

    }
    
    renderDisplay();
    firstClick = true;
}

function handleOperateClick() {
    if (firstNumber !== null && operator !== null) {
        doOperation();
    }
    firstClick = true;
}

function handleClearClick() {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayValue = '';
    renderDisplay();

}

function doOperation() {
    secondNumber = parseFloat(getCurrentDisplayValue());
    if (secondNumber === 0 && operator === operators['divide']) {
        updateDisplayValue('You fool!');
        renderDisplay();
        firstNumber = null
        firstClick = true;
        displayValue = null;

    } else {
        let result = Math.round(operate(operator, firstNumber, secondNumber) * (10 ** MAXDIGITS)) / (10 ** MAXDIGITS);
        firstNumber = result;
        updateDisplayValue(result);
    renderDisplay();
    }
    
    operator = null;
    secondNumber = null;
    
}

function handleBackspace() {
    let val = getCurrentDisplayValue();
    if (!isBlank(val) && firstClick === false) {
        let newVal = val.slice(0, val.length - 1);
        updateDisplayValue(newVal)
        renderDisplay();
    }
}

function isBlank(str) {
    return str.length === 0;
}

let numkeyPresses = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    0: 0,
}

let operatorkeyPresses = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',

}

function handleKeydown (e)  {
    if (!e.repeat) {
        if (e.key in numkeyPresses) {
            addDigitToDisplay(e);;
        }
        if (e.key in operatorkeyPresses) {
            handleOperationClick(e);
        }45
        if (e.key === 'Backspace') {
            handleBackspace();
        }
        if (e.key === 'Escape') {
            handleClearClick();
        }
        if (e.key === 'Enter') {
            handleOperateClick();
        }
    }

}