module.exports = {
  id: 617,
  title: 'Merge Two Binary Trees',
  name: 'merge-two-binary-trees',
  difficulty: 'easy',
  description: 'You are given two binary trees root1 and root2. Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree. Return the merged tree.',
  examples: [
    { input: 'root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]', output: '[3,4,5,5,4,null,7]', explanation: 'The merged tree is [3,4,5,5,4,null,7].' },
    { input: 'root1 = [1], root2 = [1,2]', output: '[2,2]', explanation: 'Merge single nodes.' }
  ],
  constraints: ['The number of nodes in both trees is in the range [0, 2000].', '-10^4 <= Node.val <= 10^4'],
  topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'mergeTrees', params: [{ name: 'root1', type: 'TreeNode' }, { name: 'root2', type: 'TreeNode' }], returnType: 'TreeNode' }
  },
  testCases: [
    { input: [[1,3,2,5], [2,1,3,null,4,null,7]], expected: [3,4,5,5,4,null,7], description: 'Merge overlapping trees', category: 'basic' },
    { input: [[1], [1,2]], expected: [2,2], description: 'Simple merge', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use DFS to traverse both trees simultaneously', category: 'approach' },
    { level: 2, text: 'If both nodes exist, sum values; otherwise use the non-null node', category: 'implementation' }
  ]
};