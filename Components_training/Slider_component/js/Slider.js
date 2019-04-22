function Slider(options) {
    this._rootElem = options.elem;
    this._thumbElem = this._rootElem.querySelector('.thumb');

    this._rootElem.onclick = this._onDragstart.bind(this);
    this._rootElem.onmousedown = this._onMousedown.bind(this);
    // var sliderCoords, thumbCoords, shiftX, shiftY;
}

Slider.prototype._onDragstart = function() {
        return false;
};

Slider.prototype._onMousedown = function(event) {
    if (event.target.closest('.thumb')) {
        this._startDrag(event.clientX, event.clientY);
        return false;
    }
}

Slider.prototype._startDrag = function (startClientX, startClientY) {
    this._thumbCoords = this._thumbElem.getBoundingClientRect();
    this._shiftX = startClientX - this._thumbCoords.left;
    this._shiftY = startClientY - this._thumbCoords.top;

    this._sliderCoords = this._rootElem.getBoundingClientRect();

    document.addEventListener('mousemove', this._onDocumentMouseMove);
    document.addEventListener('mouseup', this._onDocumentMouseUp);
}

Slider.prototype._moveTo = function (clientX) {
    var newLeft = clientX - this._shiftX - this._sliderCoords.left;

    if (newLeft < 0) {
        newLeft = 0;
    }
    var rightEdge = this._rootElem.offsetWidth - this._thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
        newLeft = rightEdge;
    }
    this._thumbElem.style.left = newLeft + 'px';
}

Slider.prototype._onDocumentMouseMove = function(e) {
    this._moveTo(e.clientX);
}

Slider.prototype._onDocumentMouseUp = function() {
    this._endDrag();
}

Slider.prototype._endDrag = function() {
    document.removeEventListener('mousemove', this._onDocumentMouseMove);
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
}

