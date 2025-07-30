module.exports = {
  id: 202,
  title: 'Happy Number',
  name: 'happy-number',
  difficulty: 'easy',
  description: 'Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy.',
  examples: [
    { input: 'n = 19', output: 'true', explanation: '1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1' },
    { input: 'n = 2', output: 'false', explanation: 'The process will loop endlessly.' }
  ],
  constraints: ['1 <= n <= 2^31 - 1'],
  topics: ['Hash Table', 'Math', 'Two Pointers'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'isHappy', params: [{ name: 'n', type: 'number' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [19], expected: true, description: 'Happy number', category: 'basic' },
    { input: [2], expected: false, description: 'Not happy number', category: 'basic' },
    { input: [1], expected: true, description: 'Already 1', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use a set to detect cycles', category: 'approach' },
    { level: 2, text: 'Calculate sum of squares of digits repeatedly', category: 'implementation' }
  ]
};