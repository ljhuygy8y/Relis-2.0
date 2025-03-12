// Вибирає всі слайди з класом 'reviews-slide'
const reviewsSlides = document.querySelectorAll('.reviews-slide');

// Вибирає кнопку для переходу до попереднього слайда
const reviewsPrevBtn = document.querySelector('.reviews-prev-btn');

// Вибирає кнопку для переходу до наступного слайда
const reviewsNextBtn = document.querySelector('.reviews-next-btn');

// Вибирає елемент для відображення номера поточного слайда
const reviewsCounter = document.querySelector('.reviews-counter');

// Ініціалізує змінну для відстеження поточного індексу слайда
let reviewsCurrentIndex = 0;

// Функція для оновлення слайдера
function updateReviewsSlider() {
    // Отримує ширину одного слайда
    const reviewsSlideWidth = reviewsSlides[0].clientWidth;

    // Переміщує слайдер, щоб показати поточний слайд
    document.querySelector('.reviews-slider').style.transform = 
        `translateX(-${reviewsCurrentIndex * reviewsSlideWidth}px)`;

    // Оновлює лічильник слайдів
    reviewsCounter.textContent = `${reviewsCurrentIndex + 1} / ${reviewsSlides.length}`;
}

// Додає обробник події для кнопки переходу до наступного слайда
reviewsNextBtn.addEventListener('click', () => {
    // Збільшує індекс слайда, переходить до наступного слайда, обчислюючи новий індекс
    reviewsCurrentIndex = (reviewsCurrentIndex + 1) % reviewsSlides.length;
    // Оновлює слайдер
    updateReviewsSlider();
});

// Додає обробник події для кнопки переходу до попереднього слайда
reviewsPrevBtn.addEventListener('click', () => {
    // Зменшує індекс слайда, переходить до попереднього слайда, обчислюючи новий індекс
    reviewsCurrentIndex = (reviewsCurrentIndex - 1 + reviewsSlides.length) % reviewsSlides.length;
    // Оновлює слайдер
    updateReviewsSlider();
});

// Викликає функцію для початкового оновлення слайдера
updateReviewsSlider();