//Import js file
const sorters = require('../script/sorters')

//Set up overall test suite for sorters.js functions

//Need to mock functions?

// describe ('sorters', () => {

//     //Template for sub test suites
//     describe('...', () => {
//         beforeEach(() => {
//             document.documentElement.innerHTML = '<element id="...">...</element>';
//             global.id = document.querySelector('#id');
//         })

//         test('test for ...', () => {
//             //Edit as required
//             sorters.function();
//             expect(id.querySelectorAll('child-element')).toBe('desired result!');
//         })
//     })

// })

// const mockentries = [{"date":"2021-02-07T00:00:00.000Z","reacts":[0,0,0],"comments":["Loser","Oi, that's not very nice!"]},
// {"date":"2020-01-01T00:00:00.000Z","reacts":[1,1,1],"comments":[]},
// {"date":"2021-02-03T00:00:00.000Z","reacts":[0,0,0],"comments":[]}]

// const orderbydate = [{"date":"2021-02-07T00:00:00.000Z","reacts":[0,0,0],"comments":["Loser","Oi, that's not very nice!"]},
// {"date":"2021-02-03T00:00:00.000Z","reacts":[0,0,0],"comments":[]},
// {"date":"2020-01-01T00:00:00.000Z","reacts":[1,1,1],"comments":[]}]



let mockentries;


describe('sorters', () => {
    beforeAll(() => {
        mockentries = [{ "date": "2021-02-07T00:00:00.000Z", "reacts": [3, 3, 3], "comments": ["Loser", "Oi, that's not very nice!"] },
        { "date": "2020-01-01T00:00:00.000Z", "reacts": [1, 1, 1], "comments": ['hello','bye','go'] },
        { "date": "2021-02-03T00:00:00.000Z", "reacts": [2, 2, 2], "comments": [] }]

    })

    test('order by recent', () => {


        let orderbyrecent = [{ "date": "2020-01-01T00:00:00.000Z" },
        { "date": "2021-02-03T00:00:00.000Z" },
        { "date": "2021-02-07T00:00:00.000Z" }]

        sortedEntries = sorters.byRecent(mockentries)

        sortedEntries.forEach((entry, index) => {
            expect(entry.date).toBe(orderbyrecent[index].date)

        });

    })


    test('orders by oldest', () => {


        let orderbyoldest = [{ "date": "2021-02-07T00:00:00.000Z" },
        { "date": "2021-02-03T00:00:00.000Z" },
        { "date": "2020-01-01T00:00:00.000Z" }]

        sortedEntries = sorters.byOldest(mockentries)

        sortedEntries.forEach((entry, index) => {
            expect(entry.date).toBe(orderbyoldest[index].date)

        });

    })

    test('orders by number of reacts', () => {


        let orderbyreacts = [{"reacts": [1, 1, 1]},
        { "reacts": [2, 2, 2] },
        { "reacts": [3,3,3]}]

        sortedEntries = sorters.byReacts(mockentries)

        sortedEntries.forEach((entry, index) => {
            expect(entry.reacts).toStrictEqual(orderbyreacts[index].reacts)

        });

    })

    test('orders by number of comments', () => {


        let orderbycomments = [{"comments": ['hello','bye','go']},
        { "comments": ["Loser", "Oi, that's not very nice!"]},
        { "comments": []}]

        sortedEntries = sorters.byReacts(mockentries)

        // sortedEntries.forEach((entry, index) => {

        for(let i = 0; i<sortedEntries.length; i++){
         
            expect(sortedEntries[i].comments).toStrictEqual(orderbycomments[i].comments)

        };

    })






})







