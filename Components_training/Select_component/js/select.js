function Select(options) {
    this._rootElem = options.elem;
    this._lastClickedLi = null;

    this._rootElem.onclick = this._onClick.bind(this);
    this.onmousedown = function() {
        return false;
    };
}

Select.prototype._onClick = function(event) {
    var target = event.target;

    if (target.tagName != "LI") return;

    if (event.metaKey || event.ctrlKey) {
      this._toggleSelect(target);
    } else if (event.shiftKey) {
      this._selectFromLast(target);
    } else {
      this._selectSingle(target);
    }

    this._lastClickedLi = target;
    this._createEvent();
}

Select.prototype._createEvent = function() {
    let selectEvent = new CustomEvent('select', {
        bubbles: true,
        detail: this._getSelectedItems()
    })
    this._rootElem.dispatchEvent(selectEvent);
}

Select.prototype._getSelectedItems = function() {
    let selectedItems = [];
    Array.prototype.forEach.call(this._rootElem.children, li => {
        if(li.classList.contains('selected')){
            selectedItems.push(li);
        }
    })
    return selectedItems;
}

Select.prototype._toggleSelect = function(elem) {
    elem.classList.toggle('selected');
}

Select.prototype._selectFromLast = function(elem) {
    var startElem = this._lastClickedLi || this._rootElem.children[0];

    var isLastClickedBefore = startElem.compareDocumentPosition(elem) & 4;

    if (isLastClickedBefore) {
      for (var el = startElem; el != elem; el = el.nextElementSibling) {
        el.classList.add('selected');
      }
    } else {
      for (el = startElem; el != elem; el = el.previousElementSibling) {
        el.classList.add('selected');
      }
    }
    el.classList.add('selected');
}

Select.prototype._selectSingle = function(elem) {
    this._deselectAll();
    elem.classList.add('selected');
}

Select.prototype._deselectAll = function() {
    for (var i = 0; i < this._rootElem.children.length; i++) {
        this._rootElem.children[i].classList.remove('selected');
      }
}