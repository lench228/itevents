import {openPage} from './card-popup.js';
import { createTags } from './create-tags.js';
import {renderDate} from './date-ivents.js';

const cardFragments = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card__template').content.querySelector('div');




const createCard  = (card) => {
    let currentCard = cardTemplate.cloneNode(true);
    let tagsContainer = currentCard.querySelector('.tags'); 
    tagsContainer.innerHTML = ''; 

    currentCard.querySelector('.card__title').textContent = card.title;
    currentCard.querySelector('.card__number').textContent = `0${card.id}`;
    currentCard.querySelector('.card__image').src= card.url;
    currentCard.querySelector('.card__type').textContent= card.type;
    currentCard.querySelector('.card__description').textContent = card.description;

    const onCardClick = () => {
        openPage(card);
    };

    renderDate(card, currentCard);

    currentCard.addEventListener('click', onCardClick);

    tagsContainer.append(createTags(card));

    cardFragments.append(currentCard);
}

const createCards = (cards) => {
    const cardsContainer = document.querySelector('.cards');
    cards.forEach((card) => {
        createCard(card);
    });

    cardsContainer.append(cardFragments)
}

export {createCards as renderCards}