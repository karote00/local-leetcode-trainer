module.exports = {
  id: 19,
  title: 'Remove Nth Node From End of List',
  name: 'remove-nth-node-from-end-of-list',
  difficulty: 'medium',
  description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
  examples: [
    { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explanation: 'Remove the 2nd node from the end.' },
    { input: 'head = [1], n = 1', output: '[]', explanation: 'Remove the only node.' },
    { input: 'head = [1,2], n = 1', output: '[1]', explanation: 'Remove the last node.' }
  ],
  constraints: ['The number of nodes in the list is sz.', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
  topics: ['Linked List', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'removeNthFromEnd', params: [{ name: 'head', type: 'ListNode' }, { name: 'n', type: 'number' }], returnType: 'ListNode' }
  },
  testCases: [
    { input: [[1,2,3,4,5], 2], expected: [1,2,3,5], description: 'Remove from end', category: 'basic' },
    { input: [[1], 1], expected: [], description: 'Remove only node', category: 'edge' },
    { input: [[1,2], 1], expected: [1], description: 'Remove last node', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers with n gap between them', category: 'approach' },
    { level: 2, text: 'Use a dummy head to handle edge cases', category: 'implementation' }
  ]
};