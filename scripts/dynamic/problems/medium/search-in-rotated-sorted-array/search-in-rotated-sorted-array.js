module.exports = {
  id: 33,
  title: 'Search in Rotated Sorted Array',
  name: 'search-in-rotated-sorted-array',
  difficulty: 'medium',
  description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
  examples: [
    { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', explanation: 'Target 0 is at index 4.' },
    { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1', explanation: 'Target 3 is not in the array.' },
    { input: 'nums = [1], target = 0', output: '-1', explanation: 'Target 0 is not in the single element array.' }
  ],
  constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.', '-10^4 <= target <= 10^4'],
  topics: ['Array', 'Binary Search'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'search', params: [{ name: 'nums', type: 'number[]' }, { name: 'target', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [[4,5,6,7,0,1,2], 0], expected: 4, description: 'Target in rotated part', category: 'basic' },
    { input: [[4,5,6,7,0,1,2], 3], expected: -1, description: 'Target not found', category: 'basic' },
    { input: [[1], 0], expected: -1, description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use modified binary search', category: 'approach' },
    { level: 2, text: 'Determine which half is sorted and check if target is in that range', category: 'binary-search' }
  ]
};