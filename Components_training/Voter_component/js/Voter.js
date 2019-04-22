function Voter(options) {
    if(options == undefined) alert(options.elem);
    this._elem = options.elem;
    this._elemVote = document.querySelector('.vote');

    this._elem.onclick = this._onClick.bind(this);

}

Voter.prototype._onClick = function (event) {
    let target = event.target;
    if (target.closest('.up')) {
        this._increaseVote();
    } else if (target.closest('.down')) {
        this._decreaseVote();
    }
}

Voter.prototype._increaseVote = function () {
    this.setVote(+this._elemVote.innerHTML + 1);
}

Voter.prototype._decreaseVote = function () {
    this.setVote(+this._elemVote.innerHTML - 1);
}

Voter.prototype.setVote = function (vote) {
    const voteElem = document.querySelector('.vote');
    voteElem.innerHTML = +vote;

    let voterEvent = new CustomEvent('change', {
        bubbles: true,
        detail: +vote
    });
    this._elem.dispatchEvent(voterEvent);
};

