"use strict";

function Triangle(options) {
    this._rootElem = options.elem;
    this._points = {
        "A": new Point(),
        "B": new Point(),
        "C": new Point(),
        "D": new Point()
    };
    this._rootElem.onclick = this._onClick.bind(this);
    this._checkBtn = this._rootElem.querySelector('.checkBtn');
}

Triangle.prototype._onClick = function() {
    let target = event.target;
    if(target.closest('.checkBtn')){
        this._isPointInside();
    }
}

Triangle.prototype._isPointInside = function(){
    if(this._verifyData()) {
        if(this._isPointInTriangle()) {
            alert('The point is inside triangle')
        } else {
            alert("The point in not inside triangle");
        } 
    } else {
        alert("Error! Verify if all coordinates are rigth number and try again");
        return false;
    }
}

Triangle.prototype._verifyData = function() {
    let coordinatesElems = this._rootElem.querySelectorAll('input');
    for (let elem of coordinatesElems) {
        let coord = elem.value;
        if(isNumeric(coord)){
            this._points[elem.className][elem.dataset.coord] = +coord; 
        } else {
            return false;
        }   
    }
    return true;

    function isNumeric(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }
}

Triangle.prototype._isPointInTriangle = function() {
    let coords = this._points;
    let AB = (coords["D"]["x"] - coords["A"]["x"])*(coords["B"]["y"] - coords["A"]["y"]) - (coords["D"]["y"] - coords["A"]["y"])*(coords["B"]["x"] - coords["A"]["x"]);
    let BC = (coords["D"]["x"] - coords["B"]["x"])*(coords["C"]["y"] - coords["B"]["y"]) - (coords["D"]["y"] - coords["B"]["y"])*(coords["C"]["x"] - coords["B"]["x"]);
    let CA = (coords["D"]["x"] - coords["C"]["x"])*(coords["A"]["y"] - coords["C"]["y"]) - (coords["D"]["y"] - coords["C"]["y"])*(coords["A"]["x"] - coords["C"]["x"]);
     
    let zero = [];
    let onLine = false;

    if(AB === 0) {
        zero = ["A", "B"];
    } else if(BC === 0) {
        zero = ["B", "C"];
    } else if(CA === 0) {
        zero = ["C", "A"];
    }
   
    if(zero.length !== 0) {
        onLine = this._isBelongsLine(zero);
    }
    
    if( ((AB >= 0 && BC >= 0 && CA >= 0) || (AB <= 0 && BC <= 0 && CA <= 0)) && !onLine) {
        return true;
    } else {
        return false;
    }
}

Triangle.prototype._isBelongsLine = function(points) {
    let A = points[0];
    let B = points[1];
    let coords = this._points;

    if ( ((coords["D"]["x"] >= coords[A]["x"] && coords["D"]["x"] <= coords[B]["x"]) ||
        (coords["D"]["x"] >= coords[B]["x"] && coords["D"]["x"] <= coords[A]["x"])) &&
        ((coords["D"]["y"] >= coords[A]["y"] && coords["D"]["y"] <= coords[B]["y"]) ||
        (coords["D"]["y"] >= coords[B]["y"] && coords["D"]["y"] <= coords[A]["y"])) ) {
        return true;
    } else { 
        return false; 
    }
}

