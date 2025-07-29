module.exports = {
  id: 7,
  title: 'Reverse Integer',
  name: 'reverse-integer',
  difficulty: 'medium',
  description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.',
  examples: [
    { input: 'x = 123', output: '321', explanation: '' },
    { input: 'x = -123', output: '-321', explanation: '' },
    { input: 'x = 120', output: '21', explanation: '' }
  ],
  constraints: ['-2^31 <= x <= 2^31 - 1'],
  topics: ['Math'],
  companies: ['Amazon', 'Apple'],
  functionSignatures: {
    javascript: { name: 'reverse', params: [{ name: 'x', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [123], expected: 321, description: 'Positive number', category: 'basic' },
    { input: [-123], expected: -321, description: 'Negative number', category: 'basic' },
    { input: [120], expected: 21, description: 'Trailing zeros', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use modulo and division to extract digits', category: 'approach' },
    { level: 2, text: 'Check for overflow before multiplying by 10', category: 'overflow' }
  ]
};