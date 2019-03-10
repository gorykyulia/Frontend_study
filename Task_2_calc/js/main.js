var numbers = document.getElementsByClassName('number');
var operations = document.getElementsByClassName('operation');
var field = document.getElementById('field');
var clearButton = document.querySelector(".clear");
var clearOneButton = document.querySelector('.clear_one');
var equalButton = document.querySelector('.equal');
var signButton = document.querySelector('.plus_minus');
var minusButton = document.querySelector('.minus');
var dotButton = document.querySelector('.dot');


clearButton.addEventListener('click', clearField);
clearOneButton.addEventListener('click', clearOneSymbol);
equalButton.addEventListener('click', calculate);
signButton.addEventListener('click', changeSign);
dotButton.addEventListener('click', writeDot);


for(var i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', writeSymbol);
}
for(i = 0; i < operations.length; i++) {
  operations[i].addEventListener('click', writeOperation);
}

field.onkeypress = function() {
  clearField();
  if(event.which === 48 || event.which === 49 || event.which === 50 || event.which === 51 ||
    event.which === 52 || event.which === 53 || event.which === 54 || event.which === 55 ||
    event.which === 56 || event.which === 57) {
    addSymbolInField(event.key);
  }
  if(event.which === 43 || event.which === 45 || event.which === 47 || event.which === 37) {
    writeOperation(event.key);
  }
  if(event.which === 42) {   // *
    writeOperation('x');
  }
  if (event.which === 61) {   // =
    calculate();
  }
  if(event.which === 46) {    // .
    writeDot(event.key);
  }
  if(event.which === 13) {    // enter
    calculate();
  }
  // if(event.key === "Backspace") {    // backspace
  //     clearOneSymbol();
  //   }
};

field.onkeydown = function() {
  if(event.key === "Backspace") {    // backspace
    clearOneSymbol();
  }
};

field.setMinSize = function() {
  this.style.fontSize = "14px";
};

function changeSign () {
  var value = +field.value;
  if(!isNaN(value)) {
    field.value = (value < 0) ? value * -1 : -value;
  } else {
    field.setMinSize();
    field.value = "Error.It is not a number";
  }
}

function writeSymbol() {
  addSymbolInField(this.innerHTML);
}

function writeOperation(key) {
  var str = field.value;

  if(!isEmptyField() && countSymbolInField(str, "-") < 2 && !isSymbolsInField(str, "+/%x") && !isLastSymbol("-+.x/%") ) {
    if(this.innerHTML === "-") {
      if ( (str[0] === "-" && countSymbolInField(str, "-") === 1) || countSymbolInField(str, "-") === 0 )
        {addSymbolInField(this.innerHTML || key);}
    } else addSymbolInField(this.innerHTML || key);
  }
}

function isEmptyField() {
  return !field.value;
}

function countSymbolInField(str, symbol) {
  var count = 0;

  for(var i = 0; i < str.length; i++) {
    if(str[i] === symbol) count++;
  }
  return count;
}

function isSymbolsInField(field, symbols) {
  for(var i = 0; i < symbols.length; i++) {
    if(~field.indexOf(symbols[i]))
      return true;
  }
}

function isLastSymbol(symbols) {
  var lastSymbol = field.value[field.value.length-1];
  for(var i = 0; i < symbols.length; i++){
    if(symbols[i] === lastSymbol)
      return true;
  }
}

function addSymbolInField(value) {
  field.value += value;
}

function clearField(){
  field.style.fontSize = "30px";
  field.value = "";
}

function clearOneSymbol() {
  if (field.value) {
    field.value = field.value.slice(0, -1);
  }
}

function calculate() {
  var fieldValue = field.value;
  var expression = splitExpression(fieldValue);

  var a = +expression[1];
  var b = +expression[2];

  if(isNaN(a) || isNaN(b)) {
    field.setMinSize();
    writeResult("Error. It is not a number");
    return;
  }

  switch (expression[0]) {
    case '+': writeResult( add(a, b) );
      break;
    case '-': writeResult( subt(a, b) );
      break;
    case 'x': writeResult( mult(a, b) );
      break;
    case '/': writeResult( div(a, b) );
      break;
    case '%': writeResult( persent(a, b) );
      break;
  }
}

function splitExpression(str) {
  var operations = "+-x/%";
  var index;
  for(var i = 0; i < operations.length; i++) {
    index = str.indexOf(operations[i], 1);
    if(index !== -1) break;
  }
  if(index === -1) {
    field.setMinSize();
    field.value = "Error.Enter operation";
  }
  var operation = str[index];
  var number1 = str.slice(0, index);
  var number2 = str.slice(index+1);

  return [operation, number1, number2];
}

function add(a, b){
  return a + b;
}

function subt(a, b){
  return a - b;
}

function mult(a, b){
  return (a * b).toFixed(3);
}

function div(a, b){
  if(!b) {
    field.setMinSize();
    return "Error! Can't divide to zero";
  }
  else return (a / b).toFixed(3);
}

function persent(a, b){
  return a * b /100;
}

function writeResult(result) {
  field.value = result;
}

function writeDot(key) {
  var str = field.value;

  if (!isEmptyField() && countSymbolInField(str, ".") < 2 && isLastSymbol("0123456789") ) {
    addSymbolInField(this.innerHTML || key);
  }
}