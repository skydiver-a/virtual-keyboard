import { Keyboard } from "./js/KeyBoard";

window.onload = function() {
  new Keyboard().init();
  alert(
    'Cursor moving works in Mozilla FireFox ¯\\_(ツ)_/¯.\nStill NO switching languages and navigation keys.'
  );
};