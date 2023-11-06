let firstNumber = null;
let secondNumber = null;
let operator = null;


const display = document.querySelector('.screen') 
const digitButtons = [...document.querySelectorAll('button.digit')]
const operationButtons = [...document.querySelectorAll('button.operation')].filter(btn => btn.id !== 'operate' && btn.id !== 'clear');
const operateButton = document.querySelector('#operate');

digitButtons.forEach(btn => btn.addEventListener('click', addDigitToDisplay));
operationButtons.forEach(btn => btn.addEventListener('click', handleOperationClick));
operateButton.addEventListener('click', handleOperateClick);


let displayValue = display.textContent;


function add (x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

const operators = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
}

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

function addDigitToDisplay(e) {
    const thisDigit = e.target.textContent;
    const currentDisplayValue = getCurrentDisplayValue();
    updateDisplayValue(currentDisplayValue + thisDigit);
    renderDisplay(displayValue);
}

function updateDisplayValue(newValue) {
    displayValue = newValue;
    return;
}

function renderDisplay() {
    display.textContent = displayValue
}

function getCurrentDisplayValue() {
    return displayValue;
    
}







function handleOperationClick(e) {
    console.log(e.target.id);
    firstNumber = getCurrentDisplayValue();
    operator = operators[e.target.id];
    
    updateDisplayValue('');
    renderDisplay();
}

function handleOperateClick(e) {
    if (firstNumber !== null && operator !== null) {
        secondNumber = getCurrentDisplayValue();
        let result = operate(operator, firstNumber, secondNumber);
        firstNumber = result;
        operator = null;
        secondNumber = null;
        updateDisplayValue(result);
        renderDisplay();
    }
}