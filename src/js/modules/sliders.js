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
};

export default sliders;
