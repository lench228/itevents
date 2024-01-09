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

const participateButton = document.getElementById('button__participate');

const closePopup = () => {
    body.classList.remove('modal-open');
    popupCard.classList.add('hidden');
    popupCard.dataset.id = '';
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onBodyClick, true);

}

const onDocumentKeyDown = (evt) =>{
    if(evt.key === 'Escape'){
        evt.preventDefault();
        closePopup();
    }
}
const onBodyClick = (evt) =>{
    evt.preventDefault();
    console.log(evt.target);
    if( !evt.target.classList[0].startsWith('open-') && body.classList.contains('modal-open')){
        console.log(body.classList);
        closePopup();
    }
}

const renderPopup = (card) => {
    popupCard.dataset.id = card.id;
    popupDescription.textContent = card.description;
    popupTitle.textContent = card.title;
    popupPlace.textContent = card.format;
    popupAdres.textContent = card.address;
    popupOrg.textContent = card.org;

    
    if (localStorage.getItem('likedEvents')) {
        const storagedEvents = JSON.parse(localStorage.getItem('likedEvents'));
        const index = card.id - 1; // Предполагая, что card.id - 1 является корректным индексом.
    
        if (index >= 0 && index < storagedEvents.length) {
            const eventId = storagedEvents[index].event_id;
            console.log(eventId);
    
            const foundEvent = storagedEvents.find(event => event.event_id === eventId);
            if (foundEvent) {  
                console.log(1111) 
                participateButton.innerHTML = `Не пойду
                <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 55 30" fill="none">
                        <path d="M53.6929 16.3708C54.474 15.5897 54.474 14.3234 53.6929 13.5423L40.965 0.814407C40.1839 0.0333586 38.9176 0.0333586 38.1366 0.814407C37.3555 1.59546 37.3555 2.86179 38.1366 3.64283L49.4503 14.9565L38.1366 26.2703C37.3555 27.0513 37.3555 28.3176 38.1366 29.0987C38.9176 29.8797 40.1839 29.8797 40.965 29.0987L53.6929 16.3708ZM0.256836 16.9565L52.2787 16.9565V12.9565L0.256836 12.9565L0.256836 16.9565Z" fill="white"/>
                      </svg>`;
            } 
        } 
        else {
            participateButton.innerHTML = `Пойду
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="30" viewBox="0 0 55 30" fill="none">
                    <path d="M53.6929 16.3708C54.474 15.5897 54.474 14.3234 53.6929 13.5423L40.965 0.814407C40.1839 0.0333586 38.9176 0.0333586 38.1366 0.814407C37.3555 1.59546 37.3555 2.86179 38.1366 3.64283L49.4503 14.9565L38.1366 26.2703C37.3555 27.0513 37.3555 28.3176 38.1366 29.0987C38.9176 29.8797 40.1839 29.8797 40.965 29.0987L53.6929 16.3708ZM0.256836 16.9565L52.2787 16.9565V12.9565L0.256836 12.9565L0.256836 16.9565Z" fill="white"/>
                  </svg>`;
        }
    }
    

    popupImg.src = card.url;
    
    tagsContainer.append(createTags(card));

    renderDate(card, popupCard);
}

const openPopup = (card) => {
    tagsContainer.innerHTML = ''; 
    popupCard.classList.remove('hidden');
    renderPopup(card);

    document.addEventListener('keydown', onDocumentKeyDown)
    document.addEventListener('click', onBodyClick, true)


    body.classList.add('modal-open');
}





export {openPopup as openPage};