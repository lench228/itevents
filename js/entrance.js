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