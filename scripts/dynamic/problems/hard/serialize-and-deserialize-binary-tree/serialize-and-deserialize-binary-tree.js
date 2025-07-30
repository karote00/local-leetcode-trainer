module.exports = {
  id: 297,
  title: 'Serialize and Deserialize Binary Tree',
  name: 'serialize-and-deserialize-binary-tree',
  difficulty: 'hard',
  description: 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.',
  examples: [
    { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', explanation: 'This is just one way to serialize. You do not necessarily need to follow this format.' },
    { input: 'root = []', output: '[]', explanation: 'Empty tree.' },
    { input: 'root = [1]', output: '[1]', explanation: 'Single node.' }
  ],
  constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-1000 <= Node.val <= 1000'],
  topics: ['String', 'Tree', 'Depth-First Search', 'Breadth-First Search', 'Design', 'Binary Tree'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'serialize', params: [{ name: 'root', type: 'TreeNode' }], returnType: 'string' }
  },
  testCases: [
    { input: [[1,2,3,null,null,4,5]], expected: '1,2,null,null,3,4,null,null,5,null,null', description: 'Standard tree', category: 'basic' },
    { input: [[]], expected: 'null', description: 'Empty tree', category: 'edge' },
    { input: [[1]], expected: '1,null,null', description: 'Single node', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use preorder traversal for serialization', category: 'approach' },
    { level: 2, text: 'Use a queue or index pointer for deserialization', category: 'implementation' }
  ]
};