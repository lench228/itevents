import{createCard} from './data.js';
import {renderCards} from './cards.js';


const filterButtons = document.querySelectorAll('.filter__elem-btn');

/// КНОПКИ фильтров
const allEventsFilterButton = document.getElementById('filters_default');

const selectPlatformButton = document.getElementById('filter__platform-select');
const selectTypesButton = document.getElementById('filter__types-select');
// Найти элемент <select> по его ID
const selectTagsButton = document.getElementById('filter__tags-select');

// Добавить обработчик события change


const storedEvents = localStorage.getItem('fetchedEvents');
const initialEvents = storedEvents ? JSON.parse(storedEvents) : [];
let events = [];


allEventsFilterButton.addEventListener('change', () => {
    if (allEventsFilterButton.checked) {
        console.log(100000000);
    }
});


selectPlatformButton.addEventListener('change', () => {
    console.log(1)
    console.log(selectPlatformButton.value);

    if (selectPlatformButton.value === 'online') {
        events = initialEvents.filter(event => event.event_platform === 'Заочная форма проведения');
    }
    else if (selectPlatformButton.value === 'offline') {
        events = initialEvents.filter(event => event.event_platform === 'Очная форма проведения');
    }
    
    let cards = [];

    for(let i= 0; i < events.length; i++) {
        cards[i] = createCard(events[i], i);
        console.log(1);
    }

    renderCards(cards);
});

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
        console.log(1);
    }

    renderCards(cards);

    // Вывести выбранные значения в консоль (или выполнить другие действия)
    console.log(selectedOptions);
});



selectTypesButton.addEventListener('change', () => {
    const type = selectTypesButton.value;

    events = initialEvents.filter(event => event.event_type === type);

    let cards = [];

    for(let i= 0; i < events.length; i++) {
        cards[i] = createCard(events[i], i);
        console.log(1);
    }

    renderCards(cards);
});

let currentInactiveButton = filterButtons[1];
let currentActiveButton = filterButtons[0];

currentActiveButton.style.backgroundColor = '#fff';
currentActiveButton.style.color = '#E58CC5';


const onFilterBtnClick = (evt) => {
    evt.preventDefault();
    const clickedButton = evt.currentTarget;

    if (clickedButton !== currentActiveButton) {
        currentInactiveButton = currentActiveButton;
        currentActiveButton = clickedButton;

        currentInactiveButton.style.backgroundColor = '#E58CC5';
        currentInactiveButton.style.color = '#fff';
        console.log(currentInactiveButton.textContent);

        currentActiveButton.style.backgroundColor = '#fff';
        currentActiveButton.style.color = '#E58CC5';
    }

    // if (clickedButton.dataset.filter !== 'tags') {
    //     selectTagsButton.textContent = 'Теги';
    // }

    if (clickedButton.dataset.filter === 'all') {


        let cards = [];

        for(let i= 0; i < initialEvents.length; i++) {
            cards[i] = createCard(initialEvents[i], i);
            console.log(1);
        }

        renderCards(cards);
    }
    else if (clickedButton.dataset.filter === 'recommended') {
        console.log(2);
        
        
    }

    // else {

    // }
    
}

filterButtons.forEach(button => {
    button.addEventListener('click', onFilterBtnClick);
});