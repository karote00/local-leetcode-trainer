module.exports = {
  id: 212,
  title: 'Word Search II',
  name: 'word-search-ii',
  difficulty: 'hard',
  description: 'Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.',
  examples: [
    { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]', explanation: 'Find words that can be formed on the board.' },
    { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: '[]', explanation: 'Cannot form "abcb" on the board.' }
  ],
  constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 12', 'board[i][j] is a lowercase English letter.', '1 <= words.length <= 3 * 10^4', '1 <= words[i].length <= 10', 'words[i] consists of lowercase English letters.', 'All the strings of words are unique.'],
  topics: ['Array', 'String', 'Backtracking', 'Trie', 'Matrix'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'findWords', params: [{ name: 'board', type: 'string[][]' }, { name: 'words', type: 'string[]' }], returnType: 'string[]' }
  },
  testCases: [
    { input: [[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], ['oath','pea','eat','rain']], expected: ['eat','oath'], description: 'Multiple words found', category: 'basic' },
    { input: [[['a','b'],['c','d']], ['abcb']], expected: [], description: 'No words found', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Build a Trie from the words list', category: 'approach' },
    { level: 2, text: 'Use DFS with backtracking on the board, guided by the Trie', category: 'trie-dfs' }
  ]
};