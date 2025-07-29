module.exports = {
  id: 239,
  title: 'Sliding Window Maximum',
  name: 'sliding-window-maximum',
  difficulty: 'hard',
  description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.',
  examples: [
    { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explanation: 'Window position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7' },
    { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Single element window.' }
  ],
  constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
  topics: ['Array', 'Queue', 'Sliding Window', 'Heap (Priority Queue)', 'Monotonic Queue'],
  companies: ['Amazon', 'Microsoft', 'Google'],
  functionSignatures: {
    javascript: { name: 'maxSlidingWindow', params: [{ name: 'nums', type: 'number[]' }, { name: 'k', type: 'number' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7], description: 'Standard sliding window', category: 'basic' },
    { input: [[1], 1], expected: [1], description: 'Single element', category: 'edge' }
  ],
  hints: [
    { level: 1, text: 'Use deque (double-ended queue) to maintain window maximum', category: 'approach' },
    { level: 2, text: 'Keep deque in decreasing order, remove elements outside window', category: 'monotonic-queue' }
  ]
};