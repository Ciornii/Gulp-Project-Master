function popup() {
  function bindPopup({
    popupSelector,
    triggerSelector,
    close,
    closeOnScroll = false,
    scrollHeight,
  }) {
    const popup = document.querySelector(popupSelector),
      trigger = document.querySelector(triggerSelector);
      
    if (popup && trigger) {
      document.addEventListener('click', (e) => {
        if (e.target.closest(close)) {
          popup.classList.remove('active');
          trigger.classList.remove('active');
        } else if (e.target.closest(triggerSelector)) {
          popup.classList.toggle('active');
          trigger.classList.toggle('active');
        } else if (e.target == popup || popup.contains(e.target)) {
          popup.classList.add('active');
          trigger.classList.add('active');
        } else {
          popup.classList.remove('active');
          trigger.classList.remove('active');
        }
      });

      if (closeOnScroll) {
        window.addEventListener('scroll', () => {
          if (document.documentElement.scrollTop > scrollHeight) {
            popup.classList.remove('active');
            trigger.classList.remove('active');
          }
        });
      }
    }
  }

  // bindPopup({
  //   popupSelector: '.mega-menu',
  //   triggerSelector: '.navbar__dropdown',
  // });
  // bindPopup({
  //   popupSelector: '.popup-cart',
  //   triggerSelector: '.header-main__block--cart',
  //   closeOnScroll: true,
  //   scrollHeight: 187,
  // });

}

export default popup;
