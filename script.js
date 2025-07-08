
const operators = ["^", "*", "/", "+", "-"];
let input = "(2 * (1+ 3) + 2 * (20+3))-74";
input = input.replaceAll(" ", "");

console.log(input); 
console.log(findInnerEquation(input));

function findInnerEquation(equation) {
    let newEquation = ""; 
    
    for (let letterIndex in equation) { 
        console.log(equation[letterIndex] + "   " + equation);
        if (equation[letterIndex] == ")") {

            console.log("end of inner eq returning: " + newEquation  + "   " + (Number(letterIndex)+1) + "        " + equation.length + "          " + equation.substring(Number(letterIndex)+1, equation.length));
            return solve(newEquation) + equation.substring(Number(letterIndex)+1, equation.length);

        } else if (equation[letterIndex] == "(") {

            console.log("entering eq: " + equation.substring(Number(letterIndex) + 1, equation.length) +" after the current eq: " + equation + " letter index: " + (Number(letterIndex)+1) + " length: "+ equation.length);
            newEquation += findInnerEquation(equation.substring(Number(letterIndex)+1, equation.length));
            console.log("new eq: " + newEquation); 


            while (newEquation.includes(")")) {
                newEquation = findInnerEquation(newEquation);
            }
            console.log("no more!");
            break;

        } else {
            newEquation += equation[letterIndex]; 
            console.log("current eq after adding a letter: " + newEquation);
        } 
    }

    return solve(newEquation);
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
        //console.log("current letter: " + equation[letterIndex]);
        // if the letter is a number, add it to prev or next number depending if it is before or after an operator
        if (!operators.includes(equation[letterIndex])) {
            if (foundOperator) { 
                nextNum += equation[letterIndex];
                //console.log("next number: " + nextNum + foundOperator);
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
                //console.log("calculted number of " +prevNum)
                foundOperator = false;
                nextNum = "";  
            } 
            if (equation[letterIndex] == operator) {
                foundOperator = true
            } else {
                currentEquation += prevNum + equation[letterIndex];
                prevNum = ""; 
            }

            //console.log("current equation: " + currentEquation);
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