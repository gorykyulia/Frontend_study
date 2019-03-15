"use strict";

////////////////////////  Fibonachi  //////////////////////////////

function isNumeric(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var count = +prompt("Enter count from 1 until 40: ");
count = Math.floor(count);

if(isNumeric(count) && count < 40 && count > 0) {
  alert(fibonachi(count));
} else alert("Error");

function fibonachi(n){
  if(n === 1) return 0;
  var numbersFib = [];
  numbersFib.push(0,1);
  for(var i = 2; i < n; i++) {
    numbersFib.push(numbersFib[i-2] + numbersFib[i-1]);
  }
  return numbersFib;
}

//////////////////////   Summa   ///////////////////////////////

var numbersForSumma = +prompt("Enter number: ")
numbersForSumma = Math.floor(numbersForSumma);

if(isNumeric(numbersForSumma)) {
   alert(summaAllNumbersTo(numbersForSumma));
   alert(summaRecursion(numbersForSumma));
 } else alert("Error");

function summaAllNumbersTo(n) {
  var summa = 0;
  for(var i = 0; i < n; i++) {
    summa += i;
  }
  return summa;
}

function summaRecursion(n) {
  var summa = 0;
  if(n !== 1) {
    return (n-1) + summaRecursion(n-1);
  } return 0;

}

////////////////////   Transform to Binary   ///////////////////////////////

var number = Math.floor(+prompt("Enter number: "));

if(isNumeric(number)) {
  alert(transformToBinary(number));
} else alert("Error");

function transformToBinary(number) {
  var strBinary = "";
  if(number === 1) return 1;
  while(number >= 2){
    var res = number % 2;
    strBinary = res + strBinary;
    number = Math.floor(number / 2);
    if(number === 1) {
      strBinary = number + strBinary;
    }
  }

  return strBinary;
}

//////////////////////  Common denominator  //////////////////////////////////

var number1 =  Math.floor(+prompt("Enter number: "));
var number2 =  Math.floor(+prompt("Enter number: "));

if(isNumeric(number1) && isNumeric(number2)) {
  alert(findDenominator(number1, number2));
} else alert("Error");

function findDenominator(n1, n2) {
  if(n1 === 0 || n2 === 0) {
    return "Number can't be zero";
  }
  var min = (n1 <= n2)? n1: n2;

  for(var i = min;; i += min) {
    if(i % n1 === 0 && i % n2 === 0 ){
      return i;
    }
  }
}

//////////////////////  Simple numbers  /////////////////////////////////////

var num = Math.floor(+prompt("Enter number: "));

if(isNumeric(num)) {
  alert(getSimpleNumbers(num));
} else alert("Error");

function isSimple(number) {
  if(number === 1 || number === 0) return false;
  for(var i = 2; i < number; i++){
    if(number % i === 0) {return false}
  }
  return true;
}

function getSimpleNumbers(n){
  var simpleNumbers = [];
  for(var i = 2; i < n; i++){
    if(isSimple(i)){
      simpleNumbers.push(i);
    }
  }
  return simpleNumbers.length?simpleNumbers:"There aren't simple numbers";
}