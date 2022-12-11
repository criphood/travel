
'use strict';

// burger menu

const burgerModal = document.querySelector('.burger__modal'),
    menu = burgerModal.querySelector('.burger__modal-nav'),
    menuItems = document.querySelectorAll('a[href*="#"]'),
    menuCloser = menu.querySelector('.burger__modal-close'),
    menuOpener = document.querySelector('.burger__icon');


menuOpener.addEventListener('click', () => {
    showModal(burgerModal, 'show__menu', 'hide__menu');
});

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        closeModal(burgerModal, 'hide__menu', 'show__menu');
    });
});

menuCloser.addEventListener('click', () => {
    closeModal(burgerModal, 'hide__menu', 'show__menu');
});

burgerModal.addEventListener('click', (e) => {
    if (e.target == burgerModal) {
        closeModal(burgerModal, 'hide__menu', 'show__menu');
    }
});

// Login Pop Up

const popupModal = document.querySelector('.popup__modal'),
    loginButton = document.querySelectorAll('.popup__opener'),
    form = popupModal.querySelector('.form__login'),
    formHeader = form.querySelector('.form__login--header'),
    loginOptions = form.querySelector('.login__options'),
    crossline = form.querySelector('.crossline__wrapper'),
    email = form.querySelector('input[type="email"]'),
    password = form.querySelector('input[type="password"]'),
    signInButton = form.querySelector('.signin__button'),
    passwordButton = form.querySelector('.forgot__password'),
    registerInner = form.querySelector('.register__inner'),
    registerLink = form.querySelector('.register__link'),
    loginLink = form.querySelector('.login__link');

let registerButtonIndex = 0;

loginButton.forEach(item => {
    item.addEventListener('click', () => {
        showModal(popupModal, 'popup__show', 'popup__hide');
    });
});

popupModal.addEventListener('click', (e) => {
    if (e.target == popupModal) {
        closeModal(popupModal, 'popup__hide', 'popup__show');
    }
});

signInButton.addEventListener('click', () => {
    if ((email.value.length != 0) & (password.value.length != 0)) {
        alert(`Ваш email: ${email.value}\nВаш пароль: ${password.value}`);
    } else {
        alert('Данные для входа не введены');
    }
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerButtonIndex++;

    if (registerButtonIndex % 2 != 0) {
        renderRegisterModal();
    } else {
        renderLoginModal();
    }
});


function showModal(target, add, remove) {
    target.classList.add(add);
    target.classList.remove(remove);
}

function closeModal(target, add, remove) {
    target.classList.add(add);
    target.classList.remove(remove);
}

function renderRegisterModal() {
    formHeader.innerHTML = 'Create account';
    loginOptions.style.display = 'none';
    crossline.style.display = 'none';
    signInButton.innerHTML = 'Sign Up';
    passwordButton.style.display = 'none';
    registerInner.innerHTML = 'Already have an account?';
    registerLink.innerHTML = 'Log In';
}

function renderLoginModal() {
    formHeader.innerHTML = 'Log in to your account';
    loginOptions.style.display = 'flex';
    crossline.style.display = 'flex';
    signInButton.innerHTML = 'Sign In';
    passwordButton.style.display = 'block';
    registerInner.innerHTML = 'Don’t have an account?';
    registerLink.innerHTML = 'Register';
}

// Mobile Slider

const mobile = document.querySelector('.destinations__mobile'),
    prev = mobile.querySelector('.arrow__left'),
    next = mobile.querySelector('.arrow__right'),
    mobileWrapper = mobile.querySelector('.destinations__wrapper'),
    mobileField = mobileWrapper.querySelector('.container__destinations'),
    mobileSlides = mobileField.querySelectorAll('.container__destinations--item'),
    mobileDots = mobile.querySelectorAll('.switchers__ellipse'),
    mobileWidth = window.getComputedStyle(mobileWrapper).width;

let slideIndex = 1,
    offset = 0,
    initialPoint,
    finalPoint;

mobileField.addEventListener('touchstart', function (e) {
    e.stopPropagation();
    initialPoint = e.changedTouches[0];
}, false);
mobileField.addEventListener('touchend', function (e) {
    e.preventDefault();
    e.stopPropagation();
    finalPoint = e.changedTouches[0];
    let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    if (xAbs > 20) {
        if (finalPoint.pageX < initialPoint.pageX) {
            if (offset != +mobileWidth.replace(/\D/g, '') * (mobileSlides.length - 1)) {
                offset += +mobileWidth.replace(/\D/g, '');
            }

            mobileField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex != mobileSlides.length) {
                slideIndex++;
            }

            changeSliderColor();
        }
        else {
            if (offset != 0) {
                offset -= +mobileWidth.replace(/\D/g, '');
            }

            mobileField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex != 1) {
                slideIndex--;
            }

            changeSliderColor();
        }
    }
}, false);

mobileField.style.width = 100 * mobileSlides.length + '%';

mobileSlides.forEach(slide => {
    slide.style.width = mobileWidth;
});

next.addEventListener('click', () => {
    if (offset != +mobileWidth.replace(/\D/g, '') * (mobileSlides.length - 1)) {
        offset += +mobileWidth.replace(/\D/g, '');
    }

    mobileField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex != mobileSlides.length) {
        slideIndex++;
    }

    changeSliderColor();
});

prev.addEventListener('click', () => {
    if (offset != 0) {
        offset -= +mobileWidth.replace(/\D/g, '');
    }

    mobileField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex != 1) {
        slideIndex--;
    }

    changeSliderColor();
});

