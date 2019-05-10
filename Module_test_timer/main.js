
let Timer = (function () {

  let timer, newTime;
  let hours, minutes, seconds;

  function formatTime(time) {
    time = (time < 10) ? `0${time}` : time;
    return time;
  }

  let timerConstr = class {
    constructor(options) {
      this.timeInMinutes = options.timeTimer;
      this.el = options.el;
      this.init();
    }

    init() {
      hours = 0;
      minutes = this.timeInMinutes;
      seconds = 0;

      this.hoursEl = this.el.querySelector('.hours');
      this.minutesEl = this.el.querySelector('.minutes');
      this.secondsEl = this.el.querySelector('.seconds');

      this.refreshHTML();
      this.start();
    }

    refreshHTML() {
      this.hoursEl.innerHTML = formatTime(hours);
      this.minutesEl.innerHTML = formatTime(minutes);
      this.secondsEl.innerHTML = formatTime(seconds);
    }

    start() {
      newTime = Date.now() + this.timeInMinutes * 60 * 1000;

      timer = setInterval(this.changeTime.bind(this), 1000);
    }

    changeTime = function () {
      let now = new Date();

      let time = newTime - now - 1000;
      if (time <= 0) {
        clearInterval(timer);
        return;
      }

      hours = Math.floor((time / 3600000) % 24);
      minutes = Math.floor((time / 60000) % 60);
      seconds = Math.floor((time / 1000) % 60);

      // console.log('this.time' + time);
      // console.log('this.hours' + this.hours);
      // console.log('this.min' + this.minutes);
      // console.log('this.sec' + this.seconds);

      this.refreshHTML();
    }
  }

  return timerConstr;
}());

const options = {
  timeTimer: 15,
  el: document.querySelector('.timer')
};

timer = new Timer(options);