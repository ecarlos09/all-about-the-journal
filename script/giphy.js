
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
            selectedGif.appendChild(gif);
            showGiphyForm();
            gifForm.reset();
        })
}

function clearGiphy() {
    selectedGif.innerHTML = '';
}


module.exports = { showGiphyForm, searchGiphy, addGiphy, clearGiphy}