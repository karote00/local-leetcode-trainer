module.exports = {
  id: 101,
  title: 'Symmetric Tree',
  name: 'symmetric-tree',
  difficulty: 'easy',
  description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
  examples: [
    { input: 'root = [1,2,2,3,4,4,3]', output: 'true', explanation: 'The tree is symmetric.' },
    { input: 'root = [1,2,2,null,3,null,3]', output: 'false', explanation: 'The tree is not symmetric.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [1, 1000].', '-100 <= Node.val <= 100'],
  topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'isSymmetric', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[1,2,2,3,4,4,3]], expected: true, description: 'Symmetric tree', category: 'basic' },
    { input: [[1,2,2,null,3,null,3]], expected: false, description: 'Not symmetric', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Compare left and right subtrees recursively', category: 'approach' },
    { level: 2, text: 'Check if left.left equals right.right and left.right equals right.left', category: 'implementation' }
  ]
};