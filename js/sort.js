'use strict';

(function () {
  var draggedItem = null;

  var photosDragStartHandler = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/html', draggedItem.outerHTML);
      evt.dataTransfer.setData('text/plain', draggedItem.alt);
      window.adFormPhotos.addEventListener('dragover', photosDragOverHandler);
      window.adFormPhotos.addEventListener('dragenter', photosDragEnterHandler);
      window.adFormPhotos.addEventListener('dragleave', photosDragLeaveHandler);
      window.adFormPhotos.addEventListener('dragend', photosDragEndHandler);
      window.adFormPhotos.addEventListener('drop', photosDropHandler);
    }
  };

  var photosDragOverHandler = function (evt) {
    evt.preventDefault();
    return false;
  };

  var photosDragEnterHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'img' && evt.target !== draggedItem) {
      evt.target.parentNode.classList.add('active');
    }
  };

  var photosDragLeaveHandler = function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'img') {
      evt.target.parentNode.classList.remove('active');
    }
  };

  var photosDragEndHandler = function (evt) {
    evt.preventDefault();
    removePhotosSortListeners();
  };

  var photosDropHandler = function (evt) {
    if (draggedItem !== evt.target && evt.target.parentNode.classList.contains('ad-form__photo')) {
      evt.target.parentNode.classList.remove('active');
      draggedItem.outerHTML = evt.target.outerHTML;
      evt.target.outerHTML = evt.dataTransfer.getData('text/html');
      removePhotosSortListeners();
    }
  };

  var removePhotosSortListeners = function () {
    window.adFormPhotos.removeEventListener('dragover', photosDragOverHandler);
    window.adFormPhotos.removeEventListener('dragenter', photosDragEnterHandler);
    window.adFormPhotos.removeEventListener('dragleave', photosDragLeaveHandler);
    window.adFormPhotos.removeEventListener('dragend', photosDragEndHandler);
    window.adFormPhotos.removeEventListener('drop', photosDropHandler);
  };

  window.sort = {
    photosDragStartHandler: photosDragStartHandler
  };
})();
