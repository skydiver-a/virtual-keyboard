/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/KeyBoard.js":
/*!****************************!*\
  !*** ./src/js/KeyBoard.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en */ "./src/js/en.js");
/* harmony import */ var _ru__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ru */ "./src/js/ru.js");
/* harmony import */ var _ru__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ru__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _en__WEBPACK_IMPORTED_MODULE_0__.en;
    _classCallCheck(this, Keyboard);
    this.container = '';
    this.textArea = '';
    this.keyBoard = '';
    this.keyBoardKeys = '';
    this.groups = _toConsumableArray(Array(5)).map(function () {
      return '';
    });
    this.keys = [];
    this.lang = lang;
    this.sets = {
      cursorPos: 0,
      areaLength: 0
    };
    this.properties = {
      capsLock: false,
      shiftKey: false,
      controlKey: false,
      altKey: false,
      winKey: false
    };
    this.eventHandlers = {
      oninput: null,
      onclose: null
    };
  }
  _createClass(Keyboard, [{
    key: "init",
    value: function init() {
      var _this = this;
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
      this.textArea.addEventListener('focus', function (letter) {
        _this.open(letter.value, function (currentValue) {
          letter.value = currentValue;
        });
      });
    }
  }, {
    key: "createDOMNode",
    value: function createDOMNode(node, element) {
      var _node$classList;
      node = document.createElement(element);
      for (var _len = arguments.length, classes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        classes[_key - 2] = arguments[_key];
      }
      (_node$classList = node.classList).add.apply(_node$classList, classes);
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
  }, {
    key: "createKeys",
    value: function createKeys() {
      var _this2 = this;
      var fragment = document.createDocumentFragment();
      // TODO: think about two symbols on some keys
      var _loop = function _loop(i) {
        _this2.keyBoard.append(_this2.groups[i] = _this2.createDOMNode(_this2.groups[i], 'div', 'keyboard__group'));
        _this2.lang[i].forEach(function (el) {
          var key = _this2.createDOMNode('', 'button', 'keyboard__key');
          var symbolKey = el[0]; // ?

          key.innerHTML = _this2.createSymbol(symbolKey);
          _this2.getKeys(key, symbolKey);
          _this2.keys.push(key);
          _this2.groups[i].append(key);
        });
        fragment.appendChild(_this2.groups[i]);
      };
      for (var i = 0; i < this.groups.length; i++) {
        _loop(i);
      }
      return fragment;
    }
  }, {
    key: "createSymbol",
    value: function createSymbol(symbol) {
      return "<span class='symbol'>".concat(symbol, "</span>");
    }
  }, {
    key: "getKeys",
    value: function getKeys(key, symbol) {
      var _this3 = this;
      // check for cursor position
      this.textArea.addEventListener('focus', function () {
        _this3.sets.cursorPos = _this3.getCurrentCursorPosition(_this3.textArea);
        console.log(_this3.sets.cursorPos, _this3.sets.areaLength);
      });
      switch (symbol) {
        case 'backspace':
          key.classList.add('backspace');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fas fa-long-arrow-left\"></i>\n          </span>\n        ";
          key.addEventListener("click", function () {
            if (_this3.sets.cursorPos === 0) {
              // beginning position
              _this3.textArea.value = _this3.sets.areaLength === 0 ? '' : _this3.textArea.value;
            } else if (_this3.sets.cursorPos === _this3.sets.areaLength) {
              // ending position
              _this3.textArea.value = _this3.textArea.value.slice(0, -1);
            } else {
              // intermediate position
              _this3.textArea.value = _this3.textArea.value.slice(0, _this3.sets.cursorPos - 1) + _this3.textArea.value.slice(_this3.sets.cursorPos);
            }
            _this3.sets.cursorPos = _this3.sets.cursorPos > 0 ? _this3.sets.cursorPos - 1 : 0;
            _this3.sets.areaLength = _this3.sets.areaLength > 0 ? _this3.sets.areaLength - 1 : 0;
            _this3.triggerEvent("oninput");
          });
          break;
        case 'tab':
          key.classList.add('tab');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-solid fa-arrow-right-arrow-left\"></i>\n          </span>\n        ";
          key.addEventListener("click", function () {
            if (_this3.sets.cursorPos === 0) {
              // beginning position
              _this3.textArea.value = _this3.sets.areaLength === 0 ? '    ' : '    ' + _this3.textArea.value.slice(0, _this3.sets.areaLength);
            } else if (_this3.sets.cursorPos === _this3.sets.areaLength) {
              // ending position
              _this3.textArea.value += '    ';
            } else {
              // intermediate position
              _this3.textArea.value = _this3.textArea.value.slice(0, _this3.sets.cursorPos) + '    ' + _this3.textArea.value.slice(_this3.sets.cursorPos);
            }
            _this3.sets.cursorPos += 4;
            _this3.sets.areaLength += 4;
            _this3.triggerEvent("oninput");
          });
          break;
        case 'del':
          key.classList.add('del');
          key.addEventListener("click", function () {
            if (_this3.sets.cursorPos === 0) {
              // beginning position
              _this3.textArea.value = _this3.sets.areaLength === 0 ? '' : _this3.textArea.value.slice(1);
            } else if (_this3.sets.cursorPos === _this3.sets.areaLength) {
              // ending position
              return;
            } else {
              // intermediate position
              _this3.textArea.value = _this3.textArea.value.slice(0, _this3.sets.cursorPos) + _this3.textArea.value.slice(_this3.sets.cursorPos + 1);
            }
            _this3.sets.cursorPos = _this3.sets.cursorPos > 0 ? _this3.sets.cursorPos : 0;
            _this3.sets.areaLength = _this3.sets.areaLength > 0 ? _this3.sets.areaLength - 1 : 0;
            _this3.triggerEvent("oninput");
          });
          break;
        case 'capslock':
          key.classList.add('capslock');
          key.addEventListener("click", function () {
            key.classList.toggle("pressed");
            _this3.toggleCapsLock();
          });
          break;
        case 'enter':
          key.classList.add('enter');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fas fa-level-down fa-rotate-90\"></i>\n          </span>\n          ";
          key.addEventListener("click", function () {
            _this3.textArea.value += "\n";
            _this3.triggerEvent("oninput");
          });
          break;
        case 'shift_left':
          key.classList.add('shift', 'shift_left');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-solid fa-arrow-up\"></i>\n          </span>\n          ";
          key.addEventListener('click', function () {
            _this3.toggleShiftKey();
          });
          break;
        case 'shift_right':
          key.classList.add('shift', 'shift_right');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-solid fa-arrow-up\"></i>\n          </span>\n          ";
          key.addEventListener('click', function () {
            _this3.toggleShiftKey();
          });
          break;
        case 'ctrl':
          key.classList.add("ctrl");
          key.addEventListener('click', function () {
            _this3.toggleControlKey();
          });
          break;
        case 'alt':
          key.classList.add("alt");
          key.addEventListener('click', function () {
            _this3.toggleAltKey();
          });
          break;
        case 'win':
          key.classList.add("win");
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-brands fa-windows\"></i>\n          </span>\n        ";
          key.addEventListener('click', function () {
            _this3.toggleWinKey();
          });
          break;
        case 'space':
          key.classList.add('space');
          key.innerHTML = "<span class='symbol'>&nbsp;</span>";
          key.addEventListener("click", function () {
            if (_this3.sets.cursorPos === 0) {
              // beginning position
              _this3.textArea.value = _this3.sets.areaLength === 0 ? ' ' : ' ' + _this3.textArea.value.slice(0, _this3.sets.areaLength);
            } else if (_this3.sets.cursorPos === _this3.sets.areaLength) {
              // ending position
              _this3.textArea.value += ' ';
            } else {
              // intermediate position
              _this3.textArea.value = _this3.textArea.value.slice(0, _this3.sets.cursorPos) + ' ' + _this3.textArea.value.slice(_this3.sets.cursorPos);
            }
            _this3.sets.cursorPos++;
            _this3.sets.areaLength++;
            _this3.triggerEvent("oninput");
          });
          break;
        case 'up':
          key.classList.add('up');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-solid fa-angle-up\"></i>\n          </span>\n        ";
          break;
        case 'down':
          key.classList.add('down');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-solid fa-angle-down\"></i>\n          </span>\n        ";
          break;
        case 'left':
          key.classList.add('left');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-solid fa-angle-left\"></i>\n          </span>\n        ";
          break;
        case 'right':
          key.classList.add('right');
          key.innerHTML = "\n          <span class='symbol'>\n            <i class=\"fa-solid fa-angle-right\"></i>\n          </span>\n        ";
          break;
        default:
          key.addEventListener("click", function () {
            symbol = _this3.properties.capsLock ? symbol.toUpperCase() : symbol.toLowerCase();
            if (_this3.properties.shiftKey) {
              symbol = symbol.toUpperCase();
              _this3.toggleShiftKey();
            }
            if (_this3.sets.cursorPos === 0) {
              // beginning position
              _this3.textArea.value = _this3.sets.areaLength === 0 ? _this3.textArea.value + symbol : symbol + _this3.textArea.value.slice(0, _this3.sets.areaLength);
            } else if (_this3.sets.cursorPos === _this3.sets.areaLength) {
              // ending position
              _this3.textArea.value += symbol;
            } else {
              // intermediate position
              _this3.textArea.value = _this3.textArea.value.slice(0, _this3.sets.cursorPos) + symbol + _this3.textArea.value.slice(_this3.sets.cursorPos);
            }
            _this3.sets.cursorPos++;
            _this3.sets.areaLength++;
            _this3.triggerEvent("oninput");
          });
          break;
      }
    }
  }, {
    key: "getCurrentCursorPosition",
    value: function getCurrentCursorPosition(obj) {
      if (document.selection) {
        var sel = document.selection.createRange();
        var clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(obj);
        clone.setEndPoint('EndToEnd', sel);
        return clone.text.length;
      } else return obj.selectionStart;
    }
  }, {
    key: "open",
    value: function open(initialValue, oninput, onclose) {
      this.textArea.value = initialValue || this.textArea.value;
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
    }
  }, {
    key: "close",
    value: function close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.value);
      }
    }
  }, {
    key: "toggleCapsLock",
    value: function toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
      /*
          document.querySelectorAll('.symbol').forEach(el => {
            el.innerHTML = (this.properties.capsLock) ? el.textContent.toUpperCase() : el.textContent.toLowerCase();
          });*/
    }
  }, {
    key: "toggleShiftKey",
    value: function toggleShiftKey() {
      this.properties.shiftKey = !this.properties.shiftKey;
      document.querySelectorAll('.shift').forEach(function (el) {
        el.classList.toggle('pressed');
      });
    }
  }, {
    key: "toggleControlKey",
    value: function toggleControlKey() {
      this.properties.controlKey = !this.properties.controlKey;
      document.querySelectorAll('.ctrl').forEach(function (el) {
        el.classList.toggle('pressed');
      });
    }
  }, {
    key: "toggleAltKey",
    value: function toggleAltKey() {
      this.properties.altKey = !this.properties.altKey;
      document.querySelectorAll('.alt').forEach(function (el) {
        el.classList.toggle('pressed');
      });
    }
  }, {
    key: "toggleWinKey",
    value: function toggleWinKey() {
      this.properties.winKey = !this.properties.winKey;
      document.querySelector('.win').classList.toggle('pressed');
    }
  }]);
  return Keyboard;
}();

