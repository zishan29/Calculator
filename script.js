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
    if(operator === "÷") {
        return divide(+number1, +number2);
    } else if(operator === "×") {
        return multiply(+number1, +number2);
    } else if(operator === "−") {
        return subtract(+number1, +number2);
    } else {
        return add(+number1, +number2);
    }
}
const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const point = document.querySelector("#point");
display1.textContent = "00";
display2.textContent = "00";
let displayValue = "0";

let firstNum = 0;
let secondNum = 0;
let operator = "";
let result = 0;
numbers.forEach(number => {
    number.addEventListener("click", e => {
        if (operator === "") {
            console.log(result);
            firstNum += parseInt(e.target.innerText);
            displayValue = firstNum;
            display2.textContent = firstNum;
        } else {
            secondNum += parseInt(e.target.innerText);
            display2.textContent = secondNum;
        }
    });
});

operators.forEach(op => {
    op.addEventListener("click", e => {
        if (e.target.innerText !== "=") {
            operator = e.target.innerText;
            display1.textContent = displayValue + operator;
        } else {
            result = operate(firstNum, secondNum, operator);
            console.log(firstNum, secondNum, operator);
            console.log(typeof(result));
            console.log(result);
            display1.textContent = `${firstNum} ${operator} ${secondNum} = `;
            display2.textContent = result;
            displayValue = result;
            firstNum = result;
            secondNum = 0;
        }
    }
)});