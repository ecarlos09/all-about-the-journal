const hostURL = "http://localhost:3000/";
const giphy = require('./giphy');
const fetchers = require('./fetchers');
const helpers = require('./helpers');
// Create fetchers
const getAllEntries = fetchers.get("entries/");
const getEntryByID = (id) => fetchers.get(`entries/${id}`);
const addComment = (id, data) => fetchers.add(id, data, 'comments');
const addReact = (id, data) => fetchers.add(id, data, 'reacts');
const createEntry = (message) => fetchers.create(message);

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

//Create initial bindings
function initBinds() {
    //GIPHY
    gifBtn.addEventListener('click', giphy.showGiphyForm)
    gifForm.addEventListener('submit', giphy.searchGiphy)
    addGiphyButton.addEventListener('click', giphy.addGiphy)
    // Post button
    postBtn.addEventListener('click', (e) => {helpers.createPost(e)});
    // Load entries
    getAllEntries.then(entries => {
        entries.forEach(entry => helpers.displayEntry(entry))
    });
    // Sort entries
    sortBtn.addEventListener('change', (e) => {helpers.sortEntries(e)});
    // Listen for journal entry button clicks
    timeline.addEventListener('click', (e) => {helpers.timelineClick(e)});
    // Listen for journal entry text input
    timeline.addEventListener('keyup', (e) => {helpers.timelineKeyUp(e)});
    //Search listeners
    searchBtn.addEventListener('click', (e) => {helpers.beginSearch(e)});
}

initBinds();