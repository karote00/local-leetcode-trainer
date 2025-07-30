module.exports = {
  id: 2,
  title: 'Add Two Numbers',
  name: 'add-two-numbers',
  difficulty: 'medium',
  description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
  examples: [
    { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807.' },
    { input: 'l1 = [0], l2 = [0]', output: '[0]', explanation: '0 + 0 = 0.' },
    { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]', explanation: '9999999 + 9999 = 10009998.' }
  ],
  constraints: ['The number of nodes in each linked list is in the range [1, 100].', '0 <= Node.val <= 9', 'It is guaranteed that the list represents a number that does not have leading zeros.'],
  topics: ['Linked List', 'Math', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'addTwoNumbers', params: [{ name: 'l1', type: 'ListNode' }, { name: 'l2', type: 'ListNode' }], returnType: 'ListNode' }
  },
  testCases: [
    { input: [[2,4,3], [5,6,4]], expected: [7,0,8], description: 'Basic addition', category: 'basic' },
    { input: [[0], [0]], expected: [0], description: 'Zero addition', category: 'edge' },
    { input: [[9,9,9,9,9,9,9], [9,9,9,9]], expected: [8,9,9,9,0,0,0,1], description: 'Carry propagation', category: 'complex' }
  ],
  hints: [
    { level: 1, text: 'Process digits from least to most significant', category: 'approach' },
    { level: 2, text: 'Keep track of carry and handle different list lengths', category: 'implementation' }
  ]
};