"use strict";

window.onload = function () {
    const field = document.getElementById('field');
    const whoIsGo = document.getElementById('who');
    const restartBtn = document.getElementById('restart');
    const text = document.getElementById('text');

    let gamers = [];
    const sets = ['123', '456', '789', '147', '258', '369', '357', '159'];

    const game = new Game();
    const gamerX = new Gamer("X");
    const gamerO = new Gamer("O");

    restartBtn.addEventListener('click', start);
    field.addEventListener('click', doStep);

    function doStep(e) {
        let target = e.target;

        if (!target.classList.contains('cell')) { return; }
        if (target.innerHTML == "") {
            target.innerHTML = game.currentGamer;
            game.writeStep(target.dataset.num);
            if (game.checkWinner(defineGamer(target.innerHTML))) {
                return;
            }
            if (game.isFieldFill()) {
                game.tie += 1;
                refreshStat();
                return;
            }
            game.changeCurrentGamer();
        }
    }

    function defineGamer(gamerName) {
        for (let gamer of gamers) {
            if (gamer.name == gamerName) {
                var targetGamer = gamer;
            }
        }
        return targetGamer;
    }

    function start() {
        game.clear();
        gamers.forEach((el) => el.steps = "");
        game.changeCurrentGamer();
        game.lastWinner = "";

        text.innerHTML = "Ходить: ";
        whoIsGo.innerHTML = game.currentGamer;
        field.addEventListener('click', doStep);
    }

    function contain(str, substr) {
        return Array.prototype.every.call(substr, (item) => {
            return str.indexOf(item) != -1;
        });
    }

    function refreshStat() {
        document.getElementById('winX').innerHTML = gamerX.wins;
        document.getElementById('win0').innerHTML = gamerO.wins;
        document.getElementById('nobody').innerHTML = game.tie;
    }

    function Game() {
        this.currentGamer = "X";
        this.lastWinner = "";
        this.tie = 0;

        this.setWinner = function (gamer) {
            this.lastWinner = gamer.name;
            gamer.addWin();
        };

        this.changeCurrentGamer = function () {
            if (this.lastWinner) {
                this.currentGamer = (this.lastWinner == "X") ? "O" : "X";
            } else {
                this.currentGamer = (this.currentGamer == "X") ? "O" : "X";
            }

            whoIsGo.innerHTML = game.currentGamer;
        };

        this.clear = function () {
            let fieldItems = document.querySelectorAll('.cell');
            for (let item of fieldItems) item.innerHTML = "";
        };

        this.isFieldFill = function () {
            let fieldItems = document.querySelectorAll('.cell');
            return Array.prototype.every.call(fieldItems, (item) => item.innerHTML)
        };

        this.writeStep = function (step) {
            gamers[0].name == this.currentGamer ? gamers[0].writeStep(step) : gamers[1].writeStep(step);
        };

        this.checkWinner = function (gamer) {
            if (gamer.isWinner()) {
                this.setWinner(gamer);
                document.getElementById('text').innerHTML = "Виграв: ";
                whoIsGo.innerHTML = gamer.name;
                field.removeEventListener('click', doStep);
                refreshStat();
                return true;
            }
        };
    }

    function Gamer(name) {
        this.name = name;
        this.wins = 0;
        this.steps = "";

        this.writeStep = function (step) {
            this.steps += step;
        };

        this.isWinner = function () {
            return sets.some((item) => contain(this.steps, item));
        };

        this.addWin = function () {
            this.wins += 1;
        };

        gamers.push(this);
    }
}
