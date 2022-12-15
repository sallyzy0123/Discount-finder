'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

<<<<<<< HEAD
// get user data
const user = JSON.parse(sessionStorage.getItem('user'));
const user_Id = user.UserId;

// select existing html elements
const formContent = document.querySelector('#form_content');

// add existing user data to form
const getUser = async (id) => {
  try {
    const fetchOptions = {
=======
// select existing html elements
const formContent = document.querySelector('#form_content');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// add existing user data to form
const getUser = async (id) => {
  try {
    const options = {
>>>>>>> darjapo
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
<<<<<<< HEAD
    const response = await fetch(url + '/user/' + id, fetchOptions);
=======
    const response = await fetch(url + '/user/' + id, options);
>>>>>>> darjapo
    const user = await response.json();
    const inputs = document.querySelectorAll('input');
    inputs[0].value = user.username;
    inputs[1].value = user.email;
  } catch (e) {
    console.log(e.message);
  }
};

<<<<<<< HEAD
getUser(user_Id);
=======
getUser(user.UserId);
>>>>>>> darjapo

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
<<<<<<< HEAD
    const response = await fetch(url + '/user/' + user_Id, fetchOptions);
=======
    const response = await fetch(url + '/user/' + user.UserId, fetchOptions);
>>>>>>> darjapo
    const json = await response.json();
    if (json.error) {
      alert(json.error.message);
    } else {
      alert(json.message);
    }
    console.log('response', json);
    location.href = 'profile.html';
});