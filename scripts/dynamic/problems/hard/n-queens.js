module.exports = {
  id: 51,
  title: 'N-Queens',
  name: 'n-queens',
  difficulty: 'hard',
  description: 'The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other.',
  examples: [
    { input: 'n = 4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', explanation: 'There exist two distinct solutions to the 4-queens puzzle.' },
    { input: 'n = 1', output: '[["Q"]]', explanation: 'Only one solution for 1-queen.' }
  ],
  constraints: ['1 <= n <= 9'],
  topics: ['Array', 'Backtracking'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'solveNQueens', params: [{ name: 'n', type: 'number' }], returnType: 'string[][]' }
  },
  testCases: [
    { input: [4], expected: [['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']], description: 'N-Queens solutions', category: 'basic' },
    { input: [1], expected: [['Q']], description: 'Single queen', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use backtracking with conflict checking', category: 'approach' },
    { level: 2, text: 'Check row, column, and diagonal conflicts', category: 'backtracking' }
  ]
};