module.exports = {
  id: 322,
  title: 'Coin Change',
  name: 'coin-change',
  difficulty: 'medium',
  description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
  examples: [
    { input: 'coins = [1,3,4], amount = 6', output: '2', explanation: 'The minimum number of coins is 2 (3 + 3).' },
    { input: 'coins = [2], amount = 3', output: '-1', explanation: 'The amount cannot be made up.' },
    { input: 'coins = [1], amount = 0', output: '0', explanation: 'No coins needed for amount 0.' }
  ],
  constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
  topics: ['Array', 'Dynamic Programming', 'Breadth-First Search'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'coinChange', params: [{ name: 'coins', type: 'number[]' }, { name: 'amount', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,3,4], 6], expected: 2, description: 'Optimal coin selection', category: 'basic' },
    { input: [[2], 3], expected: -1, description: 'Impossible amount', category: 'edge' },
    { input: [[1], 0], expected: 0, description: 'Zero amount', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use dynamic programming with bottom-up approach', category: 'approach' },
    { level: 2, text: 'dp[i] = minimum coins needed for amount i', category: 'dp' }
  ]
};