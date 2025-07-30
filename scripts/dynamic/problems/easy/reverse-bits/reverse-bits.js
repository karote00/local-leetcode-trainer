module.exports = {
  id: 190,
  title: 'Reverse Bits',
  name: 'reverse-bits',
  difficulty: 'easy',
  description: 'Reverse bits of a given 32 bits unsigned integer.',
  examples: [
    { input: 'n = 00000010100101000001111010011100', output: '00111001011110000010100101000000', explanation: 'The input binary string represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.' },
    { input: 'n = 11111111111111111111111111111101', output: '10111111111111111111111111111111', explanation: 'The input binary string represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.' }
  ],
  constraints: ['The input must be a binary string of length 32'],
  topics: ['Divide and Conquer', 'Bit Manipulation'],
  companies: ['Amazon', 'Microsoft', 'Apple'],
  functionSignatures: {
    javascript: { name: 'reverseBits', params: [{ name: 'n', type: 'number' }], returnType: 'number' }
  },
  testCases: [
    { input: [43261596], expected: 964176192, description: 'Standard case', category: 'basic' },
    { input: [4294967293], expected: 3221225471, description: 'Large number', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Process each bit from right to left', category: 'approach' },
    { level: 2, text: 'Use bit shifting to build the reversed number', category: 'bit-manipulation' }
  ]
};