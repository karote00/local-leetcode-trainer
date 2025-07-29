module.exports = {
  id: 27,
  title: 'Remove Element',
  name: 'remove-element',
  difficulty: 'easy',
  description: 'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.',
  examples: [
    { input: 'nums = [3,2,2,3], val = 3', output: '2, nums = [2,2,_,_]', explanation: 'Your function should return k = 2, with the first two elements of nums being 2.' },
    { input: 'nums = [0,1,2,2,3,0,4,2], val = 2', output: '5, nums = [0,1,4,0,3,_,_,_]', explanation: 'Your function should return k = 5.' }
  ],
  constraints: ['0 <= nums.length <= 100', '0 <= nums[i] <= 50', '0 <= val <= 100'],
  topics: ['Array', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'removeElement', params: [{ name: 'nums', type: 'number[]' }, { name: 'val', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [[3,2,2,3], 3], expected: 2, description: 'Remove specific value', category: 'basic' },
    { input: [[0,1,2,2,3,0,4,2], 2], expected: 5, description: 'Multiple occurrences', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers to overwrite elements', category: 'approach' },
    { level: 2, text: 'Only copy elements that are not equal to val', category: 'implementation' }
  ]
};