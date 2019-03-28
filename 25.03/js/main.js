"use strict"

/***** Function partial ******/

var add5 = partial(add, 5);
console.log(add5(1));
console.log(add5(8));

function add(a, b) { return a + b; }

function partial(func, arg1) {
    return func.bind(null, arg1);      
}

/******* Function partialDeep  *******/

var test1_3 = partialDeep(testFunc, 1, undefined, 3);
console.log(test1_3(5)); 

function testFunc(a,b,c) {
    return 'a=' + a + ',b=' + b + ',c=' + c;
}

function partialDeep(...args) {
    let func = args[0];
    let arrArgs = args.slice(1).filter(arg => arg != undefined);

    return func.bind(null, ...arrArgs);
}


/******    Burger calculate ********/

/**
 * Function-constructor Burger
 *
 * @param {string} size Size of ordered burger
 * @param {array of string} ingridients Array of ordered ingridients
 * @param {array of string} spices Array of ordered spices  
 */

function Burger(size, ingridients, spices) {
    this.burgerSize = size;
    this.ingridients = ingridients;
    this.spices = spices;

    this.buy = function() {
        this.getCalories();
        this.getPrice();
    }
    
    function countAll(field){
        var ingridients = this.ingridients.reduce( ( (sum, curr) => sum + INGRIDIENTS[curr][field] ), 0);
        var spices = this.spices.reduce( ( (sum, curr) => sum + SPICES[curr][field] ), 0);
        return ingridients + spices;
    }

    this.getCalories = function() {
        var finalCalories = BURGER_SIZE[this.burgerSize].calories + countAll.call(this, 'calories');
        alert(`Calories: ${finalCalories}`);
    }

    this.getPrice = function() {
        var finalPrice = BURGER_SIZE[this.burgerSize].price + countAll.call(this, 'price');
        alert(`Price: ${finalPrice}`);
    }

    const BURGER_SIZE = {
        SMALL: {
            price: 50,
            calories: 40
        },
        BIG: {
            price: 100,
            calories: 60
        }
    };
    const INGRIDIENTS = {
        CHEESE: {
            price: 10,
            calories: 20
        },
        SALAD: {
            price: 20,
            calories: 5
        },
        POTATO: {
            price: 15, 
            calories: 10
        }
    };
    const SPICES = {
        SPICE: {
            price: 15,
            calories: 0
        },
        SAUCE: {
            price: 20,
            calories: 5
        }  
    }
}

let buy = document.getElementById('buy');
buy.addEventListener('click', buyBurger);


function buyBurger() {
    let sizeElem = document.querySelectorAll('.size-box label input');
    let spicesElems = document.querySelectorAll('.ingridients-box label input');
    let size, spices = [], ingridients = [];

    sizeElem = [].filter.call(sizeElem, item => item.checked);
    spicesElems = [].filter.call(spicesElems, item => item.checked);

    if(!sizeElem.length) {
        alert("Choose a size of burger");
        return;
    } else size = (sizeElem[0].id === 'big' ? 'BIG' : 'SMALL');

    if(!spicesElems.length) {
        alert("You are not choose an ingridients");
    } else {
        spicesElems.forEach(item => {
            switch(item.id) {
                case 'cheese': ingridients.push('CHEESE');
                                break;
                case 'salad': ingridients.push('SALAD');
                                break;
                case 'potato': ingridients.push('POTATO');
                                break;
                case 'spices': spices.push('SPICE');
                                break;
                case 'mayon': spices.push('SAUCE');
                                break;
            }
        });
    } 
    let myBurger = new Burger(size, ingridients, spices);
    myBurger.buy();
}
