"use strict"

function showArguments () {
   [].forEach.call(arguments, (item) => { console.log(item); });
}

showArguments("ljk", 12, "fff", 89, true);