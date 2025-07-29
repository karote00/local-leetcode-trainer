module.exports = {
  id: 242,
  title: 'Valid Anagram',
  name: 'valid-anagram',
  difficulty: 'easy',
  description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
  examples: [
    { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both strings have the same characters with same frequencies.' },
    { input: 's = "rat", t = "car"', output: 'false', explanation: 'Different characters.' }
  ],
  constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters only.'],
  topics: ['Hash Table', 'String', 'Sorting'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'isAnagram', params: [{ name: 's', type: 'string' }, { name: 't', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ['anagram', 'nagaram'], expected: true, description: 'Valid anagram', category: 'basic' },
    { input: ['rat', 'car'], expected: false, description: 'Not an anagram', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Count character frequencies in both strings', category: 'approach' },
    { level: 2, text: 'Compare frequency maps or sort both strings', category: 'implementation' }
  ]
};