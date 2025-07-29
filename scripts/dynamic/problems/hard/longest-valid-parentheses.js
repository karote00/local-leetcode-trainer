module.exports = {
  id: 32,
  title: 'Longest Valid Parentheses',
  name: 'longest-valid-parentheses',
  difficulty: 'hard',
  description: 'Given a string containing just the characters "(" and ")", return the length of the longest valid (well-formed) parentheses substring.',
  examples: [
    { input: 's = "(()"', output: '2', explanation: 'The longest valid parentheses substring is "()". ' },
    { input: 's = ")()())"', output: '4', explanation: 'The longest valid parentheses substring is "()()". ' },
    { input: 's = ""', output: '0', explanation: 'Empty string.' }
  ],
  constraints: ['0 <= s.length <= 3 * 10^4', 's[i] is "(", or ")".'],
  topics: ['String', 'Dynamic Programming', 'Stack'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'longestValidParentheses', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['(()'], expected: 2, description: 'Partial valid parentheses', category: 'basic' },
    { input: [')()())'], expected: 4, description: 'Multiple valid sections', category: 'basic' },
    { input: [''], expected: 0, description: 'Empty string', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use DP: dp[i] = length of longest valid parentheses ending at i', category: 'approach' },
    { level: 2, text: 'Or use stack to track indices of unmatched parentheses', category: 'alternative' }
  ]
};