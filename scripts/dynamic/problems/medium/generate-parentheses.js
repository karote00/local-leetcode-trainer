module.exports = {
  id: 22,
  title: 'Generate Parentheses',
  name: 'generate-parentheses',
  difficulty: 'medium',
  description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
  examples: [
    { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: 'All valid combinations for 3 pairs.' },
    { input: 'n = 1', output: '["()"]', explanation: 'Only one valid combination for 1 pair.' }
  ],
  constraints: ['1 <= n <= 8'],
  topics: ['String', 'Dynamic Programming', 'Backtracking'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'generateParenthesis', params: [{ name: 'n', type: 'number' }], returnType: 'string[]' }
  },
  testCases: [
    { input: [3], expected: ['((()))','(()())','(())()','()(())','()()()'], description: 'Generate valid parentheses', category: 'basic' },
    { input: [1], expected: ['()'], description: 'Single pair', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use backtracking with open/close count tracking', category: 'approach' },
    { level: 2, text: 'Only add "(" if open < n, only add ")" if close < open', category: 'backtracking' }
  ]
};