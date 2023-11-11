
const cardFragments = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card__template').content.querySelector('a');

const createCard  = (card) => {
    let currentCard = cardTemplate.cloneNode(1);
    currentCard.querySelector('.card__title').textContent = card.title;
    currentCard.querySelector('.card__number').textContent = `0${card.id}`;
    currentCard.querySelector('.card__image').src= card.url;
    currentCard.querySelector('.card__type').textContent= card.type;
    currentCard.querySelector('.card__description').textContent = card.description;
    currentCard.querySelector('.card__date').textContent = card.date;

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