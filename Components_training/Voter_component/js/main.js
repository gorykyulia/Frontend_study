"use strict"

var voter = new Voter({
  elem: document.getElementById('voter')
});

let voterElem = document.getElementById('voter');
voterElem.addEventListener('change', event => alert(event.detail));

voter.setVote(5);

// var voter = new StepVoter({
//   elem: document.getElementById('voter'),
//   step: 2 // увеличивать/уменьшать сразу на 2 пункта
// });