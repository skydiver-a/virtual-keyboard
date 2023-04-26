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
      shiftKey: false,
    };
  }

  init() {
    this.container = this.createDOMNode(this.container, 'div', 'container');
    this.textArea = this.createDOMNode(this.textArea, 'div', 'textarea');
    this.keyBoard = this.createDOMNode(this.keyBoard, 'div', 'keyboard');

    document.body.append(this.container);
    this.container.append(this.textArea);
    this.container.append(this.keyBoard);
    this.keyBoard.append(this.createKeys());
  }

  createDOMNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  } 

  createKeys() {
    const fragment = document.createDocumentFragment();

    for ( let i = 0; i < this.groups.length; i++) {
      this.keyBoard.append(this.groups[i] = this.createDOMNode(this.groups[i], 'div', 'keyboard__group'));
      this.lang[i].forEach(el => {
        const key = this.createDOMNode('', 'button', 'keyboard__key');
        
        key.innerHTML = this.createSymbol(!this.properties.shiftKey ? el[0] : el[1]);
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
}