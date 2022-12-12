'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// // get query parameter
// const getQParam = (param) => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     return urlParams.get(param);
// };

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
        const response = await fetch(url + '/category');
        const categories = await response.json();
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
    console.log("fetch: " + fd);
    const fetchOptions = {
        method: 'POST',
        body: fd,
    };
    //TODO: fetch the category id
    const response = await fetch(url + '/post', fetchOptions);
    const json = await response.json();
    alert(json.message);
    console.log('response', json);
    //location.href = 'front.html';
});
