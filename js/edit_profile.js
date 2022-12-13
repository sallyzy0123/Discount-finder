'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const user_id = getQParam('id');

// select existing html elements
const formContent = document.querySelector('.form_content');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// add existing user data to form
const getUser = async (user) => {
  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user', options);
    const inputs = formContent.querySelectorAll('input');
    inputs[0].value = user.Username;
    inputs[1].value = user.Email;
    inputs[2].value = user.password;
    // not sure what to do for photo
    // const users = await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

// submit modify form
formContent.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(formContent);
    // remove empty properties
    for (const [prop, value] of Object.entries(data)) {
      if (value === '') {
        delete data[prop];
      }
    }
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    };
  
    console.log(fetchOptions);
    const response = await fetch(url + '/user/' + cat_id, fetchOptions);
    const json = await response.json();
    if (json.error) {
      alert(json.error.message);
    } else {
      alert(json.message);
    }
    location.href = 'profile.html';
});