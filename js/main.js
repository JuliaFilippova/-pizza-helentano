window.addEventListener('DOMContentLoaded', () => {


});
$(document).ready(function () {
    $('.header-banner-slick').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        responsive: [{
            breakpoint: 424,
            settings: {}
        }]
    });

    $('.product-selection-slider').slick({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [{
            breakpoint: 424,
            settings: {}
        }]
    });
});