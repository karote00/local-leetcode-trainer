module.exports = {
  id: 26,
  title: 'Remove Duplicates from Sorted Array',
  name: 'remove-duplicates-from-sorted-array',
  difficulty: 'easy',
  description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.',
  examples: [
    { input: 'nums = [1,1,2]', output: '2, nums = [1,2,_]', explanation: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.' },
    { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5, nums = [0,1,2,3,4,_,_,_,_,_]', explanation: 'Your function should return k = 5.' }
  ],
  constraints: ['1 <= nums.length <= 3 * 10^4', '-100 <= nums[i] <= 100', 'nums is sorted in non-decreasing order.'],
  topics: ['Array', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft', 'Facebook', 'Apple'],
  functionSignatures: {
    javascript: { name: 'removeDuplicates', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,1,2]], expected: 2, description: 'Sorted array with duplicates', category: 'basic' },
    { input: [[0,0,1,1,1,2,2,3,3,4]], expected: 5, description: 'Multiple duplicates', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers - one for reading, one for writing', category: 'approach' },
    { level: 2, text: 'Only advance write pointer when you find a new unique element', category: 'implementation' }
  ]
};