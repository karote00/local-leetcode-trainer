module.exports = {
  id: 208,
  title: 'Implement Trie (Prefix Tree)',
  name: 'implement-trie-prefix-tree',
  difficulty: 'medium',
  description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker. Implement the Trie class: Trie() Initializes the trie object. void insert(String word) Inserts the string word into the trie. boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise. boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.',
  examples: [
    { input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"] [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]', output: '[null, null, true, false, true, null, true]', explanation: 'Trie trie = new Trie(); trie.insert("apple"); trie.search("apple");   // return True trie.search("app");     // return False trie.startsWith("app"); // return True trie.insert("app"); trie.search("app");     // return True' }
  ],
  constraints: ['1 <= word.length, prefix.length <= 2000', 'word and prefix consist only of lowercase English letters.', 'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'],
  topics: ['Hash Table', 'String', 'Design', 'Trie'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'Trie', params: [], returnType: 'void' }
  },
  testCases: [
    { input: [['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'], [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']]], expected: [null, null, true, false, true, null, true], description: 'Basic trie operations', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use nested objects or Map to represent trie nodes', category: 'approach' },
    { level: 2, text: 'Each node has children map and isEndOfWord flag', category: 'implementation' }
  ]
};