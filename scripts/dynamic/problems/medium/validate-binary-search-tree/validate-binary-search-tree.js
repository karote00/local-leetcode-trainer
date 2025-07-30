module.exports = {
  id: 98,
  title: 'Validate Binary Search Tree',
  name: 'validate-binary-search-tree',
  difficulty: 'medium',
  description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node\'s key. The right subtree of a node contains only nodes with keys greater than the node\'s key. Both the left and right subtrees must also be binary search trees.',
  examples: [
    { input: 'root = [2,1,3]', output: 'true', explanation: 'This is a valid BST.' },
    { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'The root node\'s value is 5 but its right child\'s value is 4.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
  topics: ['Tree', 'Depth-First Search', 'Binary Search Tree', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'isValidBST', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[2,1,3]], expected: true, description: 'Valid BST', category: 'basic' },
    { input: [[5,1,4,null,null,3,6]], expected: false, description: 'Invalid BST', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use inorder traversal - should be in ascending order', category: 'approach' },
    { level: 2, text: 'Or use bounds checking with min/max values', category: 'alternative' }
  ]
};