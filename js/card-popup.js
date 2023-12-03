import { createTags } from "./create-tags.js";
import { renderDate } from "./date-ivents.js";

const body = document.querySelector('body');
const popupCard = document.querySelector('.open__card');
const tagsContainer = popupCard.querySelector('.tags');

const popupDescription = popupCard.querySelector('.open-card-description')
const popupTitle = popupCard.querySelector('.open-card__title');
const popupPlace=  popupCard.querySelector('.open-card-place');
const popupAdres = popupCard.querySelector('.open-card-adres');
const popupOrg = popupCard.querySelector('.open-card-org');
const popupImg = popupCard.querySelector('.open-card__image')

const popupCloseBtn = popupCard.querySelector('.close-modal');

const closePopup = () => {
    body.classList.remove('modal-open');
    popupCard.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeyDown);
    popupCloseBtn.removeEventListener('click', onCloseBtnClick);

}

const onDocumentKeyDown = (evt) =>{
    if(evt.key === 'Escape'){
        evt.preventDefault();
        closePopup();
    }
}
const onCloseBtnClick = (evt) =>{
    evt.preventDefault();
    closePopup();
}

const renderPopup = (card) => {
    popupDescription.textContent = card.description;
    popupTitle.textContent = card.title;
    popupPlace.textContent = card.format;
    popupAdres.textContent = card.adres;
    popupOrg.textContent = card.org;


    popupImg.src = card.url;
    
    tagsContainer.append(createTags(card));

    renderDate(card, popupCard);
    popupCloseBtn.addEventListener('click', onCloseBtnClick)
    document.addEventListener('keydown', onDocumentKeyDown)
}

const openPopup = (card) => {
    tagsContainer.innerHTML = ''; 
    body.classList.add('modal-open');
    popupCard.classList.remove('hidden');
    renderPopup(card);
}





export {openPopup as openPage};