module.exports = {
  id: 23,
  title: 'Merge k Sorted Lists',
  name: 'merge-k-sorted-lists',
  difficulty: 'hard',
  description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
  examples: [
    { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', explanation: 'The linked-lists are: [1->4->5, 1->3->4, 2->6]. Merging them into one sorted list: 1->1->2->3->4->4->5->6.' },
    { input: 'lists = []', output: '[]', explanation: 'Empty input.' },
    { input: 'lists = [[]]', output: '[]', explanation: 'Single empty list.' }
  ],
  constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4', 'lists[i] is sorted in ascending order.', 'The sum of lists[i].length will not exceed 10^4.'],
  topics: ['Linked List', 'Divide and Conquer', 'Heap (Priority Queue)', 'Merge Sort'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'mergeKLists', params: [{ name: 'lists', type: 'ListNode[]' }], returnType: 'ListNode' }
  },
  testCases: [
    { input: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6], description: 'Multiple sorted lists', category: 'basic' },
    { input: [[]], expected: [], description: 'Empty input', category: 'edge' },
    { input: [[[]]], expected: [], description: 'Single empty list', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use divide and conquer approach', category: 'approach' },
    { level: 2, text: 'Merge lists pairwise until only one remains', category: 'divide-conquer' }
  ]
};