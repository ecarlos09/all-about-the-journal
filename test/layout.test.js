//Save built-in jest libraries for DOM testing to variables
const fs = require('fs');
const path = require('path');
//Call built-in methods to create abstraction of index.html
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

//Create overall test suite
describe('index.html', () => {
    //Convert html elements to strings before running each test
    beforeAll(() => {
        document.addEventListener('DOMContentLoaded', function(){
            console.log('Content loaded (we hope!)');
            });          
    })

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

    //Body tests
    describe('body', () => {
        const body = document.querySelector('body');
        const forms = document.getElementsByTagName('form');       
        test('page contains three forms', () => {
            expect(forms.length).toEqual(3);
        })

        test('page contains an audio tag', () => {
            const audio = document.querySelector('audio');
            expect(audio).toBeTruthy();
        })

        //Timeline tests
        describe('timeline', () => {

            test('page contains a display area for posts', () => {
                const timeline = document.getElementById('journal-timeline');
                expect(timeline).toBeTruthy();
            })

            test('dropdown contains four options', () => {
                const dropdownOpts = document.getElementsByTagName('option');
                expect(dropdownOpts.length).toEqual(4);
            })

            // test('individual ', () => {

            // }

        })
    })

    //Form tests
    describe('form', () => {
        const postArea = document.getElementById('journal-entry');
        const textArea = document.querySelector('textarea');
        const gif = document.getElementById('selected-gif');
        const gifBtn = document.getElementById('gif-btn');
        const postBtn = document.getElementById('post-btn');

        test('...', () => {
            //test here
        })
    })
})