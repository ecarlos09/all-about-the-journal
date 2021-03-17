(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const hostURL = "http://localhost:3000/" 

async function get(route) {
    let response = await fetch(hostURL + route)
    response = await response.json();
    return response;
}

async function create(data) {
    const body = {
        "date": data.date,
        "message": data.message,
        "gif": data.gif,
    };

    const postRoute = "entries/";

    const options = {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    let response = await fetch(hostURL + postRoute, options)
    response = await response.json();
    return response;
}

async function add(id, data, route) {

    const patchRoute = `entries/${id}/${route}`;
    const options = {
        method: "PATCH",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(hostURL + patchRoute, options)
    response = await response.json();
    return response;
}

module.exports = {get, add, create};


},{}],2:[function(require,module,exports){

//GIPHY

// GIPHY Elements
const selectedGif = document.getElementById('selected-gif')
const previewGifSection = document.getElementById('previewGifSection')
const gifForm = document.getElementById('gif-form')
const APIkey = "aWqPT5uBm54EQ5x9ooFj4TpWjXxF0mNh";
const entryForm = document.getElementById("journal-entry");
const formContainer = document.getElementById('form-container')
const previewimage = document.createElement('img')

function showGiphyForm() {
    if (gifForm.style.display === "block") {
        gifForm.style.display = "none"
        entryForm.style.width = "100%";
    }
    else {
        gifForm.style.display = "block"
        entryForm.style.width = "80%";
        formContainer.style.display = "flex"
        formContainer.style.justifyContent = "space-between"
    }
}

function searchGiphy(event) {
    event.preventDefault();
    let gifSearchBar = document.getElementById("giphy-search")
    let query = gifSearchBar.value.trim()
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${query}&limit=1&offset=0&rating=g&lang=en`
    fetch(url)
        .then(response => response.json())
        .then(content => {
            previewimage.src = content.data[0].images.fixed_width.url;
            previewGifSection.appendChild(previewimage)
        })
        .catch(err => console.log(err))
}

function addGiphy(event) {
    event.preventDefault()
    let query = document.getElementById("giphy-search").value.trim()
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${query}&limit=1&offset=0&rating=g&lang=en`
    fetch(url)
        .then(response => response.json())
        .then(content => {
            const gif = document.createElement('img')
            gif.src = content.data[0].images.fixed_width.url;
            gif.style.display = "block";
            console.log(selectedGif);
            selectedGif.appendChild(gif);
            showGiphyForm();
            gifForm.reset();
        })
}

function clearGiphy() {
    selectedGif.innerHTML = '';
}


module.exports = { showGiphyForm, searchGiphy, addGiphy, clearGiphy }
},{}],3:[function(require,module,exports){

const hostURL = "http://localhost:3000/";
const giphy = require('./giphy');
const fetchers = require('./fetchers');
const sort = require('./sorters');

// Create fetchers
const getAllEntries = fetchers.get("entries/");
const getEntryByID = (id) => fetchers.get(`entries/${id}`);
const addComment = (id, data) => fetchers.add(id, data, 'comments');
const addReact = (id, data) => fetchers.add(id, data, 'reacts');
const createEntry = (message) => fetchers.create(message);
    //search fetcher
const getAllSearchResults = (keyword) => fetchers.get(`searches/${keyword}`);


// HTML Elements
const timeline = document.getElementById('journal-timeline');
const sortBtn = document.getElementById('sort-dropdown');
const entryForm = document.getElementById("journal-entry");
const postBtn = document.getElementById('post-btn');

const formContainer = document.getElementById('form-container')
    //search bar elements
const searchBar = document.getElementById('search-bar');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// GIPHY Elements
const addGiphyButton = document.getElementById('addGiphy');
const selectedGif = document.getElementById('selected-gif');
const gifBtn = document.getElementById('gif-btn');
const gifForm = document.getElementById('gif-form');


//GIPHY
gifBtn.addEventListener('click', giphy.showGiphyForm)
gifForm.addEventListener('submit', giphy.searchGiphy)
addGiphyButton.addEventListener('click', giphy.addGiphy)

// Post button
postBtn.addEventListener('click', (e) => {
    const date = Date.now();
    const message = entryForm['journal-entry'].value;

    const gif = selectedGif.firstChild;
    const gifURL = gif ? gif.src : null;
    const data = {message: message, gif: gifURL};

    createEntry(data).then(entry => displayEntry(entry));
    entryForm.reset()
    giphy.clearGiphy();
})

// Load entries
getAllEntries.then(entries => {
    entries.forEach(entry => displayEntry(entry))
});

// Sort entries
sortBtn.addEventListener('change', (e) => {
    clearTimeline();

    getAllEntries.then(entries => {
        switch (e.target.value) {
            case 'recent':
                entries = sort.byRecent(entries);
                break;
            case 'oldest':
                entries = sort.byOldest(entries);
                break;
            case 'reacts':
                entries = sort.byReacts(entries);
                break;
            case 'comments':
                entries = sort.byComments(entries);
                break;
            default:
                break;
        }
        
        entries.forEach(entry => displayEntry(entry))
    });
})


// Listen for journal entry button clicks
timeline.addEventListener('click', (e) => {
    const target = e.target;

    if (target.className === "comment-btn") {
        toggleComments(target.parentElement.nextElementSibling);
    }

    if(target.className.includes("reactBtn")){
        target.disabled == true;
        const btnID = target.className[target.className.length - 1]
        const id = target.closest(".entry-box").id;      
        const update = {reactBtn : btnID}
        
        addReact(id, update).then(reacts => {
            target.textContent = reacts[btnID - 1];
        });

    }
})

// Listen for journal entry text input
timeline.addEventListener('keyup', (e) => {
    const target = e.target;

    if (e.key === "Enter" && target.className === "comment-input") {
        const commentInput = target;
        const id = commentInput.parentElement.parentElement.id;
        const commentsBox = commentInput.parentElement.nextElementSibling;

        if (commentInput.value.trim().length > 0) {
            const commentObj = { comments: [commentInput.value] }
            // comments.push(commentInput.value);
            commentInput.value = "";

            addComment(id, commentObj).then(comments => {
                commentsBox.prepend(loadComment(comments[comments.length -1]));
            });
        }

        if (commentsBox.style.display === "none") {
            toggleComments(commentsBox);
        }
    }
})

    //Search listeners
// searchBar.addEventListener('mouseover', ()=>{});
// search.addEventListener('submit', ()=>{});
searchBtn.addEventListener('click', beginSearch);

    //Begin search
function beginSearch(e) {
    e.preventDefault();
    console.log("Search is underway!");
    clearTimeline();
    console.log("Timeline cleared!");
    const searchWord = search.value;
    getAllSearchResults(searchWord).then(entries => {
            let numSearches = entries.length;
            const location = "search-message";
            let matches = "matches";
            if(numSearches===1) {matches="match"};
            let resultMessage = `Your search has returned ${numSearches} ${matches}.  Showing successful matches only.`
            createMessage(resultMessage, location);
            entries.forEach(entry => displayEntry(entry));
        }).catch(err => console.warn('OH NO, something went wrong!', err));
    console.log("Search completed.  Showing matching entries only.");
}

function displayEntry(entry) {
    const id = entry.id;
    const date = new Date(entry.date);
    const message = entry.message;
    const gifURL = entry.gif;
    const comments = entry.comments;
    const reacts = entry.reacts;

    const entryDiv = document.createElement("div");
    const entryDate = document.createElement("div");
    const entryMessage = document.createElement("div");
    const entryGif = document.createElement("div");
    const entryInteraction = document.createElement("div");
    const entryComments = document.createElement("div");
    const entryReacts = document.createElement("div");

    entryDiv.id = `${id}`;
    entryDate.className = "entry-date";
    entryDiv.className = "entry-box";
    entryMessage.className = "message-box";
    entryGif.className = "gif-box";
    entryInteraction.className = "interaction-box"
    entryComments.className = "comments-box";
    entryReacts.className = "react-btns";
    
    // DATE
    const timeString = `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2,'0')}`
    const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const timeDiv = document.createElement("span");
    const dateDiv = document.createElement("span");
    timeDiv.className = "time-text";
    timeDiv.textContent = timeString;
    dateDiv.className = "date-text";
    dateDiv.textContent = dateString;
    entryDate.appendChild(timeDiv);
    entryDate.appendChild(dateDiv);

    // MESSAGE
    entryMessage.textContent = message;

    // COMMENTS 
    const commentBtn = document.createElement("button");
    commentBtn.className = "comment-btn"

    // Hide by default
    entryComments.style.display = "none";

    // COMMENT INPUT
    const commentInput = document.createElement("input");
    commentInput.className = "comment-input";
    commentInput.type = "text";
    commentInput.placeholder = "say something nice";

    if (comments.length > 0) {
        comments.forEach(comment => {
            entryComments.prepend(loadComment(comment));
        })
    }

    // REACTS
    entryReacts.className = "react-btns";

    for (let i = 0; i < 3; i++) {
        const reactBtn = document.createElement("button");
        reactBtn.className = `reactBtn${i + 1}`;
        entryReacts.appendChild(reactBtn);
    }

    // CONSTRUCT
    entryInteraction.appendChild(commentBtn);
    entryInteraction.appendChild(commentInput);
    entryInteraction.appendChild(entryReacts);

    entryDiv.appendChild(entryDate);
    entryDiv.appendChild(entryMessage);

    // GIF
    if(gifURL){
        const gif = document.createElement('img');
        gif.src = gifURL;
        entryGif.appendChild(gif);
        entryDiv.appendChild(entryGif);
    }
   
    entryDiv.appendChild(entryInteraction);
    entryDiv.appendChild(entryComments);

    timeline.prepend(entryDiv);
}

// HELPERS

function toggleComments(entryComments) {
    let isVisible = entryComments.style.display === "block";
    console.log(isVisible);
    isVisible ? entryComments.style.display = "none" :
        entryComments.style.display = "block"
    return isVisible;
}

function loadComment(comment){
    const commentElement = document.createElement('div');
    commentElement.className = "comment";
    commentElement.textContent = comment;
    return commentElement;   
}

function clearTimeline() {
    timeline.innerHTML= "";
}


function createMessage(content, locationID) {
    const messageLocation = document.getElementById(locationID);
    const showMessage = messageLocation.innerText = content;
}

















},{"./fetchers":1,"./giphy":2,"./sorters":4}],4:[function(require,module,exports){
function byRecent(entries) {
    entries.sort((a,b) => {
        return (new Date(a.date) - new Date(b.date))
    });
    return entries;
}

function byOldest(entries) {
    entries.sort((a,b) => {
        return -(new Date(a.date) - new Date(b.date))
    });
    return entries;
}

function byReacts(entries) {
    entries.sort((a,b) => {
        const adder = (sum, next) => sum + next;
        return a.reacts.reduce(adder) - b.reacts.reduce(adder);
    });
    return entries;
}

function byComments(entries) {
    entries.sort((a,b) => {
        return a.comments.length - b.comments.length;
    });
    return entries;
}

module.exports = {byRecent, byOldest, byReacts, byComments}


},{}]},{},[3]);
