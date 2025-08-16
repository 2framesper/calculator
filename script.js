// operational variables
let num1 = '';
let num2 = '';
let operator = '';

let result;

let leftSide = false;
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

    if (isError && event.target.textContent !== 'AC') {
        return;
    }

    // Number buttons
    if (NUMLIST.includes(event.target.textContent) && leftSide == false) {
        if (currentDisplay.textContent !== '0') {
            num1 += event.target.id;
            currentDisplay.textContent += event.target.id;
        } else {
            num1 = event.target.id;
            currentDisplay.textContent = event.target.id;
        }
    } else if (NUMLIST.includes(event.target.textContent) && leftSide == true) {
        num2 += event.target.id;
        currentDisplay.textContent += event.target.id;
    }

    // Operator buttons
    if (OPLIST.includes(event.target.textContent) && leftSide == false) {
        if (num1 !== '') {
            leftSide = true;
            operator = event.target.id;
            currentDisplay.textContent += event.target.id;
        } else {
            leftSide = true;
            num1 = '0';
            operator = event.target.id;
            currentDisplay.textContent += event.target.id;
        }
    } else if (OPLIST.includes(event.target.textContent) && leftSide == true) {
        if (num2 !== '') {
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
            operator += event.target.id;
        }
    }

    // Equals button
    if (event.target.textContent === '=') {
        operated = true;
        if (leftSide === false) {
            if (num1 === '') {
                pastCalc.textContent = 0;
                currentDisplay.textContent = '';
            } else {
                return pastCalc.textContent = num1;
            }
        }
        result = operate(Number(num1), operator, Number(num2));
        if (isNaN(result) || result === Infinity || checkMinLength(operator, 2)) {
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

    // Decimal button
    if (event.target.textContent === '.') {
        if (leftSide === false && num1 !== ''){
            num1 += event.target.id;
            currentDisplay.textContent += event.target.id;
        } else if (leftSide === false && num1 === '') {
            num1 += 0;
            num1 += event.target.id;
            currentDisplay.textContent += event.target.id;
        }

        if (leftSide === true && num2 !== ''){
            num2 += event.target.id;
            currentDisplay.textContent += event.target.id;
        } else if (leftSide === true && num1 === '') {
            num1 += 0;
            num1 += event.target.id;
            currentDisplay.textContent += '0';
            currentDisplay.textContent += event.target.id;
        }
    }

    // AC button
    if(event.target.textContent === 'AC') {
        clearDisplay();
    }

    // C button
    if (event.target.textContent === 'C') {
        if (operated === true) {
            clearDisplay();
        } else if (leftSide === false) {
            num1 = num1.slice(0, -1);
            currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
        } else if (leftSide === true && num2 === '') {
            if (num2 === '') {
                operator = operator.slice(0, -1);
                currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
            } else {
                num2 = num2.slice(0, -1);
                currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
            }
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
        return divide(a, b);
    } else if (operator === '%') {
        return modulus(a, b);
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
function modulus(a, b) {
    return a % b;
}

// helper functions
function checkLength(str, targetLength) {
    return str.length === targetLength;
}

function checkMinLength(str, minLength) {
    return str.length >= minLength;
}

// TO WORK ON
function clearDisplay() {
    num1 = '';
    operator = '';
    num2 = '';

    leftSide = false;
    operated = false;
    isError = false;

    pastCalc.textContent = '';
    currentDisplay.textContent = '0';
}

window.onload = () => {
    currentDisplay.textContent = '0';
}