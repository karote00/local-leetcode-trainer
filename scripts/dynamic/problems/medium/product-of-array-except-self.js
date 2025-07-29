module.exports = {
  id: 238,
  title: 'Product of Array Except Self',
  name: 'product-of-array-except-self',
  difficulty: 'medium',
  description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.',
  examples: [
    { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc.' },
    { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: 'Product except self for each position.' }
  ],
  constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.'],
  topics: ['Array', 'Prefix Sum'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'productExceptSelf', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[1,2,3,4]], expected: [24,12,8,6], description: 'Standard case', category: 'basic' },
    { input: [[-1,1,0,-3,3]], expected: [0,0,9,0,0], description: 'With zero', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use left and right product arrays', category: 'approach' },
    { level: 2, text: 'Can optimize to O(1) space by using output array for left products', category: 'optimization' }
  ]
};