'use strict';

(function () {
  var adFormSubmit = window.adForm.querySelector('.ad-form__submit');
  var adFormReset = window.adForm.querySelector('.ad-form__reset');

  var resetPosition = function () {
    window.mapPin.style.left = window.data.mainPin.positionX + 'px';
    window.mapPin.style.top = window.data.mainPin.positionY + 'px';
  };

  var clearForms = function () {
    window.adForm.reset();
    window.mapFilters.reset();
  };

  var addListeners = function () {
    window.adForm.addEventListener('submit', window.form.buttonSubmitHandler);
    window.adFormPhotos.addEventListener('dragstart', window.sort.photosDragStartHandler);
    adFormSubmit.addEventListener('click', window.util.fieldsValidateHandler);
    adFormReset.addEventListener('click', window.state.pageResetHandler);
  };

  var removeListeners = function () {
    window.adForm.removeEventListener('submit', window.form.buttonSubmitHandler);
    window.adFormPhotos.removeEventListener('dragstart', window.sort.photosDragStartHandler);
    adFormSubmit.removeEventListener('click', window.util.fieldsValidateHandler);
    adFormReset.removeEventListener('click', window.state.pageResetHandler);
  };

  window.state = {
    activatePage: function () {
      window.map.classList.remove('map--faded');
      window.adForm.classList.remove('ad-form--disabled');
      addListeners();
      window.files.addListeners();
      window.util.disableFields(false);
      window.backend.load(window.adverts.init, window.alert.getErrorMessage);
    },
    pageResetHandler: function () {
      window.map.classList.add('map--faded');
      window.adForm.classList.add('ad-form--disabled');
      clearForms();
      resetPosition();
      removeListeners();
      window.files.removeListeners();
      window.util.disableFields(true);
      window.util.setAddress();
      window.adverts.remove();
      window.files.remove();
    }
  };
})();
