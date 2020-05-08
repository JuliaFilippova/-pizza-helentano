const disableScrollListener = () => window.scrollTo(0, 0);

window.addEventListener('DOMContentLoaded', () => {
    // preloder 
    let preloader = document.querySelector('.preloader');
    let images = document.images;
    let imgTotalCount = images.length;
    let imgLoadCount = 0;
    document.body.style.overflow = 'hidden';
    for (let i = 0; i < imgTotalCount; i++) {
        let imgClone = new Image();
        imgClone.onload = imageLoaded;
        imgClone.onerror = imageLoaded;
        imgClone.src = images[i].src;
    }

    function imageLoaded() {
        imgLoadCount++;
        (((100 / imgTotalCount) * imgLoadCount) << 0) + '%';
        setTimeout(function () {
            if (imgLoadCount >= imgTotalCount) {
                if (!preloader.classList.contains('done')) {
                    preloader.classList.add('done');
                    document.body.style.overflow = 'auto';
                }
            }
        }, 1000)
    }


    let wrapper = document.querySelector('.wrapper');
    // ФУНКЦИЯ МОДАЛЬНОЕ ОКНО
    // trigger-селектор кнопки по клику, modalSelector-модальное окно которые открываем, modalSelectorBody-содержимое окна, close - закрытие именно этого модального окна.
    function bindModal(triggerSelector, modalSelector, modalSelectorBody, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector), //кнопки вызывающие модалку
            modal = document.querySelector(modalSelector), // подложка модального окна 
            modalBody = document.querySelector(modalSelectorBody), //модальное окно окошко
            close = document.querySelectorAll(closeSelector); //закрытие модального

        trigger.forEach(item => { //цикл, т.к. у нас будет в нескольких местах вызываться модальное окно
            item.addEventListener('click', (e) => { //(e) если есть href#
                if (e.target) {
                    e.preventDefault();
                }

                modal.classList.add('modal-overlay-show'); //класс для плавного показа мод окна
                modalBody.classList.add('modal-body-show'); //класс для плавного показа мод окна
                document.body.style.overflow = 'hidden'; //убирает скролл
                //убирает скролл
                let scrollX = window.scrollX;
                let scrollY = window.scrollY;
                window.onscroll = function () {
                    window.scrollTo(scrollX, scrollY);
                };
            });
        });
        close.forEach(item => {

            item.addEventListener('click', () => { //по клику на крестик закрываем окно

                modal.classList.remove('modal-overlay-show'); //класс для плавного показа мод окна
                modalBody.classList.remove('modal-body-show'); //класс для плавного показа мод окна
                document.body.style.overflow = ''; //возвращает скролл
                //убирает скролл
                window.onscroll = function () {
                    return;
                };
            });
        });

        modal.addEventListener('click', (e) => { //по клику вне формы закрываем окно (подложка)
            if (e.target === modal && closeClickOverlay) {

                modal.classList.remove('modal-overlay-show'); //класс для плавного показа мод окна
                modalBody.classList.remove('modal-body-show'); //класс для плавного показа мод окна
                document.body.style.overflow = ''; //возвращает скролл
                //убирает скролл
                window.onscroll = function () {
                    return;
                };
            }
        })
    }
    // запускаем функции модальных окон
    bindModal('.type-product__card-wrap', '.modal-product-desc', '.modal-product-desc__body', '.close-modal'); //модальное окно по клику
    bindModal('.fixed-icon-basket', '.modal-basket-goods', '.modal-basket-goods__body', '.close-modal');
    // ФУНКЦИЯ МОДАЛЬНОЕ ОКНО 


    // hamburger menu modal
    function burgerMenu(selector) {
        let menu = document.querySelector(selector),
            buttonMenu = document.querySelector('.burger-menu__btn'); //кнопка

        buttonMenu.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }

            //убирает или добавляет скролл (для мобилки)
            menu.classList.contains('burger-menu__active') ?
                document.removeEventListener('scroll', disableScrollListener) :
                document.addEventListener('scroll', disableScrollListener);

            menu.classList.toggle('burger-menu__active'); //активный класс, показываем меню
            document.body.classList.toggle('over-hid'); //overflow hidden убирает скролл
        });

        document.querySelector('.modal-window_burger').onclick = (e) => { //модальное окно меню
            if (e.target.classList.contains('modal-window_burger')) { //модальное окно меню
                menu.classList.remove('burger-menu__active'); //активный класс, скрываем меню
                document.body.classList.remove('over-hid'); //overflow hidden возвращает скролл

                //убирает скролл (для мобилки)
                document.removeEventListener('scroll', disableScrollListener);
            }
        }
    }
    burgerMenu('.burger-menu');
    // hamburger menu modal


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
    // TABS  make-order

    // лайтбокс галерея
    lightGallery(document.getElementById('lightgallery'));
});


window.onload = function () {
    // ОТОЖЕННАЯ ЗАГРУЗКА КАРТЫ(загружаем карту, только после всей загрузки стр)
    setTimeout(function () {
        if (document.getElementById('map')) {
            document.getElementById('map')
                .src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A6a8bbb978c51898afd590bea1a467bac4a3ecd6eb9a1b34fe5eb467b5f0beeef&amp;source=constructor';
        }
    }, 50);

    // плавная прокрутка до якоря
    // собираем все якоря; устанавливаем время анимации и количество кадров
    const anchors = [].slice.call(document.querySelectorAll('a[data-scroll]')),
        animationTime = 500,
        framesCount = 50;
    anchors.forEach(function (item) {
        // каждому якорю присваиваем обработчик события
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Вернуть скролл закрыть меню если открыто
            document.removeEventListener('scroll', disableScrollListener);
            document.querySelector('.burger-menu').classList.remove('burger-menu__active'); //активный класс, скрываем меню
            document.body.classList.remove('over-hid'); //overflow hidden возвращает скролл

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
// slider slick
$(document).ready(function () {
    // ГЛАВНЫЙ СЛАЙДЕР
    $('.header-banner-slick').slick({
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        responsive: [{
            breakpoint: 424,
            settings: {}
        }]
    });
    // СЛАЙДЕР С КАРТОЧКАМИ ТОВАРОВ
    $('.product-selection-slider').slick({
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 950,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 678,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 530,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]
    });

    // аккардеон в модальном окне
    $('.add-products-drop__link').click(function () {
        $('.add-products-drop__link').not(this).children('.drop-btn-open').removeClass('active');
        $(this).children('.drop-btn-open').toggleClass("active");

        if ($(this).parent().is('.drop_open')) {
            $(this).closest('.add-products-drop__item').find('.add-products-drop__content').slideUp();
            $(this).closest('.add-products-drop__item').removeClass('drop_open');
        } else {
            $('.add-products-drop__content').slideUp();
            $('.add-products-drop__item').removeClass('drop_open');
            $(this).closest('.add-products-drop__item').find('.add-products-drop__content').slideDown();
            $(this).closest('.add-products-drop__item').addClass('drop_open');
        }
    });

    // активная кнопка по клику
    let selector = '.product-desc-info__centimeter';

    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');
    });
});
// перемещение блока в другой блок на мобильном разрешении
$(window).on('load resize', function () {
    if ($(window).width() <= 1199) {
        $('.block-resize').insertAfter('.block-resize-mobile');
        $('.modal-addit-products__list_1').appendTo($('#dropResize1'));
        $('.modal-addit-products__list_2').appendTo($('#dropResize2'));
    }
    if ($(window).width() <= 992) {
        $('.product-desc-info h2').insertBefore('.modal-product-desc__img');
    }
});