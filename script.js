// operational variables
let num1 = '';
let num2 = '';
let operator = '';

let result;

let leftSide = false;
let rightSide = false;
let operated = false;

let isError = false;

// list of numbers and operators
const NUMLIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const OPLIST = ['+', '-', '×', '÷', '%'];

// DOM variables
const currentDisplay = document.getElementById('current');
const pastCalc = document.getElementById('pastCalc');

const calcBtns = document.getElementById('buttonGrid');


// Link to buttons
calcBtns.addEventListener('click', (event) => {

    if(!event.target.closest('button')) return;

    if (isError && !isClearButton(event)) {
        return;
    }

    // Number buttons
    if (NUMLIST.includes(event.target.textContent) && leftSide == false) {
        num1 += event.target.id;
        currentDisplay.textContent += event.target.id;
    } else if (NUMLIST.includes(event.target.textContent) && leftSide == true) {
        num2 += event.target.id;
        currentDisplay.textContent += event.target.id;
    }

    // Operator buttons
    if (OPLIST.includes(event.target.textContent) && leftSide == false) {
        leftSide = true;
        operator = event.target.id;
        currentDisplay.textContent += event.target.id;
    } else if (OPLIST.includes(event.target.textContent) && leftSide == true) {
        if (operator !== '') {
            // complete operation, move to pastcalc
            result = operate(Number(num1), operator, Number(num2));
            pastCalc.textContent = currentDisplay.textContent;
            currentDisplay.textContent = result;

            // reset for second calculation
            num1 = result;
            num2 = '';
            operator = event.target.id;
            currentDisplay.textContent += event.target.id;
        } else {
            currentDisplay.textContent += event.target.id;
        }
    }

    // Equals button
    if (event.target.textContent === '=') {
        if (leftSide === false) {
            if (num1 === '') {
                pastCalc.textContent = 0;
                currentDisplay.textContent = '';
            } else {
                pastCalc.textContent = num1;
            }
        }
        result = operate(Number(num1), operator, Number(num2));
        if (isNaN(result) || result === Infinity) {
            currentDisplay.textContent = 'ERROR';
            isError = true;
            return;
        } else {
            pastCalc.textContent = currentDisplay.textContent;
            currentDisplay.textContent = result;

            // reset for second calculation
            num1 = result;
            num2 = '';
            operator = '';
            leftSide = false;
        }
    }
})

// display buttons
function displayNum(i) {
    current.textContent += i;
    if (current.textContent == 0) {
        a = i;
    } else if (current.textContent) {

    }
}

// operate function
function operate(a, operator, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === '×') {
        return multiply(a, b);
    } else if (operator === '÷') {
        return divide (a, b);
    }
}

// basic operations
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

console.log(add(6, 7));
console.log(subtract(6, 7));
console.log(multiply(6, 7));
console.log(divide(6, 7));


// TO WORK ON
function clearDisplay() {

}