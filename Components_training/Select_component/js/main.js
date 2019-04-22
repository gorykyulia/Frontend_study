"use strict"

let options = {
  elem: document.getElementById('list')
}

let select = new Select(options);
let selectElem = document.getElementById('list');

selectElem.addEventListener('select', event => console.log(event.detail));