module.exports = {
  id: 67,
  title: 'Add Binary',
  name: 'add-binary',
  difficulty: 'easy',
  description: 'Given two binary strings a and b, return their sum as a binary string.',
  examples: [
    { input: 'a = "11", b = "1"', output: '"100"', explanation: '11 + 1 = 100 in binary.' },
    { input: 'a = "1010", b = "1011"', output: '"10101"', explanation: '1010 + 1011 = 10101 in binary.' }
  ],
  constraints: ['1 <= a.length, b.length <= 10^4', 'a and b consist only of "0" or "1" characters.', 'Each string does not contain leading zeros except for the zero itself.'],
  topics: ['Math', 'String', 'Bit Manipulation', 'Simulation'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'addBinary', params: [{ name: 'a', type: 'string' }, { name: 'b', type: 'string' }], returnType: 'string' }
  },
  testCases: [
    { input: ['11', '1'], expected: '100', description: 'Simple addition', category: 'basic' },
    { input: ['1010', '1011'], expected: '10101', description: 'Longer strings', category: 'basic' },
    { input: ['0', '0'], expected: '0', description: 'Both zeros', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Process from right to left with carry', category: 'approach' },
    { level: 2, text: 'Handle different string lengths by padding with zeros', category: 'implementation' }
  ]
};