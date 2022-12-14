'use strict';

const like = document.querySelector('.like');
const dislike = document.querySelector('.dislike');
const likesNum = document.querySelector('.like-number');
const dislikesNum = document.querySelector('.dislike-number');

//TODO: like and dislike buttons

function showLikesDislikes(evaluations) {
    let likes = 0;
    let dislikes = 0;
    evaluations.forEach((evaluation) => {
        likes += evaluation.likes;
        dislikes += evaluation.dislikes;
    });
    likesNum.textContent = likes;
    dislikesNum.textContent = dislikes;
};

// get categories to make options
const getEvaluation = async (id) => {
    try {
        const response = await fetch(url + '/evaluation/' + id);
        const evaluations = await response.json();
        showLikesDislikes(evaluations);
    } catch (e) {
        console.log(e.message);
    }
};
getEvaluation(1);
