module.exports = {
  id: 73,
  title: 'Set Matrix Zeroes',
  name: 'set-matrix-zeroes',
  difficulty: 'medium',
  description: 'Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0\'s. You must do it in place.',
  examples: [
    { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explanation: 'Set row and column of zero to zeros.' },
    { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]', explanation: 'Multiple zeros case.' }
  ],
  constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1'],
  topics: ['Array', 'Hash Table', 'Matrix'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'setZeroes', params: [{ name: 'matrix', type: 'number[][]' }], returnType: 'void' }
  },
  testCases: [
    { input: [[[1,1,1],[1,0,1],[1,1,1]]], expected: [[1,0,1],[0,0,0],[1,0,1]], description: 'Single zero', category: 'basic' },
    { input: [[[0,1,2,0],[3,4,5,2],[1,3,1,5]]], expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]], description: 'Multiple zeros', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use first row and column as markers', category: 'approach' },
    { level: 2, text: 'Handle first row and column separately', category: 'implementation' }
  ]
};