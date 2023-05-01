import { en } from "./en";
import { ru } from "./ru";

export class Keyboard {
  constructor(lang = en) {
    this.container = '';
    this.textArea = '';
    this.keyBoard = '';
    this.keyBoardKeys = '';
    this.groups = [...Array(5)].map(() => '');
    this.keys = [];
    this.lang = lang;
    this.sets = {
      cursorPos: 0,
      areaLength: 0,
    };
    this.properties = {
      capsLock: false,
      shiftKey: false,
      controlKey: false,
      altKey: false,
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
      */
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
*/
  createKeys() {
    const fragment = document.createDocumentFragment();
    // TODO: think about two symbols on some keys
    for (let i = 0; i < this.groups.length; i++) {
      this.keyBoard.append(this.groups[i] = this.createDOMNode(this.groups[i], 'div', 'keyboard__group'));
      this.lang[i].forEach(el => {
        const key = this.createDOMNode('', 'button', 'keyboard__key');
        const symbolKey = (!this.properties.shiftKey || !this.properties.capsLock) ? el[0] : el[1]; // ?

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

        key.addEventListener("click", () => {
          // check for cursor position
          this.textArea.addEventListener('focus', () => {
            this.sets.cursorPos = +this.getCurrentCursorPosition();
          });

          if (this.sets.cursorPos === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength === 0) ? '' : this.textArea.value;
          } else if (this.sets.cursorPos === this.sets.areaLength) {  // ending position
            this.textArea.value = this.textArea.value.slice(0, -1);
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPos - 1) + this.textArea.value.slice(this.sets.cursorPos);
          }

          this.sets.cursorPos = (this.sets.cursorPos > 0) ? this.sets.cursorPos - 1 : 0;
          this.sets.areaLength = (this.sets.areaLength > 0) ? this.sets.areaLength - 1 : 0;

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
          // check for cursor position
          this.textArea.addEventListener('focus', () => {
            this.sets.cursorPos = +this.getCurrentCursorPosition();
          });

          if (this.sets.cursorPos === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength === 0) ? 
              '    ' : 
              '    ' + this.textArea.value.slice(0, this.sets.areaLength);
          } else if (this.sets.cursorPos === this.sets.areaLength) {  // ending position
            this.textArea.value += '    ';
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPos) + '    ' + this.textArea.value.slice(this.sets.cursorPos);
          }

          this.sets.cursorPos += 4;
          this.sets.areaLength += 4;

          this.triggerEvent("oninput");
        });
        break;
      case 'del':
        key.classList.add('del');

        key.addEventListener("click", () => {
          // check for cursor position
          this.textArea.addEventListener('focus', () => {
            this.sets.cursorPos = +this.getCurrentCursorPosition();
          });

          if (this.sets.cursorPos === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength === 0) ? 
              '' : 
              this.textArea.value.slice(1);
          } else if (this.sets.cursorPos === this.sets.areaLength) {  // ending position
            return;
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPos) + this.textArea.value.slice(this.sets.cursorPos + 1);
          }     
          
          this.sets.cursorPos = (this.sets.cursorPos > 0) ? this.sets.cursorPos : 0;
          this.sets.areaLength = (this.sets.areaLength > 0) ? this.sets.areaLength - 1 : 0;     
          
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
          this.triggerEvent("oninput");
        });
        break;
      case 'shift_left':
        key.classList.add('shift_left');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-up"></i>
          </span>
          `;
        key.addEventListener('click', () => {})
        break;
      case 'shift_right':
        key.classList.add('shift_right');
        key.innerHTML = `
          <span class='symbol'>
            <i class="fa-solid fa-arrow-up"></i>
          </span>
          `;
        key.addEventListener('click', () => {})
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
          // check for cursor position
          this.textArea.addEventListener('focus', () => {
            this.sets.cursorPos = +this.getCurrentCursorPosition();
          });

          symbol = this.properties.capsLock ? symbol.toUpperCase() : symbol.toLowerCase();  

          if (this.sets.cursorPos === 0) {  // beginning position
            this.textArea.value = (this.sets.areaLength === 0) ?
              this.textArea.value + symbol :
              symbol + this.textArea.value.slice(0, this.sets.areaLength);
          } else if (this.sets.cursorPos === this.sets.areaLength) {  // ending position
            this.textArea.value += symbol;
          } else {  // intermediate position
            this.textArea.value = this.textArea.value.slice(0, this.sets.cursorPos) + symbol + this.textArea.value.slice(this.sets.cursorPos);
          }

          this.sets.cursorPos++;
          this.sets.areaLength++;

          this.triggerEvent("oninput");
        });
        break;
    }
  }

  getCurrentCursorPosition() {
    return document.querySelector('.textarea').selectionStart;
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
}