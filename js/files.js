'use strict';

(function () {
  var PHOTO_WIDTH = 70;
  var PHOTO_HEIGHT = 70;
  var PHOTO_ALT = 'Фотография жилья';
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';

  var avatarChooser = window.adForm.querySelector('#avatar');
  var avatarDropZone = window.adForm.querySelector('.ad-form-header__drop-zone');
  var avatarPreview = window.adForm.querySelector('.ad-form-header__preview');
  var photosChooser = window.adForm.querySelector('#images');
  var photosDropZone = window.adForm.querySelector('.ad-form__drop-zone');

  var filesDropZones = [avatarDropZone, photosDropZone];

  var filesDragOverHandler = function (evt) {
    evt.preventDefault();
    return false;
  };

  var filesDragEnterHandler = function (evt) {
    evt.preventDefault();
    evt.target.style.borderColor = '#ff5635';
  };

  var filesDragLeaveHandler = function (evt) {
    evt.preventDefault();
    evt.target.style.borderColor = '';
  };

  var filesDropHandler = function (action, evt) {
    evt.preventDefault();
    var filesList = {};
    if (evt.dataTransfer) {
      filesList = evt.dataTransfer.files;
    } else {
      filesList = evt.target.files;
    }
    action(filesList);
    evt.target.style.borderColor = '';
  };

  var renderPhotos = function (file) {
    if (file.type.match('image.*')) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', function () {
        var photoPreview = document.createElement('div');
        photoPreview.className = 'ad-form__photo';
        var img = document.createElement('img');
        img.src = reader.result;
        img.width = PHOTO_WIDTH;
        img.height = PHOTO_HEIGHT;
        img.alt = PHOTO_ALT;
        photoPreview.appendChild(img);
        window.adFormPhotos.insertBefore(photoPreview, window.adFormPhotos.lastElementChild);
      });
    }
  };

  var addAvatar = function (files) {
    if (files[0].type.match('image.*')) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.addEventListener('load', function () {
        avatarPreview.children[0].src = reader.result;
      });
    }
  };

  var addPhotos = function (files) {
    for (var i = 0; i < files.length; i++) {
      renderPhotos(files[i]);
    }
  };

  var removePhotos = function () {
    while (window.adFormPhotos.childElementCount > 2) {
      window.adFormPhotos.removeChild(window.adFormPhotos.children[1]);
    }
    avatarPreview.children[0].src = AVATAR_DEFAULT;
  };

  var avatarDropListener = filesDropHandler.bind(avatarDropZone, addAvatar);
  var photosDropListener = filesDropHandler.bind(photosDropZone, addPhotos);

  var addDropZoneListeners = function () {
    filesDropZones.forEach(function (item) {
      item.addEventListener('dragover', filesDragOverHandler);
      item.addEventListener('dragenter', filesDragEnterHandler);
      item.addEventListener('dragleave', filesDragLeaveHandler);
    });
    avatarDropZone.addEventListener('drop', avatarDropListener);
    photosDropZone.addEventListener('drop', photosDropListener);
  };

  var removeDropZoneListeners = function () {
    filesDropZones.forEach(function (item) {
      item.removeEventListener('dragover', filesDragOverHandler);
      item.removeEventListener('dragenter', filesDragEnterHandler);
      item.removeEventListener('dragleave', filesDragLeaveHandler);
    });
    avatarDropZone.removeEventListener('drop', avatarDropListener);
    photosDropZone.removeEventListener('drop', photosDropListener);
  };

  avatarChooser.addEventListener('change', filesDropHandler.bind(avatarChooser, addAvatar));
  photosChooser.addEventListener('change', filesDropHandler.bind(photosChooser, addPhotos));

  window.files = {
    remove: removePhotos,
    addListeners: addDropZoneListeners,
    removeListeners: removeDropZoneListeners
  };
})();
