import $ from 'jquery'; window.jQuery = $; window.$ = $;
import 'owl.carousel';
import SmoothScroll from 'smooth-scroll';

import moduleTest from './modules/moduleTest';

document.addEventListener("DOMContentLoaded", function (event) {
    'use strict';

    moduleTest('test-title');
   
    // --------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------- Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(function () {
            preloader.classList.add('show');

            setTimeout(function () {
                document.querySelector('.loader-element').classList.add('hide');
            }, 200);
        }, 1000);
    }


    // --------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------  Slide Down a NavBar on Scroll
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        const navbar = document.querySelector(".navbar--scroll");
        if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 500) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-80px";
        }
    }


    // --------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------- Mobile Menu

    let menuToggle = document.querySelectorAll('.menu-toggle svg'),
        menu = document.querySelector('.mmenu');

    menuToggle.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.toggle('mmenu-hide');
        });
    });


    // --------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------- Smooth scroll

    let scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500,
        speedAsDuration: true
    });


    const upElem = document.querySelector('.pageUp');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 500) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // --------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------- Slider (page2)
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1
    });
});