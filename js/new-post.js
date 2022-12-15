'use strict';
const url = 'https://discount-finder.northeurope.cloudapp.azure.com'; // change url when uploading to server

// get user data
const user = JSON.parse(sessionStorage.getItem('user'));

// select existing html elements
const addForm = document.querySelector('#addPostForm');
const categoryList = document.querySelector('.add-category');

const createCategoryOptions = (categories) => {
    // clear user list
    categoryList.innerHTML = '';
    categories.forEach((category) => {
        console.log(category)
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = category.categoryId;
        option.innerHTML = category.categoryName;
        option.classList.add('border');
        categoryList.appendChild(option);
    });
};

// get categories to make options
const getCategories = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/category', fetchOptions);
        const categories = await response.json();
        console.log(categories)
        createCategoryOptions(categories);
    } catch (e) {
        console.log(e.message);
    }
};
getCategories();


// submit add post form
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    for (let obj of fd) {
        console.log(obj);
      }
    const fetchOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd
    };
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    alert(json.message);
    console.log('response', json);
    location.href = '../html/main_page.html';
});
