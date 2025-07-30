module.exports = {
  id: 6,
  title: 'Zigzag Conversion',
  name: 'zigzag-conversion',
  difficulty: 'medium',
  description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows and then read line by line.',
  examples: [
    { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"', explanation: 'The zigzag pattern forms the output.' },
    { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"', explanation: 'The zigzag pattern with 4 rows.' },
    { input: 's = "A", numRows = 1', output: '"A"', explanation: 'Single character.' }
  ],
  constraints: ['1 <= s.length <= 1000', 's consists of English letters (lower-case and upper-case), "," and ".".', '1 <= numRows <= 1000'],
  topics: ['String'],
  companies: ['Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'convert', params: [{ name: 's', type: 'string' }, { name: 'numRows', type: 'number' }], returnType: 'string' }
  },
  testCases: [
    { input: ['PAYPALISHIRING', 3], expected: 'PAHNAPLSIIGYIR', description: 'Zigzag pattern', category: 'basic' },
    { input: ['PAYPALISHIRING', 4], expected: 'PINALSIGYAHRPI', description: 'Four rows', category: 'basic' },
    { input: ['A', 1], expected: 'A', description: 'Single row', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Simulate the zigzag pattern with direction changes', category: 'approach' },
    { level: 2, text: 'Use an array of strings for each row', category: 'implementation' }
  ]
};