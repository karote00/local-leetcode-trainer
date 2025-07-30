module.exports = {
  id: 198,
  title: 'House Robber',
  name: 'house-robber',
  difficulty: 'easy',
  description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
  examples: [
    { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.' },
    { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.' }
  ],
  constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
  topics: ['Array', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'rob', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,2,3,1]], expected: 4, description: 'Basic case', category: 'basic' },
    { input: [[2,7,9,3,1]], expected: 12, description: 'Longer array', category: 'basic' },
    { input: [[5]], expected: 5, description: 'Single house', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use dynamic programming - dp[i] = max money up to house i', category: 'approach' },
    { level: 2, text: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])', category: 'dp' }
  ]
};