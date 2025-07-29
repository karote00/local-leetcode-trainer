module.exports = {
  id: 347,
  title: 'Top K Frequent Elements',
  name: 'top-k-frequent-elements',
  difficulty: 'medium',
  description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
  examples: [
    { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]', explanation: 'The 2 most frequent elements are 1 and 2.' },
    { input: 'nums = [1], k = 1', output: '[1]', explanation: 'The most frequent element is 1.' }
  ],
  constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, the number of unique elements in the array].', 'It is guaranteed that the answer is unique.'],
  topics: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Bucket Sort', 'Counting', 'Quickselect'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'topKFrequent', params: [{ name: 'nums', type: 'number[]' }, { name: 'k', type: 'number' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[1,1,1,2,2,3], 2], expected: [1,2], description: 'Multiple frequencies', category: 'basic' },
    { input: [[1], 1], expected: [1], description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Count frequencies with hash map, then find top k', category: 'approach' },
    { level: 2, text: 'Use heap, bucket sort, or quickselect for finding top k', category: 'optimization' }
  ]
};