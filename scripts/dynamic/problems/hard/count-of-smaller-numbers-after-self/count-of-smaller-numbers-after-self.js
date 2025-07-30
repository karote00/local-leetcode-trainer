module.exports = {
  id: 315,
  title: 'Count of Smaller Numbers After Self',
  name: 'count-of-smaller-numbers-after-self',
  difficulty: 'hard',
  description: 'Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].',
  examples: [
    { input: 'nums = [5,2,6,1]', output: '[2,1,1,0]', explanation: 'To the right of 5 there are 2 smaller elements (2 and 1). To the right of 2 there is only 1 smaller element (1). To the right of 6 there is 1 smaller element (1). To the right of 1 there is 0 smaller element.' },
    { input: 'nums = [-1]', output: '[0]', explanation: 'Single element has no elements to the right.' },
    { input: 'nums = [-1,-1]', output: '[0,0]', explanation: 'No smaller elements to the right for either element.' }
  ],
  constraints: [
    '1 <= nums.length <= 10^5',
    '-10^4 <= nums[i] <= 10^4'
  ],
  topics: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Segment Tree', 'Merge Sort'],
  companies: ['Google', 'Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'countSmaller', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[5,2,6,1]], expected: [2,1,1,0], description: 'Basic counting', category: 'basic' },
    { input: [[-1]], expected: [0], description: 'Single element', category: 'edge' },
    { input: [[-1,-1]], expected: [0,0], description: 'Duplicate elements', category: 'edge' },
    { input: [[1,2,3,4,5]], expected: [0,0,0,0,0], description: 'Ascending order', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use merge sort with index tracking', category: 'approach' },
    { level: 2, text: 'Count inversions during merge process', category: 'implementation' }
  ]
};