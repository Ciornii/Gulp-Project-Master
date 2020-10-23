//responsive image
function imageBrowser() {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        jQuery('.object-fit img.img-object-fit').each(function () {
            var thisItem = jQuery(this),
                source = 'url(' + thisItem.attr('src') + ')',
                p = thisItem.parent(),
                div = jQuery('<div class="img-object-fit"></div>');

            p.append(div);
            div.css({
                'height': thisItem.parent().css('height'),
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': '50% 50%',
                'background-image': source
            });
            thisItem.hide();
        });
    }
}
imageBrowser();

$( document ).ready(function() {

    //menu button click
    $("#nav-icon").click(function(){
        $("#nav-icon").toggleClass("open");
        $(".menu").toggleClass("open");
        $(".fixed-menu").toggleClass("z-index");
        $("html").toggleClass("overflow-hidden");
        $("body").toggleClass("overflow-hidden");
    });
    $('.menu a[href*=\\#]').on('click',function(e) {
        $("#nav-icon").toggleClass("open");
        $(".menu").toggleClass("open");
        $(".fixed-menu").toggleClass("z-index");
        $("html").toggleClass("overflow-hidden");
        $("body").toggleClass("overflow-hidden");
        var target = this.hash;
        var $target = $(target);
        var targetname = target.slice(1, target.length);

        if(document.getElementById(targetname) != null) {
            e.preventDefault();
        }
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 100 //or the height of your fixed navigation

        }, 1000, 'swing', function () {
            window.location.hash = target.offset().top - 100;
        }, 1000);
    });


});