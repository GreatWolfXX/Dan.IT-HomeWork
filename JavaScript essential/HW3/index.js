let numberA = +prompt('Enter first number!');
let numberB = +prompt('Enter second number!');
let typeOperation = prompt('Enter math operation!')

const calc = function (numberA, numberB, typeOperation) {
    switch (typeOperation) {
        case '+': {
            console.log(numberA + numberB);
            break;
        }
        case '-': {
            console.log(numberA - numberB);
            break;
        }
        case '*': {
            console.log(numberA * numberB);
            break;
        }
        case '/': {
            console.log(numberA / numberB);
            break;
        }
    }
}

calc(numberA, numberB, typeOperation)
