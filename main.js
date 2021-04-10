
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


function imageLoaded() {
   imagesLoaded ++;
   if(imagesLoaded === totalImages) {
       ready = true;
       loader.hidden = true;
   }
}

const count = 30;
const apiKey = '6AAzqEWxAIJOeMCrN7K0SdtaHsotyXGqvkpzJnKYemk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
   for (const key in attributes) {
       element.setAttribute(key, attributes[key]);
   } 
}

// Create elements for links and photos & add to DOM
function displayPhotos() {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    // run function for each object in photoArray
    // (photo) is a variable, each object{} will be assigned to this variable
    photosArray.forEach((photo) => {

        // create anchor element to link to unsplash and set attributes
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // create image element and set attributes
        const img  = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description, 
        });

        // event listener to check when each image has finihed loading
        img.addEventListener('load', imageLoaded); 

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

// check to see if the scrolling is near the bottom of the page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
    
});

// On load
getPhotos();