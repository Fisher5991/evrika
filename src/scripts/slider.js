var introSlider = new Swiper('.intro__slider', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="slider__dot button ' + className + '">' + '</span>';
    },
  },
});

var bestsellerSlider = new Swiper('.bestsellers__slider', {
  slidesPerView: 'auto',
  spaceBetween: 1,
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },
});

var noveltySlider = new Swiper('.novelty__slider', {
  slidesPerView: 'auto',
  spaceBetween: 1,
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },
});

var specialOffersSlider = new Swiper('.special-offers__slider', {
  slidesPerView: 'auto',
  spaceBetween: 1,
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },
});

var brandsSlider = new Swiper('.brands__slider', {
  slidesPerView: 'auto',
  freeMode: true,
  spaceBetween: 20,
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },
});
