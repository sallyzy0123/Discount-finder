'use strict'
// const url = 'http://localhost:3000';
// get user data for admin check
// const user = JSON.parse(sessionStorage.getItem('user'));
// get username from database

// get useremail from database

// edit button to edit profile page

// nav bar to different page

// get gallery from database
const posts = [
        {
            "PostId":1,
            "UserId":1,
            "Name":"Samsung S21 Ultra",
            "Location":"Helsinki",
            "Picture":"https://place-puppy.com/300x300",
            "OriginalPrice":1200,
            "DiscountedPrice":900
        },
        {
            "PostId":2,
            "UserId":1,
            "Name":"Ipad Air 2022",
            "Location":"Gigantti",
            "Picture":"https://www.gigantti.fi/image/dv_web_D180001002945293/431421/ipad-air-2022-64-gb-wifi-violetti--pdp_zoom-3000.jpg",
            "OriginalPrice":599,
            "DiscountedPrice":589
        }
    ];


// select existing html elements
const gallery = document.querySelector('.gallery');

// create gallery cards
const createGalleryCards = (posts) => {
    for (let i = 0; i < posts.length; i++) {
        const div1 = document.createElement('div');
        div1.className = "gallery-item";
        div1.tabIndex = "0";

        const div2 = document.createElement('div');
        div2.className = "gallery-item-icon";
        const ul1 = document.createElement('ul');
        const li1 = document.createElement('li');
        li1.className = "gallery-item-edit";
        const a1 = document.createElement('a');
        a1.href = "#edit";
        const i1 = document.createElement('i');
        i1.className = "fa-regular fa-pen-to-square";
        const li2 = document.createElement('li');
        li2.className = "gallery-item-bin";
        const a2 = document.createElement('a');
        a2.href = "#bin";
        const i2 = document.createElement('i');
        i2.className = "fa-regular fa-trash-can";

        const img = document.createElement('img');
        img.className = "gallery-image";
        // need to check 
        //img.src = url + 'thumbnails/' + posts[i].picutre;
        img.src = posts[i].Picture;
        img.alt = "discount";

        const div3 = document.createElement('div');
        div3.className = "gallery-item-info";

        const div4 = document.createElement('div');
        div4.className = "gallery-item-left";
        const p1 = document.createElement('p');
        p1.className = "gallery-item-product";
        p1.append(posts[i].Name);
        const p2 = document.createElement('p');
        p2.className = "gallery-item-location";
        p2.append(posts[i].Location);

        const div5 = document.createElement('div');
        div5.className = "gallery-item-right";
        const p3 = document.createElement('p');
        p3.className = "gallery-item-originalprice";
        p3.append(posts[i].OriginalPrice);
        const p4 = document.createElement('p');
        p4.className = "gallery-item-discountedprice";
        p4.append(posts[i].DiscountedPrice);
        

        gallery.appendChild(div1);
        div1.append(div2, img, div3);
        div2.appendChild(ul1);
        ul1.append(li1, li2);
        li1.appendChild(a1);
        a1.appendChild(i1);
        li2.appendChild(a2);
        a2.appendChild(i2);
        div3.append(div4, div5);
        div4.append(p1, p2);
        div5.append(p3, p4);
    }
}
createGalleryCards(posts);

// gallery edit to edit post page

// gallery bin to delete the post