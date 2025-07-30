module.exports = {
  id: 49,
  title: 'Group Anagrams',
  name: 'group-anagrams',
  difficulty: 'medium',
  description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
  examples: [
    { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Group anagrams together.' },
    { input: 'strs = [""]', output: '[[""]]', explanation: 'Single empty string.' },
    { input: 'strs = ["a"]', output: '[["a"]]', explanation: 'Single character.' }
  ],
  constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters only.'],
  topics: ['Array', 'Hash Table', 'String', 'Sorting'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'groupAnagrams', params: [{ name: 'strs', type: 'string[]' }], returnType: 'string[][]' }
  },
  testCases: [
    { input: [['eat','tea','tan','ate','nat','bat']], expected: [['bat'],['nat','tan'],['ate','eat','tea']], description: 'Multiple anagram groups', category: 'basic' },
    { input: [['']], expected: [['']], description: 'Empty string', category: 'edge' },
    { input: [['a']], expected: [['a']], description: 'Single character', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use sorted string as key in hash map', category: 'approach' },
    { level: 2, text: 'Group strings with same sorted characters', category: 'implementation' }
  ]
};