module.exports = {
  id: 300,
  title: 'Longest Increasing Subsequence',
  name: 'longest-increasing-subsequence',
  difficulty: 'medium',
  description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
  examples: [
    { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2,3,7,18], therefore the length is 4.' },
    { input: 'nums = [0,1,0,3,2,3]', output: '4', explanation: 'The longest increasing subsequence is [0,1,2,3], therefore the length is 4.' },
    { input: 'nums = [7,7,7,7,7,7,7]', output: '1', explanation: 'The longest increasing subsequence is [7], therefore the length is 1.' }
  ],
  constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
  topics: ['Array', 'Binary Search', 'Dynamic Programming'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'lengthOfLIS', params: [{ name: 'nums', type: 'number[]' }], returnType: 'number' }
  },
  testCases: [
    { input: [[10,9,2,5,3,7,101,18]], expected: 4, description: 'Mixed sequence', category: 'basic' },
    { input: [[0,1,0,3,2,3]], expected: 4, description: 'Another sequence', category: 'basic' },
    { input: [[7,7,7,7,7,7,7]], expected: 1, description: 'All same elements', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use DP: dp[i] = length of LIS ending at index i', category: 'approach' },
    { level: 2, text: 'For O(n log n), use binary search with patience sorting', category: 'optimization' }
  ]
};