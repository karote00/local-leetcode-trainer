module.exports = {
  id: 68,
  title: 'Text Justification',
  name: 'text-justification',
  difficulty: 'hard',
  description: 'Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.',
  examples: [
    { input: 'words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16', output: '["This    is    an","example  of text","justification.  "]', explanation: 'The text is justified with spaces distributed evenly.' },
    { input: 'words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16', output: '["What   must   be","acknowledgment  ","shall be        "]', explanation: 'The last line is left-justified.' }
  ],
  constraints: [
    '1 <= words.length <= 300',
    '1 <= words[i].length <= 20',
    'words[i] consists of only English letters and symbols.',
    '1 <= maxWidth <= 100',
    'words[i].length <= maxWidth'
  ],
  topics: ['Array', 'String', 'Simulation'],
  companies: ['Google', 'Amazon', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'fullJustify', params: [{ name: 'words', type: 'string[]' }, { name: 'maxWidth', type: 'number' }], returnType: 'string[]' }
  },
  testCases: [
    { input: [["This", "is", "an", "example", "of", "text", "justification."], 16], expected: ["This    is    an","example  of text","justification.  "], description: 'Basic justification', category: 'basic' },
    { input: [["What","must","be","acknowledgment","shall","be"], 16], expected: ["What   must   be","acknowledgment  ","shall be        "], description: 'Last line left-justified', category: 'basic' },
    { input: [["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], 20], expected: ["Science  is  what we","understand      well","enough to explain to","a  computer.  Art is","everything  else  we","do                  "], description: 'Complex justification', category: 'stress' }
  ],
  hints: [
    { level: 1, text: 'Process words line by line, fitting as many as possible', category: 'approach' },
    { level: 2, text: 'Distribute extra spaces evenly, with left gaps getting more spaces', category: 'implementation' }
  ]
};