module.exports = {
  id: 383,
  title: 'Ransom Note',
  name: 'ransom-note',
  difficulty: 'easy',
  description: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once in ransomNote.',
  examples: [
    { input: 'ransomNote = "a", magazine = "b"', output: 'false', explanation: 'Cannot construct "a" from "b".' },
    { input: 'ransomNote = "aa", magazine = "ab"', output: 'false', explanation: 'Need two "a"s but only have one.' },
    { input: 'ransomNote = "aa", magazine = "aab"', output: 'true', explanation: 'Can construct "aa" from "aab".' }
  ],
  constraints: ['1 <= ransomNote.length, magazine.length <= 10^5', 'ransomNote and magazine consist of lowercase English letters.'],
  topics: ['Hash Table', 'String', 'Counting'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'canConstruct', params: [{ name: 'ransomNote', type: 'string' }, { name: 'magazine', type: 'string' }], returnType: 'boolean' }
  },
  testCases: [
    { input: ['a', 'b'], expected: false, description: 'Different characters', category: 'basic' },
    { input: ['aa', 'ab'], expected: false, description: 'Insufficient characters', category: 'basic' },
    { input: ['aa', 'aab'], expected: true, description: 'Sufficient characters', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Count characters in magazine first', category: 'approach' },
    { level: 2, text: 'For each character in ransom note, check if available in magazine', category: 'implementation' }
  ]
};