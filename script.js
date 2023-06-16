let divide = (number1, number2) => {
    return number1 / number2;
}

let multiply = (number1, number2) => {
    return number1 * number2;
}

let subtract = (number1, number2) => {
    return number1 - number2;
}

let add = (number1, number2) => {
    return number1 + number2;
}

let operate = (number1, number2, operator) => {
    number1 = Number(number1);
    number2 = Number(number2);
    if(operator === "÷") {
        if(number2 === 0) return "Can't divide by 0";
        else {
            return divide(number1, number2);
        }
    } else if(operator === "×") {
        return multiply(number1, number2);
    } else if(operator === "−") {
        return subtract(number1, number2);
    } else {
        return add(number1, number2);
    }
}

const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const lastDisplay = document.querySelector(".lastDisplay");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const point = document.querySelector("#point");
const equals = document.querySelector("#equals");
const clearbtn = document.querySelector("#clear");
const deletebtn = document.querySelector("#delete");

window.addEventListener('keydown', handleKeys);
clearbtn.addEventListener('click', clear);
deletebtn.addEventListener('click', deleteNum);
equals.addEventListener('click', () => {
    operator = "=";
    evaluate();
});
point.addEventListener('click', addPoint);

let isClicked = false;
let firstNum = "";
let secondNum = "";
let currentOperator = null;
let operator = null;
display2.textContent = "0";

numbers.forEach(number => 
    number.addEventListener("click", () => appendNumber(number.textContent)));

operators.forEach(op => 
    op.addEventListener("click", () => setOperator(op.textContent)));

function appendNumber(number) {
    if(display2.textContent === '0')
        resetScreen();
    display2.textContent += number;
}

function resetScreen() {
    display2.textContent = "";
}

function setOperator(operator) {
    if(currentOperator !== null) evaluate();
    firstNum = display2.textContent;
    currentOperator = operator;
    display1.textContent = `${firstNum} ${currentOperator} `;
    display2.textContent = "";

}

function evaluate() {
    if(operator === "=") {
        if(isClicked) return;
        secondNum = display2.textContent;
        display1.textContent = `${firstNum} ${currentOperator} ${secondNum} `;
        display2.textContent = "";
        lastDisplay.textContent = Math.round(
            operate(firstNum, secondNum, currentOperator) * 100000) / 100000;
        firstNum = Math.round(
            operate(firstNum, secondNum, currentOperator) * 100000) / 100000;
        operator = null;
    } else {
        console.log(firstNum, secondNum, currentOperator);
        if(currentOperator === null) return;
        secondNum = display2.textContent;
        display2.textContent = Math.round(
            operate(firstNum, secondNum, currentOperator) * 100000) / 100000;
        display1.textContent = `${firstNum} ${currentOperator} ${secondNum} `;
        currentOperator = null;
    }
}

function addPoint(){
    if(display2.textContent === '') {
        display2.textContent = "0";
    }
    if(display2.textContent.includes(".")) return;
    display2.textContent += ".";
}

function clear(){
    display1.textContent = "";
    display2.textContent = "";
    lastDisplay.textContent = "";
    firstNum = "";
    secondNum = "";
    currentOperator = null;
}

function deleteNum() {
    display2.textContent = display2.textContent.toString().slice(0, -1);
}

function handleKeys(e){
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if(e.key === '.') addPoint();
    if(e.key === '=' || e.key === 'Enter') {
        operator = '=';
        evaluate();
    }
    if(e.key === 'Backspace') deleteNum();
    if(e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperator(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '−';
    if (keyboardOperator === '+') return '+';
}