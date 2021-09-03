const sliders = () => {
  // --------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------  Homepage Sliders
  const hero = new Swiper('.hero', {
    slidesPerView: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    speed: 900,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
      autoplayHoverPause: true,
    },
    lazy: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------- Product Gallery on Single Page
  // const sProductSliderThumbs = new Swiper(
  //   '[data-slider="single-product__slider--thumbs"]',
  //   {
  //     spaceBetween: 10,
  //     slidesPerView: 3,
  //     speed: 900,
  //     watchSlidesVisibility: true,
  //     watchSlidesProgress: true,
  //   }
  // );
  // const sProductSliderTop = new Swiper(
  //   '[data-slider="single-product__slider--top"]',
  //   {
  //     spaceBetween: 10,
  //     speed: 900,
  //     thumbs: {
  //       swiper: sProductSliderThumbs,
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //   }
  // );

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------- Recommended products
  // new Swiper('.recommended-products__slider', {
  //   slidesPerView: 2,
  //   spaceBetween: 20,
  //   speed: 900,
  //   autoplay: {
  //     delay: 3000,
  //     disableOnInteraction: true,
  //     autoplayHoverPause: true,
  //   },
  //   responsiveClass: true,
  //   breakpoints: {
  //     680: {
  //       slidesPerView: 3,
  //     },
  //     1124: {
  //       slidesPerView: 4,
  //     },
  //     1390: {
  //       slidesPerView: 5,
  //     },
  //   },
  // });
};

export default sliders;
