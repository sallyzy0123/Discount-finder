'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const regForm = document.querySelector('#addUserForm');

// submit register form
regForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(regForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = await response.json();
    alert(json.message);
    if (json.message == "user created") {
        location.href = '../html/sign_in_page.html';
    }
});
