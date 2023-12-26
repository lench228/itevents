const renderDate = (card, currentCard) => { 
    const dateElement = currentCard.querySelector('.date');
    dateElement.querySelector('.date__day-start').textContent = card.date.startDate;
    dateElement.querySelector('.date__day-end').textContent = card.date.endDate;
    dateElement.querySelector('.date__month').textContent = card.date.month;
};

export {renderDate}