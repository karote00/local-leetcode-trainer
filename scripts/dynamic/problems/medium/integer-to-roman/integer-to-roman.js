module.exports = {
  id: 12,
  title: 'Integer to Roman',
  name: 'integer-to-roman',
  difficulty: 'medium',
  description: 'Given an integer, convert it to a roman numeral.',
  examples: [
    { input: 'num = 3', output: '"III"', explanation: '3 is represented as III in roman numerals.' },
    { input: 'num = 58', output: '"LVIII"', explanation: 'L = 50, V = 5, III = 3.' },
    { input: 'num = 1994', output: '"MCMXCIV"', explanation: 'M = 1000, CM = 900, XC = 90 and IV = 4.' }
  ],
  constraints: ['1 <= num <= 3999'],
  topics: ['Hash Table', 'Math', 'String'],
  companies: ['Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'intToRoman', params: [{ name: 'num', type: 'number' }], returnType: 'string' }
  },
  testCases: [
    { input: [3], expected: 'III', description: 'Simple conversion', category: 'basic' },
    { input: [58], expected: 'LVIII', description: 'Multiple symbols', category: 'basic' },
    { input: [1994], expected: 'MCMXCIV', description: 'Complex conversion', category: 'complex' }
  ],
  hints: [
    { level: 1, text: 'Use mapping of values to roman symbols', category: 'approach' },
    { level: 2, text: 'Process from largest to smallest values', category: 'implementation' }
  ]
};