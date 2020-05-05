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

    // modal
    // const startButton = document.querySelector(".card-btn-garbage"),
    //     modalOverlay = document.querySelector(".modal-window"),
    //     modalBody = document.querySelector(".modal-window__body");

    // startButton.addEventListener("click", () => {
    //     modalOverlay.classList.add("modal-overlay-show");
    //     modalBody.classList.add("modal-body-show");

    //     // Closing modal
    //     document.addEventListener("keyup", (e) => {
    //         if (e.keyCode === 27) {
    //             modalOverlay.classList.remove("modal-overlay-show");
    //             modalBody.classList.remove("modal-body-show");
    //         }
    //     });

    //     modalOverlay.addEventListener("click", (e) => {
    //         if (
    //             e.target.classList.contains("close-modal") ||
    //             e.target.classList.contains("modal-window")
    //         ) {
    //             modalOverlay.classList.remove("modal-overlay-show");
    //             modalBody.classList.remove("modal-body-show");
    //         }
    //     })
    // });

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
window.onload = function () {
    // загружаем карту, только после всей загрузки стр
    setTimeout(function () {
        document.getElementById('map').src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A6a8bbb978c51898afd590bea1a467bac4a3ecd6eb9a1b34fe5eb467b5f0beeef&amp;source=constructor';
    }, 100);


    // плавная прокрутка до якоря
    // собираем все якоря; устанавливаем время анимации и количество кадров
    const anchors = [].slice.call(document.querySelectorAll('a[data-scroll]')),
        animationTime = 1000,
        framesCount = 100;
    anchors.forEach(function (item) {
        // каждому якорю присваиваем обработчик события
        item.addEventListener('click', function (e) {
            // убираем стандартное поведение
            e.preventDefault();
            // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
            // запускаем интервал, в котором
            let scroller = setInterval(function () {
                // считаем на сколько скроллить за 1 такт
                let scrollBy = coordY / framesCount;
                // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
                // и дно страницы не достигнуто
                if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                    // то скроллим на к-во пикселей, которое соответствует одному такту
                    window.scrollBy(0, scrollBy);
                } else {
                    // иначе добираемся до элемента и выходим из интервала
                    window.scrollTo(0, coordY);
                    clearInterval(scroller);
                }
                // время интервала равняется частному от времени анимации и к-ва кадров
            }, animationTime / framesCount);
        });
    });
}