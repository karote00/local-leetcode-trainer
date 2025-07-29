module.exports = {
  id: 69,
  title: 'Sqrt(x)',
  name: 'sqrt-x',
  difficulty: 'easy',
  description: 'Given a non-negative integer x, return the square root of x rounded down to the nearest integer.',
  examples: [
    { input: 'x = 4', output: '2', explanation: 'The square root of 4 is 2.' },
    { input: 'x = 8', output: '2', explanation: 'The square root of 8 is 2.828..., and since we round it down to the nearest integer, the answer is 2.' }
  ],
  constraints: ['0 <= x <= 2^31 - 1'],
  topics: ['Math', 'Binary Search'],
  companies: ['Amazon', 'Facebook', 'Apple'],
  functionSignatures: {
    javascript: { name: 'mySqrt', params: [{ name: 'x', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [4], expected: 2, description: 'Perfect square', category: 'basic' },
    { input: [8], expected: 2, description: 'Non-perfect square', category: 'basic' },
    { input: [0], expected: 0, description: 'Zero', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use binary search between 0 and x', category: 'approach' },
    { level: 2, text: 'Check if mid * mid <= x', category: 'implementation' }
  ]
};