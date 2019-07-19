'use strict';

(function () {
  window.form = {
    disableInputsAndSelects: function (selector) {
      var nodeList = document.querySelector(selector).querySelectorAll('input, select');
      nodeList.forEach(function (value) {
        value.setAttribute('disabled', true);
      });
    },
    enableInputsAndSelects: function (selector) {
      var div = document.querySelector(selector).querySelectorAll('input, select');
      div.forEach(function (value) {
        value.removeAttribute('disabled');
      });
    },
    types: ['palace', 'flat', 'house', 'bungalo']
  };
})();
