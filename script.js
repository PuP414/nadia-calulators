let display = document.getElementById('display');
let currentInput = '';

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function calculatePower(power) {
    try {
        // Find the last number before the power function is applied
        const numbers = currentInput.match(/(\d+\.?\d*|\.?\d+)$/);
        if (numbers) {
            const lastNumber = parseFloat(numbers[0]);
            const result = Math.pow(lastNumber, power);
            currentInput = currentInput.substring(0, currentInput.lastIndexOf(numbers[0])) + result;
            display.value = currentInput;
        }
    } catch (e) {
        display.value = 'Error';
        currentInput = '';
    }
}

function calculateSquareRoot() {
    try {
        // Find the last number before the square root function is applied
        const numbers = currentInput.match(/(\d+\.?\d*|\.?\d+)$/);
        if (numbers) {
            const lastNumber = parseFloat(numbers[0]);
            if (lastNumber < 0) {
                display.value = 'Error: Neg SqRt';
                currentInput = '';
                return;
            }
            const result = Math.sqrt(lastNumber);
            currentInput = currentInput.substring(0, currentInput.lastIndexOf(numbers[0])) + result;
            display.value = currentInput;
        }
    } catch (e) {
        display.value = 'Error';
        currentInput = '';
    }
}


function calculateResult() {
    try {
        // Replace 'x' with '*' and '÷' with '/' for evaluation
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');

        // Evaluate the expression
        // Using eval() can be a security risk in production for untrusted input.
        // For a simple client-side calculator, it's generally acceptable.
        let result = eval(expression);

        // Handle potential floating point inaccuracies
        if (Number.isFinite(result) && Math.abs(result) < 1e-9) { // Check for numbers very close to zero
            result = 0;
        } else if (Math.abs(result) > 1e12) { // Prevent extremely long numbers on display
            result = result.toExponential(5);
        } else if (Number.isFinite(result) && String(result).includes('.') && String(result).length > 10) { // Limit decimal places for long decimals
            result = parseFloat(result.toFixed(8));
        }


        display.value = result;
        currentInput = String(result);
    } catch (e) {
        display.value = 'Error';
        currentInput = '';
    }
}