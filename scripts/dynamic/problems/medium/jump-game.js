module.exports = {
  id: 55,
  title: 'Jump Game',
  name: 'jump-game',
  difficulty: 'medium',
  description: 'You are given an integer array nums. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.',
  examples: [
    { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
    { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.' }
  ],
  constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
  topics: ['Array', 'Dynamic Programming', 'Greedy'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'canJump', params: [{ name: 'nums', type: 'number[]' }], returnType: 'boolean' }
  },
  testCases: [
    { input: [[2,3,1,1,4]], expected: true, description: 'Can reach end', category: 'basic' },
    { input: [[3,2,1,0,4]], expected: false, description: 'Cannot reach end', category: 'basic' },
    { input: [[0]], expected: true, description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use greedy approach - track the farthest reachable position', category: 'approach' },
    { level: 2, text: 'If current index > farthest reachable, return false', category: 'greedy' }
  ]
};