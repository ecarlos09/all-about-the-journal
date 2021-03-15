const hostURL = "http://localhost:3000/" 
// HTML Elements
const timeline = document.getElementById('journal-timeline');
const entryForm = document.getElementById("journal-entry");
const postBtn = document.getElementById('post-btn');
const giphyForm = document.getElementById('giphy-form')
const APIkey = "aWqPT5uBm54EQ5x9ooFj4TpWjXxF0mNh";
const header = document.querySelector('h1')
const test = document.getElementById('test')
const giphyButton = document.getElementById('giphyButton')
const addGIF = document.getElementById('search-gif')
const formContainer = document.getElementById('form-container')


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

addGIF.addEventListener('click', showGiphyForm)

function showGiphyForm(){
    if (giphyForm.style.display === "block"){
    giphyForm.style.display = "none"
    entryForm.style.width = "100%";}

    else{
        giphyForm.style.display = "block"
        giphyForm.style.backgroundColor="pink";
        entryForm.style.width = "80%";
    }

formContainer.style.display = "flex"
formContainer.style.justifyContent= "space-between"

}

function shuffle(){

}





giphyForm.addEventListener('submit', searchGiphy)

function searchGiphy(event){
    event.preventDefault();
    let query = document.getElementById("giphy-search").value.trim()
    let url =`https://api.giphy.com/v1/gifs/search?api_key=${APIkey}&q=${query}&limit=1&offset=0&rating=g&lang=en`
    fetch(url)
    .then(response => response.json())
    .then (content => {
        let image = document.createElement('img')
        image.src = content.data[0].images.fixed_width.url;
        test.appendChild(image)
        
    })
    .catch(err =>  console.log(err))
}
