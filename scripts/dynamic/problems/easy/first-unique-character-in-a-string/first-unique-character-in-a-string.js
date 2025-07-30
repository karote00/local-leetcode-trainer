module.exports = {
  id: 387,
  title: 'First Unique Character in a String',
  name: 'first-unique-character-in-a-string',
  difficulty: 'easy',
  description: 'Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.',
  examples: [
    { input: 's = "leetcode"', output: '0', explanation: 'The first non-repeating character is "l" at index 0.' },
    { input: 's = "loveleetcode"', output: '2', explanation: 'The first non-repeating character is "v" at index 2.' },
    { input: 's = "aabb"', output: '-1', explanation: 'All characters repeat.' }
  ],
  constraints: ['1 <= s.length <= 10^5', 's consists of only lowercase English letters.'],
  topics: ['Hash Table', 'String', 'Queue', 'Counting'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'firstUniqChar', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['leetcode'], expected: 0, description: 'First unique at beginning', category: 'basic' },
    { input: ['loveleetcode'], expected: 2, description: 'First unique in middle', category: 'basic' },
    { input: ['aabb'], expected: -1, description: 'No unique characters', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Count frequency of each character first', category: 'approach' },
    { level: 2, text: 'Then find the first character with frequency 1', category: 'implementation' }
  ]
};