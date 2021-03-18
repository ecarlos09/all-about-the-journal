//Import js file
const sorters = require('../script/sorters')

//Set up overall test suite for sorters.js functions

    //Need to mock functions?

describe ('sorters', () => {

    //Template for sub test suites
    describe('...', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = '<element id="...">...</element>';
            global.id = document.querySelector('#id');
        })

        test('test for ...', () => {
            //Edit as required
            sorters.function();
            expect(id.querySelectorAll('child-element')).toBe('desired result!');
        })
    })

})