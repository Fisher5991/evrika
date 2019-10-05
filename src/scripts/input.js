(function () {
  var searchForm = document.querySelector('.search__form');
  var subscriptionForm = document.querySelector('.subscription__form');

  var determineValue = function (form) {
    var inputs = form.querySelectorAll('input');

    var onFieldInput = function (evt) {
      if (evt.target.value === '') {
        if (evt.target.classList.contains('form__input--filled')) {
          evt.target.classList.remove('form__input--filled');
        }
      } else if (!(evt.target.classList.contains('form__input--filled'))) {
        evt.target.classList.add('form__input--filled');
      }
    }

    var addInputListener = function (input) {
      input.addEventListener('input', onFieldInput);
    }

    for (var i = 0; i < inputs.length; i++) {
      addInputListener(inputs[i]);
    }
  }

  if (searchForm) {
    determineValue(searchForm);
  }

  if (subscriptionForm) {
    determineValue(subscriptionForm);
  }
})();
