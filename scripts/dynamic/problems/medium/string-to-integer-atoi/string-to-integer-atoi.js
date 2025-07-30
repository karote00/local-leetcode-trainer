module.exports = {
  id: 8,
  title: 'String to Integer (atoi)',
  name: 'string-to-integer-atoi',
  difficulty: 'medium',
  description: 'Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.',
  examples: [
    { input: 's = "42"', output: '42', explanation: 'The string "42" converts to integer 42.' },
    { input: 's = "   -42"', output: '-42', explanation: 'Leading whitespace is ignored and the sign is preserved.' },
    { input: 's = "4193 with words"', output: '4193', explanation: 'Reading stops at the first non-digit character.' }
  ],
  constraints: ['0 <= s.length <= 200', 's consists of English letters (lower-case and upper-case), digits (0-9), " ", "+", "-", and ".".'],
  topics: ['String'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'myAtoi', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['42'], expected: 42, description: 'Simple number string', category: 'basic' },
    { input: ['   -42'], expected: -42, description: 'Whitespace and negative', category: 'basic' },
    { input: ['4193 with words'], expected: 4193, description: 'Stop at non-digit', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Handle whitespace, sign, and overflow carefully', category: 'approach' },
    { level: 2, text: 'Process character by character and check bounds', category: 'implementation' }
  ]
};