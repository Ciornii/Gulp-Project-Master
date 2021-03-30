import sliders from "./modules/sliders";
import modals from "./modules/modals";
import popup from "./modules/popup";

document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";

  sliders();
  modals();
  popup();

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------- Preloader
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    setTimeout(function () {
      preloader.classList.add("show");

      setTimeout(function () {
        document.querySelector(".loader-element").classList.add("hide");
      }, 200);
    }, 1000);
  }

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------- Sticky Navigation
  let main = document.getElementsByTagName("main")[0],
    navbar = document.querySelector(".navbar"),
    sticky = navbar.offsetTop,
    navbarHeight = getComputedStyle(navbar).height;

  window.onscroll = function () {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("navbar--sticky");
      main.style.paddingTop = navbarHeight;
    } else {
      navbar.classList.remove("navbar--sticky");
      main.style.paddingTop = "0px";
    }
  };

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------- Smooth scroll , Scroll up

  let scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
  });

  const upElem = document.querySelector(".scroll-up");

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 500) {
      upElem.style.visibility = "visible";
      upElem.classList.add("animated", "fadeIn");
      upElem.classList.remove("fadeOut");
    } else {
      upElem.classList.add("fadeOut");
      upElem.classList.remove("fadeIn");
      upElem.style.visibility = "hidden";
    }
  });
});
