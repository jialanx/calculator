
const operators = ["+", "-", "*", "/"];
let input = "-2+20";
input = input.replaceAll(" ", "");

console.log(input); 
console.log(addAndSubtract(input));

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
    //equation = exponent(equation);
    equation = multiplyAndDivide(equation);
    return addAndSubtract(equation);
}

// function exponent(equation) {}

function addAndSubtract(equation) {
    let prevNum = "";
    let nextNum = "";
    let subtraction = false;
    let addition = false;

    for (let letterIndex in equation) {
        // if the letter is a number, add it to prev or next number depending if it is before or after an operator
        if (!operators.includes(equation[letterIndex])) {
            if (subtraction || addition) { 
                nextNum += equation[letterIndex];
            } else {
                prevNum += equation[letterIndex];
            } 
        } else if (prevNum == "") {
            prevNum += equation[letterIndex];
        } else {
            if (subtraction) {
                prevNum = (Number(prevNum) - Number(nextNum));
                subtraction = false;
            } else if (addition) {
                prevNum = (Number(prevNum) + Number(nextNum));
                addition = false;
            } 

                nextNum = "";
                if (equation[letterIndex] == "-") {
                    subtraction = true;
                } else if (equation[letterIndex] == "+") {
                    addition = true;
                }
        }
    }

    if (subtraction) {
        return (Number(prevNum) - Number(nextNum));
    } else if (addition) {  
        return (Number(prevNum) + Number(nextNum));
    }
    return prevNum;

}