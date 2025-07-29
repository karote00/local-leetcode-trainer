#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Comprehensive LeetCode problems from training data
const LEETCODE_PROBLEMS = {
  easy: [
    {
      id: 1,
      title: 'Two Sum',
      name: 'two-sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
      ],
      constraints: ['2 <= nums.length <= 10^4', 'Only one valid answer exists.'],
      topics: ['Array', 'Hash Table'],
      companies: ['Amazon', 'Google', 'Apple'],
      functionSignatures: {
        javascript: { name: 'twoSum', params: [{ name: 'nums', type: 'number[]' }, { name: 'target', type: 'number' }], returnType: 'number[]' }
      }
    },
    {
      id: 7,
      title: 'Reverse Integer',
      name: 'reverse-integer',
      description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.',
      examples: [
        { input: 'x = 123', output: '321', explanation: '' },
        { input: 'x = -123', output: '-321', explanation: '' },
        { input: 'x = 120', output: '21', explanation: '' }
      ],
      constraints: ['-2^31 <= x <= 2^31 - 1'],
      topics: ['Math'],
      companies: ['Amazon', 'Apple'],
      functionSignatures: {
        javascript: { name: 'reverse', params: [{ name: 'x', type: 'number' }], returnType: 'number' }
      }
    },
    {
      id: 9,
      title: 'Palindrome Number',
      name: 'palindrome-number',
      description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
      examples: [
        { input: 'x = 121', output: 'true', explanation: '121 reads the same backward as forward.' },
        { input: 'x = -121', output: 'false', explanation: 'From left to right, it reads -121. From right to left, it becomes 121-.' },
        { input: 'x = 10', output: 'false', explanation: 'Reads 01 from right to left.' }
      ],
      constraints: ['-2^31 <= x <= 2^31 - 1'],
      topics: ['Math'],
      companies: ['Amazon', 'Apple'],
      functionSignatures: {
        javascript: { name: 'isPalindrome', params: [{ name: 'x', type: 'number' }], returnType: 'boolean' }
      }
    },
    {
      id: 13,
      title: 'Roman to Integer',
      name: 'roman-to-integer',
      description: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.',
      examples: [
        { input: 's = "III"', output: '3', explanation: 'III = 3.' },
        { input: 's = "LVIII"', output: '58', explanation: 'L = 50, V= 5, III = 3.' },
        { input: 's = "MCMXC"', output: '1994', explanation: 'M = 1000, CM = 900, XC = 90.' }
      ],
      constraints: ['1 <= s.length <= 15', 's contains only the characters (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').'],
      topics: ['Hash Table', 'Math', 'String'],
      companies: ['Amazon', 'Microsoft'],
      functionSignatures: {
        javascript: { name: 'romanToInt', params: [{ name: 's', type: 'string' }], returnType: 'number' }
      }
    },
    {
      id: 14,
      title: 'Longest Common Prefix',
      name: 'longest-common-prefix',
      description: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
      examples: [
        { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: '' },
        { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'There is no common prefix among the input strings.' }
      ],
      constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200'],
      topics: ['String', 'Trie'],
      companies: ['Amazon', 'Microsoft', 'Google'],
      functionSignatures: {
        javascript: { name: 'longestCommonPrefix', params: [{ name: 'strs', type: 'string[]' }], returnType: 'string' }
      }
    }
    // ... I'll continue with more problems
  ],
  medium: [
    {
      id: 2,
      title: 'Add Two Numbers',
      name: 'add-two-numbers',
      description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
      examples: [
        { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807.' }
      ],
      constraints: ['The number of nodes in each linked list is in the range [1, 100].'],
      topics: ['Linked List', 'Math', 'Recursion'],
      companies: ['Amazon', 'Microsoft', 'Apple'],
      functionSignatures: {
        javascript: { name: 'addTwoNumbers', params: [{ name: 'l1', type: 'ListNode' }, { name: 'l2', type: 'ListNode' }], returnType: 'ListNode' }
      }
    }
    // ... more medium problems
  ],
  hard: [
    {
      id: 4,
      title: 'Median of Two Sorted Arrays',
      name: 'median-of-two-sorted-arrays',
      description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
      examples: [
        { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'merged array = [1,2,3] and median is 2.' }
      ],
      constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000'],
      topics: ['Array', 'Binary Search', 'Divide and Conquer'],
      companies: ['Amazon', 'Google', 'Microsoft'],
      functionSignatures: {
        javascript: { name: 'findMedianSortedArrays', params: [{ name: 'nums1', type: 'number[]' }, { name: 'nums2', type: 'number[]' }], returnType: 'number' }
      }
    }
    // ... more hard problems
  ]
};

function createProblemFile(problem, difficulty) {
  const dir = path.join(__dirname, 'dynamic', 'problems', difficulty);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = `module.exports = ${JSON.stringify({
    ...problem,
    difficulty,
    testCases: [
      {
        input: problem.examples[0]?.input?.match(/\[(.*?)\]/)?.[1]?.split(',').map(x => x.trim()) || [],
        expected: problem.examples[0]?.output,
        description: 'Basic case',
        category: 'basic'
      }
    ],
    hints: [
      {
        level: 1,
        text: 'Think about the most straightforward approach first',
        category: 'approach'
      }
    ]
  }, null, 2)};`;

  fs.writeFileSync(path.join(dir, `${problem.name}.js`), content);
  console.log(`Created ${difficulty}/${problem.name}.js`);
}

// Generate all problems
Object.entries(LEETCODE_PROBLEMS).forEach(([difficulty, problems]) => {
  problems.forEach(problem => {
    createProblemFile(problem, difficulty);
  });
});

console.log('Database generation complete!');