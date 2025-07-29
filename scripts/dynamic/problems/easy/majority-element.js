module.exports = {
  id: 169,
  title: 'Majority Element',
  name: 'majority-element',
  difficulty: 'easy',
  description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.',
  examples: [
    { input: 'nums = [3,2,3]', output: '3', explanation: '3 appears 2 times out of 3.' },
    { input: 'nums = [2,2,1,1,1,2,2]', output: '2', explanation: '2 appears 4 times out of 7.' }
  ],
  constraints: ['n == nums.length', '1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
  topics: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Counting'],
  companies: ['Amazon', 'Microsoft', 'Adobe'],
  functionSignatures: {
    javascript: { name: 'majorityElement', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[3,2,3]], expected: 3, description: 'Simple majority', category: 'basic' },
    { input: [[2,2,1,1,1,2,2]], expected: 2, description: 'Longer array', category: 'basic' },
    { input: [[1]], expected: 1, description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Boyer-Moore Voting Algorithm is optimal', category: 'approach' },
    { level: 2, text: 'Keep a count and candidate, update based on matches', category: 'algorithm' }
  ]
};