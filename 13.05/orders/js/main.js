"use strict"

  // let timers = new Timers({
  //   elem: document.getElementById('timers')
  // });
  
  // let observable = new EventEmitter();  
  // observable.addListener('deleteTimer', timers._showMessage.bind(timers));

const ordersComp = new OrdersComponent({
  elem: document.getElementById('orders')
});

const observable = new EventEmitter();
// observable.addListener('orderCreated', ordersComp._addInTable.bind(ordersComp));

 