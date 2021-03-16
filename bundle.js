(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


//GIPHY

// GIPHY Elements
const addGiphyButton = document.getElementById('addGiphy')
const gifImage = document.getElementById('gifImage')
const gifBtn = document.getElementById('gif-btn')
const gifPreviewBtn = document.getElementById('gifPreviewBtn')
const previewGifSection = document.getElementById('previewGifSection')
const gifForm = document.getElementById('gif-form')
const APIkey = "aWqPT5uBm54EQ5x9ooFj4TpWjXxF0mNh";
const entryForm = document.getElementById("journal-entry");
const formContainer = document.getElementById('form-container')



function showGiphyForm(){
    if (gifForm.style.display === "block"){
        gifForm.style.display = "none"
        entryForm.style.width = "100%";
    }

    else{
        gifForm.style.display = "block"
        entryForm.style.width = "80%";
        formContainer.style.display = "flex"
        formContainer.style.justifyContent= "space-between"
    }

}



function searchGiphy(event){
    event.preventDefault();
    let query = document.getElementById("giphy-search").value.trim()
    let url =`https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${query}&limit=1&offset=0&rating=g&lang=en`
    fetch(url)
    .then(response => response.json())
    .then (content => {
        let image = document.createElement('img')
        image.src = content.data[0].images.fixed_width.url;
        previewGifSection.appendChild(image)
        
    })
    .catch(err =>  console.log(err))
}


 function addGiphy(event){
        event.preventDefault()
        let query = document.getElementById("giphy-search").value.trim()
        let url =`https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${query}&limit=1&offset=0&rating=g&lang=en`
        fetch(url)
        .then(response => response.json())
        .then (content => {
            let image = document.createElement('img')
            gifImage.src = content.data[0].images.fixed_width.url;

        gifImage.style.display = "block";
        gifForm.style.display = "none"
        entryForm.style.width = "100%";
        })
    }


module.exports = {showGiphyForm,searchGiphy,addGiphy}
},{}],2:[function(require,module,exports){
const hostURL = "http://localhost:3000/" 
const giphy = require('./giphy')
// HTML Elements
const timeline = document.getElementById('journal-timeline');
const entryForm = document.getElementById("journal-entry");
const postBtn = document.getElementById('post-btn');
const formContainer = document.getElementById('form-container')

// GIPHY Elements
const addGiphyButton = document.getElementById('addGiphy')
const gifImage = document.getElementById('gifImage')
const gifBtn = document.getElementById('gif-btn')
const gifPreviewBtn = document.getElementById('gifPreviewBtn')
const previewGifSection = document.getElementById('previewGifSection')
const gifForm = document.getElementById('gif-form')
const APIkey = "aWqPT5uBm54EQ5x9ooFj4TpWjXxF0mNh";






getAllEntries()

postBtn.addEventListener('click', makeNewEntry)


function getAllEntries() {
    timeline.innerHTML = "" ;
    const entriesRoute = "entries/"

    fetch(hostURL + entriesRoute)
    .then(response => response.json())
    .then(entries => {
        // console.log(entries);
        entries.forEach(entry => processEntry(entry));
    })
}

function makeNewEntry(e) {
    e.preventDefault();
    // const formData = new FormData(postForm)
    const data = entryForm['journal-entry'].value;
    
    const body = {"message": data};

    const postRoute = "entries/";

    const options = {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    fetch(hostURL + postRoute, options)
    .then(response => response.json())
    .then(console.log)

    getAllEntries()
    
}

function processEntry(entry){
    const id = entry.id;
    const message = entry.message;
    const comments = entry.comments;
    const reacts = entry.reacts;

    const entryDiv = document.createElement("div");
    const entryMessage = document.createElement("div");
    const entryComments = document.createElement("div");
    const entryReacts =  document.createElement("div");

    entryDiv.id = `${id}`;
    entryDiv.className = "entry-box";
    entryMessage.className = "message-box";
    entryComments.className = "comments-box";
    entryReacts.className = "reacts";

    entryMessage.textContent = message;

    if (comments.length > 0) {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = "comment";
            commentElement.textContent = comment;
            entryComments.appendChild(commentElement);
        })
    }

    // reacts.forEach(react => {
    //     // TODO: Handle reacts
    // })
    
    entryDiv.appendChild(entryMessage);
    entryDiv.appendChild(entryComments);

    timeline.appendChild(entryDiv);

    // postDiv.appendChild(postMessage);
}








//GIPHY

gifBtn.addEventListener('click', giphy.showGiphyForm)



gifForm.addEventListener('submit', giphy.searchGiphy)


 addGiphyButton.addEventListener('click', giphy.addGiphy)












},{"./giphy":1}]},{},[2]);
