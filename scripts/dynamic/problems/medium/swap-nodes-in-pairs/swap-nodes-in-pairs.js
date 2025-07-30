module.exports = {
  id: 24,
  title: 'Swap Nodes in Pairs',
  name: 'swap-nodes-in-pairs',
  difficulty: 'medium',
  description: 'Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list\'s nodes (i.e., only nodes themselves may be changed.)',
  examples: [
    { input: 'head = [1,2,3,4]', output: '[2,1,4,3]', explanation: 'Swap adjacent pairs.' },
    { input: 'head = []', output: '[]', explanation: 'Empty list.' },
    { input: 'head = [1]', output: '[1]', explanation: 'Single node.' }
  ],
  constraints: ['The number of nodes in the list is in the range [0, 100].', '0 <= Node.val <= 100'],
  topics: ['Linked List', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'swapPairs', params: [{ name: 'head', type: 'ListNode' }], returnType: 'ListNode' }
  },
  testCases: [
    { input: [[1,2,3,4]], expected: [2,1,4,3], description: 'Even number of nodes', category: 'basic' },
    { input: [[]], expected: [], description: 'Empty list', category: 'edge' },
    { input: [[1]], expected: [1], description: 'Single node', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use recursion or iterative approach with dummy head', category: 'approach' },
    { level: 2, text: 'Carefully manage the pointers during swapping', category: 'implementation' }
  ]
};