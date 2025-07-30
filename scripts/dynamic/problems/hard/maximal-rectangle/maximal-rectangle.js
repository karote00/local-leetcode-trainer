module.exports = {
  id: 85,
  title: 'Maximal Rectangle',
  name: 'maximal-rectangle',
  difficulty: 'hard',
  description: 'Given a rows x cols binary matrix filled with 0\'s and 1\'s, find the largest rectangle containing only 1\'s and return its area.',
  examples: [
    { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '6', explanation: 'The maximal rectangle is shown in the above picture.' },
    { input: 'matrix = [["0"]]', output: '0', explanation: 'Single 0 cell.' },
    { input: 'matrix = [["1"]]', output: '1', explanation: 'Single 1 cell.' }
  ],
  constraints: [
    'rows == matrix.length',
    'cols == matrix[i].length',
    '1 <= row, cols <= 200',
    'matrix[i][j] is \'0\' or \'1\'.'
  ],
  topics: ['Array', 'Dynamic Programming', 'Stack', 'Matrix', 'Monotonic Stack'],
  companies: ['Amazon', 'Google', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'maximalRectangle', params: [{ name: 'matrix', type: 'string[][]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]], expected: 6, description: 'Complex matrix', category: 'basic' },
    { input: [[["0"]]], expected: 0, description: 'Single zero', category: 'edge' },
    { input: [[["1"]]], expected: 1, description: 'Single one', category: 'edge' },
    { input: [[["1","1","1"],["1","1","1"],["1","1","1"]]], expected: 9, description: 'All ones', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Convert to histogram problem for each row', category: 'approach' },
    { level: 2, text: 'Use largest rectangle in histogram algorithm', category: 'implementation' }
  ]
};