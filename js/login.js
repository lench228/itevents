const BASEURL = 'http://193.168.49.120';

document.querySelector('.modal__login').addEventListener('submit', async (event)  => {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log(11);
    
    const formObject = {};
    formData.forEach(function(value, key){
        formObject[key] = value;
        console.log(value);
    });

    console.log(formObject);

    try {
        const response = await fetch(`${BASEURL}/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.href = "index.html";
    } catch (err) {
        console.log(err);
    }

    //this.validate();
});