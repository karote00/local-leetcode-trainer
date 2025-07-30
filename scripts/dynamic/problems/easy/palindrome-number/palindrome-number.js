module.exports = {
  id: 9,
  title: 'Palindrome Number',
  name: 'palindrome-number',
  difficulty: 'easy',
  description: 'Given an integer x, return true if x is a palindrome, and false otherwise.\n\nAn integer is a palindrome when it reads the same backward as forward.\n\nFor example, 121 is a palindrome while 123 is not.',
  examples: [
    {
      input: 'x = 121',
      output: 'true',
      explanation: '121 reads the same backward as forward.'
    },
    {
      input: 'x = -121',
      output: 'false',
      explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
    },
    {
      input: 'x = 10',
      output: 'false',
      explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
    }
  ],
  constraints: [
    '-2^31 <= x <= 2^31 - 1'
  ],
  topics: ['Math'],
  companies: ['Amazon', 'Apple', 'Microsoft'],
  functionSignatures: {
    javascript: {
      name: 'isPalindrome',
      params: [{ name: 'x', type: 'number' }],
      returnType: 'boolean'
    }
  },
  testCases: [
    {
      input: [121],
      expected: true,
      description: 'Positive palindrome',
      category: 'basic'
    },
    {
      input: [-121],
      expected: false,
      description: 'Negative number',
      category: 'basic'
    },
    {
      input: [10],
      expected: false,
      description: 'Trailing zero',
      category: 'edge'
    },
    {
      input: [0],
      expected: true,
      description: 'Single digit',
      category: 'edge'
    }
  ],
  hints: [
    {
      level: 1,
      text: 'Beware of overflow when you reverse the integer.',
      category: 'warning'
    },
    {
      level: 2,
      text: 'Could you solve it without converting the integer to a string?',
      category: 'approach'
    },
    {
      level: 3,
      text: 'You can reverse half of the number and compare it with the other half.',
      category: 'optimization'
    }
  ]
};