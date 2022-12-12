'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const gallery = document.querySelector('.gallery');
const profile = document.querySelector('.profile');

// get user data 
// const user = JSON.parse(sessionStorage.getItem('user'));

// create gallery cards
const createBookmarkCards = (bookmarks) => {
    bookmarks.forEach((bookmark) => {
        const div1 = document.createElement('div');
        div1.className = "gallery-item";
        div1.tabIndex = "0";

        // add the icon
        const div2 = document.createElement('div');
        div2.className = "gallery-item-icon";
        const ul1 = document.createElement('ul');
        const li1 = document.createElement('li');
        li1.className = "gallery-item-bookmark";
        const a1 = document.createElement('a');
        a1.href = "#edit";
        const i1 = document.createElement('i');
        i1.className = "fas fa-bookmark";

        // remove the bookmark by click the icon
        i1.addEventListener('click', () => {
          // first the icon become light 
          // second the page updated to remove this post
        })

        // add the image
        const img = document.createElement('img');
        img.className = "gallery-image";
        // need to check 
        img.src = bookmark.Picture;
        img.alt = bookmark.Name;

        // open the main post page by click the image
        img.addEventListener('click', () => {
          // need to check which post page 
          // should add the postId
          location.href = 'post.html?id=' + bookmark.PostId;
        })

        const div3 = document.createElement('div');
        div3.className = "gallery-item-info";

        // add the post info
        const div4 = document.createElement('div');
        div4.className = "gallery-item-left";
        const p1 = document.createElement('p');
        p1.className = "gallery-item-product";
        p1.append(bookmark.Name);
        const p2 = document.createElement('p');
        p2.className = "gallery-item-location";
        p2.append(bookmark.Location);

        // add the post price
        const div5 = document.createElement('div');
        div5.className = "gallery-item-right";
        const p3 = document.createElement('p');
        p3.className = "gallery-item-originalprice";
        p3.append(bookmark.OriginalPrice);
        const p4 = document.createElement('p');
        p4.className = "gallery-item-discountedprice";
        p4.append(bookmark.DiscountedPrice);
        
        // append the element
        gallery.appendChild(div1);
        div1.append(div2, img, div3);
        div2.appendChild(ul1);
        ul1.appendChild(li1);
        li1.appendChild(a1);
        a1.appendChild(i1);
        div3.append(div4, div5);
        div4.append(p1, p2);
        div5.append(p3, p4);
    })
    // for (let i = 0; i < bookmarks.length; i++) {
        
    // }
}

// const user = [
//   {
//     "UserId": 1,
//     "Username": "coldwinter",
//     "Email": "coldwinter@gamil.com",
//     "Password": "coldwinter123",
//     "Photo": "https://divedigital.id/wp-content/uploads/2022/07/2-Aesthetic-Cat-with-Sleepy-Mask.jpg"
//   }];

const createUserProfileCard = (users) => {
  // add the image section
  const div1 = document.createElement('div');
  div1.className = "profile-image";
  const img1 = document.createElement('img');
  img1.className = "profileImage";
  img1.src = users[2].photo;
  img1.alt = users[2].username;

  // add the user info section
  const div2 = document.createElement('div');
  div2.className = "profile-user-settings";
  const p1 = document.createElement('p');
  p1.className = "profile-user-name";
  p1.innerHTML = users[2].username;
  const p2 = document.createElement('p');
  p2.className = "profile-user-email";
  p2.innerHTML = users[2].email;

  // add the edit button
  const button = document.createElement('button');
  button.type = button;
  button.className = "profile-user-edit-btn";
  button.textContent = 'Edit';

  // open the edit profile page by clicking the button
  button.addEventListener('click', function() {
    document.location.href = "edit_profile.html";
  })

  // append the element
  profile.append(div1, div2);
  div1.appendChild(img1);
  div2.append(p1, p2, button);
}

const getBookmarks = async () => {
    try {
      // const fetchOptions = {
      //   headers: {
      //     Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      //   },
      // };
      const response = await fetch(url + '/bookmark');
      const bookmarks = await response.json();
      console.log(bookmarks);
      createBookmarkCards(bookmarks);
    } catch (e) {
      console.log(e.message);
    }
};
// createUserProfileCard(user);
// here is get user profile 
// need to check
const getUsers = async () => {
  try {
    // const fetchOptions = {
    //   headers: {
    //     Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    //   },
    // };
    // const response = await fetch(url + '/user', fetchOptions);
    const response = await fetch(url + '/user');
    const users = await response.json();
    console.log(users)
    createUserProfileCard(users);
  } catch (e) {
    console.log(e.message);
  }
}

getUsers();
getBookmarks();
