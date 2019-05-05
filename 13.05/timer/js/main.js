"use strict"

  let timers = new Timers({
    elem: document.getElementById('timers')
  });
  
  let observable = new EventEmitter();  
  observable.addListener('deleteTimer', timers._showMessage.bind(timers));

  

 