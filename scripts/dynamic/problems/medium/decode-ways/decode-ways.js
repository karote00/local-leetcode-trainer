module.exports = {
  id: 91,
  title: 'Decode Ways',
  name: 'decode-ways',
  difficulty: 'medium',
  description: 'A message containing letters from A-Z can be encoded into numbers using the following mapping: "A" -> "1", "B" -> "2", ..., "Z" -> "26". To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). Given a string s containing only digits, return the number of ways to decode it.',
  examples: [
    { input: 's = "12"', output: '2', explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).' },
    { input: 's = "226"', output: '3', explanation: '"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' },
    { input: 's = "06"', output: '0', explanation: '"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").' }
  ],
  constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zero(s).'],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'numDecodings', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['12'], expected: 2, description: 'Two ways to decode', category: 'basic' },
    { input: ['226'], expected: 3, description: 'Three ways to decode', category: 'basic' },
    { input: ['06'], expected: 0, description: 'Invalid leading zero', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use dynamic programming - dp[i] = ways to decode s[0:i]', category: 'approach' },
    { level: 2, text: 'Consider single digit and two digit decodings', category: 'dp' }
  ]
};