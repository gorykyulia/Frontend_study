class Timer {
  constructor(options) {
    this._id = options.id;
    this._rootElem = options.elem;
    this._START_FROM = options.timeStart;
    this._timer = null;

    this._init();
    
  }

  _init() {
    this._build();
    this._start();
  }
  
  _onClick() {
    let target = event.target;
    if (target.closest('.btn-delete')) {
      this._deleteTimer();
    }
  }

  _deleteTimer() {
    clearInterval(this._timer);
    this._rootElem.parentElement.removeChild(this._rootElem);

    observable.emit("deleteTimer", this._id);
  }

  _build() {
    let template = ` <div>
                      <span class="seconds">${this._START_FROM}</span>
                      <span class="spliter">:</span>
                      <span class="miliseconds">00</span>
                      <span class="spliter">:</span>
                      <span class="mmilisec">00</span>
                    </div>
                    <button class="btn-delete">Delete Timer</button>`
    this._rootElem.innerHTML = template;
    this._btnDelete = this._rootElem.querySelector('.btn-delete');
    this._btnDelete.onclick = this._onClick.bind(this);
  }

  _start() {
    this._timer = setInterval(this._timerGo.bind(this), 10);
  }

  _timerGo() {
    const secElem = this._rootElem.querySelector('.seconds');
    const msecElem = this._rootElem.querySelector('.miliseconds');
    const mmsecElem = this._rootElem.querySelector('.mmilisec');

    let sec = +secElem.innerHTML;
    let msec = +msecElem.innerHTML;
    let mmsec = +mmsecElem.innerHTML;

    if (sec === 0 && msec === 0 && mmsec === 0) {
      clearInterval(this._timer);
      alert('the end');
    } else if (msec === 0 && mmsec === 0) {
      sec -= 1;
      msec = 9;
      mmsec = 9;
    } else if (mmsec === 0) {
      msec -= 1;
      mmsec = 9;
    } else {
      mmsec -= 1;
    }

    if (sec < 10) sec = `0${sec}`;
    if (msec < 10) msec = `0${msec}`;
    if (mmsec < 10) mmsec = `0${mmsec}`;

    secElem.innerHTML = sec;
    msecElem.innerHTML = msec;
    mmsecElem.innerHTML = mmsec;

  }

}