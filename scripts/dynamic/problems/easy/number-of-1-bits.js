module.exports = {
  id: 191,
  title: 'Number of 1 Bits',
  name: 'number-of-1-bits',
  difficulty: 'easy',
  description: 'Write a function that takes the binary representation of an unsigned integer and returns the number of \'1\' bits it has (also known as the Hamming weight).',
  examples: [
    { input: 'n = 00000000000000000000000000001011', output: '3', explanation: 'The input binary string has a total of three \'1\' bits.' },
    { input: 'n = 00000000000000000000000010000000', output: '1', explanation: 'The input binary string has a total of one \'1\' bit.' },
    { input: 'n = 11111111111111111111111111111101', output: '31', explanation: 'The input binary string has a total of thirty one \'1\' bits.' }
  ],
  constraints: ['The input must be a binary string of length 32.'],
  topics: ['Divide and Conquer', 'Bit Manipulation'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'hammingWeight', params: [{ name: 'n', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [11], expected: 3, description: 'Binary 1011 has 3 ones', category: 'basic' },
    { input: [128], expected: 1, description: 'Binary 10000000 has 1 one', category: 'basic' },
    { input: [4294967293], expected: 31, description: 'Many ones', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use bit manipulation to count set bits', category: 'approach' },
    { level: 2, text: 'n & (n-1) removes the rightmost set bit', category: 'bit-manipulation' }
  ]
};