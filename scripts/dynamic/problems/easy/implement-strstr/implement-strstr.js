module.exports = {
  id: 28,
  title: 'Find the Index of the First Occurrence in a String',
  name: 'implement-strstr',
  difficulty: 'easy',
  description: 'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
  examples: [
    { input: 'haystack = "sadbutsad", needle = "sad"', output: '0', explanation: '"sad" occurs at index 0 and 6. The first occurrence is at index 0.' },
    { input: 'haystack = "leetcode", needle = "leeto"', output: '-1', explanation: '"leeto" did not occur in "leetcode".' }
  ],
  constraints: ['1 <= haystack.length, needle.length <= 10^4', 'haystack and needle consist of only lowercase English characters.'],
  topics: ['Two Pointers', 'String', 'String Matching'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'strStr', params: [{ name: 'haystack', type: 'string' }, { name: 'needle', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['sadbutsad', 'sad'], expected: 0, description: 'Found at beginning', category: 'basic' },
    { input: ['leetcode', 'leeto'], expected: -1, description: 'Not found', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use sliding window approach', category: 'approach' },
    { level: 2, text: 'Compare substring of haystack with needle', category: 'implementation' }
  ]
};