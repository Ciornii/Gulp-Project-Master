const slider = () => {
   let slideIndex = 1,
      items = document.querySelectorAll('.reviews_item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot'),
      sliderWrapper = document.querySelector('.reviews'),
      paused = false;

   showSlides(slideIndex);

   function showSlides(n) {

      if (n > items.length) {
         slideIndex = 1;
      }

      if (n < 1) {
         slideIndex = items.length;
      }

      items.forEach((item) => item.classList.remove('fadeSlow'));
      items.forEach((item) => item.style.display = 'none');
      dots.forEach((item) => item.classList.remove('dot-active'));

      items[slideIndex -1].classList.add('fadeSlow');
      items[slideIndex - 1].style.display = 'block';
      dots[slideIndex -1].classList.add('dot-active');
   }

   function changeSlide(n) {
      showSlides(slideIndex += n);
   }
   function currentSlide(n) {
      showSlides(slideIndex = n);
   }

   prev.addEventListener('click', function() {
      changeSlide(-1);
   });
   next.addEventListener('click', function() {
      changeSlide(1);
   });

   dotsWrap.addEventListener('click', function(event) {
      for (let i = 0; i < dots.length + 1; i++) {
         if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
            currentSlide(i);
         }
      }
   });

   function autoPlay() {
      paused = setInterval(() => {
         changeSlide(1);
      }, 7000);
   }
   autoPlay();
  
   sliderWrapper.addEventListener('mouseenter', () => {
      clearInterval(paused);
   });
   sliderWrapper.addEventListener('mouseleave', () => {
      autoPlay();
   });
};

export default slider;