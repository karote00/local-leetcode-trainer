module.exports = {
  id: 118,
  title: 'Pascal\'s Triangle',
  name: 'pascals-triangle',
  difficulty: 'easy',
  description: 'Given an integer numRows, return the first numRows of Pascal\'s triangle.',
  examples: [
    { input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]', explanation: 'Pascal\'s triangle with 5 rows.' },
    { input: 'numRows = 1', output: '[[1]]', explanation: 'Single row.' }
  ],
  constraints: ['1 <= numRows <= 30'],
  topics: ['Array', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'generate', params: [{ name: 'numRows', type: 'number' }], returnType: 'number[][]' }
  },
  testCases: [
    { input: [5], expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]], description: 'Five rows', category: 'basic' },
    { input: [1], expected: [[1]], description: 'Single row', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Each element is sum of two elements above it', category: 'approach' },
    { level: 2, text: 'triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]', category: 'formula' }
  ]
};