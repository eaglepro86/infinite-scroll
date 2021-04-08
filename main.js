
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = '6AAzqEWxAIJOeMCrN7K0SdtaHsotyXGqvkpzJnKYemk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// get photos from unsplash api
async function getPhotos() {
    try {

        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

    } catch(error) {
        console.log(error)
    }
}

// On load
getPhotos();