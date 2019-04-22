function Menu(options) {

    this.open = open;
    this.close = close;
    this.geElem = getElem;
    this.toggle = toggle;

    let ELEM;
    function getElem() {
        if (!ELEM) {
            render();
        }
        return ELEM;
    }
    function render() {
        ELEM = document.createElement('div');
        ELEM.className = "menu";

        const TITLE_ELEM = document.createElement('span');
        TITLE_ELEM.className = "title";
        TITLE_ELEM.textContent = options.title;
        ELEM.appendChild(TITLE_ELEM);

        ELEM.onmousedown = function () {
            return false;
        }

        ELEM.onclick = function (event) {
            var closestTitle = event.target.closest('.title');
            if (closestTitle && ELEM.contains(closestTitle)) {
                ELEM.classList.toggle('open');
            }
        }
    }

    function renderItems() {
        const ITEMS = options.items || [];
        let LIST = document.createElement('ul');

        ITEMS.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            LIST.appendChild(li);
        });
        ELEM.appendChild(LIST);
    }

    function open() {
        if (!ELEM.querySelector('ul')) {
            renderItems();
        }
        ELEM.classList.add('open');
    }

    function close() {
        ELEM.classList.remove('open');
    }

    function toggle() {
        if (ELEM.classList.contains('open')) {
            close();
        } else {
            open();
        }
    }

}

Menu.prototype = {

}