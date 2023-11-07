const numCards = 8; // Количество карточек
const cardsContainer = document.querySelector('.hero__cards');
const cards = cardsContainer.querySelectorAll('img'); // Выбираем карточки
const radius = 320;
cards.forEach((card, i) => {
    const angle = (Math.PI / 4) * i;
    const top = radius * Math.sin(angle);
    const left = radius * Math.cos(angle) ;
    card.style.top = `${-top - 120}px`;
    card.style.left = `${left - 60}px`;
    card.style.animation = `fadeIn 1s ease-in-out ${i*0.2}s forwards`; 
    card.addEventListener('animationend', () => {
        card.style.opacity = '1'; 
    });
});