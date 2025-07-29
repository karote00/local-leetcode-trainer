module.exports = {
  id: 41,
  title: 'First Missing Positive',
  name: 'first-missing-positive',
  difficulty: 'hard',
  description: 'Given an unsorted integer array nums, return the smallest missing positive integer.',
  examples: [
    { input: 'nums = [1,2,0]', output: '3', explanation: 'The numbers in the range [1,2] are all in the array.' },
    { input: 'nums = [3,4,-1,1]', output: '2', explanation: 'The number 2 is missing.' },
    { input: 'nums = [7,8,9,11,12]', output: '1', explanation: 'The smallest positive integer 1 is missing.' }
  ],
  constraints: ['1 <= nums.length <= 10^5', '-2^31 <= nums[i] <= 2^31 - 1'],
  topics: ['Array', 'Hash Table'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'firstMissingPositive', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,2,0]], expected: 3, description: 'Missing positive', category: 'basic' },
    { input: [[3,4,-1,1]], expected: 2, description: 'Unsorted with negatives', category: 'basic' },
    { input: [[7,8,9,11,12]], expected: 1, description: 'All large numbers', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use the array itself as a hash table', category: 'approach' },
    { level: 2, text: 'Place each number at its correct index position', category: 'implementation' }
  ]
};