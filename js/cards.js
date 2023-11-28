
const cardFragments = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card__template').content.querySelector('div');

const tagsTemplate = document.querySelector('#tags__template').content.querySelector('li');
const tagsFragment = document.createDocumentFragment();
const createTags = (currentCard) => {
    tagsFragment.innerHTML = '';
    const tags = currentCard.tags; 

   console.log(tags);
    
    tags.forEach((tag) => {
        let tagElement = tagsTemplate.cloneNode(true);
        tagElement.querySelector('a').textContent = tag;
        tagsFragment.appendChild(tagElement);
    });
    return(tagsFragment);
    
};

const createCard  = (card) => {
    let currentCard = cardTemplate.cloneNode(true);
    let tagsContainer = currentCard.querySelector('.tags'); 
    tagsContainer.innerHTML = ''; 

    currentCard.querySelector('.card__title').textContent = card.title;
    currentCard.querySelector('.card__number').textContent = `0${card.id}`;
    currentCard.querySelector('.card__image').src= card.url;
    currentCard.querySelector('.card__type').textContent= card.type;
    currentCard.querySelector('.card__description').textContent = card.description;
    currentCard.querySelector('.card__date').textContent = card.date;

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