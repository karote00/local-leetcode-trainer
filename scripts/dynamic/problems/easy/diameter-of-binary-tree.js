module.exports = {
  id: 543,
  title: 'Diameter of Binary Tree',
  name: 'diameter-of-binary-tree',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.',
  examples: [
    { input: 'root = [1,2,3,4,5]', output: '3', explanation: 'The diameter is the path [4,2,1,3] or [5,2,1,3], which has length 3.' },
    { input: 'root = [1,2]', output: '1', explanation: 'The diameter is the path [2,1], which has length 1.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-100 <= Node.val <= 100'],
  topics: ['Tree', 'Depth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'diameterOfBinaryTree', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,2,3,4,5]], expected: 3, description: 'Standard tree', category: 'basic' },
    { input: [[1,2]], expected: 1, description: 'Simple tree', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'For each node, diameter = left_height + right_height', category: 'approach' },
    { level: 2, text: 'Use DFS to calculate height and update global diameter', category: 'dfs' }
  ]
};