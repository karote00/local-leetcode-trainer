module.exports = {
  id: 14,
  title: 'Longest Common Prefix',
  name: 'longest-common-prefix',
  difficulty: 'easy',
  description: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
  examples: [
    { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: 'The longest common prefix is "fl".' },
    { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'There is no common prefix among the input strings.' }
  ],
  constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of only lowercase English letters.'],
  topics: ['String', 'Trie'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'longestCommonPrefix', params: [{ name: 'strs', type: 'string[]' }], returnType: 'string' }
  },
  testCases: [
    { input: [['flower','flow','flight']], expected: 'fl', description: 'Common prefix exists', category: 'basic' },
    { input: [['dog','racecar','car']], expected: '', description: 'No common prefix', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Compare characters vertically across all strings', category: 'approach' },
    { level: 2, text: 'Stop when you find the first mismatch', category: 'implementation' }
  ]
};