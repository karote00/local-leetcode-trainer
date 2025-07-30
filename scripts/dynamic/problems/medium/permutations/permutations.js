module.exports = {
  id: 46,
  title: 'Permutations',
  name: 'permutations',
  difficulty: 'medium',
  description: 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
  examples: [
    { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]', explanation: 'All possible permutations.' },
    { input: 'nums = [0,1]', output: '[[0,1],[1,0]]', explanation: 'Two permutations.' },
    { input: 'nums = [1]', output: '[[1]]', explanation: 'Single element.' }
  ],
  constraints: ['1 <= nums.length <= 6', '-10 <= nums[i] <= 10', 'All the integers of nums are unique.'],
  topics: ['Array', 'Backtracking'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'permute', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], description: 'Three elements', category: 'basic' },
    { input: [[0,1]], expected: [[0,1],[1,0]], description: 'Two elements', category: 'basic' },
    { input: [[1]], expected: [[1]], description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use backtracking to generate all permutations', category: 'approach' },
    { level: 2, text: 'Track used elements to avoid duplicates', category: 'backtracking' }
  ]
};