let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = null;
let firstClick = true;


const display = document.querySelector('.screen') 
const digitButtons = [...document.querySelectorAll('button.digit')]
const operationButtons = [...document.querySelectorAll('button.operation')].filter(btn => btn.id !== 'operate' && btn.id !== 'clear');
const operateButton = document.querySelector('#operate');
const clearButton = document.querySelector('#clear');

digitButtons.forEach(btn => btn.addEventListener('click', addDigitToDisplay));
operationButtons.forEach(btn => btn.addEventListener('click', handleOperationClick));
operateButton.addEventListener('click', handleOperateClick);
clearButton.addEventListener('click', handleClearClick);

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
    if (!((thisDigit === "0" && currentDisplayValue === '') || (checkDecimal(currentDisplayValue) && checkDecimal(thisDigit)))) {
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
    let result = operate(operator, firstNumber, secondNumber);
    firstNumber = result;
    operator = null;
    secondNumber = null;
    updateDisplayValue(result);
    renderDisplay();
}