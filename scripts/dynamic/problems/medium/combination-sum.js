module.exports = {
  id: 39,
  title: 'Combination Sum',
  name: 'combination-sum',
  difficulty: 'medium',
  description: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.',
  examples: [
    { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]', explanation: '2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations.' },
    { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]', explanation: 'All combinations that sum to 8.' },
    { input: 'candidates = [2], target = 1', output: '[]', explanation: 'No combinations sum to 1.' }
  ],
  constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All elements of candidates are distinct.', '1 <= target <= 40'],
  topics: ['Array', 'Backtracking'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'combinationSum', params: [{ name: 'candidates', type: 'number[]' }, { name: 'target', type: 'number' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [[2,3,6,7], 7], expected: [[2,2,3],[7]], description: 'Multiple combinations', category: 'basic' },
    { input: [[2,3,5], 8], expected: [[2,2,2,2],[2,3,3],[3,5]], description: 'Various combinations', category: 'basic' },
    { input: [[2], 1], expected: [], description: 'No valid combinations', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use backtracking to explore all combinations', category: 'approach' },
    { level: 2, text: 'Allow reusing same number, but avoid duplicates by maintaining order', category: 'backtracking' }
  ]
};