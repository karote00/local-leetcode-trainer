module.exports = {
  id: 647,
  title: 'Palindromic Substrings',
  name: 'palindromic-substrings',
  difficulty: 'medium',
  description: 'Given a string s, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.',
  examples: [
    { input: 's = "abc"', output: '3', explanation: 'Three palindromic strings: "a", "b", "c".' },
    { input: 's = "aaa"', output: '6', explanation: 'Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".' }
  ],
  constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters.'],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'countSubstrings', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['abc'], expected: 3, description: 'No palindromes except single chars', category: 'basic' },
    { input: ['aaa'], expected: 6, description: 'Multiple palindromes', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Expand around centers for each possible center', category: 'approach' },
    { level: 2, text: 'Consider both odd and even length palindromes', category: 'implementation' }
  ]
};