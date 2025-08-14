// operational variables
let num1;
let num2;
let operator;


// operate function
function operate(a, operator, b) {
    if (operator = add) {
        add(a, b);
    } else if (operator = subtract) {
        subtract(a, b);
    } else if (operator = multiply) {
        multiply(a, b);
    } else if (operator = divide) {
        divide (a, b);
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