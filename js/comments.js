'use strict';

// select existing html elements
const addForm = document.querySelector('#addCommentForm');
const commentSection = document.querySelector('.comment-section');
const commentNumber = document.querySelector(".comment-number")

// submit add comment form
if (user) {
    addForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const fd = new FormData(addForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: fd
        };
        const response = await fetch(url + '/comment/'+ post_id, fetchOptions);
        const json = await response.json();
        alert(json.message);
        getComments(post_id);
    });
} else {
    addForm.ariaDisabled;
}

const populateComments = (comments) => {
    // clear comment list
    commentSection.innerHTML = '';
    comments.forEach((comment) => {
        // create options with DOM methods
        const newComment = document.createElement('div');
        newComment.className = "new-comment";

        const commentHeader = document.createElement('div');
        commentHeader.className = "comment-header";
        const commentUser = document.createElement('div');
        commentUser.className = "comment-user";
        const commentUserPic = document.createElement('img');

        const commentInfo = document.createElement('div');
        commentInfo.className = "comment-info";
        const commentDetails = document.createElement('div');
        commentDetails.className = "comment-details";
        const commentText = document.createElement('div');
        commentText.className = "comment-text";
        const commentDate = document.createElement('div');
        commentDate.className = "comment-date";
        const commentUsername = document.createElement('div');
        commentUsername.className = "comment-username";

        commentDetails.append(commentUsername, commentDate)
        commentInfo.append(commentDetails, commentText);
        commentUser.append(commentUserPic);
        commentHeader.append(commentUser);
        newComment.append(commentHeader, commentInfo);
        commentSection.append(newComment);

        commentText.textContent = comment.Text;
        commentDate.textContent = comment.Date.slice(0, 10);
        commentUsername.textContent = comment.Username;
        commentUserPic.src = comment.Photo;
    });
};

function showCommentNum(comments) {
    commentNumber.textContent = comments.length;
};

const getComments = async (id) => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/comment/' + id, fetchOptions);
        const comments = await response.json();
        populateComments(comments);
        showCommentNum(comments);
    } catch (e) {
        console.log(e.message);
    }
};
getComments(post_id);