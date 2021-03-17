
const hostURL = "http://localhost:3000/" 
const giphy = require('./giphy')
const fetchers = require('./fetchers');

// Create fetchers
const getAllEntries = fetchers.get("entries/");
const getEntryByID = (id) => fetchers.get(`entries/${id}`);
const addComment = (id, data) => fetchers.add(id, data, 'comments');
const addReact = (id, data) => fetchers.add(id, data, 'reacts');
const createEntry = (message) => fetchers.create(message);


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


//GIPHY

gifBtn.addEventListener('click', giphy.showGiphyForm)
gifForm.addEventListener('submit', giphy.searchGiphy)
addGiphyButton.addEventListener('click', giphy.addGiphy)


// Post button
postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = entryForm['journal-entry'].value;
    const gif = gifImage.src;
    const data = {message: message, gif: gif};
    createEntry(data).then(entry => displayEntry(entry));
    })

// Load entries
getAllEntries.then(entries => {
    entries.forEach(entry => displayEntry(entry))
});


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


function displayEntry(entry) {
    const id = entry.id;
    const message = entry.message;
    const gifURL = entry.gif || null;
    const comments = entry.comments;
    const reacts = entry.reacts;
    

    const entryDiv = document.createElement("div");
    const entryMessage = document.createElement("div");
    const entryGif = document.createElement("div");
    const entryInteraction = document.createElement("div");
    const entryComments = document.createElement("div");
    const entryReacts = document.createElement("div");

    entryDiv.id = `${id}`;
    entryDiv.className = "entry-box";
    entryMessage.className = "message-box";
    entryGif.className = "gif-box";
    entryInteraction.className = "interaction-box"
    entryComments.className = "comments-box";
    entryReacts.className = "react-btns";

    // MESSAGE
    entryMessage.textContent = message;

    // GIF
    if(gifURL){
        const gif = document.createElement('img');
        gif.src = gifURL;
        entryGif.appendChild(gif);
    }
    

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

    entryDiv.appendChild(entryMessage);
    entryDiv.appendChild(entryGif);
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



















