"use strict";

let btn = document.getElementById('btn');
btn.addEventListener('click', createButtons);

function createButtons() {
  let fragment = document.createDocumentFragment();

  for(let i = 1; i <= 10; i++) {
    let button = document.createElement('button');
    button.innerHTML = `${i}`;
    button.addEventListener('click', function(){alert(i);});
    fragment.appendChild(button);
  }
  btn.after(fragment);
}