module.exports = {
  id: 87,
  title: 'Scramble String',
  name: 'scramble-string',
  difficulty: 'hard',
  description: 'We can scramble a string s to get a string t using the following algorithm: If the length of the string is 1, stop. If the length of the string is > 1, do the following: Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y. Randomly decide to swap the two substrings or to keep them in the same order. Apply step 1 recursively on each of the two substrings x and y.',
  examples: [
    { input: 's1 = "great", s2 = "rgeat"', output: 'true', explanation: 'We can scramble "great" to get "rgeat".' },
    { input: 's1 = "abcdef", s2 = "fecabd"', output: 'false', explanation: 'We cannot scramble "abcdef" to get "fecabd".' },
    { input: 's1 = "a", s2 = "a"', output: 'true', explanation: 'Single character strings are equal.' }
  ],
  constraints: [
    's1.length == s2.length',
    '1 <= s1.length <= 30',
    's1 and s2 consist of lowercase English letters.'
  ],
  topics: ['String', 'Dynamic Programming'],
  companies: ['Google', 'Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'isScramble', params: [{ name: 's1', type: 'string' }, { name: 's2', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ["great", "rgeat"], expected: true, description: 'Valid scramble', category: 'basic' },
    { input: ["abcdef", "fecabd"], expected: false, description: 'Invalid scramble', category: 'basic' },
    { input: ["a", "a"], expected: true, description: 'Single character', category: 'edge' },
    { input: ["abc", "acb"], expected: true, description: 'Simple swap', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use recursion with memoization', category: 'approach' },
    { level: 2, text: 'Try all possible split points and check both swap/no-swap cases', category: 'implementation' }
  ]
};