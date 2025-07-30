module.exports = {
  id: 153,
  title: 'Find Minimum in Rotated Sorted Array',
  name: 'find-minimum-in-rotated-sorted-array',
  difficulty: 'medium',
  description: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.',
  examples: [
    { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'The original array was [1,2,3,4,5] rotated 3 times.' },
    { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explanation: 'The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.' },
    { input: 'nums = [11,13,15,17]', output: '11', explanation: 'The original array was [11,13,15,17] and it was rotated 4 times.' }
  ],
  constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All the integers of nums are unique.', 'nums is sorted and rotated between 1 and n times.'],
  topics: ['Array', 'Binary Search'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'findMin', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[3,4,5,1,2]], expected: 1, description: 'Rotated array', category: 'basic' },
    { input: [[4,5,6,7,0,1,2]], expected: 0, description: 'Another rotation', category: 'basic' },
    { input: [[11,13,15,17]], expected: 11, description: 'No rotation', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use binary search to find the rotation point', category: 'approach' },
    { level: 2, text: 'Compare middle element with rightmost to decide which half to search', category: 'binary-search' }
  ]
};