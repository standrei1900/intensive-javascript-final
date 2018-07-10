'use strict';

(function () {
  var MainPin = {
    width: 62,
    height: 84,
    positionX: 570,
    positionY: 375
  };

  var Types = {
    'palace': {
      name: 'Дворец',
      price: '10000'
    },
    'house': {
      name: 'Дом',
      price: '5000'
    },
    'flat': {
      name: 'Квартира',
      price: '1000'
    },
    'bungalo': {
      name: 'Бунгало',
      price: '0'
    }
  };

  window.map = document.querySelector('.map');
  window.mapPin = window.map.querySelector('.map__pin--main');
  window.mapFilters = window.map.querySelector('.map__filters');
  window.mapFiltersFields = Array.from(window.mapFilters.elements);
  window.adForm = document.querySelector('.ad-form');
  window.adFormPhotos = window.adForm.querySelector('.ad-form__photo-container');

  window.data = {
    types: Types,
    mainPin: MainPin
  };
})();
