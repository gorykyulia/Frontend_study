"use strict"

window.onload = () => {
    const BOX_LINES = document.getElementById('box-lines');
    const CXT = BOX_LINES.getContext('2d');
    let lineWidth;
    let timers = [];

    let buttonConfirm = createButtonMessage();
    buttonConfirm.onclick = function () {
        openFullscreen(BOX_LINES);
        document.body.removeChild(this);
        initBoxLines();
        createLines();
    };

    function createButtonMessage() {
        let btn = document.createElement('button');
        btn.innerHTML = `To continue you need to press the button`;
        btn.style.cssText = "position: absolute; top: 20%; left: 50%; transform: translate(-50%,0);display: inline-block;";
        document.body.insertBefore(btn, document.body.lastElementChild);

        return btn;
    }

    function openFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    // let params = {
    //     lines: [{
    //         background: '#0F0',
    //         updateTime: 3000,
    //         elements: [{
    //             background: '#F00',
    //             width: 25
    //         },
    //         {
    //             background: '#056',
    //             width: 50
    //         },
    //         {
    //             background: '#12D',
    //             width: 25
    //         }
    //         ]
    //     },
    //     {
    //         background: '#0F0',
    //         updateTime: 1000,
    //         elements: [{
    //             background: '#0FF',
    //             width: 30
    //         },
    //         {
    //             background: '#D0F',
    //             width: 30
    //         },
    //         {
    //             background: '#842',
    //             width: 20
    //         }
    //         ]
    //     },
    //     {
    //         background: '#222',
    //         updateTime: 500,
    //         elements: [{
    //             background: '#0FF',
    //             width: 20
    //         },
    //         {
    //             background: '#D0F',
    //             width: 20
    //         },
    //         {
    //             background: '#842',
    //             width: 30
    //         }
    //         ]
    //     },
    //     {
    //         background: '#0F0',
    //         updateTime: 3000,
    //         elements: [{
    //             background: '#0AF',
    //             width: 50
    //         },
    //         {
    //             background: '#75F',
    //             width: 10
    //         },
    //         {
    //             background: '#12F',
    //             width: 25
    //         }
    //         ]
    //     }]
    // };

    let params = {
        lines: [{
            background: '#00F',
            updateTime: 1000,
            elements: [{
                background: '#00F',
                width: 25
            },
            {
                background: '#00F',
                width: 50
            },
            {
                background: '#00F',
                width: 25
            }
            ]
        }]
    };

    function initBoxLines() {
        BOX_LINES.style.display = "block";
        BOX_LINES.onfullscreenchange = function () {
            clearTimers();
            if (document.fullscreen && document.fullscreenElement.id === "box-lines") {
                setupFullScreenSettings();
            } else {
                setupOrdinarySettings();
            }
            createLines();
        }
        setupFullScreenSettings();
    }

    function setupFullScreenSettings() {
        BOX_LINES.width = screen.width;
        BOX_LINES.height = screen.height;
        lineWidth = Math.floor(BOX_LINES.height / params.lines.length);
    }

    function setupOrdinarySettings() {
        BOX_LINES.width = document.documentElement.clientWidth;
        BOX_LINES.height = document.documentElement.clientHeight;
        lineWidth = Math.floor(BOX_LINES.height / params.lines.length);
    }

    function createLines() {
        setupOrdinarySettings();

        let x = 0,
            y = Math.floor(lineWidth / 2);

        for (let i = 0; i < params.lines.length; i++) {
            drawLine(params.lines[i], x, y, params.lines[i].background);
            timers.push(setInterval(drawLine, params.lines[i].updateTime, params.lines[i], x, y, generateColorInHex));
            y += lineWidth;
        }
    }

    function drawLine(options, startX, startY, color) {
        let i, length = options.elements.length;
        let elementLength;
        CXT.lineWidth = lineWidth;

        for (i = 0; i < length; i++) {
            CXT.beginPath();
            CXT.moveTo(startX, startY);
            elementLength = Math.floor(BOX_LINES.width * options.elements[i].width / 100);
            CXT.lineTo(startX + elementLength, startY);
            if (typeof color === "function") {
                CXT.strokeStyle = color();
            } else {
                CXT.strokeStyle = options.elements[i].background;
            }

            CXT.stroke();
            startX += elementLength;
        }

        if (startX < BOX_LINES.width) {
            CXT.beginPath();
            CXT.moveTo(startX, startY);
            CXT.lineTo(BOX_LINES.width, startY);
            if (typeof color === "function") {
                CXT.strokeStyle = color();
            } else {
                CXT.strokeStyle = color;
            }
            CXT.stroke();
        }
    }

    function clearTimers() {
        timers.forEach((item) => clearInterval(item));
    }

    function generateColorInHex() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
};

