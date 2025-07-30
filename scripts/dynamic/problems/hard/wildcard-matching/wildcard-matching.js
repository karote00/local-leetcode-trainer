module.exports = {
  id: 44,
  title: 'Wildcard Matching',
  name: 'wildcard-matching',
  difficulty: 'hard',
  description: 'Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for "?" and "*" where "?" matches any single character and "*" matches any sequence of characters (including the empty sequence).',
  examples: [
    { input: 's = "aa", p = "a"', output: 'false', explanation: '"a" does not match the entire string "aa".' },
    { input: 's = "aa", p = "*"', output: 'true', explanation: '"*" matches any sequence.' },
    { input: 's = "cb", p = "?a"', output: 'false', explanation: '"?" matches "c", but the second letter is "a", which does not match "b".' }
  ],
  constraints: ['0 <= s.length, p.length <= 2000', 's contains only lowercase English letters.', 'p contains only lowercase English letters, "?" or "*".'],
  topics: ['String', 'Dynamic Programming', 'Greedy', 'Recursion'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'isMatch', params: [{ name: 's', type: 'string' }, { name: 'p', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ['aa', 'a'], expected: false, description: 'No match', category: 'basic' },
    { input: ['aa', '*'], expected: true, description: 'Wildcard matching', category: 'basic' },
    { input: ['cb', '?a'], expected: false, description: 'Question mark mismatch', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use dynamic programming or greedy approach', category: 'approach' },
    { level: 2, text: 'Handle "*" by trying to match zero or more characters', category: 'implementation' }
  ]
};