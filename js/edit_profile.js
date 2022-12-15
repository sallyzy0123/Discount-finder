'use strict';
const url = 'https://discount-finder.northeurope.cloudapp.azure.com'; // change url when uploading to server

// select existing html elements
const formContent = document.querySelector('#form_content');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// add existing user data to form
const getUser = async (id) => {
  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user/' + id, options);
    const user = await response.json();
    const inputs = document.querySelectorAll('input');
    inputs[0].value = user.username;
    inputs[1].value = user.email;
  } catch (e) {
    console.log(e.message);
  }
};

getUser(user.UserId);

// submit modify form
formContent.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(formContent);
    const fetchOptions = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd
    };
    console.log(fetchOptions);
    const response = await fetch(url + '/user/' + user.UserId, fetchOptions);
    const json = await response.json();
    if (json.error) {
      alert(json.error.message);
    } else {
      alert(json.message);
    }
    console.log('response', json);
    location.href = url + 'profile.html';
});