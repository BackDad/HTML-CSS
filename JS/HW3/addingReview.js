/*
Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

Страница добавления отзыва:
Поле для ввода названия продукта.
Текстовое поле для самого отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.
*/
const productNameInput = document.querySelector('.productname-input');
const reviewInput = document.querySelector('.review-input');
const addBtn = document.querySelector('.addreview-btn');

// Добавление назнания продутка и отзыва
addBtn.addEventListener('click', () => {
    const productName = productNameInput.value.trim();
    const review = reviewInput.value.trim();

    if (!productName || !review) {
        alert('Вы ввели не все данные');
        return;
    }

    if (localStorage.getItem(productName)) {
        const reviewsFromLocalStorage = JSON.parse(localStorage.getItem(productName));
        reviewsFromLocalStorage.push(review);
        localStorage.setItem(productName, JSON.stringify(reviewsFromLocalStorage));
    }
    else {
        localStorage.setItem(productName, JSON.stringify([review]));
    }
    productNameInput.value = "";
    reviewInput.value = "";
});
