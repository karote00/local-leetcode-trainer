module.exports = {
  id: 127,
  title: 'Word Ladder',
  name: 'word-ladder',
  difficulty: 'hard',
  description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: Every adjacent pair of words differs by a single letter. Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. sk == endWord. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.',
  examples: [
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.' },
    { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: '0', explanation: 'The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.' }
  ],
  constraints: ['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'wordList[i].length == beginWord.length', 'beginWord, endWord, and wordList[i] consist of lowercase English letters.', 'beginWord != endWord', 'All the words in wordList are unique.'],
  topics: ['Hash Table', 'String', 'Breadth-First Search'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'ladderLength', params: [{ name: 'beginWord', type: 'string' }, { name: 'endWord', type: 'string' }, { name: 'wordList', type: 'string[]' }], returnType: 'number' }
  },
  testCases: [
    { input: ['hit', 'cog', ['hot','dot','dog','lot','log','cog']], expected: 5, description: 'Valid transformation path', category: 'basic' },
    { input: ['hit', 'cog', ['hot','dot','dog','lot','log']], expected: 0, description: 'No valid path', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use BFS to find shortest path', category: 'approach' },
    { level: 2, text: 'For each word, try changing each character and check if result is in wordList', category: 'bfs' }
  ]
};