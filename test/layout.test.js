//Save built-in jest libraries for DOM testing to variables
const fs = require('fs');
const path = require('path');
//Call built-in methods to create abstraction of index.html
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

//Create overall test suite
describe('index.html', () => {
    //Convert html elements to strings before running each test
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    //Set up individual test suites for each feature

    //Header tests
    describe('header', () => {
        test('title exists and contains website name', () => {
            const title = document.querySelector('header');
            expect(title).toBeTruthy();
            expect(title.textContent).toContain('Consoul.log');
        })
    })
})