let displayValue = '';
let operator = '';
let firstOperand = '';

function appendNumber(number) {
    displayValue += number;
    updateDisplay();
}

function setOperator(op) {
    operator = op;
    firstOperand = displayValue;
    displayValue = '';
    updateDisplay();
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = displayValue || '0';
}

function calculateResult() {
    let result;
    const secondOperand = displayValue;
    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        default:
            result = 'Error';
    }
    displayValue = result.toString();
    operator = '';
    firstOperand = '';
    updateDisplay();
}