'use strict';

(function () {
  var pinHalfWidth = window.data.mainPin.width / 2;

  var MapLimit = {
    top: 150 - window.data.mainPin.height,
    bottom: 500
  };

  window.mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.mapPin.style.top = (window.mapPin.offsetTop - shift.y) + 'px';
      window.mapPin.style.left = (window.mapPin.offsetLeft - shift.x) + 'px';

      if (window.mapPin.offsetTop < MapLimit.top) {
        window.mapPin.style.top = MapLimit.top + 'px';
      } else if (window.mapPin.offsetTop + window.data.mainPin.height > MapLimit.bottom) {
        window.mapPin.style.top = MapLimit.bottom - window.data.mainPin.height + 'px';
      }

      if (window.mapPin.offsetLeft + pinHalfWidth < 0) {
        window.mapPin.style.left = 0 - pinHalfWidth + 'px';
      } else if (window.mapPin.offsetLeft + pinHalfWidth > window.map.offsetWidth) {
        window.mapPin.style.left = window.map.offsetWidth - pinHalfWidth + 'px';
      }

      window.util.setAddress();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.util.setAddress();
      if (!document.querySelector('.map:not(.map--faded)')) {
        window.state.activatePage();
      }
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
