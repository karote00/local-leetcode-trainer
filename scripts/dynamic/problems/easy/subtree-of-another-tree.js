module.exports = {
  id: 572,
  title: 'Subtree of Another Tree',
  name: 'subtree-of-another-tree',
  difficulty: 'easy',
  description: 'Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise. A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node\'s descendants. The tree tree could also be considered as a subtree of itself.',
  examples: [
    { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true', explanation: 'The subtree [4,1,2] exists in the main tree.' },
    { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false', explanation: 'The subtree [4,1,2] does not exist in the main tree.' }
  ],
  constraints: ['The number of nodes in the root tree is in the range [1, 2000].', 'The number of nodes in the subRoot tree is in the range [1, 1000].', '-10^4 <= root.val <= 10^4', '-10^4 <= subRoot.val <= 10^4'],
  topics: ['Tree', 'Depth-First Search', 'String Matching', 'Binary Tree', 'Hash Function'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'isSubtree', params: [{ name: 'root', type: 'TreeNode' }, { name: 'subRoot', type: 'TreeNode' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[3,4,5,1,2], [4,1,2]], expected: true, description: 'Subtree exists', category: 'basic' },
    { input: [[3,4,5,1,2,null,null,null,null,0], [4,1,2]], expected: false, description: 'Subtree does not exist', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'For each node in root, check if subtree starting there matches subRoot', category: 'approach' },
    { level: 2, text: 'Use helper function to check if two trees are identical', category: 'implementation' }
  ]
};