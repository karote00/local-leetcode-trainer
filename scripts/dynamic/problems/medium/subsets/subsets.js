module.exports = {
  id: 78,
  title: 'Subsets',
  name: 'subsets',
  difficulty: 'medium',
  description: 'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
  examples: [
    { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', explanation: 'All possible subsets.' },
    { input: 'nums = [0]', output: '[[],[0]]', explanation: 'Subsets of single element.' }
  ],
  constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
  topics: ['Array', 'Backtracking', 'Bit Manipulation'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'subsets', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[1,2,3]], expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]], description: 'Three elements', category: 'basic' },
    { input: [[0]], expected: [[],[0]], description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use backtracking to generate all combinations', category: 'approach' },
    { level: 2, text: 'For each element, decide whether to include it or not', category: 'backtracking' }
  ]
};