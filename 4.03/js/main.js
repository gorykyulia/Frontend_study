var calc = document.getElementById("calc");

calc.addEventListener('click', calculate);

function calculate(){
  var radios = document.querySelectorAll('input[type="radio"]');

  var a = +prompt("Enter the first number: ");
  var b = +prompt("Enter the second number: ");

  if(!isNumeric(a) || !isNumeric(b)){
    alert("Error! Enter the numbers again");
  } else{
    for(var i = 0; i < radios.length; i++) {
      if(radios[i].checked) {
        switch (radios[i].value) {
          case 'add' : alert(add(a,b));
            break;
          case 'subs' : alert(subs(a,b));
            break;
          case 'mult' : alert(mult(a,b));
            break;
          case 'div' : alert(div(a,b));
            break;
          default: alert("Error");
        }
      }
    }
  }
}

function isNumeric(num){
  return !isNaN(parseFloat(num)) && isFinite(num)
}

function add(a,b){
  return a + b;
}

function subs(a,b){
  return a - b;
}

function mult(a,b){
  return a * b;
}

function div(a,b){
  if(b == 0) return "Error!Can't divide to zero";
    else return a / b;
}