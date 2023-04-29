import { en } from "./en";
import { ru } from "./ru";

export class Keyboard {
  constructor(lang = en) {
    this.container = '';
    this.textArea = '';
    this.keyBoard = '';
    this.groups = [...Array(5)].map(() => '');
    this.keys = [];
    this.lang = lang;
    this.properties = {
      capsLock: false,
      shiftKey: false,
      control: false,
      alt: false,
    };
    this.eventHandlers = {
      oninput: null,
      onclose: null
    }
  }

  init() {
    this.container = this.createDOMNode(this.container, 'div', 'container');
    this.textArea = this.createDOMNode(this.textArea, 'textarea', 'textarea');
    this.keyBoard = this.createDOMNode(this.keyBoard, 'div', 'keyboard');

    document.body.append(this.container);
    this.container.append(this.textArea);
    this.container.append(this.keyBoard);
    this.keyBoard.append(this.createKeys());

    this.textArea.addEventListener('focus', (letter) => {
      this.open(letter.value, currentValue => {
        letter.value = currentValue;
      });
    });
  }

  createDOMNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  } 

  createKeys() {
    const fragment = document.createDocumentFragment();
    // TODO: think about two symbols on some keys
    for ( let i = 0; i < this.groups.length; i++) {
      this.keyBoard.append(this.groups[i] = this.createDOMNode(this.groups[i], 'div', 'keyboard__group'));
      this.lang[i].forEach(el => {
        const key = this.createDOMNode('', 'button', 'keyboard__key');
        const symbolKey = !this.properties.shiftKey ? el[0] : el[1];
                
        key.innerHTML = this.createSymbol(symbolKey);

        this.getSpecialChars(key, symbolKey);
        this.keys.push(key);
        this.groups[i].append(key)
      });
      fragment.appendChild(this.groups[i]);
    }

    return fragment;
  }
  
  createSymbol(symbol) {
    return `<span class='symbol'>${symbol}</span>`;
  }

  getSpecialChars(key, symbol) {
    switch (symbol) {
      case 'backspace':
        key.classList.add('backspace');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fas fa-long-arrow-left"></i>
          </span>
        `;
        
        key.addEventListener('click', () => {
            this.textArea.value = (this.textArea.value.length > 0) ? this.textArea.value.slice(0, -1) : '';
            this.triggerEvent('oninput');
        });
        break;
      case 'tab':
        key.classList.add('tab');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </span>
        `;

        key.addEventListener('click', () => {
          this.textArea.value += '    ';
          this.triggerEvent('oninput');
        });
        break;
      case 'del':
        key.classList.add('del');
        break;
      case 'capslock':
        key.classList.add('capslock');
        /*
        key.addEventListener("click", () => {
          this._toggleCapsLock();
          key.classList.toggle(".pressed",
            this.properties.capslock);
        });
        */
        break;
      case 'enter':
        key.classList.add('enter');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fas fa-level-down fa-rotate-90"></i>
          </span>
          `;
            /*
        keyElem.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
        });
        */
        break;
      case 'shift_left':
        key.classList.add('shift_left');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-up"></i>
          </span>
          `;
        break;
      case 'shift_right':
        key.classList.add('shift_right');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-up"></i>
          </span>
          `;
        break;
      case 'win':
        key.classList.add("win");
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-brands fa-windows"></i>
          </span>
        `;
        break;
      case 'space':
        key.classList.add('space');
        key.innerHTML = `<span class='symbol'>&nbsp;</span>`;
        /*
        key.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
        });
        */
        break;
      case 'up':
        key.classList.add('up');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-angle-up"></i>
          </span>
        `;
        break;
      case 'down':
        key.classList.add('down');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-angle-down"></i>
          </span>
        `;
        break;
      case 'left':
        key.classList.add('left');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-angle-left"></i>
          </span>
        `;
        break;
      case 'right':
        key.classList.add('right');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-angle-right"></i>
          </span>
        `;
        break;
      default:
        key.addEventListener("click", () => {
          this.textArea.value += this.properties.capsLock ? symbol.toUpperCase() : symbol.toLowerCase();
          this.triggerEvent("oninput");
        });
      break;
    }
  }

  open(initialValue, oninput, onclose) {
    this.textArea.value = initialValue || this.textArea.value;
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  }

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }
}