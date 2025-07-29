module.exports = {
  id: 224,
  title: 'Basic Calculator',
  name: 'basic-calculator',
  difficulty: 'hard',
  description: 'Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation. Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().',
  examples: [
    { input: 's = "1 + 1"', output: '2', explanation: 'Simple addition.' },
    { input: 's = " 2-1 + 2 "', output: '3', explanation: 'Expression with spaces.' },
    { input: 's = "(1+(4+5+2)-3)+(6+8)"', output: '23', explanation: 'Expression with parentheses.' }
  ],
  constraints: ['1 <= s.length <= 3 * 10^5', 's consists of digits, "+", "-", "(", ")", and " ".', 's represents a valid expression.', '"+" is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).', '"-" could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).', 'There will be no two consecutive operators in the input.', 'Every number and running calculation will fit in a signed 32-bit integer.'],
  topics: ['Math', 'String', 'Stack', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'calculate', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['1 + 1'], expected: 2, description: 'Simple addition', category: 'basic' },
    { input: [' 2-1 + 2 '], expected: 3, description: 'With spaces', category: 'basic' },
    { input: ['(1+(4+5+2)-3)+(6+8)'], expected: 23, description: 'With parentheses', category: 'complex' }
  ],
  hints: [
    { level: 1, text: 'Use stack to handle parentheses and operators', category: 'approach' },
    { level: 2, text: 'Keep track of current number, operator, and result', category: 'stack' }
  ]
};