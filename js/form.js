const BASEURL = 'http://193.168.49.120:3000';

document.querySelector('.form').addEventListener('submit', async (event)  => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const formObject = {};
    formData.forEach(function(value, key){
        // if (key === 'event_startdate' || key === 'event_enddate') {

        // }
        formObject[key] = value;
    });

    const selectedTags = Array.from(document.querySelectorAll('.form__tags input[type="checkbox"]:checked'))
    .map(tag => tag.value);

    formObject['event_tags'] = selectedTags.join('_');

    console.log(formObject);

    try {
        const response = await fetch(`${BASEURL}/api/v1/create-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }

    //this.validate();
});
