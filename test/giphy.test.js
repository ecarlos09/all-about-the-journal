// //Import js files
// const giphy = require('../script/giphy');
// //Save built-in jest libraries for DOM testing to variables
// const fs = require('fs');
// const path = require('path');
// //Call built-in methods to create abstraction of index.html
// const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


// //Set up overall test suite for giphy.js functions

// describe ('giphy', () => {
//     beforeEach(() => {
//         // document.documentElement.innerHTML = '<div id="selected-gif"></div>';
//         // global.selectedGif = document.getElementById('#selected-gif');
//         document.documentElement.innerHTML = html.toString();
//     })

//     // test('test if addGiphy appends a gif', () => {
//     //     const newGiphy = giphy.addGiphy();
//     //     expect(selectedGif.querySelectorAll('child-element')).toBe('desired result!');
//     //     expect(giphy.addGiphy).toHaveBeenCalledTimes(1);
//     // })

//     test('test to see if showGiphyForm is called when addGiphy is called', () => {
//         let event = {preventDefault: jest.fn()};
//         giphy.addGiphy(event);
//         expect(giphy.showGiphyForm).toHaveBeenCalledTimes(1);
//     });
// })

const giphy = require('../script/giphy');


describe('giphy', () => {
    test('to see if giphyform is defined', () => {
        expect (giphy.showGiphyForm).toBeDefined();
    })

    test('to see if giphyform is defined', () => {
        expect (giphy.searchGiphy).toBeDefined();
    })


    test('to see if giphyform is defined', () => {
        expect (giphy.addGiphy).toBeDefined();
    })

    test('to see if giphyform is defined', () => {
        expect (giphy.clearGiphy).toBeDefined();
    })


    })


