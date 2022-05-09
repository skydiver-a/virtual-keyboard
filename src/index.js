import './style.css';

const keyboardObj = {
    elements: {
        keyboard: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: '',
        capslock: false,
    },

    init() {
        //create the keyboard
        this.elements.keyboard = document.createElement('div');
        this.elements.keyboard.classList.add('keyboard');

        this.elements.keyboard.appendChild(this._createKeys());
        this.elements.keys = this.elements.keyboard.querySelectorAll('.keyboard__key');

        document.querySelector('.wrapper').append(this.elements.keyboard);

        //use for textarea
        document.querySelectorAll(".display").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        const keyLayout = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
            'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift',
            'ctrl', 'win', 'alt', 'space', 'ctrl', 'left', 'down', 'right', 'international'
        ];

        const createSymbol = (symbol) => {
            return `<span class='symbol'>${symbol}</span>`;
        };

        keyLayout.forEach(key => {
            const keyElem = document.createElement('div');

            keyElem.classList.add('keyboard__key');
            keyElem.setAttribute('type', 'button');

            keyElem.innerHTML = createSymbol(key);

            switch (key) {
                case 'backspace':
                    keyElem.classList.add('double');
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa fa-fw fa-long-arrow-left"></i>
                        </span>`;
                    keyElem.addEventListener('click', () => {
                        this.properties.value =
                            this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                    break;
                case 'tab':
                    keyElem.innerHTML = `<span class='symbol'>
                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        </span>`;
                    break;
                case 'del':
                    keyElem.innerHTML = createSymbol(key);
                    break;
                case 'capslock':
                    keyElem.classList.add('one_half');
                    keyElem.innerHTML = createSymbol(key);
                    keyElem.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElem.classList.toggle(".pressed",
                            this.properties.capslock);
                    });
                    break;
                case 'enter':
                    keyElem.classList.add('double_half');
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa-solid fa-arrow-left-long fa-2xl"></i>
                        </span>`;
                    keyElem.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });
                    break;
                case 'international':
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa fa-fw fa-globe"></i>
                        </span>`;
                    break;
                case 'shift':
                    keyElem.classList.add('double');
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa-solid fa-arrow-up"></i>
                        </span>`;
                    break;
                case 'up':
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa-solid fa-angle-up"></i>
                        </span>`;
                    break;
                case 'down':
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa-solid fa-angle-down"></i>
                        </span>`;
                    break;
                case 'left':
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa-solid fa-angle-left"></i>
                        </span>`;
                    break;
                case 'right':
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa-solid fa-angle-right"></i>
                        </span>`;
                    break;
                case 'ctrl':
                    keyElem.innerHTML = createSymbol(key);
                    break;
                case 'alt':
                    keyElem.innerHTML = createSymbol(key);
                    break;
                case 'win':
                    keyElem.innerHTML = `<span class='symbol'>
                            <i class="fa-brands fa-windows"></i>
                        </span>`;
                    break;
                case 'space':
                    keyElem.classList.add('multiple');
                    keyElem.innerHTML = `<span class='symbol'></span>`;
                    keyElem.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    break;
                default:
                    keyElem.addEventListener("click", () => {
                        this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElem);
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capslock = !this.properties.capslock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capslock ?
                    key.textContent.toUpperCase() :
                    key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    }


};

window.onload = function() {
    alert('Not all buttons work yet. Try to finish it by Thursday');
    keyboardObj.init();
}
/*
    getArray(language) {
        const table = {
            en: [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
            'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
            'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift',
            'ctrl', 'win', 'alt', 'space', 'ctrl', 'left', 'down', 'right', 'int'
            ],
            ru: [
            'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del',
            'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', "э", 'enter',
            'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'up', 'shift',
            'ctrl', 'win', 'alt', 'space', 'ctrl', 'left', 'down', 'right', 'int'
            ]
        };

        return table[language];
    }
*/