//Import js file
const giphy = require('../script/giphy')

//Set up overall test suite for giphy.js functions

    //Need to mock functions?

describe ('giphy', () => {

    //Template for sub test suites
    describe('...', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = '<element id="...">...</element>';
            global.id = document.querySelector('#id');
        })

        test('test for ...', () => {
            //Edit as required
            giphy.function();
            expect(id.querySelectorAll('child-element')).toBe('desired result!');
        })
    })

})