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

let firstNumber;
let secondNumber;
let operator;

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}