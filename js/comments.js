'use strict';

// select existing html elements
const addForm = document.querySelector('#new-comment');

// submit add cat form
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    const response = await fetch(url + '/post/'+ postId +'/comment', fetchOptions);
    const json = await response.json();
    alert(json.message);
    location.href = 'front.html';
});

// const comments = [
//     {
//         'text': 'Nunc commodo faucibus arcu eu tristique. Duis iaculis tincidunt fermentum. Curabitur efficitur hendrerit justo, non tincidunt lectus lacinia et. Ut tincidunt placerat metus vitae rhoncus. Integer pretium at tellus vel aliquet. Nullam tincidunt congue lectus sed vulputate. Mauris auctor sem vel ante egestas sagittis. In facilisis odio accumsan iaculis volutpat.',
//         'date': '2022-11-11',
//         'username': 'sweetheart',
//         'img': '../images/profile.jpg',
//     },
//     {
//         'text': 'Nunc commodo faucibus arcu eu tristique. Duis iaculis tincidunt fermentum. Curabitur efficitur hendrerit justo, non tincidunt lectus lacinia et. Ut tincidunt placerat metus vitae rhoncus. Integer pretium at tellus vel aliquet. Nullam tincidunt congue lectus sed vulputate. Mauris auctor sem vel ante egestas sagittis. In facilisis odio accumsan iaculis volutpat.',
//         'date': '2022-12-10',
//         'username': 'pomegranate',
//         'img': '../images/profile.jpg',
//     },
//     {
//         'text': 'Nunc commodo faucibus arcu eu tristique. Duis iaculis tincidunt fermentum. Curabitur efficitur hendrerit justo, non tincidunt lectus lacinia et. Ut tincidunt placerat metus vitae rhoncus. Integer pretium at tellus vel aliquet. Nullam tincidunt congue lectus sed vulputate. Mauris auctor sem vel ante egestas sagittis. In facilisis odio accumsan iaculis volutpat.',
//         'date': '2022-09-13',
//         'username': 'iamtired',
//         'img': '../images/profile.jpg',
//     },
// ]

// const getComments = async (id) => {
//     const response = await fetch(url + '/post/' + id + '/comment');
//     const comments = await response.json();
//     console.log(comments);
// }
//
// getComments(2);

const commentSection = document.querySelector('.comment-section');

const populateComments = (comments) => {
    // clear user list
    commentSection.innerHTML = '';
    comments.forEach((comment) => {
        console.log(comment)
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

// get categories to make options
const getComments = async (id) => {
    try {
        const response = await fetch(url + '/post/' + id + '/comment');
        const comments = await response.json();
        populateComments(comments);
    } catch (e) {
        console.log(e.message);
    }
};
getComments(1);

// function populateComments() {
//     if (comments.length != 0) {
//         for (let i = 0; i < comments.length; i++) {
//             const newComment = document.createElement('div');
//             newComment.className = "new-comment";
//
//             const commentHeader = document.createElement('div');
//             commentHeader.className = "comment-header";
//             const commentUser = document.createElement('div');
//             commentUser.className = "comment-user";
//             const commentUserPic = document.createElement('img');
//
//             const commentInfo = document.createElement('div');
//             commentInfo.className = "comment-info";
//             const commentDetails = document.createElement('div');
//             commentDetails.className = "comment-details";
//             const commentText = document.createElement('div');
//             commentText.className = "comment-text";
//             const commentDate = document.createElement('div');
//             commentDate.className = "comment-date";
//             const commentUsername = document.createElement('div');
//             commentUsername.className = "comment-username";
//
//             commentDetails.append(commentUsername, commentDate)
//             commentInfo.append(commentDetails, commentText);
//             commentUser.append(commentUserPic);
//             commentHeader.append(commentUser);
//             newComment.append(commentHeader, commentInfo);
//             commentSection.append(newComment);
//
//             commentText.textContent = comments[i].text;
//             commentDate.textContent = comments[i].date;
//             commentUsername.textContent = comments[i].username;
//             commentUserPic.src = comments[i].img;
//         };
//     } else {
//         commentSection.innerHTML = `<p>There is no comments on this post yet...</p>
//                                     <p>Be the first one to wrote something!</p>`;
//     };
// };
//

function showCommentNum() {
    const commentNumber = document.querySelector(".comment-number")
    commentNumber.textContent = getComments().length.toString();
};

console.log(showCommentNum())
showCommentNum();