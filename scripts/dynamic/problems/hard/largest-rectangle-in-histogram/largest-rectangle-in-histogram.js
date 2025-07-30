module.exports = {
  id: 84,
  title: 'Largest Rectangle in Histogram',
  name: 'largest-rectangle-in-histogram',
  difficulty: 'hard',
  description: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
  examples: [
    { input: 'heights = [2,1,5,6,2,3]', output: '10', explanation: 'The largest rectangle is formed by bars at indices 2 and 3 with height 5, so area = 5 * 2 = 10.' },
    { input: 'heights = [2,4]', output: '4', explanation: 'The largest rectangle has area 4.' }
  ],
  constraints: ['1 <= heights.length <= 10^5', '0 <= heights[i] <= 10^4'],
  topics: ['Array', 'Stack', 'Monotonic Stack'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'largestRectangleArea', params: [{ name: 'heights', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[2,1,5,6,2,3]], expected: 10, description: 'Complex histogram', category: 'basic' },
    { input: [[2,4]], expected: 4, description: 'Simple case', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use stack to find previous and next smaller elements', category: 'approach' },
    { level: 2, text: 'For each bar, calculate max rectangle with that bar as height', category: 'stack' }
  ]
};