module.exports = {
  id: 228,
  title: 'Summary Ranges',
  name: 'summary-ranges',
  difficulty: 'easy',
  description: 'You are given a sorted unique integer array nums. A range [a,b] is the set of all integers from a to b (inclusive). Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.',
  examples: [
    { input: 'nums = [0,1,2,4,5,7]', output: '["0->2","4->5","7"]', explanation: 'The ranges are: [0,2] --> "0->2", [4,5] --> "4->5", [7,7] --> "7"' },
    { input: 'nums = [0,2,3,4,6,8,9]', output: '["0","2->4","6","8->9"]', explanation: 'The ranges are: [0,0] --> "0", [2,4] --> "2->4", [6,6] --> "6", [8,9] --> "8->9"' }
  ],
  constraints: ['0 <= nums.length <= 20', '-2^31 <= nums[i] <= 2^31 - 1', 'All the values of nums are unique.', 'nums is sorted in ascending order.'],
  topics: ['Array'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'summaryRanges', params: [{ name: 'nums', type: 'number[]' }], returnType: 'string[]' }
  },
  testCases: [
    { input: [[0,1,2,4,5,7]], expected: ['0->2','4->5','7'], description: 'Multiple ranges', category: 'basic' },
    { input: [[0,2,3,4,6,8,9]], expected: ['0','2->4','6','8->9'], description: 'Mixed single and ranges', category: 'basic' },
    { input: [[]], expected: [], description: 'Empty array', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers to track start and end of each range', category: 'approach' },
    { level: 2, text: 'Check if next number is consecutive, if not, close current range', category: 'implementation' }
  ]
};