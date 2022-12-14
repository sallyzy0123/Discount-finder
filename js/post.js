'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

// get id from address
const post_id = getQParam('id');

// select existing html elements
const categoryName = document.querySelector('.category-name');
const postName = document.querySelector('.post-name');
const locationName = document.querySelector('.location-name');
const postImage = document.querySelector('.post-image');
const discountedPrice = document.querySelector('.discounted-price');
const discountAmount = document.querySelector('.discount-amount');
const originalPrice = document.querySelector('.original-price-amount');
const postDate = document.querySelector('.post-date');
const a = document.createElement('a');
const username = document.querySelector('.post-username');
const userIcon = document.querySelector('.user-icon');
const deleteBtn = document.querySelector('#delete-icon');


// add existing cat data to form
const getPost = async (id) => {
    const response = await fetch(url + '/post/' + id);
    const post = await response.json();
    a.href = url + '/category/' + post.CategoryId;
    a.textContent = post.CategoryName;
    categoryName.appendChild(a);
    postName.innerHTML = post.Name;
    postDate.innerHTML = post.Date.slice(0, 10);
    locationName.innerHTML = post.Location;
    discountedPrice.innerHTML = post.DiscountedPrice;
    originalPrice.innerHTML = post.OriginalPrice;
    discountAmount.innerHTML = post.OriginalPrice - post.DiscountedPrice;
    postDescription.innerHTML = post.Description;
    postImage.src = url + '/' + post.Picture;
    username.innerHTML = post.Username;
    userIcon.src = post.Photo;
    console.log(post);

    deleteBtn.addEventListener('click', async () => {
        const fetchOptions = {
            method: 'DELETE'
            // headers: {
            //     Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            // },
        };
        try {
            const response = await fetch(url + '/post/' + post.PostId, fetchOptions);
            const json = await response.json();
            console.log('delete response', json);
            location.href = '../html/main_page.html';
        } catch (e) {
            console.log(e.message);
        }
    });

    
};

getPost(post_id);
