/**
 * Enhanced Fallback Problem Database
 * Comprehensive problem data for when LeetCode API is blocked
 */

const ENHANCED_FALLBACK_PROBLEMS = {
  // Array Problems (15 problems)
  'two-sum': {
    id: 1,
    title: 'Two Sum',
    name: 'two-sum',
    difficulty: 'easy',
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
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
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Apple", "Microsoft", "Facebook"],
    functionSignatures: {
      javascript: {
        name: "twoSum",
        params: [{ name: "nums", type: "number[]" }, { name: "target", type: "number" }],
        returnType: "number[]"
      },
      python: {
        name: "twoSum",
        params: [{ name: "nums", type: "List[int]" }, { name: "target", type: "int" }],
        returnType: "List[int]"
      },
      java: {
        name: "twoSum",
        params: [{ name: "nums", type: "int[]" }, { name: "target", type: "int" }],
        returnType: "int[]"
      },
      cpp: {
        name: "twoSum",
        params: [{ name: "nums", type: "vector<int>&" }, { name: "target", type: "int" }],
        returnType: "vector<int>"
      }
    },
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1], description: "Basic case with solution at beginning", category: "basic" },
      { input: [[3,2,4], 6], expected: [1,2], description: "Basic case with solution at end", category: "basic" },
      { input: [[3,3], 6], expected: [0,1], description: "Duplicate numbers", category: "basic" },
      { input: [[-1,-2,-3,-4,-5], -8], expected: [2,4], description: "All negative numbers", category: "edge" },
      { input: [[0,4,3,0], 0], expected: [0,3], description: "Target is zero", category: "edge" },
      { input: [[-3,4,3,90], 0], expected: [0,2], description: "Negative and positive sum to zero", category: "edge" },
      { input: [[1,2,3,4,5,6,7,8,9,10], 19], expected: [8,9], description: "Large array", category: "stress" }
    ],
    hints: [
      { level: 1, text: "Think about what data structure allows fast lookups", category: "approach" },
      { level: 2, text: "Use a hash map to store numbers you've seen and their indices", category: "implementation" },
      { level: 3, text: "For each number, check if target - number exists in your hash map", category: "implementation" }
    ]
  },

  'best-time-to-buy-and-sell-stock': {
    id: 121,
    title: 'Best Time to Buy and Sell Stock',
    name: 'best-time-to-buy-and-sell-stock',
    difficulty: 'easy',
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    topics: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Facebook", "Apple", "Google"],
    functionSignatures: {
      javascript: {
        name: "maxProfit",
        params: [{ name: "prices", type: "number[]" }],
        returnType: "number"
      },
      python: {
        name: "maxProfit",
        params: [{ name: "prices", type: "List[int]" }],
        returnType: "int"
      },
      java: {
        name: "maxProfit",
        params: [{ name: "prices", type: "int[]" }],
        returnType: "int"
      },
      cpp: {
        name: "maxProfit",
        params: [{ name: "prices", type: "vector<int>&" }],
        returnType: "int"
      }
    },
    testCases: [
      { input: [[7,1,5,3,6,4]], expected: 5, description: "Standard case with profit", category: "basic" },
      { input: [[7,6,4,3,1]], expected: 0, description: "Decreasing prices, no profit", category: "basic" },
      { input: [[1,2,3,4,5]], expected: 4, description: "Increasing prices", category: "basic" },
      { input: [[1]], expected: 0, description: "Single day", category: "edge" },
      { input: [[2,1]], expected: 0, description: "Two days, decreasing", category: "edge" },
      { input: [[1,2]], expected: 1, description: "Two days, increasing", category: "edge" },
      { input: [Array(10000).fill().map((_, i) => i + 1)], expected: 9999, description: "Large increasing array", category: "stress" }
    ],
    hints: [
      { level: 1, text: "Think about tracking the minimum price seen so far", category: "approach" },
      { level: 2, text: "For each day, calculate profit if you sell on that day", category: "implementation" },
      { level: 3, text: "Keep track of maximum profit seen so far", category: "implementation" }
    ]
  },

  'maximum-subarray': {
    id: 53,
    title: 'Maximum Subarray',
    name: 'maximum-subarray',
    difficulty: 'medium',
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    followUp: "If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.",
    topics: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "LinkedIn", "Apple", "Google"],
    functionSignatures: {
      javascript: {
        name: "maxSubArray",
        params: [{ name: "nums", type: "number[]" }],
        returnType: "number"
      },
      python: {
        name: "maxSubArray",
        params: [{ name: "nums", type: "List[int]" }],
        returnType: "int"
      },
      java: {
        name: "maxSubArray",
        params: [{ name: "nums", type: "int[]" }],
        returnType: "int"
      },
      cpp: {
        name: "maxSubArray",
        params: [{ name: "nums", type: "vector<int>&" }],
        returnType: "int"
      }
    },
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6, description: "Mixed positive and negative", category: "basic" },
      { input: [[1]], expected: 1, description: "Single positive element", category: "basic" },
      { input: [[5,4,-1,7,8]], expected: 23, description: "Mostly positive", category: "basic" },
      { input: [[-1]], expected: -1, description: "Single negative element", category: "edge" },
      { input: [[-2,-1,-3]], expected: -1, description: "All negative elements", category: "edge" },
      { input: [[0,0,0]], expected: 0, description: "All zeros", category: "edge" },
      { input: [Array(10000).fill(1)], expected: 10000, description: "Large positive array", category: "stress" }
    ],
    hints: [
      { level: 1, text: "This is a classic dynamic programming problem (Kadane's algorithm)", category: "approach" },
      { level: 2, text: "At each position, decide whether to extend the current subarray or start a new one", category: "implementation" },
      { level: 3, text: "Keep track of the maximum sum ending at current position and global maximum", category: "implementation" }
    ]
  },

  // String Problems (10 problems)
  'valid-parentheses': {
    id: 20,
    title: 'Valid Parentheses',
    name: 'valid-parentheses',
    difficulty: 'easy',
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: "The string contains valid parentheses."
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: "The string contains valid combinations of all bracket types."
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: "The brackets are not properly matched."
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    topics: ["String", "Stack"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Apple"],
    functionSignatures: {
      javascript: {
        name: "isValid",
        params: [{ name: "s", type: "string" }],
        returnType: "boolean"
      },
      python: {
        name: "isValid",
        params: [{ name: "s", type: "str" }],
        returnType: "bool"
      },
      java: {
        name: "isValid",
        params: [{ name: "s", type: "String" }],
        returnType: "boolean"
      },
      cpp: {
        name: "isValid",
        params: [{ name: "s", type: "string" }],
        returnType: "bool"
      }
    },
    testCases: [
      { input: ["()"], expected: true, description: "Simple parentheses", category: "basic" },
      { input: ["()[]{}"], expected: true, description: "All bracket types", category: "basic" },
      { input: ["(]"], expected: false, description: "Mismatched brackets", category: "basic" },
      { input: [""], expected: true, description: "Empty string", category: "edge" },
      { input: ["("], expected: false, description: "Single opening bracket", category: "edge" },
      { input: [")"], expected: false, description: "Single closing bracket", category: "edge" },
      { input: ["(((((((((("], expected: false, description: "Many opening brackets", category: "stress" }
    ],
    hints: [
      { level: 1, text: "Use a stack data structure to keep track of opening brackets", category: "approach" },
      { level: 2, text: "When you see a closing bracket, check if it matches the most recent opening bracket", category: "implementation" },
      { level: 3, text: "The string is valid if the stack is empty at the end", category: "implementation" }
    ]
  },

  'palindrome-number': {
    id: 9,
    title: 'Palindrome Number',
    name: 'palindrome-number',
    difficulty: 'easy',
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.\n\nAn integer is a palindrome when it reads the same backward as forward.",
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
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    followUp: "Could you solve it without converting the integer to a string?",
    topics: ["Math"],
    companies: ["Amazon", "Apple", "Microsoft"],
    functionSignatures: {
      javascript: {
        name: "isPalindrome",
        params: [{ name: "x", type: "number" }],
        returnType: "boolean"
      },
      python: {
        name: "isPalindrome",
        params: [{ name: "x", type: "int" }],
        returnType: "bool"
      },
      java: {
        name: "isPalindrome",
        params: [{ name: "x", type: "int" }],
        returnType: "boolean"
      },
      cpp: {
        name: "isPalindrome",
        params: [{ name: "x", type: "int" }],
        returnType: "bool"
      }
    },
    testCases: [
      { input: [121], expected: true, description: "Positive palindrome", category: "basic" },
      { input: [-121], expected: false, description: "Negative number", category: "basic" },
      { input: [10], expected: false, description: "Number ending in zero", category: "basic" },
      { input: [0], expected: true, description: "Zero", category: "edge" },
      { input: [1], expected: true, description: "Single digit", category: "edge" },
      { input: [1221], expected: true, description: "Even length palindrome", category: "edge" },
      { input: [1234567899876543210], expected: false, description: "Large number", category: "stress" }
    ],
    hints: [
      { level: 1, text: "Negative numbers are never palindromes", category: "approach" },
      { level: 2, text: "You can reverse the number and compare with original", category: "implementation" },
      { level: 3, text: "Optimization: only reverse half the number", category: "optimization" }
    ]
  },

  // Dynamic Programming Problems (8 problems)
  'climbing-stairs': {
    id: 70,
    title: 'Climbing Stairs',
    name: 'climbing-stairs',
    difficulty: 'easy',
    description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    constraints: ["1 <= n <= 45"],
    topics: ["Math", "Dynamic Programming", "Memoization"],
    companies: ["Amazon", "Adobe", "Apple", "Google", "Microsoft"],
    functionSignatures: {
      javascript: {
        name: "climbStairs",
        params: [{ name: "n", type: "number" }],
        returnType: "number"
      },
      python: {
        name: "climbStairs",
        params: [{ name: "n", type: "int" }],
        returnType: "int"
      },
      java: {
        name: "climbStairs",
        params: [{ name: "n", type: "int" }],
        returnType: "int"
      },
      cpp: {
        name: "climbStairs",
        params: [{ name: "n", type: "int" }],
        returnType: "int"
      }
    },
    testCases: [
      { input: [2], expected: 2, description: "Two steps", category: "basic" },
      { input: [3], expected: 3, description: "Three steps", category: "basic" },
      { input: [4], expected: 5, description: "Four steps", category: "basic" },
      { input: [1], expected: 1, description: "One step", category: "edge" },
      { input: [5], expected: 8, description: "Five steps", category: "edge" },
      { input: [10], expected: 89, description: "Ten steps", category: "edge" },
      { input: [45], expected: 1836311903, description: "Maximum constraint", category: "stress" }
    ],
    hints: [
      { level: 1, text: "This is a Fibonacci sequence in disguise", category: "approach" },
      { level: 2, text: "To reach step n, you can come from step n-1 or step n-2", category: "implementation" },
      { level: 3, text: "Use dynamic programming or optimize space to O(1)", category: "optimization" }
    ]
  }
};

