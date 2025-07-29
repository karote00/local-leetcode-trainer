module.exports = {
  id: 5,
  title: 'Longest Palindromic Substring',
  name: 'longest-palindromic-substring',
  difficulty: 'medium',
  description: 'Given a string s, return the longest palindromic substring in s.',
  examples: [
    { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
    { input: 's = "cbbd"', output: '"bb"', explanation: 'The longest palindromic substring is "bb".' }
  ],
  constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'longestPalindrome', params: [{ name: 's', type: 'string' }], returnType: 'string' }
  },
  testCases: [
    { input: ['babad'], expected: 'bab', description: 'Odd length palindrome', category: 'basic' },
    { input: ['cbbd'], expected: 'bb', description: 'Even length palindrome', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Expand around centers for each possible center', category: 'approach' },
    { level: 2, text: 'Consider both odd and even length palindromes', category: 'implementation' }
  ]
};