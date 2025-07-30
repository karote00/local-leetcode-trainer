module.exports = {
  id: 115,
  title: 'Distinct Subsequences',
  name: 'distinct-subsequences',
  difficulty: 'hard',
  description: 'Given two strings s and t, return the number of distinct subsequences of s which equals t.',
  examples: [
    { input: 's = "rabbbit", t = "rabbit"', output: '3', explanation: 'There are 3 ways to form "rabbit" from "rabbbit".' },
    { input: 's = "babgbag", t = "bag"', output: '5', explanation: 'There are 5 ways to form "bag" from "babgbag".' }
  ],
  constraints: [
    '1 <= s.length, t.length <= 1000',
    's and t consist of English letters.'
  ],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'numDistinct', params: [{ name: 's', type: 'string' }, { name: 't', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ["rabbbit", "rabbit"], expected: 3, description: 'Multiple ways to form subsequence', category: 'basic' },
    { input: ["babgbag", "bag"], expected: 5, description: 'Complex subsequence counting', category: 'basic' },
    { input: ["", "a"], expected: 0, description: 'Empty source string', category: 'edge' },
    { input: ["a", ""], expected: 1, description: 'Empty target string', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use dynamic programming with 2D table', category: 'approach' },
    { level: 2, text: 'dp[i][j] = number of ways to form t[0:j] from s[0:i]', category: 'implementation' }
  ]
};