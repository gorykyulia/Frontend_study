"use strict"

let menu = new Menu({
  title: "Сладости",
  items: [
    "Торт",
    "Пончик",
    "Пирожное",
    "Шоколадка",
    "Мороженое"
  ]
});

let elem = menu.getElem();

document.body.appendChild(elem);