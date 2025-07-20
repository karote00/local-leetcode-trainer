// Test cases for Add Two Numbers problem
const { arrayToList, listToArray } = require('./add-two-numbers');

module.exports = [
    {
        input: [arrayToList([2,4,3]), arrayToList([5,6,4])],
        expected: [7,0,8],
        transform: (result) => listToArray(result)
    },
    {
        input: [arrayToList([0]), arrayToList([0])],
        expected: [0],
        transform: (result) => listToArray(result)
    },
    {
        input: [arrayToList([9,9,9,9,9,9,9]), arrayToList([9,9,9,9])],
        expected: [8,9,9,9,0,0,0,1],
        transform: (result) => listToArray(result)
    },
    {
        input: [arrayToList([2,4,9]), arrayToList([5,6,4,9])],
        expected: [7,0,4,0,1],
        transform: (result) => listToArray(result)
    }
];