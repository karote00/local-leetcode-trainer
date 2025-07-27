/**
 * AI Learning Assistant for progressive hints and guidance
 */

const { AILearningAssistant } = require('./interfaces');

class AILearningAssistantImpl extends AILearningAssistant {
  constructor() {
    super();
    this.hintDatabase = this.initializeHintDatabase();
  }

  /**
   * Initialize hint database with problem-specific hints
   */
  initializeHintDatabase() {
    return {
      'two-sum': {
        hints: [
          {
            level: 1,
            text: "Think about what you need to find: two numbers that add up to the target. What's the most straightforward approach?",
            category: "understanding"
          },
          {
            level: 2,
            text: "A brute force approach would check every pair of numbers. Can you implement this with nested loops?",
            category: "approach"
          },
          {
            level: 3,
            text: "The brute force works but is O(n²). For each number, you're looking for target - current_number. What data structure helps with fast lookups?",
            category: "optimization"
          },
          {
            level: 4,
            text: "A hash map can store numbers you've seen and their indices. As you iterate, check if (target - current_number) exists in the map.",
            category: "implementation"
          },
          {
            level: 5,
            text: "Here's the pattern: for each number, check if its complement exists in the hash map. If yes, return indices. If no, add current number to map.",
            category: "solution"
          }
        ],
        approaches: [
          {
            name: "brute-force",
            description: "Check every pair of numbers",
            timeComplexity: "O(n²)",
            spaceComplexity: "O(1)",
            steps: [
              "Use nested loops to check all pairs",
              "For each pair (i, j), check if nums[i] + nums[j] == target",
              "Return [i, j] when found"
            ]
          },
          {
            name: "hash-map",
            description: "Use hash map for O(1) lookups",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            steps: [
              "Create a hash map to store number -> index",
              "For each number, calculate complement = target - number",
              "If complement exists in map, return [map[complement], current_index]",
              "Otherwise, add current number to map"
            ]
          }
        ]
      },
      'valid-parentheses': {
        hints: [
          {
            level: 1,
            text: "Think about the order of brackets. What needs to happen for brackets to be valid?",
            category: "understanding"
          },
          {
            level: 2,
            text: "Each opening bracket must have a corresponding closing bracket in the correct order. What data structure follows Last-In-First-Out?",
            category: "approach"
          },
          {
            level: 3,
            text: "A stack is perfect here. Push opening brackets onto the stack, and when you see a closing bracket, check if it matches the top of the stack.",
            category: "implementation"
          },
          {
            level: 4,
            text: "Create a mapping of closing to opening brackets: ')' -> '(', '}' -> '{', ']' -> '['. This makes matching easier.",
            category: "implementation"
          },
          {
            level: 5,
            text: "Algorithm: Push opening brackets to stack. For closing brackets, check if stack is empty or top doesn't match. At the end, stack should be empty.",
            category: "solution"
          }
        ],
        approaches: [
          {
            name: "stack",
            description: "Use stack to track opening brackets",
            timeComplexity: "O(n)",
            spaceComplexity: "O(n)",
            steps: [
              "Create a stack and a mapping of closing to opening brackets",
              "Iterate through each character",
              "If opening bracket, push to stack",
              "If closing bracket, check if it matches stack top",
              "Return true if stack is empty at the end"
            ]
          }
        ]
      },
      'palindrome-number': {
        hints: [
          {
            level: 1,
            text: "A palindrome reads the same forwards and backwards. What's the simplest way to check this?",
            category: "understanding"
          },
          {
            level: 2,
            text: "You could convert to string and compare with its reverse. But the follow-up asks to do it without string conversion.",
            category: "approach"
          },
          {
            level: 3,
            text: "Think about reversing the number mathematically. You can extract digits using modulo (%) and build the reverse.",
            category: "implementation"
          },
          {
            level: 4,
            text: "Optimization: You only need to reverse half the number. When the remaining number ≤ reversed part, you've reached the middle.",
            category: "optimization"
          },
          {
            level: 5,
            text: "Handle edge cases: negative numbers are not palindromes, numbers ending in 0 (except 0 itself) are not palindromes.",
            category: "solution"
          }
        ]
      }
    };
  }

  /**
   * Generate contextual hint based on problem and user progress
   */
  async generateHint(problem, userCode, hintLevel) {
    try {
      const problemHints = this.hintDatabase[problem.name];
      
      if (!problemHints) {
        return this.generateGenericHint(problem, hintLevel);
      }

      // Get hint for the requested level
      const hint = problemHints.hints.find(h => h.level === hintLevel);
      if (hint) {
        return this.formatHint(hint, hintLevel, problemHints.hints.length);
      }

      // If specific level not found, get closest
      const availableHints = problemHints.hints.filter(h => h.level <= hintLevel);
      if (availableHints.length > 0) {
        const closestHint = availableHints[availableHints.length - 1];
        return this.formatHint(closestHint, hintLevel, problemHints.hints.length);
      }

      return this.generateGenericHint(problem, hintLevel);
    } catch (error) {
      throw new Error(`Failed to generate hint: ${error.message}`);
    }
  }

