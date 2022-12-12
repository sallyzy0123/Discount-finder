'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

// select existing html elements
const addForm = document.querySelector('#addPostForm');
const categoryList = document.querySelector('.add-category');

const createCategoryOptions = (categories) => {
    // clear user list
    categoryList.innerHTML = '';
    categories.forEach((category) => {
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = category.CategoryId;
        option.innerHTML = category.CategoryName;
        option.classList.add('border');
        categoryList.appendChild(option);
    });
};

// get categories to make options
const getCategories = async () => {
    try {
        const response = await fetch(url + '/user', options);
        const users = await response.json();
        createUserOptions(users);
    } catch (e) {
        console.log(e.message);
    }
};