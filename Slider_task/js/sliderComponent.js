class SliderComponent {
  constructor(options) {
    this._rootElem = options.elem;
    this._count = options.countOfSlider;
    this._currentSliderIndex = 0;
    this._timeTurning = 2000;
    this._build();
  }

  start() {
    let timer = setInterval(this._update.bind(this), this._timeTurning);
  }

  _build() {
    let users = usersData;
    for (let n = 0; n < this._count; n++) {
      let i = this._currentSliderIndex;
      let template = `<div class="slider__item">
                        <div class="slider__userLogin">${users[i].login}</div>
                        <div class="slider__userAvatar">
                          <img src="${users[i].avatar_url}" alt="This is a photo"> 
                        </div>
                        <div class="slider__userPage">${users[i].html_url}</div>
                      </div>`
      this._rootElem.innerHTML += template;
      this._changeCurrentSlider();
    }
  }

  _update() {
    const sliderItems = document.querySelectorAll('.slider__item');
    for (var i = 0, length = sliderItems.length; i < length; i++) {
      this._changeCurrentSlider();
      let index = this._currentSliderIndex;
      sliderItems[i].querySelector('.slider__userLogin').innerHTML = usersData[index].login;
      sliderItems[i].querySelector('.slider__userAvatar img').src = usersData[index].avatar_url;
      sliderItems[i].querySelector('.slider__userPage').innerHTML = usersData[index].html_url;
    }
  }

  _changeCurrentSlider() {
    if (this._currentSliderIndex === usersData.length - 1) {
      this._currentSliderIndex = 0;
    } else {
      this._currentSliderIndex += 1;
    }
  }
}
