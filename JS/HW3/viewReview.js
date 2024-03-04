/*
Страница просмотра отзывов:

Показывает список всех продуктов, о которых были оставлены отзывы.
При клике на название продукта отображается список всех отзывов по этому продукту.
Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).
*/
const productList = document.querySelector(".review__product-list");
const productNames = Object.keys(localStorage);

// Добавление названия продуктов в HTML
productList.innerHTML = productNames.map(addProductNamesHTML).join("");
// console.log(productList);
// console.log(productNames);
function addProductNamesHTML(productName) {
    return `<ul class="productname">${productName}</ul>`;
}

productList.addEventListener("click", ({ target }) => {
    const chosenProduct = target.innerHTML;
    if (localStorage.getItem(chosenProduct)) {
        const reviewsList = JSON.parse(localStorage.getItem(chosenProduct));
        for (const iterator of reviewsList) {
            const review = document.createElement("li");
            review.classList.add("review");
            review.textContent = iterator;

            const removeButton = document.createElement("button");
            removeButton.classList.add("button-remove");
            removeButton.addEventListener("click", removeChosenReview);
            removeButton.textContent = "Удалить";
            target.append(review, removeButton);
        }
    }
})

function removeChosenReview(event) {
    const review = event.target.previousSibling;
    const removeReviewInLocalStorage = event.target.parentNode.firstChild.textContent;
    const reviewsList = JSON.parse(localStorage.getItem(removeReviewInLocalStorage));

    const reviewIndexInArrayOfValues = reviewsList.indexOf(review.innerHTML);
    reviewsList.splice(reviewIndexInArrayOfValues, 1);
    localStorage.setItem(removeReviewInLocalStorage, JSON.stringify(reviewsList));

    event.target.remove();
    review.remove();
}
