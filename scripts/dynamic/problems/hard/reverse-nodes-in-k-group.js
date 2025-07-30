module.exports = {
  id: 25,
  title: 'Reverse Nodes in k-Group',
  name: 'reverse-nodes-in-k-group',
  difficulty: 'hard',
  description: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.',
  examples: [
    { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]', explanation: 'The first 2 nodes are reversed, then the next 2 nodes, leaving the last node as is.' },
    { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]', explanation: 'The first 3 nodes are reversed, leaving the remaining 2 nodes as is.' }
  ],
  constraints: [
    'The number of nodes in the list is n.',
    '1 <= k <= n <= 5000',
    '0 <= Node.val <= 1000'
  ],
  topics: ['Linked List', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'reverseKGroup', params: [{ name: 'head', type: 'ListNode' }, { name: 'k', type: 'number' }], returnType: 'ListNode' }
  },
  testCases: [
    { input: [null, 2], expected: null, description: 'Empty list', category: 'edge' },
    { input: [[1], 1], expected: [1], description: 'Single node', category: 'edge' },
    { input: [[1,2,3,4,5], 2], expected: [2,1,4,3,5], description: 'Reverse in groups of 2', category: 'basic' },
    { input: [[1,2,3,4,5], 3], expected: [3,2,1,4,5], description: 'Reverse in groups of 3', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use recursion to handle each k-group', category: 'approach' },
    { level: 2, text: 'Reverse the current k-group, then recursively handle the rest', category: 'implementation' }
  ]
};