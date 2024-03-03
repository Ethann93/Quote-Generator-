'use strict';

const quoteContainer = document.getElementById(`quote-container`);
const quoteText = document.getElementById(`quote`);
const authorText = document.getElementById(`author`);
const twitterBtn = document.getElementById(`twitter`);
const facebookBtn = document.getElementById(`facebook`);
const instagramBtn = document.getElementById(`instagram`);
const whatsappBtn = document.getElementById(`whatsapp`);
const newQuoteBtn = document.getElementById(`new-quote`);
const loader = document.getElementById(`loader`);

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//SHOW NEW QUOTE
function newQuote() {
  showLoadingSpinner();
  // PICK A RANDOM QUOTE FROM apiQUotes ARRAY
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // CHECK IF AUTHOR FIELD IS BLANK AND REPLACE IT WITH `UNKNOWN`
  if (!quote.author) {
    authorText.textContent = `Unknown`;
  } else {
    authorText.textContent = quote.author;
  }
  // CHECK THE QUOTE LENGTH TO DETERMINE STYLING
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  //SET THE QUOTE AND HIDE LOADER
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// GET QUOTES FROM API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes[12]);
    newQuote();
  } catch (error) {
    // CATCH ERROR HERE
  }
}

//TWEET QUOTE
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, `_blank`);
}

//FACEBOOK THE QUOTE
function facebookQuote() {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(facebookUrl, `_blank`);
}

//INSTAGRAM THE QUOTE
function instagramQuote() {
  const instagramUrl = `https://www.instagram.com/?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(instagramUrl, `_blank`);
}

//WHATSAPP THE QUOTE
function whatsappQuote() {
  const whatsappUrl = `https://api.whatsapp.com/send?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(whatsappUrl, `_blank`);
}

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', facebookQuote);
instagramBtn.addEventListener('click', instagramQuote);
whatsappBtn.addEventListener('click', whatsappQuote);

// ON LOAD
getQuotes();
