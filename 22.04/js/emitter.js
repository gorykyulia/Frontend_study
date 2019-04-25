class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(nameEvent, callback) {
    this.listeners.has(nameEvent) || this.listeners.set(nameEvent, []);
    this.listeners.get(nameEvent).push(callback);
  }

  unsubscribe(nameEvent, callback) {
    let listeners = this.listeners.get(nameEvent),
      index;

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return (isFunction(listener) && listener === callback) ? i = index : i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        this.listeners.set(nameEvent, listeners);
        return true;
      }
    }
    return false;
  }

  emit(nameEvent, ...args) {
    let listeners = this.listeners.get(nameEvent);

    if (listeners && listeners.length) {
      listeners.forEach(listener => listener(...args));
      return true;
    }
    return false;
  }
}

let isFunction = function (obj) {
  return typeof obj == 'function' || false;
};

let observable = new EventEmitter();

let btnTest = document.getElementById('testBtn');
btnTest.onclick = function () {
  let data = this.innerHTML;
  observable.emit("click", data);
}

observable.subscribe("click", funcTest);

function funcTest(text) {
  let p = document.getElementById('testP');
  p.innerHTML += text;
  observable.unsubscribe("click", funcTest);
}
