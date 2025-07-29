module.exports = {
  id: 1,
  title: 'Two Sum',
  name: 'two-sum',
  difficulty: 'easy',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
    },
    {
      input: 'nums = [3,3], target = 6',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
    }
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.'
  ],
  topics: ['Array', 'Hash Table'],
  companies: ['Amazon', 'Google', 'Apple', 'Microsoft', 'Facebook'],
  functionSignatures: {
    javascript: {
      name: 'twoSum',
      params: [
        { name: 'nums', type: 'number[]' },
        { name: 'target', type: 'number' }
      ],
      returnType: 'number[]'
    }
  },
  testCases: [
    {
      input: [[2, 7, 11, 15], 9],
      expected: [0, 1],
      description: 'Basic case',
      category: 'basic'
    },
    {
      input: [[3, 2, 4], 6],
      expected: [1, 2],
      description: 'Different indices',
      category: 'basic'
    },
    {
      input: [[3, 3], 6],
      expected: [0, 1],
      description: 'Duplicate values',
      category: 'edge'
    }
  ],
  hints: [
    {
      level: 1,
      text: 'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it\'s best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.',
      category: 'approach'
    },
    {
      level: 2,
      text: 'So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?',
      category: 'optimization'
    },
    {
      level: 3,
      text: 'The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?',
      category: 'solution'
    }
  ]
};