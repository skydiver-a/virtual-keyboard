import './style.css';

const keyboardObj = {
    elements: {
        keyboard: null,
        keys: []
    },
    properties: {
        value: '',
        capslock: false,
        leftShift: false,
        rightShift: false
    },

    init() {
        this.elements.keyboard = document.createElement('div');
        this.elements.keyboard.classList.add('keyboard');

        this.elements.keyboard.appendChild(this._createKeys());
        this.elements.keys = this.elements.keyboard.querySelectorAll('.keyboard__key');

        document.querySelector('.wrapper').append(this.elements.keyboard);

    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        const keyLayout = [
            '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del',
            'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
            'leftShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'rightShift',
            'ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'down', 'right'
        ];

        const createSymbol = (symbol) => {
            return `<span class='symbol'>${symbol}</span>`;
        };

        keyLayout.forEach(key => {
            const keyElem = document.createElement('div');
            const insertLinebreak = ['backspace', 'del', 'enter', 'rightShift'].indexOf(key) !== -1;

            keyElem.classList.add('keyboard__key');
            keyElem.setAttribute('type', 'button');

            keyElem.innerHTML = createSymbol(key);
            switch (key) {
                case 'backspace':
                    keyElem.classList.add('double');
                    break;
                case 'tab':
                    break;
                case 'del':
                    break;
                case 'capslock':
                    keyElem.classList.add('one_half');
                    break;
                case 'enter':
                    keyElem.classList.add('double_half')
                    break;
                case 'leftShift':
                    keyElem.classList.add('double')
                    break;
                case 'rightShift':
                    keyElem.classList.add('double')
                    break;
                case 'up':
                    break;
                case 'down':
                    break;
                case 'left':
                    break;
                case 'right':
                    break;
                case 'ctrl':
                    break;
                case 'alt':
                    break;
                case 'win':
                    break;
                case 'space':
                    keyElem.classList.add('multiple')
                    break;
                default:
                    break;
            }

            fragment.appendChild(keyElem);

            if (insertLinebreak) {
                fragment.appendChild(document.createElement('br'));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {

    },

    _toggleCapsLock() {

    }
};

window.onload = function() {
    keyboardObj.init();
}