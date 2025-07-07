
const operators = ["^", "*", "/", "+", "-"];
let input = "2^3+3";
input = input.replaceAll(" ", "");

console.log(input); 
console.log(solve(input));


function findInnerEquation(equation) {
    let innerequation = equation;
    let foundParenthesis = false;

    if (equation.length == 0) {
        return "";
    } else {
        for (let letterIndex in equation) {
            if (equation[letterIndex] == ")" && foundParenthesis) {
                return solve(innerequation) + findInnerEquation(innerequation);
            } 
            if (equation[letterIndex] == "(" && !foundParenthesis) {
                foundParenthesis = true;
                innerequation = "";
            } 
            if (foundParenthesis) {
                innerEquation += equation[letterIndex];
            }
        }
    }

    return solve(innerequation);
}
 
function solve(equation) {
    for (let operatorIndex in operators) {
        console.log("parsing through operator: " + operators[operatorIndex] + " -----------------------------");
        equation = solveWithOperator(equation, operators[operatorIndex]);
        console.log("current equation after parse: " + equation + " ---------------------------");
    }
    return equation;
}

function solveWithOperator(equation, operator) {
    let prevNum = "";
    let nextNum = "";
    let foundOperator = false;
    let currentEquation = "";

    for (let letterIndex in equation) {
        console.log("current letter: " + equation[letterIndex]);
        // if the letter is a number, add it to prev or next number depending if it is before or after an operator
        if (!operators.includes(equation[letterIndex])) {
            if (foundOperator) { 
                nextNum += equation[letterIndex];
                console.log("next number: " + nextNum + foundOperator);
            } else {
                prevNum += equation[letterIndex];
            } 
        } else if (prevNum == "") {
            // if its an operator and there is no existing number, it probably means its negative or positive! 
            // make if statement in case * or / shows up
            prevNum += equation[letterIndex];
        } else {
            if (foundOperator) {
                prevNum = calculate(prevNum, nextNum, operator);
                console.log("calculted number of " +prevNum)
                foundOperator = false;
                nextNum = "";  
            } 
            if (equation[letterIndex] == operator) {
                foundOperator = true
            } else {
                currentEquation += prevNum + equation[letterIndex];
                prevNum = ""; 
            }

            console.log("current equation: " + currentEquation);
        }
    }

    if (foundOperator) {
        return currentEquation + calculate(prevNum, nextNum, operator);
    } 
    if (!currentEquation) {
        return equation;
    }
    return currentEquation + prevNum;
}

function calculate(numOne, numTwo, operator) {
    numOne = Number(numOne); 
    numTwo = Number(numTwo);
    
    if (operator == "*") return numOne * numTwo;
    if (operator == "/") return numOne / numTwo;
    if (operator == "+") return numOne + numTwo;
    if (operator == "-") return numOne - numTwo;
    if (operator == "^") {
        let value = numOne;
        for (let i = 1; i < numTwo; i++) {
            value *= numOne;
        }
        return value;
    }
}