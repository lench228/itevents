const cardTemplate = document.querySelector('#open-card__template');
const body = document.querySelector('body');
const popupCard = document.querySelector('.open__card');
const openPopup = (card) => {
    body.classList.add('modal-open');
    popupCard.classList.remove('hidden');
}

export {openPopup as openPage};