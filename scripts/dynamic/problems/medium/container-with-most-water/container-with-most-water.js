module.exports = {
  id: 11,
  title: 'Container With Most Water',
  name: 'container-with-most-water',
  difficulty: 'medium',
  description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that contains the most water.',
  examples: [
    { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.' },
    { input: 'height = [1,1]', output: '1', explanation: 'The max area is 1.' }
  ],
  constraints: ['n >= 2', '0 <= height[i] <= 3 * 10^4'],
  topics: ['Array', 'Two Pointers', 'Greedy'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'maxArea', params: [{ name: 'height', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[1,8,6,2,5,4,8,3,7]], expected: 49, description: 'Standard case', category: 'basic' },
    { input: [[1,1]], expected: 1, description: 'Minimum case', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers from both ends', category: 'approach' },
    { level: 2, text: 'Move the pointer with smaller height', category: 'greedy' }
  ]
};