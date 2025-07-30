module.exports = {
  id: 79,
  title: 'Word Search',
  name: 'word-search',
  difficulty: 'medium',
  description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.',
  examples: [
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true', explanation: 'The word can be found in the grid.' },
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true', explanation: 'The word can be found in the grid.' },
    { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false', explanation: 'The word cannot be found in the grid.' }
  ],
  constraints: ['m == board.length', 'n = board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15', 'board and word consists of only lowercase and uppercase English letters.'],
  topics: ['Array', 'Backtracking', 'Matrix'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'exist', params: [{ name: 'board', type: 'string[][]' }, { name: 'word', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCCED'], expected: true, description: 'Word exists', category: 'basic' },
    { input: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'SEE'], expected: true, description: 'Another valid word', category: 'basic' },
    { input: [[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 'ABCB'], expected: false, description: 'Word does not exist', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use DFS with backtracking', category: 'approach' },
    { level: 2, text: 'Mark visited cells and unmark when backtracking', category: 'backtracking' }
  ]
};