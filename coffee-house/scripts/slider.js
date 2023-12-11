// Slider

const slider = document.querySelector('.slider-block');
const sliderList = slider.querySelector('.list');
const slides = slider.querySelectorAll('.slide');
const buttonNextNode = slider.querySelector('.arrow.--next');
const buttonPrevNode = slider.querySelector('.arrow.--prev');
const progressBar = slider.querySelector('.progress-bar');
const bullets = progressBar.querySelectorAll('.progress-control');


let currentSlide = 0;

let slidesLength = slides.length - 1;

// Bullets

const setBullet = () => {
    bullets.forEach((bullet, index) => {
        if (currentSlide === index) {
            bullet.classList.add('current');
        } else {
            bullet.classList.remove('current');
            bullet.firstElementChild.style.width = '0%';
        }
    });
}

const prepareSlider = () => {

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });

    setBullet();
}

const toNextSlide = () => {
    if (currentSlide === slidesLength) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });

    progressTime = 0;
    setBullet();
}

const toPrevSlide = () => {
    if (currentSlide === 0) {
        currentSlide = slidesLength;
    } else {
        currentSlide--;
    }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });

    progressTime = 0;
    setBullet();
}

buttonNextNode.addEventListener('click', () => {
    toNextSlide();
});
buttonPrevNode.addEventListener('click', () => {
    toPrevSlide();
});


//Swipe
const swipeDistance = 100; // Min swipe distance
let startSwipe = null;

const calculateSwipeDirection = (direction) => {
    let difference = startSwipe - direction;

    if (Math.abs(difference) > swipeDistance) {
        difference > 0 ? toNextSlide() : toPrevSlide();

        startSwipe = null;
    }
}

sliderList.addEventListener('touchstart', (e) => {
    startSwipe = e.touches[0].clientX;
});
sliderList.addEventListener('mousedown', (e) => {
    startSwipe = e.clientX;
});

sliderList.addEventListener('touchmove', (e) => {
    if (!startSwipe) {
        return;
    }

    calculateSwipeDirection(e.touches[0].clientX);
});

sliderList.addEventListener('mousemove', (e) => {
    if (!startSwipe) {
        return;
    }

    calculateSwipeDirection(e.clientX);
});

sliderList.addEventListener('mouseup', () => {
    startSwipe = null;
});

// image slider autoplay
const AUTOPLAY_SPEED = 5000;
let autoplayInterval;
let progressPaused = false;
let progressTime = 0;

const runAutoPlay = () => {
    autoplayInterval = setInterval(() => {
        if(!progressPaused) {
            progressTime++;

            bullets[currentSlide].firstElementChild.style.width = `${Math.round(progressTime * 2)}%`;

            if (progressTime === AUTOPLAY_SPEED / 100) {
                bullets[currentSlide].firstElementChild.style.width = `0%`;
                toNextSlide();
                progressTime = 0;
            }
        }

    }, 100);
}


//stop the image slider autoplay 
sliderList.addEventListener('mouseover', () => {
    progressPaused = true;
});

sliderList.addEventListener('touchstart', () => {
    progressPaused = true;
});

//start the image slider autoplay again
sliderList.addEventListener('mouseout', () => {
    progressPaused = false;
});

sliderList.addEventListener('touchend', () => {
    progressPaused = false;
});


// Init slider
prepareSlider();
runAutoPlay();