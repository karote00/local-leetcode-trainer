module.exports = {
  id: 124,
  title: 'Binary Tree Maximum Path Sum',
  name: 'binary-tree-maximum-path-sum',
  difficulty: 'hard',
  description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root. The path sum of a path is the sum of the node\'s values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.',
  examples: [
    { input: 'root = [1,2,3]', output: '6', explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.' },
    { input: 'root = [-10,9,20,null,null,15,7]', output: '42', explanation: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [1, 3 * 10^4].', '-1000 <= Node.val <= 1000'],
  topics: ['Dynamic Programming', 'Tree', 'Depth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'maxPathSum', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,2,3]], expected: 6, description: 'Simple path', category: 'basic' },
    { input: [[-10,9,20,null,null,15,7]], expected: 42, description: 'Path with negative values', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use DFS to calculate max path sum ending at each node', category: 'approach' },
    { level: 2, text: 'For each node, consider path through it connecting left and right subtrees', category: 'dfs' }
  ]
};