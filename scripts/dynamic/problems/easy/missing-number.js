module.exports = {
  id: 268,
  title: 'Missing Number',
  name: 'missing-number',
  difficulty: 'easy',
  description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
  examples: [
    { input: 'nums = [3,0,1]', output: '2', explanation: 'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.' },
    { input: 'nums = [0,1]', output: '2', explanation: 'n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number.' },
    { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8', explanation: 'n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number.' }
  ],
  constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All the numbers of nums are unique.'],
  topics: ['Array', 'Hash Table', 'Math', 'Binary Search', 'Bit Manipulation', 'Sorting'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'missingNumber', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[3,0,1]], expected: 2, description: 'Missing middle number', category: 'basic' },
    { input: [[0,1]], expected: 2, description: 'Missing last number', category: 'basic' },
    { input: [[9,6,4,2,3,5,7,0,1]], expected: 8, description: 'Large array', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use sum formula: sum of 0 to n is n*(n+1)/2', category: 'approach' },
    { level: 2, text: 'Missing number = expected sum - actual sum', category: 'math' }
  ]
};