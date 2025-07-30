module.exports = {
  id: 103,
  title: 'Binary Tree Zigzag Level Order Traversal',
  name: 'binary-tree-zigzag-level-order-traversal',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, return the zigzag level order traversal of its nodes\' values. (i.e., from left to right, then right to left for the next level and alternate between).',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]', explanation: 'Zigzag level order traversal.' },
    { input: 'root = [1]', output: '[[1]]', explanation: 'Single node.' },
    { input: 'root = []', output: '[]', explanation: 'Empty tree.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-100 <= Node.val <= 100'],
  topics: ['Tree', 'Breadth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'zigzagLevelOrder', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[3,9,20,null,null,15,7]], expected: [[3],[20,9],[15,7]], description: 'Standard tree', category: 'basic' },
    { input: [[1]], expected: [[1]], description: 'Single node', category: 'edge' },
    { input: [[]], expected: [], description: 'Empty tree', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use BFS with level tracking', category: 'approach' },
    { level: 2, text: 'Reverse the order of nodes for alternate levels', category: 'implementation' }
  ]
};