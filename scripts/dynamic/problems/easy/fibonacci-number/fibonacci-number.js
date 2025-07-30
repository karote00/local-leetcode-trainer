module.exports = {
  id: 509,
  title: 'Fibonacci Number',
  name: 'fibonacci-number',
  difficulty: 'easy',
  description: 'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.',
  examples: [
    { input: 'n = 2', output: '1', explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1.' },
    { input: 'n = 3', output: '2', explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2.' },
    { input: 'n = 4', output: '3', explanation: 'F(4) = F(3) + F(2) = 2 + 1 = 3.' }
  ],
  constraints: ['0 <= n <= 30'],
  topics: ['Math', 'Dynamic Programming', 'Recursion', 'Memoization'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'fib', params: [{ name: 'n', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [2], expected: 1, description: 'F(2)', category: 'basic' },
    { input: [3], expected: 2, description: 'F(3)', category: 'basic' },
    { input: [0], expected: 0, description: 'Base case F(0)', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use dynamic programming or memoization', category: 'approach' },
    { level: 2, text: 'F(n) = F(n-1) + F(n-2)', category: 'formula' }
  ]
};