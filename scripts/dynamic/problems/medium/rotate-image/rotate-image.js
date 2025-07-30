module.exports = {
  id: 48,
  title: 'Rotate Image',
  name: 'rotate-image',
  difficulty: 'medium',
  description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.',
  examples: [
    { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: 'Rotate 90 degrees clockwise.' },
    { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]', explanation: 'Rotate 4x4 matrix.' }
  ],
  constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
  topics: ['Array', 'Math', 'Matrix'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'rotate', params: [{ name: 'matrix', type: 'number[][]' }], returnType: 'void' }
  },
  testCases: [
    { input: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]], description: '3x3 matrix', category: 'basic' },
    { input: [[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]], expected: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]], description: '4x4 matrix', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Transpose the matrix first, then reverse each row', category: 'approach' },
    { level: 2, text: 'Or rotate layer by layer from outside to inside', category: 'alternative' }
  ]
};