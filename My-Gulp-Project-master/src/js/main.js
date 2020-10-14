
import menu from './modules/menu';
import tabs from './modules/tabs';
import modals from './modules/modals';
import VideoPlayer from './modules/playVideo';
import forms from './modules/forms';
import checkInputs from './modules/checkInputs';
import timer from './modules/timer';
import gallery from './modules/gallery';
import slider from './modules/slider';
import calculator from './modules/calculator';
import scrolling from './modules/scrolling';

window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    menu();
    tabs();
    modals();
    new VideoPlayer('.video', '.video-popup').init();
    forms();
    checkInputs();
    timer();
    gallery();
    slider();
    calculator();
    scrolling('.pageup');
});

window.addEventListener('load', () => {
    document.getElementById("preloader").style.display = "none";
});