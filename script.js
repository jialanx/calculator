
const operators = ["^", "*", "/", "+", "-"];
let input = "(2 * (1+ 3) + 2 * (-20+3))-74^3"; 
input = input.replaceAll(" ", "");

console.log(input); 
console.log(findInnerEquation(input));

function findInnerEquation(equation) {
    let newEquation = ""; 
    
    for (let letterIndex in equation) { 
        if (equation[letterIndex] == ")") {
            console.log("solving " + newEquation+ " this equals: " + solve(newEquation) + " adding: " + equation.substring(Number(letterIndex)+1, equation.length) + " which results in: " + solve(newEquation) + equation.substring(Number(letterIndex)+1, equation.length));
            return solve(newEquation) + equation.substring(Number(letterIndex)+1, equation.length);

        } else if (equation[letterIndex] == "(") {
            newEquation += findInnerEquation(equation.substring(Number(letterIndex)+1, equation.length));
            console.log("current equation: " + newEquation);
            while (newEquation.includes(")")) {
                newEquation = findInnerEquation(newEquation);
            } 
            break;
        } else {
            newEquation += equation[letterIndex]; 
        } 
    }   
    return solve(newEquation);
}
 
function solve(equation) {
    for (let operatorIndex in operators) {
        equation = solveWithOperator(equation, operators[operatorIndex]);
    }
    return equation;
}

function solveWithOperator(equation, operator) {
    let prevNum = "";
    let nextNum = ""; 
    let foundOperator = false;
    let currentEquation = ""; 

    for (let letterIndex in equation) {
        // if the letter is a number, add it to prev or next number depending if it is before or after an operator
        if (!operators.includes(equation[letterIndex])) {
            if (foundOperator) { 
                nextNum += equation[letterIndex];
            } else {
                prevNum += equation[letterIndex];
            } 
        } else if (prevNum == "") {
            // if its an operator and there is no existing number, it probably means its negative or positive! 
            prevNum += equation[letterIndex];
        } else {
            if (foundOperator) {
                if (nextNum == "") {
                    console.log("uh oh! next number is blank, i am currently looking at: " + equation[letterIndex]);
                    nextNum += equation[letterIndex];
                } else {
                    prevNum = calculate(prevNum, nextNum, operator);
                    foundOperator = false;
                    nextNum = ""; 
                } 
            }  
 
            if (equation[letterIndex] == operator) {
                foundOperator = true
            } else if (!operators.includes(nextNum)) {
                currentEquation += prevNum + equation[letterIndex];
                prevNum = "";   
            }

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