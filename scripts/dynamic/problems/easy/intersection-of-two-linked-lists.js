module.exports = {
  id: 160,
  title: 'Intersection of Two Linked Lists',
  name: 'intersection-of-two-linked-lists',
  difficulty: 'easy',
  description: 'Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.',
  examples: [
    { input: 'intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3', output: 'Intersected at "8"', explanation: 'The intersected node\'s value is 8.' },
    { input: 'intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1', output: 'Intersected at "2"', explanation: 'The intersected node\'s value is 2.' },
    { input: 'intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2', output: 'No intersection', explanation: 'The two lists do not intersect.' }
  ],
  constraints: ['The number of nodes of listA is in the m.', 'The number of nodes of listB is in the n.', '1 <= m, n <= 3 * 10^4', '1 <= Node.val <= 10^5', '0 <= skipA < m', '0 <= skipB < n', 'intersectVal is 0 if the two lists do not intersect.', 'intersectVal == listA[skipA] == listB[skipB] if the two lists intersect.'],
  topics: ['Hash Table', 'Linked List', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'getIntersectionNode', params: [{ name: 'headA', type: 'ListNode' }, { name: 'headB', type: 'ListNode' }], returnType: 'ListNode' }
  },
  testCases: [
    { input: [[4,1,8,4,5], [5,6,1,8,4,5]], expected: 8, description: 'Lists intersect', category: 'basic' },
    { input: [[1,9,1,2,4], [3,2,4]], expected: 2, description: 'Different lengths', category: 'basic' },
    { input: [[2,6,4], [1,5]], expected: null, description: 'No intersection', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers, when one reaches end, start from other head', category: 'approach' },
    { level: 2, text: 'Both pointers will meet at intersection or both become null', category: 'two-pointers' }
  ]
};