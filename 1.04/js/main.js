"use strict";

let btn = document.getElementById('btn');
btn.addEventListener('click', createButtons);

function createButtons() {
  let fragment = document.createDocumentFragment();

  for (var i = 1; i <= 10; i++) {
    let button = document.createElement('button');
    button.innerHTML = `${i}`;
    button.addEventListener('click', showNumber(i));
    fragment.appendChild(button);
  }
  btn.after(fragment);
}

function showNumber(i) {
  return function () {
    alert(i);
  };
}