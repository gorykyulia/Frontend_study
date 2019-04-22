function CustomSelect(options) {
  this._rootElem = options.elem;

  this._rootElem.onclick = this._onClick.bind(this);
}

CustomSelect.prototype._onClick = function() {
  let target = event.target;

  if(target.closest('.title')) {
    this._toggle();
  } 
  if(target.tagName === "LI") {
    this._selectElem(target);
  }
}

CustomSelect.prototype._toggle = function() {
  this._rootElem.classList.toggle('open');
}

CustomSelect.prototype._selectElem = function(elem) {
  this._rootElem.querySelector('.title').innerHTML = elem.innerHTML;
  this._close();
  this._createEvent(elem);
}

CustomSelect.prototype._close = function() {
  this._rootElem.classList.remove('open');
}

CustomSelect.prototype._createEvent = function(elem) {
  let eventSelect = new CustomEvent('select', {
    bubbles: true,
    detail: {
      value: elem.dataset.value
    }
  });

  this._rootElem.dispatchEvent(eventSelect);
}