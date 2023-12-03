


document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    const formObject = {};
    formData.forEach(function(value, key){
        formObject[key] = value;
    });

    const selectedTags = Array.from(document.querySelectorAll('.form__tags input[type="checkbox"]:checked'))
    .map(tag => tag.value);

    formObject['tags'] = selectedTags;

    console.log(formObject);

    //this.validate();
});
