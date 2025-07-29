module.exports = {
  id: 4,
  title: 'Median of Two Sorted Arrays',
  name: 'median-of-two-sorted-arrays',
  difficulty: 'hard',
  description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
  examples: [
    { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'merged array = [1,2,3] and median is 2.' },
    { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.' }
  ],
  constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
  topics: ['Array', 'Binary Search', 'Divide and Conquer'],
  companies: ['Amazon', 'Google', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'findMedianSortedArrays', params: [{ name: 'nums1', type: 'number[]' }, { name: 'nums2', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,3], [2]], expected: 2.0, description: 'Odd total length', category: 'basic' },
    { input: [[1,2], [3,4]], expected: 2.5, description: 'Even total length', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use binary search on the smaller array', category: 'approach' },
    { level: 2, text: 'Find the correct partition where left_max <= right_min', category: 'binary-search' }
  ]
};