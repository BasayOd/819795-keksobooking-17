'use strict';





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
    moveEvt.preventDefault();
    var shift = {
      x: startCoord.x - moveEvt.clientX,
      y: startCoord.y - moveEvt.clientY
    };
    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    if (pinElement.offsetTop - shift.y > 130 && pinElement.offsetTop - shift.y < 630) {
      pinElement.style.top = (pinElement.offsetTop - shift.y) + 'px';
    }
    if (pinElement.offsetLeft - shift.x > 0 && pinElement.offsetLeft - shift.x < mapWidth - window.pinSize.WIDTH) {
      pinElement.style.left = (pinElement.offsetLeft - shift.x) + 'px';
    }
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.querySelector('#address').value =
      (pinElement.offsetTop + window.pinSize.HEIGHT) + ', ' + (pinElement.offsetLeft + window.pinSize.WIDTH / 2);
    elementsList.removeEventListener('mousemove', onMouseMove);
  };
  elementsList.addEventListener('mousemove', onMouseMove);
  elementsList.addEventListener('mouseup', onMouseUp);
});


