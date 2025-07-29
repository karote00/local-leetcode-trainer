module.exports = {
  id: 34,
  title: 'Find First and Last Position of Element in Sorted Array',
  name: 'find-first-and-last-position-of-element-in-sorted-array',
  difficulty: 'medium',
  description: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.',
  examples: [
    { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]', explanation: 'Target 8 is found at indices 3 and 4.' },
    { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]', explanation: 'Target 6 is not found.' },
    { input: 'nums = [], target = 0', output: '[-1,-1]', explanation: 'Empty array.' }
  ],
  constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'nums is a non-decreasing array.', '-10^9 <= target <= 10^9'],
  topics: ['Array', 'Binary Search'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'searchRange', params: [{ name: 'nums', type: 'number[]' }, { name: 'target', type: 'number' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[5,7,7,8,8,10], 8], expected: [3,4], description: 'Target found multiple times', category: 'basic' },
    { input: [[5,7,7,8,8,10], 6], expected: [-1,-1], description: 'Target not found', category: 'basic' },
    { input: [[], 0], expected: [-1,-1], description: 'Empty array', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use binary search to find leftmost and rightmost positions', category: 'approach' },
    { level: 2, text: 'Modify binary search to find first and last occurrence separately', category: 'binary-search' }
  ]
};