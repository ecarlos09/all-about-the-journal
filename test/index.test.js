//Import js file
const index = require('../script/index')

//Set up mock library
jest.mock(index);


//Set up overall test suite for index.js functions
describe ('index.js', () => {

    //Template for sub test suites
    describe('beginSearch', () => {
        // beforeEach(() => {
        //     document.documentElement.innerHTML = '<element id="search-btn">...</element>';
        //     global.id = document.querySelector('');
        // })

        test('test that beginSearch contains a callback function', () => {
            const fakeClear = jest.fn();
            index.beginSearch(e);
            expect(fakeClear).toHaveBeenCalledTimes(1);
            // expect(id.querySelectorAll('child-element')).toBe('desired result!');
        })
    })

})