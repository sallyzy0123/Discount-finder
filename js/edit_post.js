'use strict';
const url = 'https://discount-finder.northeurope.cloudapp.azure.com'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

// get id from address
const id = getQParam('id');

// select existing html elements
const formContent = document.querySelector('#editPostForm');

// get user data for admin check
//const user = JSON.parse(sessionStorage.getItem('user'));

const categoryList = document.querySelector('.add-category');

const createCategoryOptions = (categories) => {
    // clear user list
    categoryList.innerHTML = '';
    categories.forEach((category) => {
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

// add existing post data to form
const getPost = async (id) => {
  try {
    const options = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post/' + id, options);
    const post = await response.json();
    console.log(post);
    const inputs = document.querySelectorAll('input');
    inputs[0].value = post.Name;
    inputs[1].value = post.Location;
    inputs[2].value = post.DiscountedPrice;
    inputs[3].value = post.OriginalPrice;

    const select = document.querySelectorAll('select');
    select[0].selectedIndex = post.CategoryId - 1;

    const textarea = document.querySelector('textarea');
    textarea.value = post.Description;
  } catch (e) {
    console.log(e.message);
  }
};

getPost(id);

// submit modify form
formContent.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(formContent);
    for (let obj of fd) {
        console.log(obj);
      }
    const fetchOptions = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    console.log(fetchOptions);
    const response = await fetch(url + '/post/' + id , fetchOptions);
    const json = await response.json();
    if (json.error) {
      alert(json.error.message);
    } else {
      alert(json.message);
    }
    console.log('response', json);
    
    location.href = 'post.html?id=' + id;
    
});