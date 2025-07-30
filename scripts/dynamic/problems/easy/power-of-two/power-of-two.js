module.exports = {
  id: 231,
  title: 'Power of Two',
  name: 'power-of-two',
  difficulty: 'easy',
  description: 'Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two, if there exists an integer x such that n == 2^x.',
  examples: [
    { input: 'n = 1', output: 'true', explanation: '2^0 = 1' },
    { input: 'n = 16', output: 'true', explanation: '2^4 = 16' },
    { input: 'n = 3', output: 'false', explanation: '3 is not a power of 2' }
  ],
  constraints: ['-2^31 <= n <= 2^31 - 1'],
  topics: ['Math', 'Bit Manipulation', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'isPowerOfTwo', params: [{ name: 'n', type: 'number' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [1], expected: true, description: '2^0 = 1', category: 'basic' },
    { input: [16], expected: true, description: '2^4 = 16', category: 'basic' },
    { input: [3], expected: false, description: 'Not a power of 2', category: 'basic' },
    { input: [0], expected: false, description: 'Zero edge case', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'A power of 2 has only one bit set', category: 'approach' },
    { level: 2, text: 'Use bit manipulation: n & (n-1) == 0 for powers of 2', category: 'bit-manipulation' }
  ]
};