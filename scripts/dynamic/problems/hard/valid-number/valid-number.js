module.exports = {
  id: 65,
  title: 'Valid Number',
  name: 'valid-number',
  difficulty: 'hard',
  description: 'A valid number can be split up into these components (in order): A decimal number or an integer, followed by an optional exponent part. Determine if a given string is a valid number.',
  examples: [
    { input: 's = "0"', output: 'true', explanation: 'Valid integer.' },
    { input: 's = "e"', output: 'false', explanation: 'Invalid - just exponent marker.' },
    { input: 's = "."', output: 'false', explanation: 'Invalid - just decimal point.' },
    { input: 's = "2e10"', output: 'true', explanation: 'Valid scientific notation.' }
  ],
  constraints: [
    '1 <= s.length <= 20',
    's consists of only English letters (both uppercase and lowercase), digits (0-9), plus \'+\', minus \'-\', or dot \'.\'.'
  ],
  topics: ['String'],
  companies: ['Google', 'Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'isNumber', params: [{ name: 's', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ["0"], expected: true, description: 'Simple integer', category: 'basic' },
    { input: ["e"], expected: false, description: 'Just exponent', category: 'edge' },
    { input: ["."], expected: false, description: 'Just decimal point', category: 'edge' },
    { input: ["2e10"], expected: true, description: 'Scientific notation', category: 'basic' },
    { input: ["-123.456e-78"], expected: true, description: 'Complex valid number', category: 'stress' }
  ],
  hints: [
    { level: 1, text: 'Use finite state machine or careful parsing', category: 'approach' },
    { level: 2, text: 'Track seen digits, decimal point, and exponent separately', category: 'implementation' }
  ]
};