module.exports = {
  id: 215,
  title: 'Kth Largest Element in an Array',
  name: 'kth-largest-element-in-an-array',
  difficulty: 'medium',
  description: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting?',
  examples: [
    { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5', explanation: 'The 2nd largest element is 5.' },
    { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4', explanation: 'The 4th largest element is 4.' }
  ],
  constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
  topics: ['Array', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Quickselect'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'findKthLargest', params: [{ name: 'nums', type: 'number[]' }, { name: 'k', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [[3,2,1,5,6,4], 2], expected: 5, description: 'Find 2nd largest', category: 'basic' },
    { input: [[3,2,3,1,2,4,5,5,6], 4], expected: 4, description: 'With duplicates', category: 'basic' },
    { input: [[1], 1], expected: 1, description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use quickselect algorithm for O(n) average time', category: 'approach' },
    { level: 2, text: 'Or use min-heap of size k for O(n log k) time', category: 'alternative' }
  ]
};