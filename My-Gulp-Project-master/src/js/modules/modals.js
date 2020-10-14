import calcScroll from './calcScroll';

const modals = () => {
     function bindModal(triggerSelector, modalSelector, closeSelector) {
         const trigger = document.querySelectorAll(triggerSelector),
             modal = document.querySelector(modalSelector),
             close = document.querySelector(closeSelector),
             windows = document.querySelectorAll('[data-modal]'),
             scroll = calcScroll();

         trigger.forEach(item => {
             item.addEventListener('click', (e) => {
                 if (e.target) {
                     e.preventDefault();
                 }

                 windows.forEach(item => {
                     item.style.display = 'none';
                     item.classList.add('fade');
                 });

                 modal.style.display = "block";
                 document.body.style.overflow = "hidden";
                 document.body.style.marginRight = `${scroll}px`;
             });
         });

         close.addEventListener('click', () => {
             windows.forEach(item => {
                 item.style.display = 'none';
             });

             modal.style.display = "none";
             document.body.style.overflow = "";
             document.body.style.marginRight = `0px`;
         });

         modal.addEventListener('click', (e) => {
             if (e.target === modal) {
                 windows.forEach(item => {
                     item.style.display = 'none';
                 });

                 modal.style.display = "none";
                 document.body.style.overflow = "";
                 document.body.style.marginRight = `0px`;
             }
         });
     }

     bindModal('.more', '.get-nr1', '.get-nr1 .popup-close');
     bindModal('#call', '.get-nr2', '.get-nr2 .popup-close');
 };

 export default modals;