module.exports = {
  id: 15,
  title: '3Sum',
  name: '3sum',
  difficulty: 'medium',
  description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
  examples: [
    { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'The distinct triplets are [-1,0,1] and [-1,-1,2].' },
    { input: 'nums = [0,1,1]', output: '[]', explanation: 'The only possible triplet does not sum up to 0.' },
    { input: 'nums = [0,0,0]', output: '[[0,0,0]]', explanation: 'The only possible triplet sums up to 0.' }
  ],
  constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
  topics: ['Array', 'Two Pointers', 'Sorting'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'threeSum', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]], description: 'Basic triplets', category: 'basic' },
    { input: [[0,1,1]], expected: [], description: 'No valid triplets', category: 'edge' },
    { input: [[0,0,0]], expected: [[0,0,0]], description: 'All zeros', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Sort the array first, then use two pointers', category: 'approach' },
    { level: 2, text: 'Skip duplicates to avoid duplicate triplets', category: 'optimization' }
  ]
};