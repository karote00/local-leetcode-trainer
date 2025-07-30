module.exports = {
  id: 13,
  title: 'Roman to Integer',
  name: 'roman-to-integer',
  difficulty: 'easy',
  description: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\nI can be placed before V (5) and X (10) to make 4 and 9.\nX can be placed before L (50) and C (100) to make 40 and 90.\nC can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.',
  examples: [
    {
      input: 's = "III"',
      output: '3',
      explanation: 'III = 3.'
    },
    {
      input: 's = "LVIII"',
      output: '58',
      explanation: 'L = 50, V= 5, III = 3.'
    },
    {
      input: 's = "MCMXC"',
      output: '1994',
      explanation: 'M = 1000, CM = 900, XC = 90.'
    }
  ],
  constraints: [
    '1 <= s.length <= 15',
    's contains only the characters (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').',
    'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'
  ],
  topics: ['Hash Table', 'Math', 'String'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: {
      name: 'romanToInt',
      params: [{ name: 's', type: 'string' }],
      returnType: 'number'
    }
  },
  testCases: [
    {
      input: ['III'],
      expected: 3,
      description: 'Simple addition',
      category: 'basic'
    },
    {
      input: ['LVIII'],
      expected: 58,
      description: 'Mixed symbols',
      category: 'basic'
    },
    {
      input: ['MCMXC'],
      expected: 1994,
      description: 'Subtraction cases',
      category: 'advanced'
    },
    {
      input: ['IV'],
      expected: 4,
      description: 'Simple subtraction',
      category: 'edge'
    }
  ],
  hints: [
    {
      level: 1,
      text: 'Problem is simpler to solve by working the string from back to front and using a map.',
      category: 'approach'
    },
    {
      level: 2,
      text: 'If the current character represents a value smaller than the previous character, subtract it.',
      category: 'logic'
    }
  ]
};