/***/ }),

/***/ "./src/js/en.js":
/*!**********************!*\
  !*** ./src/js/en.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "en": () => (/* binding */ en)
/* harmony export */ });
var en = [[['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['backspace', 'backspace']], [['tab', 'tab'], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}'], ['\\', '|'], ['del', 'del']], [['capslock', 'capslock'], ['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [':', ';'], ['"', "'"], ['enter', 'enter']], [['shift_left', 'shift_left'], ['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?'], ['shift_right', 'shift_right']], [['ctrl', 'ctrl'], ['win', 'win'], ['alt', 'alt'], ['space', 'space'], ['alt', 'alt'], ['ctrl', 'ctrl'], ['left', 'left'], ['up', 'up'], ['down', 'down'], ['right', 'right']]];

/***/ }),

/***/ "./src/js/ru.js":
/*!**********************!*\
  !*** ./src/js/ru.js ***!
  \**********************/
/***/ (() => {

var ru = [[['~', 'ё'], ['!', '1'], ['""', '2'], ['№', '3'], [';', '4'], ['%', '5'], [':', '6'], ['?', '7'], ['*', '8'], ['(', '9'], [')', '0'], ['_', '-'], ['+', '='], ['backspace', 'backspace']], [['tab', 'tab'], ['й', 'Й'], ['ц', 'Ц'], ['у', 'У'], ['к', 'К'], ['е', 'Е'], ['н', 'Н'], ['г', 'Г'], ['ш', 'Ш'], ['щ', 'Щ'], ['з', 'З'], ['х', 'Х'], ['ъ', 'Ъ'], ['del', 'del']], [['capslock', 'capslock'], ['ф', 'Ф'], ['ы', 'Ы'], ['в', 'В'], ['а', 'А'], ['п', 'П'], ['р', 'Р'], ['о', 'О'], ['л', 'Л'], ['д', 'Д'], ['ж', 'Ж'], ['э', 'Э'], ['enter', 'enter']], [['shift', 'shift'], ['я', 'Я'], ['ч', 'Ч'], ['с', 'С'], ['м', 'М'], ['и', 'И'], ['т', 'Т'], ['ь', 'Ь'], ['б', 'Б'], ['ю', 'Ю'], [',', '.'], ['shift', 'shift']], [['ctrl', 'ctrl'], ['win', 'win'], ['alt', 'alt'], ['space', 'space'], ['ctrl', 'ctrl'], ['left', 'left'], [['up', 'up'], ['down', 'down']], ['right', 'right']]];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_KeyBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/KeyBoard */ "./src/js/KeyBoard.js");

window.onload = function () {
  new _js_KeyBoard__WEBPACK_IMPORTED_MODULE_0__.Keyboard().init();
  alert('Cursor moving works in Mozilla FireFox ¯\\_(ツ)_/¯.\nStill NO switching languages and navigation keys.');
};
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=index.js.map