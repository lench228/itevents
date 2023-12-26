const filterButtons = document.querySelectorAll('.filter__elem-btn');

let currentInactiveButton = filterButtons[1];
let currentActiveButton = filterButtons[0];

// Установка начальных стилей для currentActiveButton
currentActiveButton.style.backgroundColor = '#fff';
currentActiveButton.style.color = 'white';

const onFilterBtnClick = (evt) => {
    const clickedButton = evt.currentTarget;

    if (clickedButton !== currentActiveButton) {
        currentInactiveButton = currentActiveButton;
        currentActiveButton = clickedButton;

        currentInactiveButton.style.backgroundColor = '#E58CC5';
        currentInactiveButton.style.color = '#fff';

        currentActiveButton.style.backgroundColor = '#fff';
        currentActiveButton.style.color = 'white';
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', onFilterBtnClick);
});