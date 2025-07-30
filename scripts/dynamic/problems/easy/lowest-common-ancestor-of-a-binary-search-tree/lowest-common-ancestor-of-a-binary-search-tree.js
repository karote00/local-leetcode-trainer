module.exports = {
  id: 235,
  title: 'Lowest Common Ancestor of a Binary Search Tree',
  name: 'lowest-common-ancestor-of-a-binary-search-tree',
  difficulty: 'easy',
  description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."',
  examples: [
    { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'The LCA of nodes 2 and 8 is 6.' },
    { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [2, 10^5].', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique.', 'p != q', 'p and q will exist in the BST.'],
  topics: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'lowestCommonAncestor', params: [{ name: 'root', type: 'TreeNode' }, { name: 'p', type: 'TreeNode' }, { name: 'q', type: 'TreeNode' }], returnType: 'TreeNode' }
  },
  testCases: [
    { input: [[6,2,8,0,4,7,9,null,null,3,5], 2, 8], expected: 6, description: 'LCA in different subtrees', category: 'basic' },
    { input: [[6,2,8,0,4,7,9,null,null,3,5], 2, 4], expected: 2, description: 'LCA is one of the nodes', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use BST property: if both nodes are smaller, go left; if both larger, go right', category: 'approach' },
    { level: 2, text: 'When nodes are on different sides, current node is LCA', category: 'bst' }
  ]
};