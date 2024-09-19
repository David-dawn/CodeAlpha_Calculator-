// Calculator logic
let display = document.getElementById('calc-display');
let memory = 0;
let currentInput = '';
let operator = '';
let result = 0;
let shouldResetDisplay = false;  // Flag to reset display after an operator is pressed

// Handling memory functions
document.getElementById('memory-clear').addEventListener('click', () => memory = 0);
document.getElementById('memory-recall').addEventListener('click', () => display.value = memory);
document.getElementById('memory-add').addEventListener('click', () => memory += parseFloat(display.value));
document.getElementById('memory-subtract').addEventListener('click', () => memory -= parseFloat(display.value));

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Clear button
document.getElementById('clear').addEventListener('click', () => {
    display.value = '';
    currentInput = '';
    operator = '';
    result = 0;
    shouldResetDisplay = false;
});

// Number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (shouldResetDisplay) {
            display.value = '';
            shouldResetDisplay = false;
        }
        currentInput += button.getAttribute('data-number');
        display.value += button.getAttribute('data-number');
    });
});

// Decimal button
document.querySelector('.decimal').addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value += '.';
    }
});

// Operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput || result !== 0) {
            if (operator && currentInput) calculate();  // Calculate if operator and input exist
            operator = button.getAttribute('data-operation');
            display.value += ` ${operator} `;  // Show the operator immediately on the display
            result = parseFloat(currentInput) || result;
            currentInput = '';
            shouldResetDisplay = false;  // Prevent resetting after an operator click
        }
    });
});

// Equals button
document.getElementById('equal').addEventListener('click', calculate);

// Calculate function
function calculate() {
    let num2 = parseFloat(currentInput);
    if (isNaN(num2)) return;  // Prevent calculation if num2 is not a number

    switch (operator) {
        case '+':
            result += num2;
            break;
        case '-':
            result -= num2;
            break;
        case '*':
            result *= num2;
            break;
        case '/':
            result /= num2;
            break;
        case '√':
            result = Math.sqrt(result);
            break;
        case '^':
            result = Math.pow(result, num2);
            break;
        case '%':
            result = result * (num2 / 100);
            break;
        default:
            break;
    }
    display.value = result;
    currentInput = '';
    operator = '';
    shouldResetDisplay = true;  // Reset display on the next number press
}
