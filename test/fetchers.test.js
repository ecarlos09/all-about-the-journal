//Import js file
const fetchers= require('../script/fetchers')

//Set up overall test suite for index.js functions

    //Need to mock functions?

describe ('fetchers', () => {

    //Template for sub test suites
    describe('...', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = '<element id="...">...</element>';
            global.id = document.querySelector('#id');
        })

        test('test for ...', () => {
            //Edit as required
            fetchers.function();
            expect(id.querySelectorAll('child-element')).toBe('desired result!');
        })
    })

})