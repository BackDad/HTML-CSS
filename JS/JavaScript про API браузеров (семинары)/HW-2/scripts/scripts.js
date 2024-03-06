const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const navDots = document.getElementById('nav-dots');
const autoSlideCheckbox = document.getElementById('autoSlide');

let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    slider.style.transform = `translateX(${-index * 100}%)`;
    updateDots(index);
}

function updateDots(index) {
    navDots.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `dot ${i === index ? 'active-dot' : ''}`;
        dot.onclick = () => showSlide(i);
        navDots.appendChild(dot);
    });
}

window.prevSlide = function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
};

window.nextSlide = function () {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
};

function toggleAutoSlide() {
    if (autoSlideCheckbox.checked) {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 500); //чтобы не ждать)
    } else {
        clearInterval(autoSlideInterval);
    }
}

showSlide(currentSlide);
