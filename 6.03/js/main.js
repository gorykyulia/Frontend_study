"use strict"

///////////////  Copy object function  ///////////////////

var object = {
  firstName: 'Irina',
  lastName: 'Koval',
  collection: {
    1: 'news',
    2: 'bags',
    3: 'shoes'
  },
  age: 30,
  weight: 55,
  func: function (){},
  arr: [1,5, [5,7]]
};

function copyObject (obj) {
  var newObj = {};

  for( var key in obj ) {
    if(typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      newObj[key] = copyObject(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

var newO = copyObject(object);

for( var key in newO )
  alert( "Ключ: " + key + " значение: " + newO[key] );

///////////////////   flattenDeep  function ////////////////////////

var arr = [10, [3, 1, 12, [3, [4, [1], 69]], 5]];

var tempArr = [];

function flattenDeep(array){
  for(var i = 0; i < array.length; i++) {

    if(!Array.isArray(array[i])){
      tempArr.push(array[i]);
    } else {
      flattenDeep(array[i]);
    }
  }
}

flattenDeep(arr);
alert(tempArr);

//////////////////  Bubble method   ////////////////////////////


function sortBubble(arr) {
  var minEl;
  var length = arr.length;
  for(var i = 0; i < length; i++, length--) {
    for(var j = 0; j < arr.length-1; j++) {
      if(arr[j] > arr[j+1]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

alert(sortBubble(tempArr));