  /**
   * Format hint with level information
   */
  formatHint(hint, requestedLevel, totalHints) {
    const levelEmojis = ['💡', '🔍', '⚡', '🎯', '🚀'];
    const emoji = levelEmojis[Math.min(hint.level - 1, levelEmojis.length - 1)];
    
    return {
      level: hint.level,
      requestedLevel: requestedLevel,
      totalLevels: totalHints,
      category: hint.category,
      text: hint.text,
      emoji: emoji,
      formatted: `${emoji} **Hint ${hint.level}/${totalHints}** (${hint.category})\n\n${hint.text}`,
      hasMore: hint.level < totalHints
    };
  }

  /**
   * Generate generic hint based on problem topics
   */
  generateGenericHint(problem, hintLevel) {
    const topicHints = {
      'Array': [
        'Consider using two pointers or sliding window technique',
        'Think about sorting the array first',
        'Hash maps can provide O(1) lookups for array problems',
        'Consider the constraints - can you use the array indices?'
      ],
      'Hash Table': [
        'Hash maps provide O(1) average lookup time',
        'Consider what you need to store and what you need to look up',
        'Think about using the hash map to avoid nested loops'
      ],
      'Two Pointers': [
        'Use two pointers moving towards each other or in the same direction',
        'Consider when to move which pointer',
        'This technique often reduces time complexity from O(n²) to O(n)'
      ],
      'Dynamic Programming': [
        'Break the problem into smaller subproblems',
        'Think about what information you need to store',
        'Consider both top-down (memoization) and bottom-up approaches'
      ],
      'Binary Search': [
        'The array or search space must be sorted',
        'Think about what condition you\'re searching for',
        'Consider the invariants: what\'s true about left and right boundaries?'
      ]
    };

    // Find relevant hints based on problem topics
    const relevantHints = [];
    for (const topic of problem.topics || []) {
      if (topicHints[topic]) {
        relevantHints.push(...topicHints[topic]);
      }
    }

    if (relevantHints.length === 0) {
      relevantHints.push(
        'Start with a brute force solution, then think about optimizations',
        'Consider the time and space complexity of your approach',
        'Think about edge cases and constraints'
      );
    }

    const hintIndex = Math.min(hintLevel - 1, relevantHints.length - 1);
    const hintText = relevantHints[hintIndex];

    return {
      level: hintLevel,
      requestedLevel: hintLevel,
      totalLevels: relevantHints.length,
      category: 'general',
      text: hintText,
      emoji: '💡',
      formatted: `💡 **Hint ${hintLevel}** (${problem.topics.join(', ')})\n\n${hintText}`,
      hasMore: hintLevel < relevantHints.length,
      isGeneric: true
    };
  }

  /**
   * Explain solution approach
   */
  async explainApproach(problem, approach) {
    try {
      const problemData = this.hintDatabase[problem.name];
      
      if (!problemData || !problemData.approaches) {
        return this.generateGenericApproach(problem, approach);
      }

      const approachData = problemData.approaches.find(a => a.name === approach);
      if (!approachData) {
        return this.generateGenericApproach(problem, approach);
      }

      return {
        name: approachData.name,
        description: approachData.description,
        timeComplexity: approachData.timeComplexity,
        spaceComplexity: approachData.spaceComplexity,
        steps: approachData.steps,
        formatted: this.formatApproachExplanation(approachData)
      };
    } catch (error) {
      throw new Error(`Failed to explain approach: ${error.message}`);
    }
  }

  /**
   * Format approach explanation
   */
  formatApproachExplanation(approach) {
    const steps = approach.steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
    
    return `🎯 **${approach.name.charAt(0).toUpperCase() + approach.name.slice(1)} Approach**

📝 **Description:** ${approach.description}

⏱️ **Time Complexity:** ${approach.timeComplexity}
💾 **Space Complexity:** ${approach.spaceComplexity}

📋 **Steps:**
${steps}`;
  }

