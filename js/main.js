import './hero_rotate.js';
import{createCard} from './data.js';
import {renderCards} from './cards.js';
import './filters.js';

const loginButton = document.querySelector('.hero__links a:first-child');
const registerButton = document.querySelector('.hero__links-right a:first-child');
const addEventButton = document.querySelector('.hero__button');

const participateButton = document.getElementById('button__participate');


const token = localStorage.getItem('token');

function updateLocalStorage(key, item) {
    const arr = JSON.parse(localStorage.getItem(key)) || [];
    console.log(arr);
    arr.push(item);
    localStorage.setItem(key, JSON.stringify(arr));
}

participateButton.addEventListener('click', (e) => {
    if (token) {
        const target = e.target;

        const cardId = target.closest('.open__card').dataset.id;
        console.log(cardId);
        const eventId = events[cardId - 1].event_id;

        const userId = localStorage.getItem('user_id');

        if (localStorage.getItem('likedEvents')) {
            const storagedEvents = JSON.parse(localStorage.getItem('likedEvents'));
            const foundEvent = storagedEvents.find(event => event.event_id === eventId);
            if (foundEvent) {   
                const filteredEvents = storagedEvents.filter(event => event !== foundEvent);
                localStorage.setItem('likedEvents', JSON.stringify(filteredEvents));

                target.innerHTML = `Пойду
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 55 30" fill="none">
                        <path d="M53.6929 16.3708C54.474 15.5897 54.474 14.3234 53.6929 13.5423L40.965 0.814407C40.1839 0.0333586 38.9176 0.0333586 38.1366 0.814407C37.3555 1.59546 37.3555 2.86179 38.1366 3.64283L49.4503 14.9565L38.1366 26.2703C37.3555 27.0513 37.3555 28.3176 38.1366 29.0987C38.9176 29.8797 40.1839 29.8797 40.965 29.0987L53.6929 16.3708ZM0.256836 16.9565L52.2787 16.9565V12.9565L0.256836 12.9565L0.256836 16.9565Z" fill="white"/>
                      </svg>`;
                console.log('Такой ивент уже добавлен!');
                
                fetch('http://localhost:3000/test/dislike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: userId, event_id: events[cardId - 1].event_id }),
                });
                return;
            }
            
        } 
    

        // console.log(eventId);
        // likedEvents.push(events[cardId - 1]);
        // console.log(events[cardId - 1]);

        // // localStorage.setItem('likedEvents', JSON.stringify(likedEvents));

        // console.log(JSON.parse(localStorage.getItem('likedEvents')));
        updateLocalStorage('likedEvents', events[cardId - 1]);
        target.innerHTML = `Не пойду
        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 55 30" fill="none">
                <path d="M53.6929 16.3708C54.474 15.5897 54.474 14.3234 53.6929 13.5423L40.965 0.814407C40.1839 0.0333586 38.9176 0.0333586 38.1366 0.814407C37.3555 1.59546 37.3555 2.86179 38.1366 3.64283L49.4503 14.9565L38.1366 26.2703C37.3555 27.0513 37.3555 28.3176 38.1366 29.0987C38.9176 29.8797 40.1839 29.8797 40.965 29.0987L53.6929 16.3708ZM0.256836 16.9565L52.2787 16.9565V12.9565L0.256836 12.9565L0.256836 16.9565Z" fill="white"/>
              </svg>`;

        fetch('http://localhost:3000/test/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: userId, event_id: events[cardId - 1].event_id }),
        });
    } 
});

async function getUserNickname() {
    if (token) {
        const response = await fetch('http://localhost:3000/test/oneuser', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    });
        const data = await response.json();
        console.log(data);
        const username = data.username;
        const id = data.id;
        loginButton.textContent = username;
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', id);
        registerButton.innerHTML = '';
    }
    else {
        addEventButton.classList.add('unactive');
    }
}

getUserNickname();

let cards = [];
let events = [];

function fetchEvents() {
    return fetch('http://193.168.49.120:3001/api/v1.0/events');
}




fetchEvents()
.then(res => res.json())
.then(data => {
    events = data;
    localStorage.setItem('fetchedEvents', JSON.stringify(events));

    for(let i= 0; i < events.length; i++) {
        cards[i] = createCard(events[i], i);
        console.log(1);
    }

    console.log(events);

    renderCards(cards);
});




