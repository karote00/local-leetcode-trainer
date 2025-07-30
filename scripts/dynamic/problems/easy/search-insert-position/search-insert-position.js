module.exports = {
  id: 35,
  title: 'Search Insert Position',
  name: 'search-insert-position',
  difficulty: 'easy',
  description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
  examples: [
    { input: 'nums = [1,3,5,6], target = 5', output: '2', explanation: 'Target 5 is found at index 2.' },
    { input: 'nums = [1,3,5,6], target = 2', output: '1', explanation: 'Target 2 should be inserted at index 1.' },
    { input: 'nums = [1,3,5,6], target = 7', output: '4', explanation: 'Target 7 should be inserted at index 4.' }
  ],
  constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums contains distinct values sorted in ascending order.', '-10^4 <= target <= 10^4'],
  topics: ['Array', 'Binary Search'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'searchInsert', params: [{ name: 'nums', type: 'number[]' }, { name: 'target', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,3,5,6], 5], expected: 2, description: 'Target found', category: 'basic' },
    { input: [[1,3,5,6], 2], expected: 1, description: 'Insert in middle', category: 'basic' },
    { input: [[1,3,5,6], 7], expected: 4, description: 'Insert at end', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use binary search to find the position', category: 'approach' },
    { level: 2, text: 'If target not found, return the left boundary', category: 'implementation' }
  ]
};