module.exports = {
  id: 76,
  title: 'Minimum Window Substring',
  name: 'minimum-window-substring',
  difficulty: 'hard',
  description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such window in s that covers all characters in t, return the empty string "".',
  examples: [
    { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes all characters of t.' },
    { input: 's = "a", t = "a"', output: '"a"', explanation: 'The entire string s is the minimum window.' },
    { input: 's = "a", t = "aa"', output: '""', explanation: 'Both "a"s from t must be included in the window.' }
  ],
  constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
  topics: ['Hash Table', 'String', 'Sliding Window'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'minWindow', params: [{ name: 's', type: 'string' }, { name: 't', type: 'string' }], returnType: 'string' }
  },
  testCases: [
    { input: ['ADOBECODEBANC', 'ABC'], expected: 'BANC', description: 'Minimum window', category: 'basic' },
    { input: ['a', 'a'], expected: 'a', description: 'Single character', category: 'edge' },
    { input: ['a', 'aa'], expected: '', description: 'Impossible case', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use sliding window with character frequency tracking', category: 'approach' },
    { level: 2, text: 'Expand window until all characters are covered, then shrink', category: 'sliding-window' }
  ]
};