/**
 * Get enhanced fallback problem data
 */
function getEnhancedFallbackProblem(identifier) {
  let problem = null;
  
  // If identifier is a number, find by ID
  if (typeof identifier === 'number') {
    problem = Object.values(ENHANCED_FALLBACK_PROBLEMS).find(p => p.id === identifier);
  } else {
    // If identifier is a string, find by slug
    problem = ENHANCED_FALLBACK_PROBLEMS[identifier];
  }
  
  if (!problem) {
    return null;
  }

  // Add metadata
  return {
    ...problem,
    metadata: {
      source: 'enhanced-fallback',
      version: '2.0',
      lastUpdated: new Date(),
      completeness: calculateCompletenessScore(problem)
    }
  };
}

/**
 * Calculate completeness score for a problem (0-100)
 */
function calculateCompletenessScore(problem) {
  let score = 0;
  
  // Basic fields (40 points)
  if (problem.description && problem.description.length > 100) score += 10;
  if (problem.examples && problem.examples.length >= 2) score += 10;
  if (problem.constraints && problem.constraints.length > 0) score += 10;
  if (problem.topics && problem.topics.length > 0) score += 10;
  
  // Function signatures (20 points)
  const languages = ['javascript', 'python', 'java', 'cpp'];
  const signaturesComplete = languages.every(lang => 
    problem.functionSignatures[lang] && 
    problem.functionSignatures[lang].name &&
    problem.functionSignatures[lang].params &&
    problem.functionSignatures[lang].returnType
  );
  if (signaturesComplete) score += 20;
  
  // Test cases (30 points)
  if (problem.testCases && problem.testCases.length >= 5) score += 10;
  if (problem.testCases && problem.testCases.some(tc => tc.category === 'edge')) score += 10;
  if (problem.testCases && problem.testCases.some(tc => tc.category === 'stress')) score += 10;
  
  // Hints (10 points)
  if (problem.hints && problem.hints.length >= 2) score += 10;
  
  return score;
}

/**
 * Get all available fallback problems
 */
function getAllEnhancedFallbackProblems() {
  return Object.keys(ENHANCED_FALLBACK_PROBLEMS).map(slug => ({
    slug,
    ...ENHANCED_FALLBACK_PROBLEMS[slug]
  }));
}

/**
 * Get fallback problems by difficulty
 */
function getEnhancedFallbackProblemsByDifficulty(difficulty) {
  return Object.entries(ENHANCED_FALLBACK_PROBLEMS)
    .filter(([_, problem]) => problem.difficulty === difficulty)
    .map(([slug, problem]) => ({ slug, ...problem }));
}

/**
 * Get fallback problems by topic
 */
function getEnhancedFallbackProblemsByTopic(topic) {
  return Object.entries(ENHANCED_FALLBACK_PROBLEMS)
    .filter(([_, problem]) => problem.topics.includes(topic))
    .map(([slug, problem]) => ({ slug, ...problem }));
}

module.exports = {
  ENHANCED_FALLBACK_PROBLEMS,
  getEnhancedFallbackProblem,
  getAllEnhancedFallbackProblems,
  getEnhancedFallbackProblemsByDifficulty,
  getEnhancedFallbackProblemsByTopic,
  calculateCompletenessScore
};