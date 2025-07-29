module.exports = {
  id: 54,
  title: 'Spiral Matrix',
  name: 'spiral-matrix',
  difficulty: 'medium',
  description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
  examples: [
    { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: 'Traverse in spiral order.' },
    { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]', explanation: 'Traverse 3x4 matrix in spiral.' }
  ],
  constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
  topics: ['Array', 'Matrix', 'Simulation'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'spiralOrder', params: [{ name: 'matrix', type: 'number[][]' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,6,9,8,7,4,5], description: '3x3 matrix', category: 'basic' },
    { input: [[[1,2,3,4],[5,6,7,8],[9,10,11,12]]], expected: [1,2,3,4,8,12,11,10,9,5,6,7], description: '3x4 matrix', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use four boundaries: top, bottom, left, right', category: 'approach' },
    { level: 2, text: 'Move in order: right, down, left, up, then shrink boundaries', category: 'simulation' }
  ]
};