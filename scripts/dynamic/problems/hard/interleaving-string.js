module.exports = {
  id: 97,
  title: 'Interleaving String',
  name: 'interleaving-string',
  difficulty: 'hard',
  description: 'Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.',
  examples: [
    { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: 'true', explanation: 'One possible interleaving is shown.' },
    { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', output: 'false', explanation: 'No valid interleaving exists.' },
    { input: 's1 = "", s2 = "", s3 = ""', output: 'true', explanation: 'All strings are empty.' }
  ],
  constraints: [
    '0 <= s1.length, s2.length <= 100',
    '0 <= s3.length <= 200',
    's1, s2, and s3 consist of lowercase English letters.'
  ],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'isInterleave', params: [{ name: 's1', type: 'string' }, { name: 's2', type: 'string' }, { name: 's3', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ["aabcc", "dbbca", "aadbbcbcac"], expected: true, description: 'Valid interleaving', category: 'basic' },
    { input: ["aabcc", "dbbca", "aadbbbaccc"], expected: false, description: 'Invalid interleaving', category: 'basic' },
    { input: ["", "", ""], expected: true, description: 'All empty strings', category: 'edge' },
    { input: ["a", "", "a"], expected: true, description: 'One empty string', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use 2D DP where dp[i][j] represents if s3[0:i+j] can be formed', category: 'approach' },
    { level: 2, text: 'Check if current character matches s1[i] or s2[j]', category: 'implementation' }
  ]
};