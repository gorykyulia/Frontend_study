"use strict";
window.onload = function(){
    let options = {
        "plus": true,
        "minus": true,
        "multiple": true,
        "divide": true,
        "minNumber": 1,
        "maxNumber": 20,
        "numberOfExamples": 10
    };
    
    const MIN_NUMBER = "minNumber";
    const MAX_NUMBER = "maxNumber";
    const COUNT = "numberOfExamples";
    
    let examples = {};

    createHtmlFields();
    
    let testBtn = document.getElementById('test');
    let settingsBtn = document.getElementById('settings');
    let checkBtn = document.getElementById('check');
    let applyBtn = document.getElementById('apply');
    
    settingsBtn.addEventListener('click', showSettings);
    testBtn.addEventListener('click', showExamples);
    testBtn.addEventListener('click', generateTests);
    
    checkBtn.addEventListener('click', checkAnswers);
    applyBtn.addEventListener('click', applySettings);


    function createHtmlFields(...arg){
        let number = options[COUNT];
        let fragment = document.createDocumentFragment();

        let box = document.createElement('div');
        if(arg[0] !== undefined){
            box.className = arg[0];
        } else box.className = "main-field show";
        for(let i = 1; i <= number; i++){
            box.appendChild(createOneElementExample(i));
        }

        let settingsBox = document.querySelector('setting-field');
        fragment.appendChild(box);
        document.querySelector('.box-app').insertBefore(fragment, settingsBox);
        
    }

    function createOneElementExample(number){
        let div = document.createElement('div');
        div.className = "example-box";
        div.setAttribute('data-number', number);

        let span1 = document.createElement('span');
        span1.className = "example";
        
        let span2 = document.createElement('span');
        span2.className = "check";

        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.className = 'answer';

        div.appendChild(span1);
        div.appendChild(input);
        div.appendChild(span2);

        return div;
    }

    function refreshHtmlFields(){
        let deletedEl = document.querySelector('.main-field');
        let classes = deletedEl.className;
        deletedEl.parentElement.removeChild(deletedEl);
        
        createHtmlFields(classes);
    }

    function showSettings(){
        let mainField = document.querySelector('.main-field');
        let settingsField = document.querySelector('.setting-field');
    
        mainField.classList.remove('show');
        mainField.classList.add('hide');
        settingsField.classList.add('show');
        settingsField.classList.remove('hide');
    }

    function showExamples(){
        let mainField = document.querySelector('.main-field');
        let settingsField = document.querySelector('.setting-field');
    
        mainField.classList.remove('hide');
        mainField.classList.add('show');
        settingsField.classList.add('hide');
        settingsField.classList.remove('show');
    }
    
    function applySettings() {
        let min = +document.getElementById('from').value;
        let max = +document.getElementById('to').value;
        let count = +document.getElementById('count').value; 
        let operations = document.querySelectorAll('.box-operations input[type="checkbox"]');
        
        let countOfCheckedOperations = 0;

        operations.forEach( (el) => {
            if(el.checked) countOfCheckedOperations += 1;
        });

        if(countOfCheckedOperations == 0){
            alert(`It is needed one operation checked at least`);
            return;
        }

        if( isNumericAndInteger(min) && isNumericAndInteger(max) && isNumericAndInteger(count) ){
            if(min >= max){
                alert( `"До" should be bigger than "Від"`);
                return;
            }
            operations.forEach(function(elem){
            options[elem.dataset.operation] = elem.checked;
        });
            options[MIN_NUMBER] = +min;
            options[MAX_NUMBER] = +max;
            options[COUNT] = +count;
        } else {
            alert(`Incorrect entering, try again )`);
            return;
        } 
        refreshHtmlFields();   
    }
    
    function generateTests(){
        clear();
        let length = options[COUNT];
        for(let i = 1; i <= length; i++){
            examples[i] = generateOneTest();
        }
        writeTestsInHtml();
    }
    
    function writeTestsInHtml(){
        let fields = document.querySelectorAll('.example-box');
        for(let el of fields){
            el.querySelector('.example').innerHTML = examples[el.dataset.number].example;
        }
    }

    function generateOneTest(){
        let minNumber = options[MIN_NUMBER];
        let maxNumber = options[MAX_NUMBER];
        let number1, number2, operation;

        do{
            number1 = generateRandomNumber(minNumber, maxNumber);
            number2 = generateRandomNumber(minNumber, maxNumber);
            operation = generateRandomOperation();
        } while(operation == "/" && number2 == 0)
        
        let example = `${number1}${operation}${number2}`;
        return {
            example: example,
            answer: eval(example).toFixed(2)
        };
    }

    function createArrayOfOperations(){
       let arrayOfOperations = [];
        for(let key in options){
            if(options[key] === true) arrayOfOperations.push(key);
        }
        return arrayOfOperations;
    }
    
    function isNumericAndInteger(n){
        return !isNaN(parseFloat(n)) && isFinite(n) && n%1 === 0;
    }

    function generateRandomNumber(min, max){
        return Math.floor( Math.random() * (max - min + 1) ) + min;
    }

    function generateRandomOperation(){
        let arrayOfOperations = createArrayOfOperations();
        let index = generateRandomNumber(0, arrayOfOperations.length-1);
       
        switch(arrayOfOperations[index]) {
            case "plus": return "+";
            case "minus": return "-";
            case "multiple": return "*";
            case "divide": return "/";
        }
    }

    function checkAnswers(){
        let answerFields = document.querySelectorAll(".answer");
        let checkFields = document.querySelectorAll(".check");
        let length = options[COUNT];

        for(let i = 0; i < length; i++){
            if(Number(answerFields[i].value) == Number(examples[i+1].answer)){
                checkFields[i].innerHTML = "True";
            } else {
                checkFields[i].innerHTML = "False";
            }
        }

        console.log(checkFields);

    }
    function clear(){
        clearAnswers();
        clearCheck();
    }

    function clearCheck(selector){
        let fields = document.querySelectorAll('.check');
        fields.forEach((el) => el.innerHTML = "");
    }

    function clearAnswers(){
        let fields = document.querySelectorAll('.answer');
        fields.forEach((el) => el.value = "");
    }
    

}



