const fs = require('fs');
const path = require('path');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

// Dynamic LeetCode Integration (optional)
let dynamicSystem = null;
const ENABLE_DYNAMIC = process.env.LCT_DYNAMIC === 'true' || process.argv.includes('--dynamic');

if (ENABLE_DYNAMIC) {
  try {
    const { ProblemManagerImpl } = require('./dynamic/problem-manager');
    const { OfflineManager } = require('./dynamic/offline-manager');
    dynamicSystem = {
      problemManager: new ProblemManagerImpl(),
      offlineManager: new OfflineManager()
    };
    console.log('🌐 Dynamic LeetCode integration enabled');
  } catch (error) {
    console.log('⚠️  Dynamic system failed to load, using static database');
  }
}

// LeetCode problems database organized by difficulty
const PROBLEMS = {
  easy: [
    {
      id: 1,
      name: "two-sum",
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
      topics: ["Array", "Hash Table"],
      companies: ["Amazon", "Google", "Apple"],
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        },
        {
          input: "nums = [3,3], target = 6",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      functionSignature: {
        javascript: {
          name: "twoSum",
          params: [
            { name: "nums", type: "number[]" },
            { name: "target", type: "number" }
          ],
          returnType: "number[]"
        },
        python: {
          name: "twoSum",
          params: [
            { name: "nums", type: "List[int]" },
            { name: "target", type: "int" }
          ],
          returnType: "List[int]"
        },
        java: {
          name: "twoSum",
          params: [
            { name: "nums", type: "int[]" },
            { name: "target", type: "int" }
          ],
          returnType: "int[]"
        },
        cpp: {
          name: "twoSum",
          params: [
            { name: "nums", type: "vector<int>&" },
            { name: "target", type: "int" }
          ],
          returnType: "vector<int>"
        }
      },
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] },
        { input: [[1, 2, 3, 4, 5], 9], expected: [3, 4] },
        { input: [[5, 5, 11], 10], expected: [0, 1] },
        { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
        { input: [[0, 4, 3, 0], 0], expected: [0, 3] },
        { input: [[2, 5, 5, 11], 10], expected: [1, 2] },
        { input: [[1, 3, 7, 9, 2], 11], expected: [3, 4] },
        { input: [[6, 2, 4], 6], expected: [1, 2] },
        { input: [[10, 20, 30, 40], 50], expected: [1, 2] },
        { input: [[1, 2], 3], expected: [0, 1] }
      ]
    },
    {
      id: 9,
      name: "palindrome-number",
      title: "Palindrome Number",
      description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
      topics: ["Math"],
      companies: ["Amazon", "Apple"],
      examples: [
        {
          input: "x = 121",
          output: "true",
          explanation: "121 reads as 121 from left to right and from right to left."
        },
        {
          input: "x = -121",
          output: "false",
          explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
        },
        {
          input: "x = 10",
          output: "false",
          explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
        }
      ],
      constraints: [
        "-2^31 <= x <= 2^31 - 1"
      ],
      followUp: "Could you solve it without converting the integer to a string?",
      functionSignature: {
        javascript: {
          name: "isPalindrome",
          params: [
            { name: "x", type: "number" }
          ],
          returnType: "boolean"
        },
        python: {
          name: "isPalindrome",
          params: [
            { name: "x", type: "int" }
          ],
          returnType: "bool"
        },
        java: {
          name: "isPalindrome",
          params: [
            { name: "x", type: "int" }
          ],
          returnType: "boolean"
        },
        cpp: {
          name: "isPalindrome",
          params: [
            { name: "x", type: "int" }
          ],
          returnType: "bool"
        }
      },
      testCases: [
        { input: [121], expected: true },
        { input: [-121], expected: false },
        { input: [10], expected: false },
        { input: [0], expected: true },
        { input: [1], expected: true },
        { input: [12321], expected: true },
        { input: [123321], expected: true },
        { input: [12345], expected: false },
        { input: [1001], expected: true },
        { input: [1234321], expected: true },
        { input: [987654321], expected: false },
        { input: [9009], expected: true }
      ]
    },
    {
      id: 13,
      name: "roman-to-integer",
      title: "Roman to Integer",
      description: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\n\nI can be placed before V (5) and X (10) to make 4 and 9.\nX can be placed before L (50) and C (100) to make 40 and 90.\nC can be placed before D (500) and M (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.",
      topics: ["Hash Table", "Math", "String"],
      companies: ["Facebook", "Microsoft", "Yahoo"],
      examples: [
        {
          input: "s = \"III\"",
          output: "3",
          explanation: "III = 3."
        },
        {
          input: "s = \"LVIII\"",
          output: "58",
          explanation: "L = 50, V= 5, III = 3."
        },
        {
          input: "s = \"MCMXC\"",
          output: "1990",
          explanation: "M = 1000, CM = 900, XC = 90."
        }
      ],
      constraints: [
        "1 <= s.length <= 15",
        "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
        "It is guaranteed that s is a valid roman numeral in the range [1, 3999]."
      ],
      functionSignature: {
        javascript: {
          name: "romanToInt",
          params: [
            { name: "s", type: "string" }
          ],
          returnType: "number"
        },
        python: {
          name: "romanToInt",
          params: [
            { name: "s", type: "str" }
          ],
          returnType: "int"
        },
        java: {
          name: "romanToInt",
          params: [
            { name: "s", type: "String" }
          ],
          returnType: "int"
        },
        cpp: {
          name: "romanToInt",
          params: [
            { name: "s", type: "string" }
          ],
          returnType: "int"
        }
      },
      testCases: [
        { input: ["III"], expected: 3 },
        { input: ["LVIII"], expected: 58 },
        { input: ["MCMXC"], expected: 1990 },
        { input: ["IV"], expected: 4 },
        { input: ["IX"], expected: 9 },
        { input: ["XL"], expected: 40 },
        { input: ["XC"], expected: 90 },
        { input: ["CD"], expected: 400 },
        { input: ["CM"], expected: 900 },
        { input: ["MCDLIV"], expected: 1454 },
        { input: ["MMCDXLIV"], expected: 2444 },
        { input: ["DCXXI"], expected: 621 }
      ]
    },
    {
      id: 14,
      name: "longest-common-prefix",
      title: "Longest Common Prefix",
      description: "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \"\".",
      topics: ["String"],
      companies: ["Google", "Yelp"],
      examples: [
        {
          input: "strs = [\"flower\",\"flow\",\"flight\"]",
          output: "\"fl\"",
          explanation: "The longest common prefix is \"fl\"."
        },
        {
          input: "strs = [\"dog\",\"racecar\",\"car\"]",
          output: "\"\"",
          explanation: "There is no common prefix among the input strings."
        }
      ],
      constraints: [
        "1 <= strs.length <= 200",
        "0 <= strs[i].length <= 200",
        "strs[i] consists of only lowercase English letters."
      ],
      functionSignature: {
        javascript: {
          name: "longestCommonPrefix",
          params: [
            { name: "strs", type: "string[]" }
          ],
          returnType: "string"
        },
        python: {
          name: "longestCommonPrefix",
          params: [
            { name: "strs", type: "List[str]" }
          ],
          returnType: "str"
        },
        java: {
          name: "longestCommonPrefix",
          params: [
            { name: "strs", type: "String[]" }
          ],
          returnType: "String"
        },
        cpp: {
          name: "longestCommonPrefix",
          params: [
            { name: "strs", type: "vector<string>&" }
          ],
          returnType: "string"
        }
      },
      testCases: [
        { input: [["flower", "flow", "flight"]], expected: "fl" },
        { input: [["dog", "racecar", "car"]], expected: "" },
        { input: [["interspecies", "interstellar", "interstate"]], expected: "inters" },
        { input: [["throne", "throne"]], expected: "throne" },
        { input: [["throne", "dungeon"]], expected: "" },
        { input: [["a"]], expected: "a" },
        { input: [[""]], expected: "" },
        { input: [["ab", "a"]], expected: "a" },
        { input: [["abab", "aba", "abc"]], expected: "ab" },
        { input: [["leets", "leetcode", "leet", "leeds"]], expected: "lee" },
        { input: [["c", "acc", "ccc"]], expected: "" },
        { input: [["reflower", "flow", "flight"]], expected: "" }
      ]
    },
    {
      id: 20,
      name: "valid-parentheses",
      title: "Valid Parentheses",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
      topics: ["String", "Stack"],
      companies: ["Amazon", "Google", "Facebook"],
      examples: [
        {
          input: "s = \"()\"",
          output: "true",
          explanation: "The string contains valid parentheses."
        },
        {
          input: "s = \"()[]{}\"",
          output: "true",
          explanation: "All brackets are properly matched and closed."
        },
        {
          input: "s = \"(]\"",
          output: "false",
          explanation: "The brackets are not properly matched."
        }
      ],
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'."
      ],
      functionSignature: {
        javascript: {
          name: "isValid",
          params: [
            { name: "s", type: "string" }
          ],
          returnType: "boolean"
        },
        python: {
          name: "isValid",
          params: [
            { name: "s", type: "str" }
          ],
          returnType: "bool"
        },
        java: {
          name: "isValid",
          params: [
            { name: "s", type: "String" }
          ],
          returnType: "boolean"
        },
        cpp: {
          name: "isValid",
          params: [
            { name: "s", type: "string" }
          ],
          returnType: "bool"
        }
      },
      testCases: [
        { input: ["()"], expected: true },
        { input: ["()[]{}"], expected: true },
        { input: ["(]"], expected: false },
        { input: ["([)]"], expected: false },
        { input: ["{[]}"], expected: true },
        { input: [""], expected: true },
        { input: ["("], expected: false },
        { input: [")"], expected: false },
        { input: ["(("], expected: false },
        { input: ["))"], expected: false },
        { input: ["({[]})"], expected: true },
        { input: ["([{}])"], expected: true }
      ]
    },
    {
      id: 21,
      name: "merge-two-sorted-lists",
      title: "Merge Two Sorted Lists",
      description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
      topics: ["Linked List", "Recursion"],
      companies: ["Amazon", "Apple", "Adobe"],
      examples: [
        {
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          output: "[1,1,2,3,4,4]",
          explanation: "The merged list is [1,1,2,3,4,4]."
        },
        {
          input: "list1 = [], list2 = []",
          output: "[]",
          explanation: "Both lists are empty, so the merged list is also empty."
        },
        {
          input: "list1 = [], list2 = [0]",
          output: "[0]",
          explanation: "Only list2 has elements, so the merged list is [0]."
        }
      ],
      constraints: [
        "The number of nodes in both lists is in the range [0, 50].",
        "-100 <= Node.val <= 100",
        "Both list1 and list2 are sorted in non-decreasing order."
      ],
      functionSignature: {
        javascript: {
          name: "mergeTwoLists",
          params: [
            { name: "list1", type: "ListNode" },
            { name: "list2", type: "ListNode" }
          ],
          returnType: "ListNode"
        },
        python: {
          name: "mergeTwoLists",
          params: [
            { name: "list1", type: "Optional[ListNode]" },
            { name: "list2", type: "Optional[ListNode]" }
          ],
          returnType: "Optional[ListNode]"
        },
        java: {
          name: "mergeTwoLists",
          params: [
            { name: "list1", type: "ListNode" },
            { name: "list2", type: "ListNode" }
          ],
          returnType: "ListNode"
        },
        cpp: {
          name: "mergeTwoLists",
          params: [
            { name: "list1", type: "ListNode*" },
            { name: "list2", type: "ListNode*" }
          ],
          returnType: "ListNode*"
        }
      },
      testCases: [
        { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
        { input: [[], []], expected: [] },
        { input: [[], [0]], expected: [0] },
        { input: [[1], [2]], expected: [1, 2] },
        { input: [[2], [1]], expected: [1, 2] },
        { input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
        { input: [[1, 1, 1], [2, 2, 2]], expected: [1, 1, 1, 2, 2, 2] },
        { input: [[5], [1, 2, 4]], expected: [1, 2, 4, 5] },
        { input: [[1, 2, 4], [3]], expected: [1, 2, 3, 4] },
        { input: [[-1, 0, 1], [-2, 2, 3]], expected: [-2, -1, 0, 1, 2, 3] },
        { input: [[1, 2, 3, 4, 5], []], expected: [1, 2, 3, 4, 5] },
        { input: [[0, 1, 2], [3, 4, 5]], expected: [0, 1, 2, 3, 4, 5] }
      ]
    }
  ],
  medium: [
    {
      id: 2,
      name: "add-two-numbers",
      title: "Add Two Numbers",
      description: "Add numbers represented as linked lists",
      topics: ["Linked List", "Math", "Recursion"],
      companies: ["Amazon", "Microsoft", "Bloomberg"],
      testCases: [
        { input: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
        { input: [[0], [0]], expected: [0] },
        { input: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
        { input: [[1, 2], [9, 9]], expected: [0, 2, 1] },
        { input: [[5], [5]], expected: [0, 1] },
        { input: [[1, 8], [0]], expected: [1, 8] },
        { input: [[2, 4, 9], [5, 6, 4, 9]], expected: [7, 0, 4, 0, 1] },
        { input: [[9], [1, 9, 9, 9, 9, 9, 9, 9, 9, 9]], expected: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
        { input: [[1], [9, 9]], expected: [0, 0, 1] },
        { input: [[7, 2, 4, 3], [5, 6, 4]], expected: [2, 9, 8, 3] },
        { input: [[2, 4, 3, 2, 4, 3, 2, 4, 3], [5, 6, 4]], expected: [7, 0, 8, 2, 4, 3, 2, 4, 3] },
        { input: [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [5, 6, 4]], expected: [6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] }
      ]
    },
    {
      id: 3,
      name: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string s, find the length of the longest substring without repeating characters.",
      examples: [
        {
          input: 's = "abcabcbb"',
          output: "3",
          explanation: 'The answer is "abc", with the length of 3.'
        },
        {
          input: 's = "bbbbb"',
          output: "1",
          explanation: 'The answer is "b", with the length of 1.'
        },
        {
          input: 's = "pwwkew"',
          output: "3",
          explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
        }
      ],
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces."
      ],
      topics: ["Hash Table", "String", "Sliding Window"],
      companies: ["Amazon", "Adobe", "Bloomberg"],
      functionSignature: {
        javascript: {
          name: "lengthOfLongestSubstring",
          params: [{ name: "s", type: "string" }],
          returnType: "number"
        },
        python: {
          name: "lengthOfLongestSubstring",
          params: [{ name: "s", type: "str" }],
          returnType: "int"
        },
        java: {
          name: "lengthOfLongestSubstring",
          params: [{ name: "s", type: "String" }],
          returnType: "int"
        },
        cpp: {
          name: "lengthOfLongestSubstring",
          params: [{ name: "s", type: "string" }],
          returnType: "int"
        }
      },
      testCases: [
        { input: ["abcabcbb"], expected: 3 },
        { input: ["bbbbb"], expected: 1 },
        { input: ["pwwkew"], expected: 3 },
        { input: [""], expected: 0 },
        { input: [" "], expected: 1 },
        { input: ["au"], expected: 2 },
        { input: ["dvdf"], expected: 3 },
        { input: ["anviaj"], expected: 5 },
        { input: ["abcdef"], expected: 6 },
        { input: ["aab"], expected: 2 },
        { input: ["cdd"], expected: 2 },
        { input: ["abba"], expected: 2 }
      ]
    },
    {
      id: 5,
      name: "longest-palindromic-substring",
      title: "Longest Palindromic Substring",
      description: "Find the longest palindromic substring",
      topics: ["String", "Dynamic Programming"],
      companies: ["Amazon", "Microsoft", "Apple"]
    },
    {
      id: 11,
      name: "container-with-most-water",
      title: "Container With Most Water",
      description: "Find container that holds the most water",
      topics: ["Array", "Two Pointers", "Greedy"],
      companies: ["Amazon", "Bloomberg", "Facebook"]
    },
    {
      id: 15,
      name: "3sum",
      title: "3Sum",
      description: "Find all unique triplets that sum to zero",
      topics: ["Array", "Two Pointers", "Sorting"],
      companies: ["Amazon", "Adobe", "Facebook"]
    },
    {
      id: 22,
      name: "generate-parentheses",
      title: "Generate Parentheses",
      description: "Generate all valid parentheses combinations",
      topics: ["String", "Dynamic Programming", "Backtracking"],
      companies: ["Amazon", "Uber", "Google"]
    }
  ],
  hard: [
    {
      id: 4,
      name: "median-of-two-sorted-arrays",
      title: "Median of Two Sorted Arrays",
      description: "Find median of two sorted arrays in O(log(m+n))",
      topics: ["Array", "Binary Search", "Divide and Conquer"],
      companies: ["Amazon", "Google", "Adobe"]
    },
    {
      id: 10,
      name: "regular-expression-matching",
      title: "Regular Expression Matching",
      description: "Implement regex matching with '.' and '*'",
      topics: ["String", "Dynamic Programming", "Recursion"],
      companies: ["Facebook", "Google", "Uber"]
    },
    {
      id: 23,
      name: "merge-k-sorted-lists",
      title: "Merge k Sorted Lists",
      description: "Merge k sorted linked lists efficiently",
      topics: ["Linked List", "Divide and Conquer", "Heap", "Merge Sort"],
      companies: ["Amazon", "Google", "Facebook"]
    },
    {
      id: 25,
      name: "reverse-nodes-in-k-group",
      title: "Reverse Nodes in k-Group",
      description: "Reverse linked list nodes in groups of k",
      topics: ["Linked List", "Recursion"],
      companies: ["Amazon", "Microsoft", "Facebook"]
    },
    {
      id: 32,
      name: "longest-valid-parentheses",
      title: "Longest Valid Parentheses",
      description: "Find length of longest valid parentheses substring",
      topics: ["String", "Dynamic Programming", "Stack"],
      companies: ["Amazon", "Google"]
    }
  ]
};

// Function to generate problem content with proper LeetCode formatting
function generateProblemContent(problem, language, langConfig) {
  const signature = problem.functionSignature && problem.functionSignature[language];

  if (!signature) {
    // Fallback to old template if no signature data
    const functionName = generateFunctionName(problem.name, language);
    const className = generateClassName(problem.name);

    return langConfig.template
      .replace(/\{\{id\}\}/g, problem.id)
      .replace(/\{\{title\}\}/g, problem.title)
      .replace(/\{\{name\}\}/g, problem.name)
      .replace(/\{\{description\}\}/g, problem.description)
      .replace(/\{\{topics\}\}/g, problem.topics.join(', '))
      .replace(/\{\{companies\}\}/g, problem.companies.join(', '))
      .replace(/\{\{functionName\}\}/g, functionName)
      .replace(/\{\{function_name\}\}/g, functionName.toLowerCase().replace(/([A-Z])/g, '_$1').replace(/^_/, ''))
      .replace(/\{\{ClassName\}\}/g, className);
  }

  switch (language) {
    case 'javascript':
      return generateJavaScriptProblem(problem, signature);
    case 'python':
      return generatePythonProblem(problem, signature);
    case 'java':
      return generateJavaProblem(problem, signature);
    case 'cpp':
      return generateCppProblem(problem, signature);
    default:
      return generateJavaScriptProblem(problem, signature);
  }
}

function generateJavaScriptProblem(problem, signature) {
  const params = signature.params.map(p => p.name).join(', ');
  const paramTypes = signature.params.map(p => `@param {${p.type}} ${p.name}`).join('\n * ');

  const examples = problem.examples.map((ex, i) =>
    `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? '\nExplanation: ' + ex.explanation : ''}`
  ).join('\n\n');

  const constraints = problem.constraints.map(c => `- ${c}`).join('\n');

  // Check if we need ListNode definition
  const needsListNode = signature.params.some(p => p.type.includes('ListNode')) || signature.returnType.includes('ListNode');
  const listNodeDef = needsListNode ? `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

` : '';

  return `${listNodeDef}/**
 * ${problem.id}. ${problem.title}
 * https://leetcode.com/problems/${problem.name}/
 * 
 * ${problem.description.replace(/\n/g, '\n * ')}
 * 
 * ${examples.replace(/\n/g, '\n * ')}
 * 
 * Constraints:
 * ${constraints.replace(/\n/g, '\n * ')}
${problem.followUp ? ' * \n * Follow-up: ' + problem.followUp : ''}
 */

/**
 * ${paramTypes}
 * @return {${signature.returnType}}
 */
var ${signature.name} = function(${params}) {
    
};

module.exports = ${signature.name};`;
}

function generatePythonProblem(problem, signature) {
  const params = signature.params.map(p => `${p.name}: ${p.type}`).join(', ');

  const examples = problem.examples.map((ex, i) =>
    `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? '\nExplanation: ' + ex.explanation : ''}`
  ).join('\n\n');

  const constraints = problem.constraints.map(c => `- ${c}`).join('\n');

  // Check if we need ListNode definition
  const needsListNode = signature.params.some(p => p.type.includes('ListNode')) || signature.returnType.includes('ListNode');
  const listNodeDef = needsListNode ? `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n\n` : '';

  const imports = needsListNode ? 'from typing import List, Optional\n' : 'from typing import List\n';

  return `"""\n${problem.id}. ${problem.title}\nhttps://leetcode.com/problems/${problem.name}/\n\n${problem.description}\n\n${examples}\n\nConstraints:\n${constraints}${problem.followUp ? '\n\nFollow-up: ' + problem.followUp : ''}\n"""\n\n${listNodeDef}${imports}\nclass Solution:\n    def ${signature.name}(self, ${params}) -> ${signature.returnType}:\n        pass\n\n# For testing\nif __name__ == "__main__":\n    solution = Solution()\n    # Test your solution here`;
}

function generateJavaProblem(problem, signature) {
  const className = generateClassName(problem.name);
  const functionParams = signature.params.map(p => `${p.type} ${p.name}`).join(', ');

  const examples = problem.examples ? problem.examples.map((ex, i) =>
    ` * Example ${i + 1}:\n * Input: ${ex.input}\n * Output: ${ex.output}\n * Explanation: ${ex.explanation}`
  ).join('\n *\n') : '';

  const constraints = problem.constraints ? problem.constraints.map(c => ` * ${c}`).join('\n') : '';

  return `/**
 * ${problem.id}. ${problem.title}
 * https://leetcode.com/problems/${problem.name}/
 * 
 * ${problem.description}
 * 
${examples}
 * 
 * Constraints:
${constraints}
 */

public class ${className} {
    public ${signature.returnType} ${signature.name}(${functionParams}) {
        
    }
    
    public static void main(String[] args) {
        ${className} solution = new ${className}();
        // Test your solution here
    }
}`;
}

function generateCppProblem(problem, signature) {
  const functionParams = signature.params.map(p => `${p.type} ${p.name}`).join(', ');

  const examples = problem.examples ? problem.examples.map((ex, i) =>
    ` * Example ${i + 1}:\n * Input: ${ex.input}\n * Output: ${ex.output}\n * Explanation: ${ex.explanation}`
  ).join('\n *\n') : '';

  const constraints = problem.constraints ? problem.constraints.map(c => ` * ${c}`).join('\n') : '';

  return `/**
 * ${problem.id}. ${problem.title}
 * https://leetcode.com/problems/${problem.name}/
 * 
 * ${problem.description}
 * 
${examples}
 * 
 * Constraints:
${constraints}
 */

#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    ${signature.returnType} ${signature.name}(${functionParams}) {
        
    }
};

int main() {
    Solution solution;
    // Test your solution here
    return 0;
}`;
}

// Function to generate test content with actual test cases
function generateTestContent(problem, language, langConfig) {
  if (!problem.testCases || problem.testCases.length === 0) {
    // Fallback to empty template if no test cases
    return langConfig.testTemplate
      .replace(/\{\{title\}\}/g, problem.title)
      .replace(/\{\{ClassName\}\}/g, generateClassName(problem.name));
  }

  const functionName = generateFunctionName(problem.name, language);
  const className = generateClassName(problem.name);

  switch (language) {
    case 'javascript':
      return generateJavaScriptTests(problem, functionName);
    case 'python':
      return generatePythonTests(problem, functionName);
    case 'java':
      return generateJavaTests(problem, className);
    case 'cpp':
      return generateCppTests(problem, className);
    default:
      return generateJavaScriptTests(problem, functionName);
  }
}

function generateJavaScriptTests(problem, functionName) {
  const testCasesStr = problem.testCases.map((testCase, index) => {
    return `    {
        input: ${JSON.stringify(testCase.input)},
        expected: ${JSON.stringify(testCase.expected)}
    }`;
  }).join(',\n');

  return `// Test cases for ${problem.title}
// Run with: npm test or yarn test
const ${functionName} = require('./${problem.name}.js');

const testCases = [
${testCasesStr}
];

module.exports = testCases;`;
}

function generatePythonTests(problem, functionName) {
  const testCasesStr = problem.testCases.map((testCase, index) => {
    return `    {
        "input": ${JSON.stringify(testCase.input)},
        "expected": ${JSON.stringify(testCase.expected)}
    }`;
  }).join(',\n');

  return `# Test cases for ${problem.title}
# Run with: python3 ${problem.name}.test.py

test_cases = [
${testCasesStr}
]

if __name__ == "__main__":
    from ${problem.name.replace(/-/g, '_')} import ${functionName}
    
    passed = 0
    total = len(test_cases)
    
    print(f"🧪 Running tests for ${problem.title}...")
    print()
    
    for i, test_case in enumerate(test_cases):
        try:
            result = ${functionName}(*test_case["input"])
            expected = test_case["expected"]
            
            if result == expected:
                print(f"✅ Test {i + 1}: PASSED")
                print(f"   Input: {test_case['input']}")
                print(f"   Output: {result}")
                passed += 1
            else:
                print(f"❌ Test {i + 1}: FAILED")
                print(f"   Input: {test_case['input']}")
                print(f"   Expected: {expected}")
                print(f"   Got: {result}")
        except Exception as error:
            print(f"❌ Test {i + 1}: ERROR")
            print(f"   Input: {test_case['input']}")
            print(f"   Error: {error}")
        print()
    
    print(f"📊 Results: {passed}/{total} tests passed")
    if passed == total:
        print("🎉 All tests passed! Great job!")
    else:
        print("💪 Keep working on it!")`;
}

function generateJavaTests(problem, className) {
  const testCasesStr = problem.testCases.map((testCase, index) => {
    return `        // Test case ${index + 1}
        // Input: ${JSON.stringify(testCase.input)}
        // Expected: ${JSON.stringify(testCase.expected)}`;
  }).join('\n');

  return `// Test cases for ${problem.title}
// Compile and run with: javac ${className}Test.java && java ${className}Test

public class ${className}Test {
    public static void main(String[] args) {
        System.out.println("🧪 Running tests for ${problem.title}...");
        System.out.println();
        
        // TODO: Implement test cases
        // Test cases available:
${testCasesStr}
        
        System.out.println("💡 Implement the test runner to run these test cases!");
    }
}`;
}

function generateCppTests(problem, className) {
  const testCasesStr = problem.testCases.map((testCase, index) => {
    return `        // Test case ${index + 1}
        // Input: ${JSON.stringify(testCase.input)}
        // Expected: ${JSON.stringify(testCase.expected)}`;
  }).join('\n');

  return `// Test cases for ${problem.title}
// Compile and run with: g++ -o test ${problem.name}.test.cpp && ./test

#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "🧪 Running tests for ${problem.title}..." << endl;
    cout << endl;
    
    // TODO: Implement test cases
    // Test cases available:
${testCasesStr}
    
    cout << "💡 Implement the test runner to run these test cases!" << endl;
    return 0;
}`;
}

// Function to create problem files
function createProblemFiles(difficulty, problem) {
  const projectRoot = process.cwd();
  const language = getCurrentLanguage();
  const langConfig = getLanguageConfig(language);

  const dir = path.join(projectRoot, difficulty, problem.name);
  const problemFile = path.join(dir, `${problem.name}${langConfig.extension}`);
  const testFile = path.join(dir, `${problem.name}.test${getTestExtension(language)}`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Skip if files already exist
  if (fs.existsSync(problemFile)) {
    return false;
  }

  // Generate function name based on language
  const functionName = generateFunctionName(problem.name, language);
  const className = generateClassName(problem.name);

  // Create the main problem file with proper LeetCode formatting
  const problemContent = generateProblemContent(problem, language, langConfig);

  // Create test file with actual test cases
  const testContent = generateTestContent(problem, language, langConfig);

  try {
    fs.writeFileSync(problemFile, problemContent);
    fs.writeFileSync(testFile, testContent);
    return true;
  } catch (error) {
    console.error('Error creating files:', error);
    return false;
  }
}

// Helper functions
function getTestExtension(language) {
  switch (language) {
    case 'javascript': return '.js';
    case 'python': return '.py';
    case 'java': return '.java';
    case 'cpp': return '.cpp';
    default: return '.js';
  }
}

function generateFunctionName(problemName, language) {
  // Convert kebab-case to camelCase for JS/Java, snake_case for Python
  const words = problemName.split('-');

  if (language === 'python') {
    return words.join('_').toLowerCase();
  }

  // camelCase for JS, Java, C++
  return words[0].toLowerCase() + words.slice(1).map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('');
}

function generateClassName(problemName) {
  // Convert kebab-case to PascalCase
  const words = problemName.split('-');
  return words.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join('');
}

// Function to get existing problems (both active and completed)
function getExistingProblems() {
  const existing = { easy: [], medium: [], hard: [] };
  const projectRoot = process.cwd();

  ['easy', 'medium', 'hard'].forEach(difficulty => {
    // Check active problems
    const activePath = path.join(projectRoot, difficulty);
    if (fs.existsSync(activePath)) {
      const dirs = fs.readdirSync(activePath);
      dirs.forEach(dir => {
        const problemPath = path.join(activePath, dir);
        if (fs.statSync(problemPath).isDirectory() && dir !== 'completed') {
          existing[difficulty].push(dir);
        }
      });
    }

    // Check completed problems within difficulty folder
    const completedPath = path.join(projectRoot, difficulty, 'completed');
    if (fs.existsSync(completedPath)) {
      const dirs = fs.readdirSync(completedPath);
      dirs.forEach(dir => {
        const problemPath = path.join(completedPath, dir);
        if (fs.statSync(problemPath).isDirectory()) {
          // Add to existing list to avoid duplicates
          if (!existing[difficulty].includes(dir)) {
            existing[difficulty].push(dir);
          }
        }
      });
    }
  });

  return existing;
}

// Generate problems using dynamic system
async function generateDynamicProblems(difficulty, count) {
  const problems = [];

  for (let i = 0; i < count; i++) {
    try {
      const problem = await dynamicSystem.problemManager.getRandomProblem(difficulty, {
        language: getCurrentLanguage(),
        includeHints: false
      });

      // Check if problem already exists
      const existing = getExistingProblems();
      if (existing[difficulty].includes(problem.name)) {
        console.log(`⚠️  Problem already exists: ${problem.name}, trying another...`);
        i--; // Try again
        continue;
      }

      problems.push(problem);
    } catch (error) {
      throw new Error(`Failed to fetch problem ${i + 1}: ${error.message}`);
    }
  }

  return problems;
}

// Generate problems using static system (fallback)
function generateStaticProblems(difficulty, count) {
  const existing = getExistingProblems();
  const availableProblems = PROBLEMS[difficulty].filter(p =>
    !existing[difficulty].includes(p.name)
  );

  if (availableProblems.length === 0) {
    console.log(`🎉 Wow! You've completed all available ${difficulty} problems!`);
    console.log('💪 Time to move to the next difficulty level!');
    return [];
  }

  // Randomly select problems
  const selectedProblems = [];
  const actualCount = Math.min(count, availableProblems.length);

  for (let i = 0; i < actualCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableProblems.length);
    const problem = availableProblems.splice(randomIndex, 1)[0];
    selectedProblems.push(problem);
  }

  return selectedProblems;
}

// Create problem files (enhanced for dynamic problems)
function createProblemFiles(difficulty, problem) {
  const language = getCurrentLanguage();
  const langConfig = getLanguageConfig(language);

  // Create directory
  const problemDir = path.join(difficulty, problem.name);
  if (!fs.existsSync(problemDir)) {
    fs.mkdirSync(problemDir, { recursive: true });
  }

  // Create problem file
  const problemContent = generateProblemContent(problem, language, langConfig);
  const problemFile = path.join(problemDir, `${problem.name}${langConfig.extension}`);

  if (!fs.existsSync(problemFile)) {
    fs.writeFileSync(problemFile, problemContent);
  }

  // Create test file
  const testContent = generateTestContent(problem, language, langConfig);
  const testFile = path.join(problemDir, `${problem.name}.test${langConfig.extension}`);

  if (!fs.existsSync(testFile)) {
    fs.writeFileSync(testFile, testContent);
  }

  return !fs.existsSync(problemFile);
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const input = args.join(' ').toLowerCase();

  // Parse the request
  let difficulty = null;
  let count = 1;
  let specificProblem = null;

  if (input.includes('easy')) difficulty = 'easy';
  else if (input.includes('medium')) difficulty = 'medium';
  else if (input.includes('hard')) difficulty = 'hard';

  // Extract number if specified
  const numberMatch = input.match(/(\d+)/);
  if (numberMatch) {
    count = parseInt(numberMatch[1]);
  }

  // Check if user specified a specific problem name
  const problemNameMatch = input.match(/([a-z-]+(?:-[a-z]+)*)/);
  if (problemNameMatch && !['easy', 'medium', 'hard'].includes(problemNameMatch[1])) {
    specificProblem = problemNameMatch[1];
    // Try to infer difficulty from dynamic system if available
    if (dynamicSystem && !difficulty) {
      try {
        const problem = await dynamicSystem.problemManager.getProblem(specificProblem);
        difficulty = problem.difficulty;
      } catch (error) {
        // Will handle error later
      }
    }
  }

  if (!difficulty && !specificProblem) {
    console.log('🎯 LeetCode Challenge Generator');
    console.log('');
    console.log('💡 Usage:');
    console.log('  yarn challenge easy          # Get 1 easy problem');
    console.log('  yarn challenge medium 2      # Get 2 medium problems');
    console.log('  yarn challenge hard          # Get 1 hard problem');
    console.log('  yarn challenge 3 easy        # Get 3 easy problems');
    console.log('');

    const existing = getExistingProblems();
    const projectRoot = process.cwd();

    console.log('📊 Current Progress:');

    ['easy', 'medium', 'hard'].forEach(difficulty => {
      const activePath = path.join(projectRoot, difficulty);
      const completedPath = path.join(projectRoot, difficulty, 'completed');

      let activeCount = 0;
      let completedCount = 0;

      if (fs.existsSync(activePath)) {
        activeCount = fs.readdirSync(activePath).filter(item => {
          const itemPath = path.join(activePath, item);
          return fs.statSync(itemPath).isDirectory() && item !== 'completed';
        }).length;
      }

      if (fs.existsSync(completedPath)) {
        completedCount = fs.readdirSync(completedPath).filter(item =>
          fs.statSync(path.join(completedPath, item)).isDirectory()
        ).length;
      }

      const total = activeCount + completedCount;
      console.log(`  ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}: ${total} total (${activeCount} active, ${completedCount} completed)`);
    });
    return;
  }

  // Try dynamic system first, fallback to static
  let selectedProblems = [];

  if (dynamicSystem) {
    try {
      selectedProblems = await generateDynamicProblems(difficulty, count);
    } catch (error) {
      console.log(`⚠️  Dynamic system failed: ${error.message}`);
      console.log('🔄 Falling back to static problem database...');
      selectedProblems = generateStaticProblems(difficulty, count);
    }
  } else {
    selectedProblems = generateStaticProblems(difficulty, count);
  }

  if (selectedProblems.length === 0) {
    console.log(`❌ No problems could be generated. Please try again.`);
    return;
  }

  console.log(`🎯 Generated ${selectedProblems.length} ${difficulty} challenge${selectedProblems.length > 1 ? 's' : ''}:`);
  console.log('');

  selectedProblems.forEach((problem, index) => {
    const created = createProblemFiles(difficulty, problem);
    const status = created ? '✨ NEW' : '📁 EXISTS';

    // Show absolute path for new challenges
    const projectRoot = process.cwd();
    const language = getCurrentLanguage();
    const langConfig = getLanguageConfig(language);
    const problemDir = path.join(projectRoot, difficulty, problem.name);
    const problemFile = path.join(problemDir, `${problem.name}${langConfig.extension}`);

    // Truncate description for display
    const description = problem.description.length > 100
      ? problem.description.substring(0, 100) + '...'
      : problem.description;

    console.log(`${index + 1}. ${status} ${problem.title}`);
    console.log(`   📝 ${description}`);
    console.log(`   🏷️  ${problem.topics.join(', ')}`);
    console.log(`   🏢 ${problem.companies.slice(0, 3).join(', ')}`);
    if (created) {
      console.log(`   📁 Path: ${problemFile}`);
    }
    console.log(`   🧪 Test: yarn test ${difficulty}/${problem.name}`);
    console.log(`   🔗 Open: yarn open ${difficulty}/${problem.name}`);

    // Show source information
    if (dynamicSystem && problem.metadata) {
      const sourceIcon = problem.metadata.source === 'cache' ? '📱' : '🌐';
      const sourceText = problem.metadata.source === 'cache' ? 'Cache' : 'LeetCode';
      console.log(`   ${sourceIcon} Source: ${sourceText}`);
    }
    console.log('');
  });

  console.log('🚀 Happy coding! Remember:');
  console.log('  1. Understand the problem first');
  console.log('  2. Think about edge cases');
  console.log('  3. Start with brute force, then optimize');
  console.log('  4. Test locally before submitting');

  // Ensure script exits properly
  process.exit(0);
}

main().catch(error => {
  console.error(`❌ Challenge generation failed: ${error.message}`);
  process.exit(1);
});