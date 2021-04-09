
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = '6AAzqEWxAIJOeMCrN7K0SdtaHsotyXGqvkpzJnKYemk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for links and photos & add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {

        // craete anchor element to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // create image for photo
        const img  = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
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