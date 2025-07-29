module.exports = {
  id: 217,
  title: 'Contains Duplicate',
  name: 'contains-duplicate',
  difficulty: 'easy',
  description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
  examples: [
    { input: 'nums = [1,2,3,1]', output: 'true', explanation: 'The value 1 appears at indices 0 and 3.' },
    { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All elements are distinct.' },
    { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true', explanation: 'Multiple duplicates exist.' }
  ],
  constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
  topics: ['Array', 'Hash Table', 'Sorting'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'containsDuplicate', params: [{ name: 'nums', type: 'number[]' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[1,2,3,1]], expected: true, description: 'Contains duplicate', category: 'basic' },
    { input: [[1,2,3,4]], expected: false, description: 'No duplicates', category: 'basic' },
    { input: [[1,1,1,3,3,4,3,2,4,2]], expected: true, description: 'Multiple duplicates', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use a hash set to track seen elements', category: 'approach' },
    { level: 2, text: 'Return true as soon as you find a duplicate', category: 'optimization' }
  ]
};