module.exports = {
  id: 213,
  title: 'House Robber II',
  name: 'house-robber-ii',
  difficulty: 'medium',
  description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
  examples: [
    { input: 'nums = [2,3,2]', output: '3', explanation: 'You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.' },
    { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.' },
    { input: 'nums = [1,2,3]', output: '3', explanation: 'Rob house 3 (money = 3).' }
  ],
  constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
  topics: ['Array', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'rob', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[2,3,2]], expected: 3, description: 'Circular constraint', category: 'basic' },
    { input: [[1,2,3,1]], expected: 4, description: 'Four houses', category: 'basic' },
    { input: [[1,2,3]], expected: 3, description: 'Three houses', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Consider two cases: rob first house or rob last house', category: 'approach' },
    { level: 2, text: 'Run House Robber I on nums[0:n-2] and nums[1:n-1], take max', category: 'dp' }
  ]
};