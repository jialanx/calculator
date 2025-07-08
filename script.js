const operators = ["^", "*", "/", "+", "-"]; // operators in order of PEMDAS
let input = "2x2"; 
input = input.replaceAll(" ", "");
input = input.toLowerCase();

console.log(input); // original equation
//while (input != "no") {
    console.log(check(input));
//}
 
// checks if the equation is valid 
function check(equation) {
    const acceptableValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "(", ")", "^", "*", "/", "+", "-", "x"];
    const illegalBeginning = ["^", "*", "/", "x"];
    let prevLetter;
    let editedEquation = ""; 
    let parenthesisCounter = 0;

    if (equation.length == 0) return "No equation inputted";
    if (illegalBeginning.includes(equation[0])) return "Do not begin with an operator!";
 
    for (let letterIndex in equation) {
        if (operators.includes(prevLetter) && operators.includes(equation[letterIndex])) return "Invalid operator placement";
        if (!acceptableValues.includes(equation[letterIndex])) return "Your equation includes invalid characters";
        if (operators.includes(equation[equation.length-1])) return "Your equation ends with an operator";

        if (equation[letterIndex] == "(" && !operators.includes(prevLetter)) {
            editedEquation += "*("
            
        } else if (equation[letterIndex] == "x") {
            editedEquation += "*"
        } else if (equation[letterIndex] == ")" && Number(equation[letterIndex])) { 
            editedEquation += ")*";
        } else {
            editedEquation += equation[letterIndex];
        } 
        
        if (equation[letterIndex] == "(") {
            parenthesisCounter++;
        } else if (equation[letterIndex] == ")") {
            parenthesisCounter--;
        }

        prevLetter = equation[letterIndex];
    }

    if (parenthesisCounter != 0) return "# of Open and CLosed parenthesis don't match!";
    console.log(editedEquation);
    return findInnerEquation(editedEquation);
}

// searches the equation for parenthesis, uses recursion to solve each parenthesis
function findInnerEquation(equation) {
    let newEquation = ""; 

    for (let letterIndex in equation) { 

        // if closing parenthesis, it will solve the equation and add together the string after the closing parenthesis
        if (equation[letterIndex] == ")") {
            return solve(newEquation) + equation.substring(Number(letterIndex)+1, equation.length);

        // if it is an open parenthesis it will add the current parsing progress to the result of value within parenthesis
        } else if (equation[letterIndex] == "(") {
            newEquation += findInnerEquation(equation.substring(Number(letterIndex)+1, equation.length));

            // if we are still in parenthesis it will rerun the function to find the closing parenthesis
            while (newEquation.includes(")")) {
                newEquation = findInnerEquation(newEquation);
            } 
            break;
        
        // if we are not in a parenthesis it will add the letter to the equation we have
        } else {
            newEquation += equation[letterIndex]; 
        } 
    }   

    // function doesn't solve unless it is an ending parenthesis
    // last solve in case there is not a closing parenthesis for the equation
    return solve(newEquation);
}
 
// runs through each operator in PEMDAS
function solve(equation) {
    for (let operatorIndex in operators) {
        equation = solveWithOperator(equation, operators[operatorIndex]);
    }
    return equation;
}

// searches for the specified operator and calculates the number before and after it
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
        } else if (prevNum == "") { // if it starts with an operator, its probably negative or positive
            prevNum += equation[letterIndex];
        } else {
            
            // if the current letter is an operator, then the number ended and it will calculate the next and prev numbers
            if (foundOperator) {
                if (nextNum == "") { // no existing number means its probably negative or positive
                    nextNum += equation[letterIndex];
                } else {
                    prevNum = calculate(prevNum, nextNum, operator); 
                    foundOperator = false;
                    nextNum = ""; 
                } 
            }  
 
            if (equation[letterIndex] == operator) { 
                foundOperator = true
            } else if (!operators.includes(nextNum)) { // won't add the value to the equation because the negative is already accounted for within nextNum
                currentEquation += prevNum + equation[letterIndex];
                prevNum = "";   
            }

        } 
    }


    if (foundOperator) { // checks if it was mid-equation looking for the number after operator
        return currentEquation + calculate(prevNum, nextNum, operator);
    } 
    if (!currentEquation) { // checks if currentEquation is empty
        return equation;
    }
    return currentEquation + prevNum; // if there was no operator, return the equation and the number we were checking.
}

// calculates number with given operator
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