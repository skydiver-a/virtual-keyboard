import { Keyboard } from "./js/KeyBoard";

window.onload = function() {
  new Keyboard().init();
  alert(
    'App works better in Mozilla FireFox ¯\\_(ツ)_/¯.\nStill NO switching languages, spacebar and navigation keys.'
  );
};