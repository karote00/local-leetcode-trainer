module.exports = {
  id: 132,
  title: 'Palindrome Partitioning II',
  name: 'palindrome-partitioning-ii',
  difficulty: 'hard',
  description: 'Given a string s, partition s such that every substring of the partition is a palindrome. Return the minimum cuts needed for a palindrome partitioning of s.',
  examples: [
    { input: 's = "aab"', output: '1', explanation: 'The palindrome partitioning ["aa","b"] could be produced using 1 cut.' },
    { input: 's = "aba"', output: '0', explanation: 'The string is already a palindrome, so no cuts are needed.' },
    { input: 's = "abcba"', output: '0', explanation: 'The string is already a palindrome.' }
  ],
  constraints: [
    '1 <= s.length <= 2000',
    's consists of lowercase English letters only.'
  ],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Amazon', 'Google', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'minCut', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ["aab"], expected: 1, description: 'One cut needed', category: 'basic' },
    { input: ["aba"], expected: 0, description: 'Already palindrome', category: 'basic' },
    { input: ["abcba"], expected: 0, description: 'Longer palindrome', category: 'basic' },
    { input: ["abcdef"], expected: 5, description: 'No palindromes', category: 'stress' }
  ],
  hints: [
    { level: 1, text: 'Precompute palindrome information with 2D DP', category: 'approach' },
    { level: 2, text: 'Use DP to find minimum cuts: dp[i] = min cuts for s[0:i]', category: 'implementation' }
  ]
};