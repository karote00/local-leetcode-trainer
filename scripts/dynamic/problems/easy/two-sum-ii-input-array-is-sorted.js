module.exports = {
  id: 167,
  title: 'Two Sum II - Input Array Is Sorted',
  name: 'two-sum-ii-input-array-is-sorted',
  difficulty: 'easy',
  description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length. Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.',
  examples: [
    { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].' },
    { input: 'numbers = [2,3,4], target = 6', output: '[1,3]', explanation: 'The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].' },
    { input: 'numbers = [-1,0], target = -1', output: '[1,2]', explanation: 'The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].' }
  ],
  constraints: ['2 <= numbers.length <= 3 * 10^4', '-1000 <= numbers[i] <= 1000', 'numbers is sorted in non-decreasing order.', '-1000 <= target <= 1000', 'The tests are generated such that there is exactly one solution.'],
  topics: ['Array', 'Two Pointers', 'Binary Search'],
  companies: ['Amazon', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: { name: 'twoSum', params: [{ name: 'numbers', type: 'number[]' }, { name: 'target', type: 'number' }], returnType: 'number[]' }
  },
  testCases: [
    { input: [[2,7,11,15], 9], expected: [1,2], description: 'Standard case', category: 'basic' },
    { input: [[2,3,4], 6], expected: [1,3], description: 'Different indices', category: 'basic' },
    { input: [[-1,0], -1], expected: [1,2], description: 'Negative numbers', category: 'basic' }
  ],
  hints: [
    { level: 1, text: 'Use two pointers from start and end', category: 'approach' },
    { level: 2, text: 'If sum > target, move right pointer left; if sum < target, move left pointer right', category: 'two-pointers' }
  ]
};