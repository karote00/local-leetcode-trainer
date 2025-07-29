module.exports = {
  id: 344,
  title: 'Reverse String',
  name: 'reverse-string',
  difficulty: 'easy',
  description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
  examples: [
    { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: 'Reverse the array in-place.' },
    { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: 'Reverse the array in-place.' }
  ],
  constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character.'],
  topics: ['Two Pointers', 'String', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'reverseString', params: [{ name: 's', type: 'string[]' }], returnType: 'void' }
  },
  testCases: [
    { input: [['h','e','l','l','o']], expected: ['o','l','l','e','h'], description: 'Basic string reversal', category: 'basic' },
    { input: [['H','a','n','n','a','h']], expected: ['h','a','n','n','a','H'], description: 'Mixed case', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers from start and end', category: 'approach' },
    { level: 2, text: 'Swap characters and move pointers toward center', category: 'implementation' }
  ]
};