module.exports = {
  id: 18,
  title: '4Sum',
  name: '4sum',
  difficulty: 'medium',
  description: 'Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that nums[a] + nums[b] + nums[c] + nums[d] == target.',
  examples: [
    { input: 'nums = [1,0,-1,0,-2,2], target = 0', output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]', explanation: 'All unique quadruplets that sum to 0.' },
    { input: 'nums = [2,2,2,2,2], target = 8', output: '[[2,2,2,2]]', explanation: 'Only one unique quadruplet.' }
  ],
  constraints: ['1 <= nums.length <= 200', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
  topics: ['Array', 'Two Pointers', 'Sorting'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'fourSum', params: [{ name: 'nums', type: 'number[]' }, { name: 'target', type: 'number' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[1,0,-1,0,-2,2], 0], expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]], description: 'Multiple quadruplets', category: 'basic' },
    { input: [[2,2,2,2,2], 8], expected: [[2,2,2,2]], description: 'Duplicate elements', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Sort array and use nested loops with two pointers', category: 'approach' },
    { level: 2, text: 'Skip duplicates to avoid duplicate quadruplets', category: 'optimization' }
  ]
};