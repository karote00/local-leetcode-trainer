module.exports = {
  id: 312,
  title: 'Burst Balloons',
  name: 'burst-balloons',
  difficulty: 'hard',
  description: 'You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons. If you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it. Return the maximum coins you can collect by bursting the balloons wisely.',
  examples: [
    { input: 'nums = [3,1,5,8]', output: '167', explanation: 'Burst balloon at index 1: coins = 3*1*5 = 15, nums = [3,5,8]. Burst balloon at index 1: coins = 3*5*8 = 120, nums = [3,8]. Burst balloon at index 0: coins = 1*3*8 = 24, nums = [8]. Burst balloon at index 0: coins = 1*8*1 = 8, nums = []. Total coins = 15 + 120 + 24 + 8 = 167.' },
    { input: 'nums = [1,5]', output: '10', explanation: 'Burst balloon at index 0: coins = 1*1*5 = 5, nums = [5]. Burst balloon at index 0: coins = 1*5*1 = 5, nums = []. Total coins = 5 + 5 = 10.' }
  ],
  constraints: [
    'n == nums.length',
    '1 <= n <= 300',
    '0 <= nums[i] <= 100'
  ],
  topics: ['Array', 'Dynamic Programming'],
  companies: ['Google', 'Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'maxCoins', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[3,1,5,8]], expected: 167, description: 'Complex balloon bursting', category: 'basic' },
    { input: [[1,5]], expected: 10, description: 'Two balloons', category: 'basic' },
    { input: [[1]], expected: 1, description: 'Single balloon', category: 'edge' },
    { input: [[9,76,64,21]], expected: 57996, description: 'Larger numbers', category: 'stress' }
  ],
  hints: [
    { level: 1, text: 'Think about which balloon to burst last in each subrange', category: 'approach' },
    { level: 2, text: 'Use interval DP: dp[i][j] = max coins from bursting balloons between i and j', category: 'implementation' }
  ]
};