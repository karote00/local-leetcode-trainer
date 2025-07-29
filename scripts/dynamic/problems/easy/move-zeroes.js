module.exports = {
  id: 283,
  title: 'Move Zeroes',
  name: 'move-zeroes',
  difficulty: 'easy',
  description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements.',
  examples: [
    { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explanation: 'Move all zeros to the end.' },
    { input: 'nums = [0]', output: '[0]', explanation: 'Single zero element.' }
  ],
  constraints: ['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
  topics: ['Array', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'moveZeroes', params: [{ name: 'nums', type: 'number[]' }], returnType: 'void' }
  },
  testCases: [
    { input: [[0,1,0,3,12]], expected: [1,3,12,0,0], description: 'Mixed zeros and non-zeros', category: 'basic' },
    { input: [[0]], expected: [0], description: 'Single zero', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers to track non-zero elements', category: 'approach' },
    { level: 2, text: 'Swap non-zero elements to the front', category: 'implementation' }
  ]
};