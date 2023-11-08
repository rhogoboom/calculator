let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = null;
let firstClick = true;
const MAXDIGITS = 20;


const display = document.querySelector('.screen') 
const digitButtons = [...document.querySelectorAll('button.digit')]
const operationButtons = [...document.querySelectorAll('button.operation')].filter(btn => btn.id !== 'operate' && btn.id !== 'clear' && btn.id !== 'backspace');
const operateButton = document.querySelector('#operate');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');

digitButtons.forEach(btn => btn.addEventListener('click', addDigitToDisplay));
operationButtons.forEach(btn => btn.addEventListener('click', handleOperationClick));
operateButton.addEventListener('click', handleOperateClick);
clearButton.addEventListener('click', handleClearClick);
backspaceButton.addEventListener('click', handleBackspace);

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

    const thisDigit = e.target.textContent;
    const currentDisplayValue = getCurrentDisplayValue();
    if (!((thisDigit === "0" && currentDisplayValue === '') || (checkDecimal(currentDisplayValue) && checkDecimal(thisDigit))) && currentDisplayValue.length < MAXDIGITS) {
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
        updateDisplayValue('');
    }
    return displayValue;
    
}

function handleOperationClick(e) {
    if (firstNumber !== null && operator !== null) {
        doOperation();
    } else {
        firstNumber = parseFloat(getCurrentDisplayValue());
        operator = operators[e.target.id];

    }
    
    renderDisplay();
    firstClick = true;
}

function handleOperateClick(e) {
    if (firstNumber !== null && operator !== null) {
        doOperation();
    }
    firstClick = true;
}

function handleClearClick() {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayValue = null;
    renderDisplay();

}

function doOperation() {
    secondNumber = parseFloat(getCurrentDisplayValue());
    let result = Math.round(operate(operator, firstNumber, secondNumber) * 100000) / 100000;
    firstNumber = result;
    operator = null;
    secondNumber = null;
    updateDisplayValue(result);
    renderDisplay();
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