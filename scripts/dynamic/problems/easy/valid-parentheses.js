module.exports = {
  id: 20,
  title: 'Valid Parentheses',
  name: 'valid-parentheses',
  difficulty: 'easy',
  description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
  examples: [
    { input: 's = "()"', output: 'true', explanation: 'Valid parentheses.' },
    { input: 's = "()[]{}"', output: 'true', explanation: 'All brackets are properly closed.' },
    { input: 's = "(]"', output: 'false', explanation: 'Mismatched brackets.' }
  ],
  constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
  topics: ['String', 'Stack'],
  companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'isValid', params: [{ name: 's', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ['()'], expected: true, description: 'Simple parentheses', category: 'basic' },
    { input: ['()[]{}'], expected: true, description: 'All bracket types', category: 'basic' },
    { input: ['(]'], expected: false, description: 'Mismatched', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use a stack to track opening brackets', category: 'approach' },
    { level: 2, text: 'For each closing bracket, check if it matches the most recent opening bracket', category: 'implementation' }
  ]
};