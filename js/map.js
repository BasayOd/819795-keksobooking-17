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
      fragment.appendChild(element);
    }
    return fragment;
  };
  var removeFogInStartWindow = function () {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
  };
})();
