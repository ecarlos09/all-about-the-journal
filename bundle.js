(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const hostURL = "http://localhost:3000/" 

// HTML Elements
const timeline = document.getElementById('journal-timeline');
const entryForm = document.getElementById("journal-entry");
const postBtn = document.getElementById('post-btn');

getAllEntries()

postBtn.addEventListener('click', makeNewEntry)


updateEntry(1, {
    reacts : {
        react1 : 1,
    }
})

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
    // .then(console.log)

    getAllEntries()
}

function updateEntry(id, data){
    
    const postRoute = `entries/${id}`;

    const options = {
        method: "PATCH",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(hostURL + postRoute, options)
    .then(response => response.json())
    // .then(console.log)

    getAllEntries()
}

function updateEntries() {

}

function processEntry(entry){
    const id = entry.id;
    const message = entry.message;
    const comments = entry.comments;
    const reacts = entry.reacts;
    console.log(reacts);

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

    // COMMENTS 

    const commentBtn = document.createElement("button");
    commentBtn.className = "comment-btn"

    
    // Toggle comments on click
    commentBtn.addEventListener('click', () => {
        let isVisible = entryComments.style.display === "block";
        console.log(isVisible);
        isVisible ? entryComments.style.display = "none" :
                    entryComments.style.display = "block"
    })

    // Hide by default
    entryComments.style.display = "none";

    // Create comment elements
    if (comments.length > 0) {
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = "comment";
            commentElement.textContent = comment;
            entryComments.appendChild(commentElement);
        })
    }

    //REACTS

    const reactBtnDiv = document.createElement("div");
    const react1Btn = document.createElement("button");
    const react2Btn = document.createElement("button");
    const react3Btn = document.createElement("button");

    reactBtnDiv.className = "react-btns";
    react1Btn.className = "react1-btn";
    react2Btn.className = "react2-btn";
    react3Btn.className = "react3-btn";
    

    const reactBtns = [react1Btn, react2Btn, react3Btn]

    reactBtns.forEach((btn, idx) => {
        btn.value = reacts[`react${idx+1}`];
        btn.textContent = reacts[`react${idx+1}`];
        btn.addEventListener('click', (e) => {
            btn.disabled = true;
            const reactUpdate = {
                reacts: {
                    [`react${idx+1}`]: 1
                }
            }
            updateEntry(entry.id, reactUpdate);
        })
        
        reactBtnDiv.appendChild(btn);
    })


    // CONSTRUCT
    entryDiv.appendChild(entryMessage);
    entryDiv.appendChild(commentBtn);
    entryDiv.appendChild(reactBtnDiv);
    entryDiv.appendChild(entryComments);
    

    

    timeline.appendChild(entryDiv);

    // postDiv.appendChild(postMessage);
}


},{}]},{},[1]);
