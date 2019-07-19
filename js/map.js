'use strict';

(function () {
  window.util = {
    randomInt: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min)); // собрал в одну строку
    }
  };
  var avatarNumber = 1; // нельзя повторять аватары, для этого создал эту переменную, потом ее наращиваю
  var mapWidth = document.querySelector('.map').clientWidth;
  var createObject = function () { // создаем функцию для создания обьекта
    var object = {
      'author': {
        'avatar': 'img/avatars/user0' + avatarNumber++ + '.png',
      },
      'offer': {
        'type': window.form.types[window.util.randomInt(0, 3)],
      },
      'location': {
        'x': window.util.randomInt(25, (mapWidth - window.pinSize.WIDTH)),
        'y': window.util.randomInt(130, 630)
      }
    };
    return object;
  };
  var makeArrayObjects = function (x) { // функция создает массив обьектов, количество элементов их икс
    var array = [];
    for (var i = 0; i < x; i++) {
      array[i] = createObject();
    }
    return array;
  };
  var arrayObj = makeArrayObjects(8);
  var makeMapFragment = function (template) { // зачем то сделал функцию для создания фрагмента
    for (var i = 0; i < arrayObj.length; i++) {
      var element = template.cloneNode(true);
      element.style = 'left:' + arrayObj[i].location.x + 'px;  top: ' + arrayObj[i].location.y + 'px;';
      element.querySelector('img').src = arrayObj[i].author.avatar;
      window.pin.fragment.appendChild(element);
    }
    return window.pin.fragment;
  };
  var removeFogInStartWindow = function () {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
  };
  window.form.disableInputsAndSelects('.ad-form');
  window.form.disableInputsAndSelects('.map__filters');
  window.pin.pinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.pin.elementsList.appendChild(makeMapFragment(window.pin.pinTemplate));
    removeFogInStartWindow();
    window.form.enableInputsAndSelects('.ad-form');
    window.form.enableInputsAndSelects('.map__filters');
    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoord.x - moveEvt.clientX,
        y: startCoord.y - moveEvt.clientY
      };
      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (window.pin.pinElement.offsetTop - shift.y > 130 && window.pin.pinElement.offsetTop - shift.y < 630) {
        window.pin.pinElement.style.top = (window.pin.pinElement.offsetTop - shift.y) + 'px';
      }
      if (window.pin.pinElement.offsetLeft - shift.x > 0 && window.pin.pinElement.offsetLeft - shift.x < mapWidth - window.pinSize.WIDTH) {
        window.pin.pinElement.style.left = (window.pin.pinElement.offsetLeft - shift.x) + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.querySelector('#address').value =
        (window.pin.pinElement.offsetTop + window.pinSize.HEIGHT) + ', ' + (window.pin.pinElement.offsetLeft + window.pinSize.WIDTH / 2);
      window.pin.elementsList.removeEventListener('mousemove', onMouseMove);
    };
    window.pin.elementsList.addEventListener('mousemove', onMouseMove);
    window.pin.elementsList.addEventListener('mouseup', onMouseUp);
  });
})();
