module.exports = {
  id: 31,
  title: 'Next Permutation',
  name: 'next-permutation',
  difficulty: 'medium',
  description: 'A permutation of an array of integers is an arrangement of its members into a sequence or linear order. The next permutation of an array of integers is the next lexicographically greater permutation of its integer.',
  examples: [
    { input: 'nums = [1,2,3]', output: '[1,3,2]', explanation: 'The next permutation of [1,2,3] is [1,3,2].' },
    { input: 'nums = [3,2,1]', output: '[1,2,3]', explanation: 'The next permutation of [3,2,1] is [1,2,3].' },
    { input: 'nums = [1,1,5]', output: '[1,5,1]', explanation: 'The next permutation of [1,1,5] is [1,5,1].' }
  ],
  constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 100'],
  topics: ['Array', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'nextPermutation', params: [{ name: 'nums', type: 'number[]' }], returnType: 'void' }
  },
  testCases: [
    { input: [[1,2,3]], expected: [1,3,2], description: 'Standard case', category: 'basic' },
    { input: [[3,2,1]], expected: [1,2,3], description: 'Descending order', category: 'edge' },
    { input: [[1,1,5]], expected: [1,5,1], description: 'With duplicates', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Find the rightmost character that is smaller than its next character', category: 'approach' },
    { level: 2, text: 'Swap it with the smallest character on its right that is larger than it', category: 'algorithm' }
  ]
};