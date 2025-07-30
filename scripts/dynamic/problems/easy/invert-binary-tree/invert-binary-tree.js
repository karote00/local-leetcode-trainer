module.exports = {
  id: 226,
  title: 'Invert Binary Tree',
  name: 'invert-binary-tree',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, invert the tree, and return its root.',
  examples: [
    { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: 'Invert the binary tree.' },
    { input: 'root = [2,1,3]', output: '[2,3,1]', explanation: 'Simple inversion.' },
    { input: 'root = []', output: '[]', explanation: 'Empty tree.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
  topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'invertTree', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'TreeNode' }
  },
  testCases: [
    { input: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1], description: 'Standard tree', category: 'basic' },
    { input: [[2,1,3]], expected: [2,3,1], description: 'Simple tree', category: 'basic' },
    { input: [[]], expected: [], description: 'Empty tree', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Recursively swap left and right children', category: 'approach' },
    { level: 2, text: 'Can use DFS or BFS approach', category: 'implementation' }
  ]
};