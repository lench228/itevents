import{createCard} from './data.js';
import {renderCards} from './cards.js';

async function getRecommendations() {
    const userId = localStorage.getItem('user_id');

    fetch('http://193.168.49.120/api/v1/recommended-events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId }),
    })
    .then(response => response.json())
    .then(data => {
        events = data.recommendations;

        let cards = [];
        const filteredStoredEvents = initialEvents
        .filter(storedEvent => events.includes(storedEvent.event_id))
        .sort((a, b) => {
            const indexA = events.indexOf(a.event_id);
            const indexB = events.indexOf(b.event_id);
        
            return indexA - indexB;
          });

        for(let i= 0; i < filteredStoredEvents.length; i++) {
            cards[i] = createCard(filteredStoredEvents[i], i);
        }

        renderCards(cards);
    })
}

const filterButtons = document.querySelectorAll('.filter__elem-btn');

/// КНОПКИ фильтров
const allEventsFilterButton = document.getElementById('filters_default');
const selectPlatformButton = document.getElementById('filter__platform-select');
const selectTypesButton = document.getElementById('filter__types-select');
const selectTagsButton = document.getElementById('filter__tags-select');

const storedEvents = localStorage.getItem('fetchedEvents');
const initialEvents = storedEvents ? JSON.parse(storedEvents) : [];
let events = [];

// возможно стоит переделать
selectPlatformButton.addEventListener('change', () => {
    if (selectPlatformButton.value === 'online') {
        events = initialEvents.filter(event => event.event_platform === 'Заочная форма проведения');
    }
    else if (selectPlatformButton.value === 'offline') {
        events = initialEvents.filter(event => event.event_platform === 'Очная форма проведения');
    }
    
    let cards = [];

    for(let i= 0; i < events.length; i++) {
        cards[i] = createCard(events[i], i);
    }

    renderCards(cards);
});

// вроде все правильно
selectTagsButton.addEventListener('change', function() {
    // Получить все выбранные опции
    const selectedOptions = Array.from(selectTagsButton.selectedOptions).map(option => option.value);

    events = initialEvents.filter(event => {
        // Проверяем, есть ли хотя бы один выбранный тег в поле event_tags текущего объекта
        return selectedOptions.some(selectedTag => event.event_tags.includes(selectedTag));
    });

    let cards = [];

    for(let i= 0; i < events.length; i++) {
        cards[i] = createCard(events[i], i);
    }

    renderCards(cards);
});

// тут все правильно
selectTypesButton.addEventListener('change', () => {
    const type = selectTypesButton.value;

    events = initialEvents.filter(event => event.event_type === type);

    let cards = [];

    for(let i= 0; i < events.length; i++) {
        cards[i] = createCard(events[i], i);
    }

    renderCards(cards);
});

let currentInactiveButton = filterButtons[1];
let currentActiveButton = filterButtons[0];

currentActiveButton.style.backgroundColor = '#fff';
currentActiveButton.style.color = '#E58CC5';

// тут все правильно
const onFilterBtnClick = (evt) => {
    evt.preventDefault();
    const clickedButton = evt.currentTarget;

    if (clickedButton !== currentActiveButton) {
        currentInactiveButton = currentActiveButton;
        currentActiveButton = clickedButton;

        currentInactiveButton.style.backgroundColor = '#E58CC5';
        currentInactiveButton.style.color = '#fff';

        currentActiveButton.style.backgroundColor = '#fff';
        currentActiveButton.style.color = '#E58CC5';
    }

    if (clickedButton.dataset.filter === 'all') {
        let cards = [];

        for(let i= 0; i < initialEvents.length; i++) {
            cards[i] = createCard(initialEvents[i], i);
        }

        renderCards(cards);
    }
    else if (clickedButton.dataset.filter === 'recommended') {
        console.log(2);
    
        getRecommendations();
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', onFilterBtnClick);
});