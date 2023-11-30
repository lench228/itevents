const tagsTemplate = document.querySelector('#tags__template').content.querySelector('li');
const tagsFragment = document.createDocumentFragment();

const createTags = (currentCard) => {
    tagsFragment.innerHTML = '';
    const tags = currentCard.tags; 
    
    tags.forEach((tag) => {
        let tagElement = tagsTemplate.cloneNode(true);
        tagElement.querySelector('a').textContent = tag;
        tagsFragment.appendChild(tagElement);
    });
    return(tagsFragment);
    
};

export{createTags};