mobileDots.forEach((dot, i) => {
    dot.setAttribute('data-slide-to', i + 1);
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;

        offset = +mobileWidth.replace(/\D/g, '') * (slideTo - 1);

        mobileField.style.transform = `translateX(-${offset}px)`;
        changeSliderColor();
    });
});

changeSliderColor();

function changeSliderColor() {
    if (slideIndex == 1) {
        next.style.opacity = 1;
        prev.style.opacity = 0.5;
    } else if (slideIndex == mobileSlides.length) {
        prev.style.opacity = 1;
        next.style.opacity = 0.5;
    } else {
        prev.style.opacity = 1;
        next.style.opacity = 1;
    }
    mobileDots.forEach(dot => {
        dot.style.opacity = 0.5;
    });
    mobileDots[slideIndex - 1].style.opacity = 1;
}

// Desktop Slider

const desktop = document.querySelector('.destinations__desktop'),
    desktopWrapper = desktop.querySelector('.destinations__wrapper'),
    desktopDots = desktop.querySelectorAll('.switchers__ellipse');

let desktopIndex = 2,
    desktopOffset = 0,
    moveIndex = 0,
    desktopSlide,
    desktopSlides = desktop.querySelectorAll('.container__destinations--item'),
    slideImg = desktop.querySelector('img'),
    desktopField = desktop.querySelector('.container__destinations'),
    desktopLeft = desktop.querySelector('.destinations__left'),
    desktopRight = desktop.querySelector('.destinations__right'),
    gap;

desktopWrapper.style.display = 'flex';
desktopWrapper.style.justifyContent = 'center';

desktopSlides.forEach(slide => {
    desktopSlide = replace(slide);
});

gap = +window.getComputedStyle(desktopField).gap.replace(/\D/g, '');

countNavigationWidth(desktopLeft);
countNavigationWidth(desktopRight);

desktopRight.addEventListener('click', () => {
    desktopOffset += (desktopSlide + gap);

    moveSlide();
    addSlides();

    if (desktopIndex != desktopSlides.length) {
        desktopIndex++;
    } else {
        desktopIndex = 1;
    }

    deleteWasteSlides();
    changeDotsStyle();
});

desktopLeft.addEventListener('click', () => {
    desktopOffset -= (desktopSlide + gap);

    moveSlide();

    if (desktopIndex != 1) {
        desktopIndex--;
    } else {
        desktopIndex = desktopSlides.length;
    }

    addSlides();
    deleteWasteSlides();
    changeDotsStyle();
});

desktopDots.forEach((dot, i) => {
    dot.setAttribute('data-slide-to', i + 1);
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        desktopIndex = slideTo;
        desktopOffset = (desktopSlide + gap) * (slideTo - 2);

        moveSlide();
        addSlides();
        changeDotsStyle();
    });
});

changeDotsStyle();

function countNavigationWidth(direction) {
    direction.style.width = ((replace(desktopWrapper) - (desktopSlide + 2 * gap)) / 2) + 'px';
    direction.style.height = (+window.getComputedStyle(slideImg).height.replace(/\D/g, '')) + 'px';
}

function replace(item) {
    return +window.getComputedStyle(item).width.replace(/\D/g, '');
}

function moveSlide() {
    if (desktopOffset > 0) {
        desktopField.style.transform = `translateX(-${desktopOffset}px)`;
    } else {
        desktopField.style.transform = `translateX(${-desktopOffset}px)`;
    }
}

function addSlides() {
    for (let i = 0; i < 3; i++) {
        let card = document.createElement("div");
        card.classList.add('container__destinations--item');
        card.innerHTML = `<img src="img/destination${i + 1}.jpg">`;
        if (i == 0) card.innerHTML += `<h3>SPAIN</h3>`;
        if (i == 1) card.innerHTML += `<h3>JAPAN</h3>`;
        if (i == 2) card.innerHTML += `<h3>USA</h3>`;
        desktopField.append(card);
    }
    for (let i = 2; i >= 0; i--) {
        let card = document.createElement("div");
        card.classList.add('container__destinations--item');
        card.innerHTML = `<img src="img/destination${i + 1}.jpg">`;
        if (i == 0) card.innerHTML += `<h3>SPAIN</h3>`;
        if (i == 1) card.innerHTML += `<h3>JAPAN</h3>`;
        if (i == 2) card.innerHTML += `<h3>USA</h3>`;
        desktopField.prepend(card);
    }
}

function changeDotsStyle() {
    desktopDots.forEach(dot => {
        dot.style.opacity = 0.5;
    });
    desktopDots[desktopIndex - 1].style.opacity = 1;
}

function deleteWasteSlides() {
    (moveIndex < 2) || (moveIndex == 1) ? moveIndex++ : moveIndex--;

    const newCards = desktop.querySelectorAll('.container__destinations--item');

    if (moveIndex == 2) {
        for (let i = 0; i < desktopSlides.length; i++) {
            newCards[i].remove();
        }
        for (let i = newCards.length - 1; i >= (newCards.length - desktopSlides.length); i--) {
            newCards[i].remove();
        }
    }
}

console.log(`Ваша оценка - 125 баллов
Отзыв по пунктам ТЗ:
Выполненные пункты:
1) на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели(например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа)

2) Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края)

3) Анимации плавного перемещения для слайдера

4) логин попап соответствует верстке его закрытие происходит при клике вне попапа

5) логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег)

6) Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение)

`);




