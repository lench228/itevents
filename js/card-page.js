
const cardsDom = document.querySelectorAll('.cards');

const onPageOpen = () => {
    console.log('BEKPSAKDKF');
}

const openPage = (cards) => {
    console.log(cardsDom);
    cardsDom.forEach((card) => {
        card.addEventListener("click", onPageOpen);
        console.log(card);
    });
}

export {openPage};