module.exports = {
  id: 205,
  title: 'Isomorphic Strings',
  name: 'isomorphic-strings',
  difficulty: 'easy',
  description: 'Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with the same character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.',
  examples: [
    { input: 's = "egg", t = "add"', output: 'true', explanation: 'e->a, g->d' },
    { input: 's = "foo", t = "bar"', output: 'false', explanation: 'o cannot map to both a and r' },
    { input: 's = "paper", t = "title"', output: 'true', explanation: 'p->t, a->i, e->l, r->e' }
  ],
  constraints: ['1 <= s.length <= 5 * 10^4', 't.length == s.length', 's and t consist of any valid ascii character.'],
  topics: ['Hash Table', 'String'],
  companies: ['Amazon', 'Microsoft', 'LinkedIn'],
  functionSignatures: {
    javascript: { name: 'isIsomorphic', params: [{ name: 's', type: 'string' }, { name: 't', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ['egg', 'add'], expected: true, description: 'Valid mapping', category: 'basic' },
    { input: ['foo', 'bar'], expected: false, description: 'Invalid mapping', category: 'basic' },
    { input: ['paper', 'title'], expected: true, description: 'Complex mapping', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use two hash maps for bidirectional mapping', category: 'approach' },
    { level: 2, text: 'Check both s->t and t->s mappings are consistent', category: 'implementation' }
  ]
};