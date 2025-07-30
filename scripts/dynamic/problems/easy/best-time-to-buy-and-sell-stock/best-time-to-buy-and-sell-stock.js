module.exports = {
  id: 121,
  title: 'Best Time to Buy and Sell Stock',
  name: 'best-time-to-buy-and-sell-stock',
  difficulty: 'easy',
  description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
  examples: [
    { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
    { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'In this case, no transactions are done and the max profit = 0.' }
  ],
  constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
  topics: ['Array', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'maxProfit', params: [{ name: 'prices', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[7,1,5,3,6,4]], expected: 5, description: 'Standard case', category: 'basic' },
    { input: [[7,6,4,3,1]], expected: 0, description: 'Decreasing prices', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Track minimum price seen so far', category: 'approach' },
    { level: 2, text: 'For each price, calculate profit if selling today', category: 'implementation' }
  ]
};