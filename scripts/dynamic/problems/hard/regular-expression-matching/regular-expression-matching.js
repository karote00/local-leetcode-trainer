module.exports = {
  id: 10,
  title: 'Regular Expression Matching',
  name: 'regular-expression-matching',
  difficulty: 'hard',
  description: 'Given an input string s and a pattern p, implement regular expression matching with support for "." and "*" where "." matches any single character and "*" matches zero or more of the preceding element.',
  examples: [
    { input: 's = "aa", p = "a"', output: 'false', explanation: '"a" does not match the entire string "aa".' },
    { input: 's = "aa", p = "a*"', output: 'true', explanation: '"*" means zero or more of the preceding element, "a". Therefore, by repeating "a" once, it becomes "aa".' },
    { input: 's = "ab", p = ".*"', output: 'true', explanation: '".*" means "zero or more (*) of any character (.)".' }
  ],
  constraints: ['1 <= s.length <= 20', '1 <= p.length <= 30', 's contains only lowercase English letters.', 'p contains only lowercase English letters, ".", and "*".', 'It is guaranteed for each appearance of the character "*", there will be a previous valid character to match.'],
  topics: ['String', 'Dynamic Programming', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'isMatch', params: [{ name: 's', type: 'string' }, { name: 'p', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ['aa', 'a'], expected: false, description: 'No match', category: 'basic' },
    { input: ['aa', 'a*'], expected: true, description: 'Pattern with star', category: 'basic' },
    { input: ['ab', '.*'], expected: true, description: 'Wildcard pattern', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use dynamic programming with 2D table', category: 'approach' },
    { level: 2, text: 'Handle "*" by considering zero or more matches', category: 'implementation' }
  ]
};