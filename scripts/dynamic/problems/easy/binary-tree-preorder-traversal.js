module.exports = {
  id: 144,
  title: 'Binary Tree Preorder Traversal',
  name: 'binary-tree-preorder-traversal',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, return the preorder traversal of its nodes\' values.',
  examples: [
    { input: 'root = [1,null,2,3]', output: '[1,2,3]', explanation: 'Preorder traversal: root, left, right.' },
    { input: 'root = []', output: '[]', explanation: 'Empty tree.' },
    { input: 'root = [1]', output: '[1]', explanation: 'Single node.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
  topics: ['Stack', 'Tree', 'Depth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'preorderTraversal', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[1,null,2,3]], expected: [1,2,3], description: 'Standard tree', category: 'basic' },
    { input: [[]], expected: [], description: 'Empty tree', category: 'edge' },
    { input: [[1]], expected: [1], description: 'Single node', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use recursion or stack for iterative approach', category: 'approach' },
    { level: 2, text: 'Preorder: root, left subtree, right subtree', category: 'traversal' }
  ]
};