  /**
   * Generate generic approach explanation
   */
  generateGenericApproach(problem, approach) {
    const genericApproaches = {
      'brute-force': {
        description: 'Try all possible solutions systematically',
        timeComplexity: 'Usually O(n²) or higher',
        spaceComplexity: 'Usually O(1)',
        steps: [
          'Identify all possible combinations or permutations',
          'Check each one to see if it satisfies the conditions',
          'Return the first valid solution found'
        ]
      },
      'optimized': {
        description: 'Use efficient algorithms and data structures',
        timeComplexity: 'Depends on the optimization technique',
        spaceComplexity: 'May trade space for time efficiency',
        steps: [
          'Identify the bottleneck in the brute force approach',
          'Choose appropriate data structures (hash map, heap, etc.)',
          'Implement the optimized algorithm',
          'Verify the solution handles edge cases'
        ]
      }
    };

    const approachData = genericApproaches[approach] || genericApproaches['optimized'];
    
    return {
      name: approach,
      description: approachData.description,
      timeComplexity: approachData.timeComplexity,
      spaceComplexity: approachData.spaceComplexity,
      steps: approachData.steps,
      formatted: this.formatApproachExplanation({
        name: approach,
        ...approachData
      }),
      isGeneric: true
    };
  }

  /**
   * Provide complete solution with explanation
   */
  async provideSolution(problem, withExplanation = true) {
    try {
      const solution = this.getSolutionForProblem(problem);
      
      if (!solution) {
        return this.generateGenericSolution(problem, withExplanation);
      }

      return {
        problem: problem.name,
        title: problem.title,
        solution: solution,
        explanation: withExplanation ? this.generateSolutionExplanation(problem, solution) : null,
        formatted: this.formatSolution(problem, solution, withExplanation)
      };
    } catch (error) {
      throw new Error(`Failed to provide solution: ${error.message}`);
    }
  }

  /**
   * Get solution for specific problem
   */
  getSolutionForProblem(problem) {
    const solutions = {
      'two-sum': {
        javascript: `var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};`,
        python: `def twoSum(self, nums: List[int], target: int) -> List[int]:
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`
      },
      'valid-parentheses': {
        javascript: `var isValid = function(s) {
    const stack = [];
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
};`,
        python: `def isValid(self, s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0`
      }
    };

    return solutions[problem.name];
  }

  /**
   * Generate solution explanation
   */
  generateSolutionExplanation(problem, solution) {
    const explanations = {
      'two-sum': `This solution uses a hash map to achieve O(n) time complexity:

1. **Hash Map Approach**: We iterate through the array once, and for each number, we check if its complement (target - current number) exists in our hash map.

2. **Key Insight**: Instead of checking all pairs (O(n²)), we store each number and its index as we go, allowing O(1) lookups.

3. **Algorithm**:
   - For each number, calculate complement = target - current_number
   - If complement exists in map, we found our pair
   - Otherwise, store current number and its index in the map

4. **Why it works**: By the time we find a complement in the map, we've already seen the first number of the pair, so we can return both indices.`,

      'valid-parentheses': `This solution uses a stack to track opening brackets:

1. **Stack Approach**: Stacks are perfect for problems involving matching pairs because of their LIFO (Last In, First Out) nature.

2. **Key Insight**: Every closing bracket must match the most recent unmatched opening bracket.

3. **Algorithm**:
   - Push opening brackets onto the stack
   - For closing brackets, check if they match the top of the stack
   - If they match, pop the stack; if not, return false
   - At the end, the stack should be empty

4. **Why it works**: The stack naturally handles nested brackets and ensures proper ordering.`
    };

    return explanations[problem.name] || 'Solution explanation not available for this problem.';
  }

  /**
   * Format complete solution
   */
  formatSolution(problem, solution, withExplanation) {
    const language = problem.currentLanguage || 'javascript';
    const code = solution[language] || solution.javascript || 'Solution not available';
    
    let formatted = `🚀 **Complete Solution: ${problem.title}**\n\n`;
    formatted += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
    
    if (withExplanation) {
      const explanation = this.generateSolutionExplanation(problem, solution);
      formatted += `📚 **Explanation:**\n\n${explanation}\n\n`;
    }
    
    formatted += `⏱️ **Time Complexity:** O(n)\n`;
    formatted += `💾 **Space Complexity:** O(n)\n\n`;
    formatted += `💡 **Next Steps:**\n`;
    formatted += `- Try implementing this solution yourself\n`;
    formatted += `- Consider edge cases and test them\n`;
    formatted += `- Think about alternative approaches\n`;
    formatted += `- Practice similar problems to reinforce the pattern`;
    
    return formatted;
  }

  /**
   * Generate generic solution
   */
  generateGenericSolution(problem, withExplanation) {
    return {
      problem: problem.name,
      title: problem.title,
      solution: null,
      explanation: withExplanation ? 'Solution not available for this problem. Try working through it step by step using the hints!' : null,
      formatted: `🚀 **Solution: ${problem.title}**\n\nSolution not available for this problem.\n\n💡 **Suggestions:**\n- Use \`lct hint ${problem.name}\` for progressive hints\n- Break down the problem into smaller steps\n- Start with a brute force approach\n- Consider the time and space complexity`,
      isGeneric: true
    };
  }
}

module.exports = { AILearningAssistantImpl };