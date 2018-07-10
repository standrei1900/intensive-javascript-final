'use strict';

(function () {
  var TIMEOUT_VALUE = 5000;

  window.alert = {
    getSuccessMessage: function () {
      var blockSuccess = document.querySelector('.success');
      blockSuccess.classList.remove('hidden');
      setTimeout(function () {
        blockSuccess.classList.add('hidden');
      }, TIMEOUT_VALUE);
      window.state.pageResetHandler();
    },
    getErrorMessage: function (errorMessage) {
      var deleteError = function () {
        document.querySelector('.error-message').remove();
      };

      var blockError = document.createElement('div');
      blockError.classList.add('error-message');
      blockError.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', blockError);
      setTimeout(deleteError, TIMEOUT_VALUE);
    }
  };
})();
