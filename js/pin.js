'use strict';

(function () {
  window.pinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  window.pin = {
    elementsList: document.querySelector('.map__pins'),
    fragment: document.createDocumentFragment(),
    pinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),
    pinElement: document.querySelector('.map__pin--main')
  };
})();
