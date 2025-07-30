module.exports = {
  id: 58,
  title: 'Length of Last Word',
  name: 'length-of-last-word',
  difficulty: 'easy',
  description: 'Given a string s consisting of words and spaces, return the length of the last word in the string.',
  examples: [
    { input: 's = "Hello World"', output: '5', explanation: 'The last word is "World" with length 5.' },
    { input: 's = "   fly me   to   the moon  "', output: '4', explanation: 'The last word is "moon" with length 4.' },
    { input: 's = "luffy is still joyboy"', output: '6', explanation: 'The last word is "joyboy" with length 6.' }
  ],
  constraints: ['1 <= s.length <= 10^4', 's consists of only English letters and spaces " ".', 'There will be at least one word in s.'],
  topics: ['String'],
  companies: ['Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'lengthOfLastWord', params: [{ name: 's', type: 'string' }], returnType: 'number' }
  },
  testCases: [
    { input: ['Hello World'], expected: 5, description: 'String with spaces', category: 'basic' },
    { input: ['   fly me   to   the moon  '], expected: 4, description: 'Trailing spaces', category: 'edge' },
    { input: ['luffy is still joyboy'], expected: 6, description: 'No trailing spaces', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Traverse from the end of the string', category: 'approach' },
    { level: 2, text: 'Skip trailing spaces first, then count characters', category: 'implementation' }
  ]
};