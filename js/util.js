'use strict';

(function () {
  var adFormAddress = window.adForm.querySelector('#address');
  var adFormFields = window.adForm.querySelectorAll('fieldset');
  var adFormRequired = window.adForm.querySelectorAll('[required]');

  var checkField = function (field) {
    if (!field.checkValidity()) {
      field.classList.add('error');
    } else if (field.classList.contains('error')) {
      field.classList.remove('error');
    }
  };

  window.util = {
    disableFields: function (boolean) {
      window.mapFiltersFields.forEach(function (field) {
        field.disabled = boolean;
      });
      adFormFields.forEach(function (field) {
        field.disabled = boolean;
      });
    },
    setAddress: function () {
      var addressX = parseInt(window.mapPin.style.left, 10) + window.data.mainPin.width / 2;
      var addressY = parseInt(window.mapPin.style.top, 10) + window.data.mainPin.height;
      adFormAddress.value = addressX + ', ' + addressY;
    },
    debounce: function (action, interval) {
      var lastTimeout;
      return function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(action, interval);
      };
    },
    fieldsValidateHandler: function () {
      adFormRequired.forEach(function (field) {
        checkField(field);
      });
    }
  };
})();
