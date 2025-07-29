module.exports = {
  id: 112,
  title: 'Path Sum',
  name: 'path-sum',
  difficulty: 'easy',
  description: 'Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum. A leaf is a node with no children.',
  examples: [
    { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true', explanation: 'The root-to-leaf path with the target sum is shown.' },
    { input: 'root = [1,2,3], targetSum = 5', output: 'false', explanation: 'There two root-to-leaf paths in the tree: (1 --> 2): The sum is 3. (1 --> 3): The sum is 4. There is no root-to-leaf path with sum = 5.' },
    { input: 'root = [], targetSum = 0', output: 'false', explanation: 'Since the tree is empty, there are no root-to-leaf paths.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 5000].', '-1000 <= Node.val <= 1000', '-1000 <= targetSum <= 1000'],
  topics: ['Tree', 'Depth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'hasPathSum', params: [{ name: 'root', type: 'TreeNode' }, { name: 'targetSum', type: 'number' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[5,4,8,11,null,13,4,7,2,null,null,null,1], 22], expected: true, description: 'Path exists', category: 'basic' },
    { input: [[1,2,3], 5], expected: false, description: 'No valid path', category: 'basic' },
    { input: [[], 0], expected: false, description: 'Empty tree', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use DFS to traverse all root-to-leaf paths', category: 'approach' },
    { level: 2, text: 'Subtract current node value from targetSum and recurse', category: 'dfs' }
  ]
};