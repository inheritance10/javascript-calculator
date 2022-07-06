const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value=displayValue
}

keys.addEventListener('click',function (e){
    const element = e.target;
    if(!element.matches('button')){
        return;
    }

    const value = element.value;

    switch (value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(value);
    }
    updateDisplay();

    /*if(element.classList.contains('operator')){
        handleOperator(element.value);
        updateDisplay();
        //console.log('operator',element.value);
        return;
    }
    if(element.classList.contains('decimal')){
        //console.log('decimal',element.value);
        inputDecimal(element.value);
        updateDisplay();
        return;
    }
    if(element.classList.contains('clear')){
        //console.log('clear',element.value);
        clear();
        updateDisplay();
        return;
    }*/

    //console.log('number',element.value);

    /*inputNumber(element.value);
    updateDisplay();*/



})

function calculate(first,operator,second){
    if(operator === "+"){
        return first + second;
    }else if(operator === "-"){
        return first - second;
    }else if( operator === "*"){
        return first * second;
    }else if(operator === "/"){
        if(second === "0"){
            return 'payda sıfır olamaz';
        }
        return first / second;
    }
    return second;
}


function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue){
        operator = nextOperator;
        return;
    }

    if(firstValue == null){
        firstValue = value;
    }else if (operator){
        const result = calculate(firstValue,operator,value);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
        console.log(result);
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function inputNumber(number){

    if(waitingForSecondValue == true){
        displayValue = number;
        waitingForSecondValue = false;
    }else{
        displayValue = displayValue === '0' ?  number:displayValue +number;
    }

    console.log(displayValue,firstValue , operator , waitingForSecondValue)
}

function inputDecimal(decimal){
    if(!displayValue.includes(decimal)){
        displayValue += decimal;
    }
}


function clear(){
    displayValue = '0';
}