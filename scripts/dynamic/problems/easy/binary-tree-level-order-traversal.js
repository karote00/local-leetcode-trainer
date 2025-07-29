module.exports = {
  id: 102,
  title: 'Binary Tree Level Order Traversal',
  name: 'binary-tree-level-order-traversal',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: 'Level order traversal.' },
    { input: 'root = [1]', output: '[[1]]', explanation: 'Single node.' },
    { input: 'root = []', output: '[]', explanation: 'Empty tree.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
  topics: ['Tree', 'Breadth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'levelOrder', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]], description: 'Standard tree', category: 'basic' },
    { input: [[1]], expected: [[1]], description: 'Single node', category: 'edge' },
    { input: [[]], expected: [], description: 'Empty tree', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use BFS with queue to traverse level by level', category: 'approach' },
    { level: 2, text: 'Process all nodes at current level before moving to next', category: 'bfs' }
  ]
};