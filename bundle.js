(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const hostURL = "http://localhost:3000/" 

const timeline = document.getElementById('journal-timeline');
const entryForm = document.getElementById("journal-entry");
const postBtn = document.getElementById('post-btn');

postBtn.addEventListener('click', makeNewEntry)

// makeNewEntry(
//     {  
//         message: "my second jurnool entry",
//         reacts: {
//             react1: 0,
//             react2: 0,
//             react3: 0,
//         },
//     }
// )

getAllEntries()

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

    entryDiv.id = id.toString;
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
},{}]},{},[1]);
