module.exports = {
  id: 38,
  title: 'Count and Say',
  name: 'count-and-say',
  difficulty: 'easy',
  description: 'The count-and-say sequence is a sequence of digit strings defined by the recursive formula: countAndSay(1) = "1", countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1).',
  examples: [
    { input: 'n = 1', output: '"1"', explanation: 'This is the base case.' },
    { input: 'n = 4', output: '"1211"', explanation: 'countAndSay(1) = "1", countAndSay(2) = say "1" = one 1 = "11", countAndSay(3) = say "11" = two 1s = "21", countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211".' }
  ],
  constraints: ['1 <= n <= 30'],
  topics: ['String'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'countAndSay', params: [{ name: 'n', type: 'number' }], returnType: 'string' }
  },
  testCases: [
    { input: [1], expected: '1', description: 'Base case', category: 'edge' },
    { input: [4], expected: '1211', description: 'Fourth sequence', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Build the sequence iteratively', category: 'approach' },
    { level: 2, text: 'Count consecutive identical digits', category: 'implementation' }
  ]
};