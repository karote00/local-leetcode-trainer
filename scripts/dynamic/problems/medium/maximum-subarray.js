module.exports = {
  id: 53,
  title: 'Maximum Subarray',
  name: 'maximum-subarray',
  difficulty: 'medium',
  description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
  examples: [
    { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
    { input: 'nums = [1]', output: '1', explanation: 'The subarray [1] has the largest sum 1.' },
    { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.' }
  ],
  constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
  topics: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'maxSubArray', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6, description: 'Mixed positive and negative', category: 'basic' },
    { input: [[1]], expected: 1, description: 'Single element', category: 'edge' },
    { input: [[5,4,-1,7,8]], expected: 23, description: 'Mostly positive', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'This is Kadanes algorithm', category: 'approach' },
    { level: 2, text: 'Keep track of current sum and maximum sum seen so far', category: 'implementation' }
  ]
};