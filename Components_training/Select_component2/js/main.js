"use strict"

var animalSelect = new CustomSelect({
  elem: document.getElementById('animal-select')
});

var foodSelect = new CustomSelect({
  elem: document.getElementById('food-select')
});

document.addEventListener('select', function(event) {
  document.getElementById('result').innerHTML = event.detail.value;
});