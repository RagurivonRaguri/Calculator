let resultBox = document.getElementById("result_box");

function appendToResult(value) {
    resultBox.innerHTML += value;
}

function clearResult() {
    resultBox.innerHTML = "";
}

function calculateResult() {
    try {
        let expression = resultBox.innerHTML;
        let result = parseAndCalculate(expression);
        resultBox.innerHTML = result;
    } catch (error) {
        resultBox.innerHTML = "Error";
    }
}

function parseAndCalculate(expression) {
    // Use regular expression to split the expression into numbers and operators
    //3+2 ==> ["3","+","2"]
    let tokens = expression.match(/\d+|\+|\-|\*|\//g);

    if (!tokens) {
        throw new Error("Invalid expression");
    }

    // Perform the calculations
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let operand = parseFloat(tokens[i + 1]);

        switch (operator) {
            case "+":
                result += operand;
                break;
            case "-":
                result -= operand;
                break;
            case "*":
                result *= operand;
                break;
            case "/":
                if (operand === 0) {
                    throw new Error("Division by zero");
                }
                result /= operand;
                break;
            default:
                throw new Error("Invalid operator");
        }
    }

    return result;
}
// Add event listeners to the number and operator buttons
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        let buttonText = this.innerHTML;
        appendToResult(buttonText);
    });
});

// Add event listener for the Delete button
document.getElementById("delete_btn").addEventListener("click", function() {
    clearResult();
});

// Add event listener for the Equals button
document.getElementById("equals_btn").addEventListener("click", function() {
    calculateResult();
});
