import calcScroll from './calcScroll';

const gallery = () => {
   const imgPopup = document.createElement('div'),
      galleryWrapper = document.querySelector('.gallery'),
      bigImage = document.createElement('img'),
      scroll = calcScroll();

   imgPopup.classList.add('popup', 'fade');
   galleryWrapper.appendChild(imgPopup);

   imgPopup.style.justifyContent = 'center';
   imgPopup.style.alignItems = 'center';
   imgPopup.style.display = 'none';

   imgPopup.appendChild(bigImage);

   galleryWrapper.addEventListener('click', (e) => {
      e.preventDefault();

      let target = e.target;

      if (target && target.classList.contains('photo')) {
         imgPopup.style.display = 'flex';
         const path = target.parentNode.getAttribute('href');
         bigImage.setAttribute('src', path);
         document.body.style.overflow = "hidden";
         document.body.style.marginRight = `${scroll}px`;
      }

      if (target && target.matches('div.popup')) {
         imgPopup.style.display = 'none';
         document.body.style.overflow = "";
         document.body.style.marginRight = `0px`;
      }
   });
};

export default gallery;