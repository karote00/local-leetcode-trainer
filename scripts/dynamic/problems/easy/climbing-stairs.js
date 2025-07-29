module.exports = {
  id: 70,
  title: 'Climbing Stairs',
  name: 'climbing-stairs',
  difficulty: 'easy',
  description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
  examples: [
    { input: 'n = 2', output: '2', explanation: 'There are two ways: 1. 1 step + 1 step 2. 2 steps' },
    { input: 'n = 3', output: '3', explanation: 'There are three ways: 1. 1 step + 1 step + 1 step 2. 1 step + 2 steps 3. 2 steps + 1 step' }
  ],
  constraints: ['1 <= n <= 45'],
  topics: ['Math', 'Dynamic Programming', 'Memoization'],
  companies: ['Amazon', 'Adobe', 'Apple'],
  functionSignatures: {
    javascript: { name: 'climbStairs', params: [{ name: 'n', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [2], expected: 2, description: 'Two steps', category: 'basic' },
    { input: [3], expected: 3, description: 'Three steps', category: 'basic' },
    { input: [1], expected: 1, description: 'One step', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'This is a Fibonacci sequence', category: 'approach' },
    { level: 2, text: 'f(n) = f(n-1) + f(n-2)', category: 'formula' }
  ]
};