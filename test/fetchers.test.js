//Import js file
const fetchers = require('../script/fetchers')

//Require jest-fetch-mock and supertest
global.fetch = require('jest-fetch-mock');

//Set up overall test suite for index.js functions

    //Need to mock functions?

describe ('fetchers', () => {
    //Reset all mocks before each test
    beforeEach(() => { fetch.resetMocks() });

    test('it makes a get call to /entries route', () => {
        fetchers.get('entries');
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toMatch(/entries/);
    })

    test('it makes a post call to /entries route', () => {
        const mockBody = {
            "date": new Date(),
            "message": 'hello',
            "gif": 'url',
        };
        fetchers.create(mockBody);
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toMatch(/entries/);

    })

    test('it makes an add call to /entries/1 route', () => {
        let route = 'comments';
        const mockBody = {
            "date": new Date(),
            "message": 'hello',
            "gif": 'url',
        };
        fetchers.add(1, mockBody, route);
        expect(fetch).toHaveBeenCalled();
        expect(fetch.mock.calls[0][0]).toMatch(/entries\/1\/comments/);
    })

    // //Template for sub test suites
    // describe('...', () => {
    //     beforeEach(() => {
    //         document.documentElement.innerHTML = '<element id="...">...</element>';
    //         global.id = document.querySelector('#id');
    //     })

    //     test('test for ...', () => {
    //         //Edit as required
    //         fetchers.function();
    //         expect(id.querySelectorAll('child-element')).toBe('desired result!');
    //     })
    // })

})