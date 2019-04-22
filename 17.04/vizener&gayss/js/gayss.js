"use strict";
window.onload = function () {
    const okButton = document.getElementById('okButton');
    let sizeOfMatrix;

    okButton.onclick = function () {
        const fieldSize = document.getElementById('sizeField');
        if (verifyEnter(fieldSize.value)) {
            sizeOfMatrix = +fieldSize.value;
            document.getElementById('fieldsBox').innerHTML = "";
            createFieldsForEnter(Math.round(+fieldSize.value));
        } else {
            alert(`Don't a number or not from 2 to 10. Try again.`);
            fieldSize.value = "";
        }
    }

    function verifyEnter(value) {
        if (isNumeric(value) && +value >= 2 && +value <= 10) {
            return true;
        } else {
            return false;
        }
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function createFieldsForEnter(number) {
        let box = document.getElementById('fieldsBox');
        let numberX = number + 1;
        let numberY = number;
        let fragment = document.createDocumentFragment();

        for (let i = 1; i <= numberY; i++) {
            for (let j = 1; j <= numberX; j++) {
                let input = document.createElement('input');
                input.className = "field";
                fragment.appendChild(input);
            }
            let hr = document.createElement('hr');
            fragment.appendChild(hr);
        }
        let button = document.createElement('button');
        button.id = "calcButton";
        button.innerHTML = "Answers";
        button.addEventListener('click', go);
        fragment.appendChild(button);
        box.appendChild(fragment);
    }

    function go() {
        if (isFieldsRight()) {
            let data = returnDataInArray();
            showAnswers(gayssMethod(data));
        } else {
            alert(`One of the fields is wrong. Fix it.`);
        }
    }

    function isFieldsRight() {
        let fields = document.querySelectorAll('#fieldsBox > input');

        return Array.prototype.every.call(fields, field => isNumeric(field.value));
    }

    function returnDataInArray() {
        let array = [];

        let fields = document.querySelectorAll('#fieldsBox > input');

        for (let i = 0; i < fields.length; i += sizeOfMatrix + 1) {
            let n = 1;
            let tempArr = [];
            for (let j = i; n <= sizeOfMatrix + 1; n++ , j++) {
                tempArr.push(+fields[j].value);
            }
            array.push(tempArr);
        }
        return array;
    }

    function showAnswers(answersArray) {
        let answerString = "";
        answersArray.forEach((answer, index) => answerString += `x${index + 1}=${answer} \n`);
        alert(answerString);
    }

}

function gayssMethod(matrix) {

    let i, end, length = matrix.length;

    for (i = 0; i < length - 1; i++) {
        rightStep(i);
    }

    for (i = length - 1, end = matrix[0].length - 2; i > 0; i-- , end--) {
        reverseStep(i, end);
    }

    return findAnswers();

    function rightStep(startString) {
        let index = startString;

        for (let i = index + 1; i < length; i++) {
            let multipler = findMultipler(matrix[index][index], matrix[i][index]);
            for (let j = index; j < matrix[i].length; j++) {
                matrix[i][j] = parseFloat((matrix[index][j] * multipler + matrix[i][j]).toFixed(5));
            }
            printResult(matrix);
        }
    }

    function reverseStep(startString, end) {
        let index = startString;
        let indexEnd = end;

        for (let i = index - 1; i >= 0; i--) {
            let multipler = findMultipler(matrix[index][indexEnd], matrix[i][indexEnd]);
            for (let j = matrix[0].length - 1; j >= 0; j--) {
                matrix[i][j] = Math.round(matrix[index][j] * multipler + matrix[i][j]);
            }
            printResult(matrix);
        }
    }

    function findAnswers() {
        let i, x, length = matrix.length;
        let answers = [];

        for (i = 0; i < length; i++) {
            let tempArr = matrix[i].slice(0, matrix[0].length - 1);
            for (let j = 0; j < tempArr.length; j++) {
                if (tempArr[j] !== 0) {
                    x = tempArr[j];
                    break;
                }
            }
            let res = matrix[i][matrix[i].length - 1];
            answers.push(parseFloat((res / x).toFixed(2)));
        }
        return answers;
    }

    function findMultipler(number1, number2) {
        return -(number2 / number1);
    }

    function printResult(array) {
        console.log(`Result: `);
        array.forEach((item) => console.log(item));
    }

}
