module.exports = {
  id: 140,
  title: 'Word Break II',
  name: 'word-break-ii',
  difficulty: 'hard',
  description: 'Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.',
  examples: [
    { input: 's = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]', output: '["cats and dog","cat sand dog"]', explanation: 'Both sentences use valid dictionary words.' },
    { input: 's = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]', output: '["pine apple pen apple","pineapple pen apple","pine applepen apple"]', explanation: 'Multiple valid combinations exist.' },
    { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: '[]', explanation: 'No valid sentence can be formed.' }
  ],
  constraints: [
    '1 <= s.length <= 20',
    '1 <= wordDict.length <= 1000',
    '1 <= wordDict[i].length <= 10',
    's and wordDict[i] consist of only lowercase English letters.',
    'All the strings of wordDict are unique.'
  ],
  topics: ['Array', 'Hash Table', 'String', 'Dynamic Programming', 'Backtracking', 'Trie', 'Memoization'],
  companies: ['Amazon', 'Google', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'wordBreak', params: [{ name: 's', type: 'string' }, { name: 'wordDict', type: 'string[]' }], returnType: 'string[]' }
  },
  testCases: [
    { input: ["catsanddog", ["cat","cats","and","sand","dog"]], expected: ["cats and dog","cat sand dog"], description: 'Multiple valid sentences', category: 'basic' },
    { input: ["pineapplepenapple", ["apple","pen","applepen","pine","pineapple"]], expected: ["pine apple pen apple","pineapple pen apple","pine applepen apple"], description: 'Complex combinations', category: 'basic' },
    { input: ["catsandog", ["cats","dog","sand","and","cat"]], expected: [], description: 'No valid sentences', category: 'edge' },
    { input: ["a", ["a"]], expected: ["a"], description: 'Single character', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use backtracking with memoization', category: 'approach' },
    { level: 2, text: 'For each position, try all possible words that start there', category: 'implementation' }
  ]
};