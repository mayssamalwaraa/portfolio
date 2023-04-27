const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imgLoaded = 0;
let totalImages = 0;
let photoArray = [];

//unsplach api
const count = 10;
const apikey = 'c5QnGjMcdTpYHJsvtfRmd4EYBVGwUQCfHojls_Zj9mc';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

//check if all image is loaded
function imageLoaded(){
    imgLoaded++;
    console.log(imageLoaded);
    if(imgLoaded === totalImages){
        loader.hidden=true;
        ready=true;
        // console.log('ready=',ready);
    }
    // console.log('image is loaded');
}
//helper function to set attribut on the DOM elements
function setAttribute(element,attribues){
    for(const key in attribues){
        element.setAttribute(key,attribues[key]);
    }

}
//create elements for links & photoes , add to DOM
function displayPhotos(){
    imgLoaded=0;
    totalImages=photoArray.length;
    console.log('totalImage',totalImages);
    photoArray.forEach((photo)=>{
        //create an element <a> to kink to unsplach
        const a = document.createElement('a');
        setAttribute(a,{
            href:photo.links.html,
            traget:'_blank',
        });
        //create an img
        const img = document.createElement('img');
        setAttribute(img,{
            src:photo.urls.regular,
            alt:'unsplach',
            title:'unsplach'
        });
        //event listener for each img,check when it is finished loading
        img.addEventListener('load',imageLoaded);
        //put img inside the a 
        a.appendChild(img);
        // put the a inside the img-container
        imgContainer.appendChild(a);
    })
}
//get the photo from api
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        const data = await response.json();
        photoArray = data;
        // console.log(data);
        displayPhotos();
    }catch(err){

    }
}
//check if the scrolling to the bottom of the page ,load more photes
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
        // console.log('load more');
    }
})
//onload
getPhotos();