"use strict";

/*******    First task     **********/

let div = document.getElementById('start');

console.log(hasClass(div, 'container'));
addClass(div, "someClass");
addClass(div, "container");
removeClass(div, "box");


function hasClass(node, klass) {
  return node.classList.contains(klass);
}

function addClass(node, klass) {
  node.classList.add(klass);
}

function removeClass(node, klass) {
  node.classList.remove(klass);
}


/*******    Create table 10*10 - variant 1    ******/

createTable1(10, 10);
createTable2(6, 4);

function createTable1(numberRows, numberColums) {
  let table = document.createElement('table');
  for(let i = 1; i <= numberRows; i++) {
    let row = document.createElement('tr');
    for(let j = 1; j <= numberColums; j++) {
      let cell = document.createElement('td');
      cell.innerHTML = j;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  document.body.insertBefore(table, div);
}

/*****   Create table - variant 2     ******/

function createTable2(numberRows, numberColums) {
  let table = document.createElement('table');
  let content = ``;
  for(let i = 1; i <= numberRows; i++){
    content += `<tr>`;
    for(let j = 1; j <= numberColums; j++) {
      content += `<td>${j}</td>`;
    }
    content += `</tr>`;
  }
  table.innerHTML = content;
  document.body.insertBefore(table, div);
}