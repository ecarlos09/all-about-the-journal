//Import js file
const file = require('../script/index')

const map = {};
Window.addEventListener = jest.genMockFn().mockImpl((event, cb) => {
  map[event] = cb;
});

let index;
//Set up mock library

//Save built-in jest libraries for DOM testing to variables
const fs = require('fs');
const path = require('path');
//Call built-in methods to create abstraction of index.html
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');



//Set up overall test suite for index.js functions

    //Template for sub test suites
    describe('beginSearch', () => {
        beforeAll(() => {
            document.addEventListener('DOMContentLoaded', function(){
                console.log('Content loaded (we hope!)');
                });          
        })
    
        beforeEach(() => {
            document.documentElement.innerHTML = html.toString();
            jest.mock(index);
    
        })

     
    test('to see if clearTimeline is defined', () => {
        expect(file.clearTimeline).toBeDefined()
    })

})

