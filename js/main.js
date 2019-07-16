'use strict';
var PINWIDTH = 50;
var PINHEIGHT = 70;
function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min)); // собрал в одну строку
}
var avatarNumber = 1; // нельзя повторять аватары, для этого создал эту переменную, потом ее наращиваю
var types = ['palace', 'flat', 'house', 'bungalo'];
var createObject = function () { // создаем функцию для создания обьекта
  var object = {
    'author': {
      'avatar': 'img/avatars/user0' + avatarNumber++ + '.png',
    },
    'offer': {
      'type': types[randomInt(0, 3)],
    },
    'location': {
      'x': randomInt(25, (document.querySelector('.map__pins').offsetWidth - 25)),
      'y': randomInt(130, 630)
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
    fragment.appendChild(element);
  }
  return fragment;
};
var disableInputsAndSelects = function (selector) {
  var nodeList = document.querySelector(selector).querySelectorAll('input, select');
  nodeList.forEach(function (value) {
    value.setAttribute('disabled', true);
  });
};
var enableInputsAndSelects = function (selector) {
  var div = document.querySelector(selector).querySelectorAll('input, select');
  div.forEach(function (value) {
    value.removeAttribute('disabled');
  });
};
var removeFogInStartWindow = function () {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
};

var elementsList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinElement = document.querySelector('.map__pin--main');


disableInputsAndSelects('.ad-form');
disableInputsAndSelects('.map__filters');
pinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  elementsList.appendChild(makeMapFragment(pinTemplate));
  removeFogInStartWindow();
  enableInputsAndSelects('.ad-form');
  enableInputsAndSelects('.map__filters');
  var startCoord = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoord.x - moveEvt.clientX,
      y: startCoord.y - moveEvt.clientY
    };
    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    pinElement.style.top = (pinElement.offsetTop - shift.y) + 'px';
    pinElement.style.left = (pinElement.offsetLeft - shift.x) + 'px';
  };
  var onMouseUp = function (upEvt) {
    document.querySelector('#address').value = upEvt.clientX + ', ' + upEvt.clientY;
    elementsList.removeEventListener('mousemove', onMouseMove);
  };
  elementsList.addEventListener('mousemove', onMouseMove);
  elementsList.addEventListener('mouseup', onMouseUp);
});


