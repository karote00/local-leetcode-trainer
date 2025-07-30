module.exports = {
  id: 17,
  title: 'Letter Combinations of a Phone Number',
  name: 'letter-combinations-of-a-phone-number',
  difficulty: 'medium',
  description: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.',
  examples: [
    { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', explanation: 'All possible combinations from phone keypad.' },
    { input: 'digits = ""', output: '[]', explanation: 'Empty input.' },
    { input: 'digits = "2"', output: '["a","b","c"]', explanation: 'Single digit.' }
  ],
  constraints: ['0 <= digits.length <= 4', 'digits[i] is a digit in the range ["2", "9"].'],
  topics: ['Hash Table', 'String', 'Backtracking'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'letterCombinations', params: [{ name: 'digits', type: 'string' }], returnType: 'string[]' }
  },
  testCases: [
    { input: ['23'], expected: ['ad','ae','af','bd','be','bf','cd','ce','cf'], description: 'Phone keypad combinations', category: 'basic' },
    { input: [''], expected: [], description: 'Empty input', category: 'edge' },
    { input: ['2'], expected: ['a','b','c'], description: 'Single digit', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use backtracking to generate all combinations', category: 'approach' },
    { level: 2, text: 'Map each digit to its corresponding letters', category: 'implementation' }
  ]
};