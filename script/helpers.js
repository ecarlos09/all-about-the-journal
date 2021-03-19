//Required items
const hostURL = "http://localhost:3000/";

//Elements
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

//Import other js files
const sort = require('./sorters');
const fetchers = require('./fetchers');

// Layout
const pckry = new Packery( timeline, {
    // options
    itemSelector: '.entry-box',
  });

//Fetchers flow
// Create fetchers
const getAllEntries = fetchers.get("entries/");
const getEntryByID = (id) => fetchers.get(`entries/${id}`);
const addComment = (id, data) => fetchers.add(id, data, 'comments');
const addReact = (id, data) => fetchers.add(id, data, 'reacts');
const createEntry = (message) => fetchers.create(message);
//search fetcher
const getAllSearchResults = (keyword) => fetchers.get(`searches/${keyword}`);



//Post flow
function createPost(e) {
    e.preventDefault();
    const message = entryForm['journal-entry'].value.trim();
    const gif = selectedGif.firstChild;

    if(message) {
        const date = new Date();
        const gifURL = gif ? gif.src : null;
        const data = {message: message, gif: gifURL, date: date};
    
        createEntry(data).then(entry => displayEntry(entry));
        // msnry.layout()
        entryForm.reset()
        giphy.clearGiphy();
    }
    else if (gif){
        window.alert("The GIF is great, but please add a journal entry!")
    }
    else {
        window.alert("Please enter a journal entry!")
    }

}

//Timeline flow
function timelineClick(e) {
    const target = e.target;
    // Toggle comment section
    if (target.className === "comment-btn") {
        toggleComments(target.parentElement.nextElementSibling);
    }
    // Send reacts
    if(target.className.includes("reactBtn")){
        // target.disabled == true;
        const btnID = target.className[target.className.length - 1]
        const id = target.closest(".entry-box").id;      
        const update = {reactBtn : btnID}
        
        addReact(id, update).then(reacts => {
            const reactNum = target.children[0]
            reactNum.textContent = reacts[btnID - 1];
            reactNum.classList.toggle("show");
            setTimeout(() => {
                reactNum.classList.toggle("show");
            }, 1500);
        });
    }
}

function timelineKeyUp(e) {
    const target = e.target;

    if (e.key === "Enter" && target.className === "comment-input") {
        const commentInput = target;
        const id = commentInput.parentElement.parentElement.id;
        const commentsBox = commentInput.parentElement.nextElementSibling;

        if (commentInput.value.trim().length > 0) {
            const commentObj = { comments: [commentInput.value] }
            commentInput.value = "";

            addComment(id, commentObj).then(comments => {
                if (commentsBox.textContent === "No comments!") {
                    commentsBox.textContent = "";
                }
                
                const commentElement = loadComment(comments[comments.length -1])
                commentsBox.prepend(commentElement);
                pckry.prepended(commentElement);
                imagesLoaded(timeline, () => pckry.layout()); 
            });
        }

        if (commentsBox.style.display === "none") {
            toggleComments(commentsBox);
        }
    }
}

//Sort button flow
function sortEntries(e) {
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
}

//Search button flow
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

//Display entries
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
        entryComments.textContent="";
        comments.forEach(comment => {
            const commentElement = loadComment(comment);
            entryComments.prepend(commentElement);
            pckry.prepended(commentElement);
        })
    }
    else {
        entryComments.textContent = "No comments!"
    }

    // REACTS
    entryReacts.className = "react-btns";

    for (let i = 0; i < 3; i++) {
        const reactBtn = document.createElement("button");
        const reactNum = document.createElement("div");
        
        reactBtn.className = `react-btn reactBtn${i + 1}`;
        reactNum.className = "react-num";
        reactNum.textContent = reacts[i];
        
        reactBtn.appendChild(reactNum);
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
    
    pckry.prepended(entryDiv);
    imagesLoaded(timeline, () => pckry.layout());

}

//Helper helpers ... lol
function toggleComments(entryComments) {
    let isVisible = entryComments.style.display === "block";
    isVisible ? entryComments.style.display = "none" 
              : entryComments.style.display = "block"

    imagesLoaded(timeline, () => pckry.layout());    
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

module.exports = { createPost, 
                    beginSearch, 
                    displayEntry, 
                    timelineClick, 
                    timelineKeyUp, 
                    sortEntries
                 }