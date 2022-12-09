'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

// get id from address
const postId = getQParam('id');

// select existing html elements
const categoryName = document.querySelector('.category-name');
const postName = document.querySelector('.post-name');
const locationName = document.querySelector('.location-name');
const categoryImage = document.querySelector('.post-image'); // TODO: do something with an image
const discountedPrice = document.querySelector('.discounted-price');
const discountAmount = document.querySelector('.discount-amount');
const originalPrice = document.querySelector('.original-price-amount');
const postDescription = document.querySelector('.post-description');


// add existing cat data to form
const getPost = async (id) => {
    const response = await fetch(url + '/post/' + id);
    const post = await response.json();
    console.log(post)
    categoryName.innerHTML = post.CategoryName;
    postName.innerHTML = post.Name;
    locationName.innerHTML = post.Location;
    discountedPrice.innerHTML = post.DiscountedPrice;
    originalPrice.innerHTML = post.OriginalPrice;
    discountAmount.innerHTML = post.OriginalPrice - post.DiscountedPrice;
    postDescription.innerHTML = post.Description;
    categoryImage.src = post.Picture;
};
getPost(1);