//Import js file
const audio = require('../script/audio')

//Set up overall test suite for index.js functions

    //Need to mock functions?

describe ('audio', () => {

    //Template for sub test suites
    describe('...', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = '<element id="...">...</element>';
            global.id = document.querySelector('#id');
        })

        test('test for ...', () => {
            //Edit as required
            audio.function();
            expect(id.querySelectorAll('child-element')).toBe('desired result!');
        })
    })

})