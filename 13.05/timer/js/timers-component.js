"use strict";

class Timers {
  constructor(options) {
    this._rootElem = options.elem;
    this._timers = {};
    this._COUNT_OF_TIMERS = 100;
    this._TIME_FROM = 10;
    this._currentTimer = 1;
    this._rootElem.onclick = this._onClick.bind(this);
  }

  _onClick() {
    let target = event.target;
    if (target.closest('.btnAdd')) {
      this._createNewTimer();
    }
  }

  _createNewTimer() {
    let timersLength = Object.keys(this._timers).length;
    if (timersLength < this._COUNT_OF_TIMERS) {
      let boxTimer = document.createElement('div');
      boxTimer.id = `timer${timersLength + 1}`;
      boxTimer.className = 'timer';
      this._rootElem.appendChild(boxTimer);

      let timerOptions = {
        id: this._currentTimer,
        elem: boxTimer,
        timeStart: this._TIME_FROM
      }
      let timer = new Timer(timerOptions);
      this._timers[this._currentTimer] = timer;
      this._currentTimer += 1;
    } else {
      alert("It is not possible to create more timers");
    }
  }

  _showMessage(id) {
    this._rootElem.querySelector('.timers__info').innerHTML = `The timer number ${id} was deleted`;
  }
}