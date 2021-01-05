import $ from "jquery";
window.jQuery = $;
window.$ = $;
import "owl.carousel";
import SmoothScroll from "smooth-scroll";

import moduleTest from "./modules/moduleTest";

document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";

  moduleTest("test-title");

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
      navbar.classList.add("navbar__sticky");
      main.style.paddingTop = navbarHeight;
    } else {
      navbar.classList.remove("navbar__sticky");
      main.style.paddingTop = "0px";
    }
    if (window.pageYOffset >= 600) {
      navbar.classList.add("navbar__small");
    } else {
      navbar.classList.remove("navbar__small");
    }
  };

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------- Mobile Menu

  let menuToggle = document.querySelectorAll(".menu-toggle svg"),
    menu = document.querySelector(".mmenu");

  menuToggle.forEach((item) => {
    item.addEventListener("click", () => {
      menu.classList.toggle("mmenu-hide");
    });
  });

  // --------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------- Smooth scroll

  let scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
  });

  const scrollUp = document.querySelector(".scroll-up");

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 500) {
      scrollUp.style.visibility = "visible";
      scrollUp.classList.add("animated", "fadeIn");
      scrollUp.classList.remove("fadeOut");
    } else {
      scrollUp.classList.add("fadeOut");
      scrollUp.classList.remove("fadeIn");
      scrollUp.style.visibility = "hidden";
    }
  });

  // --------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------  Sliders

  $(".hero__slider").owlCarousel({
    loop: false,
    items: 1,
    nav: true,
    dots: true,
    center: true,
  });
});
