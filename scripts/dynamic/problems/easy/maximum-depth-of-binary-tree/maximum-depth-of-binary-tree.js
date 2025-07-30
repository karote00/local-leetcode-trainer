module.exports = {
  id: 104,
  title: 'Maximum Depth of Binary Tree',
  name: 'maximum-depth-of-binary-tree',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, return its maximum depth.',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: 'The maximum depth is 3.' },
    { input: 'root = [1,null,2]', output: '2', explanation: 'The maximum depth is 2.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
  topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'maxDepth', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'number' }
  },
  testCases: [
    { input: [[3,9,20,null,null,15,7]], expected: 3, description: 'Balanced tree', category: 'basic' },
    { input: [[1,null,2]], expected: 2, description: 'Unbalanced tree', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use recursion to find depth of left and right subtrees', category: 'approach' },
    { level: 2, text: 'Return 1 + max(left_depth, right_depth)', category: 'implementation' }
  ]
};