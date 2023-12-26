document.querySelectorAll('.entrance__option').forEach(elem => elem.addEventListener('click', selectOption));

function toggleActiveClass(elements, target) {
    elements.forEach(elem => {
        if (elem !== target) {
            elem.classList.remove('entrance__active');
        }
    });
}

function selectOption(evt) {
    evt.preventDefault();
    const entranceOptions = document.querySelectorAll('.entrance__option');
    document.getElementById('user__type').value = evt.target.name;
    toggleActiveClass(entranceOptions, evt.currentTarget);
    evt.currentTarget.classList.add('entrance__active');
}

document.querySelector('.modal__register').addEventListener('submit', async (event)  => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const formObject = {};
    formData.forEach(function(value, key){
        value = (value === '') ? 'user' : value;
        formObject[key] = value;
    });

    console.log(formObject);

    try {
        const response = await fetch('http://localhost:3000/test/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        const data = await response.json();
        console.log(data);
        window.location.href = "index.html";
    } catch (err) {
        console.log(err);
    }

    //this.validate();
});

