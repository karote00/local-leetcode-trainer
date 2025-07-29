module.exports = {
  id: 136,
  title: 'Single Number',
  name: 'single-number',
  difficulty: 'easy',
  description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
  examples: [
    { input: 'nums = [2,2,1]', output: '1', explanation: '' },
    { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '' },
    { input: 'nums = [1]', output: '1', explanation: '' }
  ],
  constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element in the array appears twice except for one element which appears only once.'],
  topics: ['Array', 'Bit Manipulation'],
  companies: ['Amazon', 'Google', 'Apple'],
  functionSignatures: {
    javascript: { name: 'singleNumber', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[2,2,1]], expected: 1, description: 'Single element', category: 'basic' },
    { input: [[4,1,2,1,2]], expected: 4, description: 'Multiple pairs', category: 'basic' },
    { input: [[1]], expected: 1, description: 'Single element array', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use XOR operation', category: 'approach' },
    { level: 2, text: 'XOR of two identical numbers is 0, XOR of any number with 0 is the number itself', category: 'bit-manipulation' }
  ]
};