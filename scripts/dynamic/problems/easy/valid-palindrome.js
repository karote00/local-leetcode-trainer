module.exports = {
  id: 125,
  title: 'Valid Palindrome',
  name: 'valid-palindrome',
  difficulty: 'easy',
  description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
  examples: [
    { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
    { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
    { input: 's = " "', output: 'true', explanation: 's is an empty string "" after removing non-alphanumeric characters.' }
  ],
  constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
  topics: ['Two Pointers', 'String'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'isPalindrome', params: [{ name: 's', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ['A man, a plan, a canal: Panama'], expected: true, description: 'Standard palindrome', category: 'basic' },
    { input: ['race a car'], expected: false, description: 'Not a palindrome', category: 'basic' },
    { input: [' '], expected: true, description: 'Empty after cleanup', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers from start and end', category: 'approach' },
    { level: 2, text: 'Skip non-alphanumeric characters and convert to lowercase', category: 'implementation' }
  ]
};