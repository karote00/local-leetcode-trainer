module.exports = {
  id: 66,
  title: 'Plus One',
  name: 'plus-one',
  difficulty: 'easy',
  description: 'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. Increment the large integer by one and return the resulting array of digits.',
  examples: [
    { input: 'digits = [1,2,3]', output: '[1,2,4]', explanation: 'The array represents the integer 123. Incrementing by one gives 123 + 1 = 124.' },
    { input: 'digits = [4,3,2,1]', output: '[4,3,2,2]', explanation: 'The array represents the integer 4321. Incrementing by one gives 4321 + 1 = 4322.' },
    { input: 'digits = [9]', output: '[1,0]', explanation: 'The array represents the integer 9. Incrementing by one gives 9 + 1 = 10.' }
  ],
  constraints: ['1 <= digits.length <= 100', '0 <= digits[i] <= 9', 'digits does not contain any leading zeros except for the number 0 itself.'],
  topics: ['Array', 'Math'],
  companies: ['Amazon', 'Google', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'plusOne', params: [{ name: 'digits', type: 'number[]' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[1,2,3]], expected: [1,2,4], description: 'No carry needed', category: 'basic' },
    { input: [[4,3,2,1]], expected: [4,3,2,2], description: 'Simple increment', category: 'basic' },
    { input: [[9]], expected: [1,0], description: 'Carry propagation', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Handle carry from right to left', category: 'approach' },
    { level: 2, text: 'If all digits are 9, you need to add a new digit at the front', category: 'edge-case' }
  ]
};