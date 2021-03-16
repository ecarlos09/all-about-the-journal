(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const hostURL = "http://localhost:3000/" 

async function get(route) {
    let response = await fetch(hostURL + route)
    response = await response.json();
    return response;
}

async function create(data) {
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



// Post button
postBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = entryForm['journal-entry'].value;
    createEntry(message).then(entry => displayEntry(entry));
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
    const comments = entry.comments;
    const reacts = entry.reacts;

    const entryDiv = document.createElement("div");
    const entryMessage = document.createElement("div");
    const entryInteraction = document.createElement("div");
    const entryComments = document.createElement("div");
    const entryReacts = document.createElement("div");

    entryDiv.id = `${id}`;
    entryDiv.className = "entry-box";
    entryMessage.className = "message-box";
    entryInteraction.className = "interaction-box"
    entryComments.className = "comments-box";
    entryReacts.className = "react-btns";

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

    entryDiv.appendChild(entryMessage);
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


},{"./fetchers":1}]},{},[2]);
