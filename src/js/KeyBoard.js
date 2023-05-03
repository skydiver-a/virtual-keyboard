import { en } from "./en";
import { ru } from "./ru";

export class Keyboard {
  constructor() {
    this.container = '';
    this.textArea = '';
    this.keyBoard = '';
    this.keyBoardKeys = '';
    this.groups = [...Array(5)].map(() => '');
    this.keys = [];
    this.switchLang = true;
    this.lang = this.switchLang ? en : ru;
    this.sets = {
      cursorPosX: 0,
      cursorPosY: 0,
      areaLength: [ 0, ]
    };
    this.properties = {
      capsLock: false,
      shiftKey: false,
      controlKey: false,
      altKey: false,
      winKey: false,
    };
    this.eventHandlers = {
      oninput: null,
      onclose: null
    };
  }

  init() {
    this.container = this.createDOMNode(this.container, 'div', 'container');
    this.textArea = this.createDOMNode(this.textArea, 'textarea', 'textarea');
    this.keyBoard = this.createDOMNode(this.keyBoard, 'div', 'keyboard');

    document.body.append(this.container);
    this.container.append(this.textArea);
    this.container.append(this.keyBoard);
   /*  
    this.createGroups();
    this.createKeys();
    this.fillKeysBySymbols();
         */
    this.keyBoard.append(this.createKeys());

    // check for symbols
    this.textArea.addEventListener('focus', (letter) => {
      this.open(letter.value, currentValue => {
        letter.value = currentValue;
      });
    });

    // check for cursor position
    this.textArea.addEventListener('click', (e) => {
      this.sets.cursorPosX = e.target.selectionStart;
      console.log(this.sets.cursorPosX, this.sets.cursorPosY, this.sets.areaLength[this.sets.cursorPosY])
    });
  }

  createDOMNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }
  /*
  createGroups() {
    for ( let i = 0; i < this.groups.length; i++) {
      this.keyBoard.append(this.groups[i] = this.createDOMNode(this.groups[i], 'div', 'keyboard__group'));
    }
  }

  createKeys() {
    for (let i = 0; i < this.groups.length; i++) {
      for ( let j = 0; j < this.lang[i].length; j++) {
        const key = this.createDOMNode('', 'button', 'keyboard__key');
        this.keys.push(key);
        this.groups[i].append(key);
      }
    }
  }
  
  fillKeysBySymbols() {

  }
  */
  createKeys() {  // creates 64 keys here
    const fragment = document.createDocumentFragment();
    // TODO: think about two symbols on some keys
    for (let i = 0; i < this.groups.length; i++) {
      this.keyBoard.append(this.groups[i] = this.createDOMNode(this.groups[i], 'div', 'keyboard__group'));

      this.lang[i].forEach(el => {
        const key = this.createDOMNode('', 'button', 'keyboard__key');
        key.innerHTML = this.createSymbol(el);

        this.getKeys(key, el[0], el[1]);
        this.keys.push(key);
        this.groups[i].append(key)
      });
      fragment.appendChild(this.groups[i]);
    }

    return fragment;
  }

  createSymbol(symbol) {
    if (symbol[0] === symbol[1]) {
      return `<span class='symbol'>${symbol[0]}</span>`;
    } else return `
      <span class='symbol top_left'>${symbol[1]}</span>
      <br />
      <span class='symbol bottom_right'>${symbol[0]}</span>
      `;
  }

  getKeys(key, symbol, altSymbol) {
    switch (symbol) {
      case 'backspace':
        key.classList.add('backspace');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fas fa-long-arrow-left"></i>
          </span>
        `;

        key.addEventListener("click", () => {
          if (this.sets.cursorPosX === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength === 0) ? '' : this.textArea.value;
          } else if (this.sets.cursorPosX === this.sets.areaLength) {  // ending position
            this.textArea.value = this.textArea.value.slice(0, -1);
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPosX - 1) + this.textArea.value.slice(this.sets.cursorPosX);
          }

          this.sets.cursorPosX = (this.sets.cursorPosX > 0) ? this.sets.cursorPosX - 1 : 0;
          this.sets.areaLength[this.sets.cursorPosY] = (this.sets.areaLength[this.sets.cursorPosY] > 0) ? this.sets.areaLength[this.sets.cursorPosY] - 1 : 0;

          this.triggerEvent("oninput");
        });
        break;
      case 'tab':
        key.classList.add('tab');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </span>
        `;

        key.addEventListener("click", () => {
          if (this.sets.cursorPosX === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength[this.sets.cursorPosY] === 0) ?
              '    ' :
              '    ' + this.textArea.value.slice(0, this.sets.areaLength);
          } else if (this.sets.cursorPosX === this.sets.areaLength[this.sets.cursorPosY]) {  // ending position
            this.textArea.value += '    ';
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPosX) + '    ' + this.textArea.value.slice(this.sets.cursorPosX);
          }

          this.sets.cursorPosX += 4;
          this.sets.areaLength[this.sets.cursorPosY] += 4;

          this.triggerEvent("oninput");
        });
        break;
      case 'del':
        key.classList.add('del');

        key.addEventListener("click", () => {
          if (this.sets.cursorPosX === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength[this.sets.cursorPosY] === 0) ?
              '' :
              this.textArea.value.slice(1);
          } else if (this.sets.cursorPosX === this.sets.areaLength[this.sets.cursorPosY]) {  // ending position
            return;
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPosX) + this.textArea.value.slice(this.sets.cursorPosX + 1);
          }

          this.sets.cursorPosX = (this.sets.cursorPosX > 0) ? this.sets.cursorPosX : 0;
          this.sets.areaLength[this.sets.cursorPosY] = (this.sets.areaLength[this.sets.cursorPosY] > 0) ? this.sets.areaLength[this.sets.cursorPosY] - 1 : 0;

          this.triggerEvent("oninput");
        });
        break;
      case 'capslock':
        key.classList.add('capslock');

        key.addEventListener("click", () => {
          key.classList.toggle("pressed");
          this.toggleCapsLock();
        });
        break;
      case 'enter':
        key.classList.add('enter');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fas fa-level-down fa-rotate-90"></i>
          </span>
          `;

        key.addEventListener("click", () => {
          this.textArea.value += "\n";
          this.sets.cursorPosX = 0;
          this.sets.cursorPosY++;
          this.sets.areaLength.push(0);
          this.triggerEvent("oninput");
        });
        break;
      case 'shift_left':
        key.classList.add('shift', 'shift_left');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-up"></i>
          </span>
          `;
        key.addEventListener('click', () => {
          this.toggleShiftKey();
        });
        break;
      case 'shift_right':
        key.classList.add('shift', 'shift_right');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-up"></i>
          </span>
          `;
        key.addEventListener('click', () => {
          this.toggleShiftKey();
        });
        break;
      case 'ctrl':
        key.classList.add("ctrl");
        key.addEventListener('click', () => {
          this.toggleControlKey();
        });
        break;
      case 'alt':
        key.classList.add("alt");
        key.addEventListener('click', () => {
          this.toggleAltKey();
        });
        break;
      case 'win':
        key.classList.add("win");
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-brands fa-windows"></i>
          </span>
        `;
        key.addEventListener('click', () => {
          this.toggleWinKey();
        });
        break;
      case 'space':
        key.classList.add('space');
        key.innerHTML = `<span class='symbol'>&nbsp;</span>`;

        key.addEventListener("click", () => {
          if (this.sets.cursorPosX === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength === 0) ?
              ' ' :
              ' ' + this.textArea.value.slice(0, this.sets.areaLength);
          } else if (this.sets.cursorPosX === this.sets.areaLength) {  // ending position
            this.textArea.value += ' ';
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPosX) + ' ' + this.textArea.value.slice(this.sets.cursorPosX);
          }

          this.sets.cursorPosX++;
          this.sets.areaLength++;

          this.triggerEvent("oninput");
        });
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
          symbol = this.properties.capsLock ? symbol.toUpperCase() : symbol.toLowerCase();

          if (this.properties.shiftKey) {
            symbol = altSymbol;
            this.toggleShiftKey();
          }

          if (this.sets.cursorPosX === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength[this.sets.cursorPosY] === 0) ?
              this.textArea.value + symbol :
              symbol + this.textArea.value.slice(0, this.sets.areaLength[this.sets.cursorPosY]);
          } else if (this.sets.cursorPosX === this.sets.areaLength[this.sets.cursorPosY]) {  // ending position
            this.textArea.value += symbol;
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPosX) + symbol + this.textArea.value.slice(this.sets.cursorPosX);
          }

          this.sets.cursorPosX++;
          this.sets.areaLength[this.sets.cursorPosY]++;

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

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  }

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    /*
        document.querySelectorAll('.symbol').forEach(el => {
          el.innerHTML = (this.properties.capsLock) ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
        });*/
  }

  toggleShiftKey() {
    this.properties.shiftKey = !this.properties.shiftKey;

    document.querySelectorAll('.shift').forEach(el => {
      el.classList.toggle('pressed');
    });
  }

  toggleControlKey() {
    this.properties.controlKey = !this.properties.controlKey;

    document.querySelectorAll('.ctrl').forEach(el => {
      el.classList.toggle('pressed');
    });
  }

  toggleAltKey() {
    this.properties.altKey = !this.properties.altKey;

    document.querySelectorAll('.alt').forEach(el => {
      el.classList.toggle('pressed');
    });
  }

  toggleWinKey() {
    this.properties.winKey = !this.properties.winKey;

    document.querySelector('.win').classList.toggle('pressed');
  }
}