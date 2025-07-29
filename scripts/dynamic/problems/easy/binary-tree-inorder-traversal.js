module.exports = {
  id: 94,
  title: 'Binary Tree Inorder Traversal',
  name: 'binary-tree-inorder-traversal',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
  examples: [
    { input: 'root = [1,null,2,3]', output: '[1,3,2]', explanation: 'Inorder traversal: left, root, right.' },
    { input: 'root = []', output: '[]', explanation: 'Empty tree.' },
    { input: 'root = [1]', output: '[1]', explanation: 'Single node.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
  topics: ['Stack', 'Tree', 'Depth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'inorderTraversal', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[1,null,2,3]], expected: [1,3,2], description: 'Standard tree', category: 'basic' },
    { input: [[]], expected: [], description: 'Empty tree', category: 'edge' },
    { input: [[1]], expected: [1], description: 'Single node', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use recursion or stack for iterative approach', category: 'approach' },
    { level: 2, text: 'Inorder: left subtree, root, right subtree', category: 'traversal' }
  ]
};