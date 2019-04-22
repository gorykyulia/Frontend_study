"use strict";

window.onload = function () {
    const SYMBOLS_STRING = "abcdefghijklmnopqrstuvwxyz0123456789";

    const btnGo = document.getElementById('goButton');
    btnGo.addEventListener('click', codeAndEncode);

    function codeAndEncode() {
        let startSting = "";
        let stringForCoding = "",
        stringForEncoding = "",
        stringKey = "";

        let verifyString;

        const textField = document.getElementById('word-field');
        const keyField = document.getElementById('key_field');

        startSting = textField.value;
        stringForCoding = startSting.toLowerCase().split(" ").join("");
        stringKey = keyField.value.toLowerCase();

        if (isCorrectText(stringForCoding) && isCorrectText(stringKey)) {
            stringForEncoding = code(stringForCoding, stringKey);
            verifyString = encode(stringForEncoding,stringKey);
            showResults(startSting, stringForEncoding, verifyString);
        } else {
            alert('The text contains incorrect symbols. You must enter only latin and numbers. Check and try again');
        }
    }

    function isCorrectText(string) {
        for (let i = 0; i < string.length; i++) {
            if (SYMBOLS_STRING.indexOf(string[i]) === -1) {
                return false;
            }
        }
        return true;
    }

    function code(text, key) {
        let codedString = "";
        const numberOfSymbols = SYMBOLS_STRING.length - 1;
        let keyString = formKeyString(text, key);

        for (let i = 0; i < text.length; i++) {
            let tempCode = numberFromSymbol(text[i]) - numberFromSymbol(keyString[i]);
            if(tempCode < 0) {
                tempCode += numberOfSymbols;
            }
            codedString += symbolFromNumber(tempCode);
        }
        return codedString;
    }

    
    function encode(text, key){
        let encodedString = "";
        const numberOfSymbols = SYMBOLS_STRING.length - 1;
        let keyString = formKeyString(text, key);

        for (let i = 0; i < text.length; i++) {
            let tempCode = numberFromSymbol(text[i]) + numberFromSymbol(keyString[i]);
            if(tempCode > numberOfSymbols) {
                tempCode -= numberOfSymbols;
            }
            encodedString += symbolFromNumber(tempCode);
        }
        return encodedString;
    }

    function numberFromSymbol(symbol) {
        return SYMBOLS_STRING.indexOf(symbol);
    }

    function symbolFromNumber(number) {
        return SYMBOLS_STRING[number];
    }

    function formKeyString(text, key) {
        let keyString;

        if (text.length < key.length) {
            keyString = key.slice(0, text.length);
        } else if (text.length === key.length) {
            keyString = key;
        } else if (text.length > key.length) {
            keyString = "";
            let length = text.length;
            for (let i = 0; keyString.length < length; i++) {
                if (i >= key.length) {
                    i = 0;
                }
                keyString += key[i];
            }
        }
        return keyString;
    }

    function showResults(stringForCoding, stringForEncoding, verifyString) {
        clearResults();
        let element = document.getElementById('goButton');

        let p = document.createElement('p');
        p.innerHTML = `Encoded text: ${verifyString}`;
        p.className = "result";
        element.insertAdjacentElement('afterEnd', p);

        p = document.createElement('p');
        p.innerHTML = `Coded text: ${stringForEncoding}`;
        p.className = "result";
        element.insertAdjacentElement('afterEnd', p);

        p = document.createElement('p');
        p.innerHTML = `Text for coding: ${stringForCoding}`;
        p.className = "result";
        element.insertAdjacentElement('afterEnd', p);
    }

    function clearResults() {
        let elements = document.querySelectorAll('.result');
        for(let i = 0; i < elements.length; i++) {
            document.body.removeChild(elements[i]);
        }
    }
}