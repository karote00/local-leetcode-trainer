module.exports = {
  id: 141,
  title: 'Linked List Cycle',
  name: 'linked-list-cycle',
  difficulty: 'easy',
  description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.',
  examples: [
    { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).' },
    { input: 'head = [1,2], pos = 0', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.' },
    { input: 'head = [1], pos = -1', output: 'false', explanation: 'There is no cycle in the linked list.' }
  ],
  constraints: ['The number of the nodes in the list is in the range [0, 10^4].', '-10^5 <= Node.val <= 10^5', 'pos is -1 or a valid index in the linked-list.'],
  topics: ['Hash Table', 'Linked List', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'hasCycle', params: [{ name: 'head', type: 'ListNode' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[3,2,0,-4]], expected: true, description: 'Cycle exists', category: 'basic' },
    { input: [[1,2]], expected: true, description: 'Small cycle', category: 'basic' },
    { input: [[1]], expected: false, description: 'No cycle', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use Floyd\'s cycle detection algorithm (tortoise and hare)', category: 'approach' },
    { level: 2, text: 'Use two pointers: slow moves 1 step, fast moves 2 steps', category: 'two-pointers' }
  ]
};