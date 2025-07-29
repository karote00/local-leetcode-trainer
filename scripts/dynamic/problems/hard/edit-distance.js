module.exports = {
  id: 72,
  title: 'Edit Distance',
  name: 'edit-distance',
  difficulty: 'hard',
  description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.',
  examples: [
    { input: 'word1 = "horse", word2 = "ros"', output: '3', explanation: 'horse -> rorse (replace "h" with "r"), rorse -> rose (remove "r"), rose -> ros (remove "e").' },
    { input: 'word1 = "intention", word2 = "execution"', output: '5', explanation: 'intention -> inention (remove "t"), inention -> enention (replace "i" with "e"), enention -> exention (replace "n" with "x"), exention -> exection (replace "n" with "c"), exection -> execution (insert "u").' }
  ],
  constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'minDistance', params: [{ name: 'word1', type: 'string' }, { name: 'word2', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['horse', 'ros'], expected: 3, description: 'Edit distance calculation', category: 'basic' },
    { input: ['intention', 'execution'], expected: 5, description: 'Complex transformation', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use 2D DP table for optimal substructure', category: 'approach' },
    { level: 2, text: 'dp[i][j] = min cost to transform word1[0:i] to word2[0:j]', category: 'dp' }
  ]
};