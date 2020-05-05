window.addEventListener('DOMContentLoaded', () => {
    // TABS  make-order
    const [tabs, tabsPanels] = [
        Array.from(document.querySelectorAll(".make-order-tab")),
        Array.from(document.querySelectorAll(".make-order-tabcontent"))
    ];

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(`#${tab.dataset.target}`);
            removeActiveClass([tabs, tabsPanels]);
            tab.classList.add("active");
            target.classList.add("active");
        });
    });

    const removeActiveClass = (el) => {
        el.forEach((item) => {
            item.find((e) => e.classList.contains("active")).classList.remove("active");
        });
    };

    // лайтбокс галерея
    lightGallery(document.getElementById('lightgallery'));

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