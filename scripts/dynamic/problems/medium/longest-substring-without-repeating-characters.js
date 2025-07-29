module.exports = {
  id: 3,
  title: 'Longest Substring Without Repeating Characters',
  name: 'longest-substring-without-repeating-characters',
  difficulty: 'medium',
  description: 'Given a string s, find the length of the longest substring without repeating characters.',
  examples: [
    { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
    { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
    { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
  ],
  constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
  topics: ['Hash Table', 'String', 'Sliding Window'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'lengthOfLongestSubstring', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['abcabcbb'], expected: 3, description: 'Repeating characters', category: 'basic' },
    { input: ['bbbbb'], expected: 1, description: 'All same characters', category: 'edge' },
    { input: ['pwwkew'], expected: 3, description: 'Mixed pattern', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use sliding window with hash set', category: 'approach' },
    { level: 2, text: 'Expand window when no duplicates, shrink when duplicates found', category: 'implementation' }
  ]
};