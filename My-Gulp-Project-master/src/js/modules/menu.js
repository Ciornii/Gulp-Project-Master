const menu = () => {

   let menuToggle = document.querySelectorAll('.menu-toggle svg'),
      menu = document.querySelector('nav');

   menuToggle.forEach(item => {
      item.addEventListener('click', () => {
         menu.classList.toggle('nav-hide');
      });   
   });
};

export default menu;