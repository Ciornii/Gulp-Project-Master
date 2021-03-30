function popup() {
  function bindPopup({ popupSelector, triggerSelector, close }) {
    const popup = document.querySelector(popupSelector),
      trigger = document.querySelector(triggerSelector);

    document.addEventListener('click', e => {
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
  }

  // bindPopup({
  //   popupSelector: '.popup-catalog',
  //   triggerSelector: '.navbar__dropdown',
  // });
}

export default popup;
