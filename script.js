// Simple Calculator Logic
let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

// Update display
function updateDisplay() {
    display.textContent = displayValue;
}

// Append number to display
function appendNumber(number) {
    if (displayValue === '0' || shouldResetDisplay) {
        displayValue = number;
        shouldResetDisplay = false;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

// Append decimal point
function appendDecimal() {
    if (shouldResetDisplay) {
        displayValue = '0.';
        shouldResetDisplay = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

// Append operator
function appendOperator(operator) {
    if (currentOperator !== null) calculate();
    firstOperand = parseFloat(displayValue);
    currentOperator = operator;
    shouldResetDisplay = true;
}

// Clear calculator
function clearCalculator() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

// Clear entry
function clearEntry() {
    displayValue = '0';
    updateDisplay();
}

// Backspace
function backspace() {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

// Calculate result
function calculate() {
    if (currentOperator === null || shouldResetDisplay) return;
    
    secondOperand = parseFloat(displayValue);
    
    let result;
    switch (currentOperator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                result = 'Error';
            } else {
                result = firstOperand / secondOperand;
            }
            break;
        default:
            return;
    }
    
    // Round to avoid floating point precision issues
    if (typeof result === 'number') {
        result = Math.round(result * 100000000) / 100000000;
    }
    
    displayValue = String(result);
    currentOperator = null;
    firstOperand = null;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers
    if (key >= '0' && key <= '9') {
        appendNumber(key);
        return;
    }
    
    // Operators and functions
    switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
            appendOperator(key);
            break;
        case '.':
            appendDecimal();
            break;
        case 'Enter':
        case '=':
            event.preventDefault();
            calculate();
            break;
        case 'Escape':
            clearCalculator();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'c':
        case 'C':
            clearCalculator();
            break;
    }
});

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    // Number buttons
    document.querySelectorAll('[data-number]').forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.getAttribute('data-number'));
        });
    });
    
    // Operator buttons
    document.querySelectorAll('[data-operator]').forEach(button => {
        button.addEventListener('click', () => {
            appendOperator(button.getAttribute('data-operator'));
        });
    });
    
    // Action buttons
    document.querySelectorAll('[data-action]').forEach(button => {
        const action = button.getAttribute('data-action');
        button.addEventListener('click', () => {
            switch (action) {
                case 'clear':
                    clearCalculator();
                    break;
                case 'clear-entry':
                    clearEntry();
                    break;
                case 'backspace':
                    backspace();
                    break;
                case 'decimal':
                    appendDecimal();
                    break;
                case 'calculate':
                    calculate();
                    break;
            }
        });
    });
});

// Initialize calculator
function initializeCalculator() {
    updateDisplay();
    console.log('PixelCalc ready!');
}

// Initialize when page loads
window.addEventListener('load', initializeCalculator);