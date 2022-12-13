'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const id = getQParam('id');

// select existing html elements
const formContent = document.querySelector('.form_content');

// get user data for admin check
//const user = JSON.parse(sessionStorage.getItem('user'));

// add existing user data to form
const getUser = async (id) => {
  try {
    // const options = {
    //   headers: {
    //     Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    //   },
    // };
    const response = await fetch(url + '/user' + id);
    const inputs = formContent.querySelectorAll('input');
    inputs[0].value = id.Username;
    inputs[1].value = id.Email;
    inputs[2].value = id.password;
    // not sure what to do for photo
    // const users = await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

getUser(1);

// submit modify form
formContent.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(formContent);
    console.log("fetch: " + fd);
    const fetchOptions = {
      method: 'POST',
      body: fd,
    };
    const response = await fetch(url + '/user/' + id , fetchOptions);
    const json = await response.json();
    alert(json.message);
    console.log('response', json);
    //location.href = 'profile.html';
});