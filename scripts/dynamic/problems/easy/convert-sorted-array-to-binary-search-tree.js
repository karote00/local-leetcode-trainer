module.exports = {
  id: 108,
  title: 'Convert Sorted Array to Binary Search Tree',
  name: 'convert-sorted-array-to-binary-search-tree',
  difficulty: 'easy',
  description: 'Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.',
  examples: [
    { input: 'nums = [-10,-3,0,5,9]', output: '[0,-3,9,-10,null,5]', explanation: '[0,-10,5,null,-3,null,9] is also accepted.' },
    { input: 'nums = [1,3]', output: '[3,1]', explanation: '[1,null,3] and [3,1] are both height-balanced BSTs.' }
  ],
  constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums is sorted in a strictly increasing order.'],
  topics: ['Array', 'Divide and Conquer', 'Tree', 'Binary Search Tree', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'sortedArrayToBST', params: [{ name: 'nums', type: 'number[]' }], returnType: 'TreeNode' }
  },
  testCases: [
    { input: [[-10,-3,0,5,9]], expected: [0,-3,9,-10,null,5], description: 'Standard array', category: 'basic' },
    { input: [[1,3]], expected: [3,1], description: 'Two elements', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use divide and conquer - middle element as root', category: 'approach' },
    { level: 2, text: 'Recursively build left and right subtrees', category: 'divide-conquer' }
  ]
};