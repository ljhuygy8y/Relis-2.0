// Функція ініціалізації слайдера
const initSlider = () => {
    // Вибирає частини дочірніх елементів слайдера
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".slider-scrollbar");
    const scrollbarThumb = document.querySelector(".slider-scrollbar .scrollbar-thumb");

    // Перевіряє, чи всі необхідні елементи знайдено
    if (!imageList || !slideButtons.length  || !sliderScrollbar || !scrollbarThumb) {
        console.error("Один з елементів слайдера відсутній!");
        return;
    }

    // Максимальна прокрутка
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Обробник події для пересування повзунка
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Обмежуємо переміщення повзунка в межах доріжки
            const maxThumbPosition = sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(newThumbPosition, maxThumbPosition));

            scrollbarThumb.style.left = `${boundedPosition}px`;

            // Прокручуємо слайди відповідно до позиції повзунка
            imageList.scrollLeft = (boundedPosition / maxThumbPosition) * maxScrollLeft;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Додає обробник подій на кнопки для прокручування
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });

            // Оновлює максимальну прокрутку після руху
            handleSlideButtons();
            updateScrollThumbPosition();
        });
    });

    // Оновлює видимість кнопок прокрутки
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Оновлює позицію повзунка під час прокручування
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Додає подію на скрол для оновлення елементів
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Викликає оновлення після завантаження сторінки
    handleSlideButtons();
    updateScrollThumbPosition();
};

// Ініціалізує слайдер після завантаження сторінки
window.addEventListener("load", initSlider);
