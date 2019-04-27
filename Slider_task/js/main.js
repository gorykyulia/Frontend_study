"use strict";

const usersNames = ["dmitro", "yulia", "sam", "mike", "katya", "jane"];
const URL_GITHUB = "https://api.github.com/users/";
let usersData, slider;

getUsersData(usersNames, URL_GITHUB);

function init(data) {
    usersData = data;
    slider = new SliderComponent({
        elem: document.getElementById('slider'),
        countOfSlider: 2,
    })
    slider.start();
}







