module.exports = {
  id: 171,
  title: 'Excel Sheet Column Number',
  name: 'excel-sheet-column-number',
  difficulty: 'easy',
  description: 'Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.',
  examples: [
    { input: 'columnTitle = "A"', output: '1', explanation: 'A corresponds to 1.' },
    { input: 'columnTitle = "AB"', output: '28', explanation: 'AB corresponds to 28.' },
    { input: 'columnTitle = "ZY"', output: '701', explanation: 'ZY corresponds to 701.' }
  ],
  constraints: ['1 <= columnTitle.length <= 7', 'columnTitle consists only of uppercase English letters.', 'columnTitle is in the range ["A", "FXSHRXW"].'],
  topics: ['Math', 'String'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'titleToNumber', params: [{ name: 'columnTitle', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['A'], expected: 1, description: 'Single character', category: 'basic' },
    { input: ['AB'], expected: 28, description: 'Two characters', category: 'basic' },
    { input: ['ZY'], expected: 701, description: 'Complex case', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'This is like base-26 number system', category: 'approach' },
    { level: 2, text: 'A=1, B=2, ..., Z=26, then AA=27, AB=28, etc.', category: 'math' }
  ]
};