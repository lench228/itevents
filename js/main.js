import './hero_rotate.js';
import{createCard} from './data.js';
import {renderCards} from './cards.js';
import './filters.js';

const BASEURL = 'http://193.168.49.120:3000';

const loginButton = document.querySelector('.hero__links a:first-child');
const registerButton = document.querySelector('.hero__links a:last-child');
const addEventButton = document.querySelector('.hero__button');

const participateButton = document.getElementById('button__participate');

const token = localStorage.getItem('token');

function updateLocalStorage(key, item) {
    const arr = JSON.parse(localStorage.getItem(key)) || [];
    arr.push(item);
    localStorage.setItem(key, JSON.stringify(arr));
}

async function getUserNickname() {
    if (token) {
        const response = await fetch(`${BASEURL}/test/user`, {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    });
        const data = await response.json();
        const username = data.username;
        const id = data.id;
        const role = data.role;
        if (role !== 'organizer') {
            addEventButton.classList.add('unactive');
        }
        loginButton.textContent = username;
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', id);
        registerButton.innerHTML = '';
    }
    else {
        addEventButton.classList.add('unactive'); // пофиксить
    }
}

participateButton.addEventListener('click', async (e) => {
    if (!token) {
        return; 
    }

    const target = e.target;

    const eventId = +target.closest('.open__card').dataset.id;
    const userId = localStorage.getItem('user_id');

    const storagedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];

    const foundEvent = storagedEvents.find(event => event.event_id === eventId);

    if (foundEvent) {
        // Ивент уже есть в избранном
        const filteredEvents = storagedEvents.filter(event => event.event_id !== foundEvent.event_id);
        localStorage.setItem('likedEvents', JSON.stringify(filteredEvents));

        target.innerHTML = `Пойду
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 55 30" fill="none">
                <path d="M53.6929 16.3708C54.474 15.5897 54.474 14.3234 53.6929 13.5423L40.965 0.814407C40.1839 0.0333586 38.9176 0.0333586 38.1366 0.814407C37.3555 1.59546 37.3555 2.86179 38.1366 3.64283L49.4503 14.9565L38.1366 26.2703C37.3555 27.0513 37.3555 28.3176 38.1366 29.0987C38.9176 29.8797 40.1839 29.8797 40.965 29.0987L53.6929 16.3708ZM0.256836 16.9565L52.2787 16.9565V12.9565L0.256836 12.9565L0.256836 16.9565Z" fill="white"/>
            </svg>`;

        // Отправляем запрос на сервер о том, что пользователь убрал ивент из избранного
        await fetch(`${BASEURL}/test/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId, event_id: eventId }),
        });
    } else {
        // Ивент еще не в избранном

        // Находим соответствующий ивент
        const foundEvent = events.find(event => event.event_id === eventId);
        
        // Добавляем ивент в избранное в локальное хранилище
        updateLocalStorage('likedEvents', foundEvent);

        target.innerHTML = `Не пойду
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 55 30" fill="none">
                <path d="M53.6929 16.3708C54.474 15.5897 54.474 14.3234 53.6929 13.5423L40.965 0.814407C40.1839 0.0333586 38.9176 0.0333586 38.1366 0.814407C37.3555 1.59546 37.3555 2.86179 38.1366 3.64283L49.4503 14.9565L38.1366 26.2703C37.3555 27.0513 37.3555 28.3176 38.1366 29.0987C38.9176 29.8797 40.1839 29.8797 40.965 29.0987L53.6929 16.3708ZM0.256836 16.9565L52.2787 16.9565V12.9565L0.256836 12.9565L0.256836 16.9565Z" fill="white"/>
            </svg>`;

        // Отправляем запрос на сервер о том, что пользователь добавил ивент в избранное
        await fetch(`${BASEURL}/test/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: userId, event_id: eventId }),
        });
    }
});


getUserNickname();

let cards = [];
let events = [];

function fetchEvents() {
    fetch(`${BASEURL}/api/v1/all-events`)
        .then(res => res.json())
        .then(data => {
            events = data;
            localStorage.setItem('fetchedEvents', JSON.stringify(events));

            for (let i = 0; i < events.length; i++) {
                cards[i] = createCard(events[i], i);
            }

            renderCards(cards);
        });
}

fetchEvents()




