module.exports = {
  id: 21,
  title: 'Merge Two Sorted Lists',
  name: 'merge-two-sorted-lists',
  difficulty: 'easy',
  description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.',
  examples: [
    { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: 'The merged list is sorted.' },
    { input: 'list1 = [], list2 = []', output: '[]', explanation: 'Both lists are empty.' },
    { input: 'list1 = [], list2 = [0]', output: '[0]', explanation: 'One list is empty.' }
  ],
  constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
  topics: ['Linked List', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Apple', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'mergeTwoLists', params: [{ name: 'list1', type: 'ListNode' }, { name: 'list2', type: 'ListNode' }], returnType: 'ListNode' }
  },
  testCases: [
    { input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4], description: 'Two sorted lists', category: 'basic' },
    { input: [[], []], expected: [], description: 'Both empty', category: 'edge' },
    { input: [[], [0]], expected: [0], description: 'One empty', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers to compare nodes', category: 'approach' },
    { level: 2, text: 'Create a dummy head to simplify edge cases', category: 'implementation' }
  ]
};