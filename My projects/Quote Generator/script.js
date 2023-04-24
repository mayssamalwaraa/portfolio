//get the DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('queto');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter-button');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quoteArray = [];
//get  random quotes locally
// function localQuotes(){
//     let quote = localQuotes[Math.floor(Math.random()*localQuotes.length)];
//     console.log(quote);
// }

//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
//hide loader
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
//get random quotes from the internet
function newQuotes(){
    loading();
    let quote = quoteArray[Math.floor(Math.random()*quoteArray.length)];
    
    if(!quote.author){
        quoteAuthor.innerHTML='unknown';  
    }else{
        quoteAuthor.innerHTML=quote.author;
    }
    if(quoteText.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML=quote.text;
    complete();
}

//get the quotes 
async function getQuotes(){
    loading()
    let apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        quoteArray = await response.json();
        newQuotes();

    }catch(err){
        //handle the error
    }
}
async function getQuotesFromAPI(){
    loading();
    const proxyURL = ' https://cors-anywhere.herokuapp.com/ '
    let apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        console.log(data);

    }catch(err){
        //handle the error
        console.log('something wrong',err);
    }
}
function tweetQuote(){
    
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${quoteAuthor.textContent}`;
    window.open(twitterURL,'_blank');
}
newQuote.addEventListener('click',newQuotes);
twitterButton.addEventListener('click',tweetQuote);
//load
getQuotes();
// localQuotes();
// loading();
// getQuotesFromAPI();
