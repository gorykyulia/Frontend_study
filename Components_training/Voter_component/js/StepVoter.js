"use strict";

function StepVoter(options) {
    Voter.apply(this, arguments);
    this.step = options.step;
}

StepVoter.prototype = Object.create(Voter.prototype);

StepVoter.prototype._increaseVote = function() {
    this._elemVote.innerHTML = +this._elemVote.innerHTML + this.step;
}

StepVoter.prototype._decreaseVote = function() {
    this._elemVote.innerHTML = +this._elemVote.innerHTML - this.step;
}