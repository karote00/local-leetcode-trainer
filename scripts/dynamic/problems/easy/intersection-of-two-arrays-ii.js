module.exports = {
  id: 350,
  title: 'Intersection of Two Arrays II',
  name: 'intersection-of-two-arrays-ii',
  difficulty: 'easy',
  description: 'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.',
  examples: [
    { input: 'nums1 = [1,2,2,1], nums2 = [2,2]', output: '[2,2]', explanation: 'The intersection includes both 2s.' },
    { input: 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', output: '[4,9]', explanation: 'The intersection is [4,9].' }
  ],
  constraints: ['1 <= nums1.length, nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 1000'],
  topics: ['Array', 'Hash Table', 'Two Pointers', 'Binary Search', 'Sorting'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'intersect', params: [{ name: 'nums1', type: 'number[]' }, { name: 'nums2', type: 'number[]' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[1,2,2,1], [2,2]], expected: [2,2], description: 'Multiple occurrences', category: 'basic' },
    { input: [[4,9,5], [9,4,9,8,4]], expected: [4,9], description: 'Different frequencies', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use hash map to count frequencies', category: 'approach' },
    { level: 2, text: 'Include elements up to minimum frequency in both arrays', category: 'implementation' }
  ]
};