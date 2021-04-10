
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = '6AAzqEWxAIJOeMCrN7K0SdtaHsotyXGqvkpzJnKYemk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
   for (const key in attributes) {
       element.setAttributes(key, attributes[key]);
   } 
}

// Create elements for links and photos & add to DOM
function displayPhotos() {

    // run function for each object in photoArray
    // (photo) is a variable, each object{} will be assigned to this variable
    photosArray.forEach((photo) => {

        // create anchor element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.link.html,
            target: '_blank',
        });

        // create image element
        const img  = document.createElement('img');

        // // set the image source
        setAttributes(img, {
            src: photo.urls.regurlar,
            alt: photo.alt_description,
            title: photo.alt_description, 
        })

        // Put <img> inside of <a> then put both inside our imageContainer
        // add a child to item
        item.appendChild(img);

        // add the item as a child to image-container
        imageContainer.appendChild(item);
    })
}

// get photos from unsplash api
async function getPhotos() {

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch(error) {
        console.log(error)
    }
}

// On load
getPhotos();