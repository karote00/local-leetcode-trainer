module.exports = {
  id: 42,
  title: 'Trapping Rain Water',
  name: 'trapping-rain-water',
  difficulty: 'hard',
  description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
  examples: [
    { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.' },
    { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: '9 units of water can be trapped.' }
  ],
  constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 3 * 10^4'],
  topics: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack', 'Monotonic Stack'],
  companies: ['Amazon', 'Google', 'Microsoft'],
  functionSignatures: {
    javascript: { name: 'trap', params: [{ name: 'height', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6, description: 'Elevation map', category: 'basic' },
    { input: [[4,2,0,3,2,5]], expected: 9, description: 'Another elevation', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers from both ends', category: 'approach' },
    { level: 2, text: 'Water level is determined by the shorter wall', category: 'two-pointers' }
  ]
};