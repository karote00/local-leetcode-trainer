const fs = require('fs');
const path = require('path');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

// Algorithm patterns and hints database
const ALGORITHM_PATTERNS = {
  'two-sum': {
    category: 'Hash Table',
    difficulty: 'Easy',
    patterns: ['Two Pointers', 'Hash Map'],
    hints: [
      "🤔 Think about what you need to find for each number",
      "💡 Can you store what you've seen before?",
      "⚡ Hash maps provide O(1) lookup time",
      "🎯 For each number, calculate: target - current_number"
    ],
    problemAnalysis: {
      coreQuestion: "We need to find TWO numbers that add up to a target. The key insight is: for each number, we know exactly what its partner should be (target - current_number).",
      keyConstraints: [
        "Each input has exactly one solution - no need to handle multiple answers",
        "Can't use the same element twice - need to track indices",
        "Return indices, not the actual numbers",
        "Array is unsorted - can't use two pointers easily"
      ],
      patternRecognition: [
        "This is a 'find complement' problem - for each element, we know what we're looking for",
        "When you need to find pairs that satisfy a condition, think hash maps",
        "When you need O(1) lookup of 'have I seen this before?', think hash maps",
        "The constraint 'exactly one solution' simplifies our logic"
      ]
    },
    thinkingProcess: [
      "What am I looking for? Two numbers that sum to target",
      "For each number X, I need to find (target - X)",
      "How can I quickly check if I've seen (target - X) before?",
      "Hash map gives me O(1) lookup - perfect for 'have I seen this?' questions",
      "I need indices, so I'll store number → index mapping"
    ],
    approaches: [
      {
        name: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        whenToUse: "When space is extremely limited or array is very small",
        tradeoffs: "Simple to understand but doesn't scale - becomes slow with large arrays",
        description: "Check every pair of numbers"
      },
      {
        name: "Hash Map",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        whenToUse: "When you need optimal time complexity and space isn't a constraint",
        tradeoffs: "Uses extra space but dramatically faster - this is usually the preferred solution",
        description: "Store complements in hash map for O(1) lookup"
      }
    ],
    patternSignals: [
      "Problem asks to find pairs/combinations that satisfy a condition",
      "You need to check 'have I seen this complement before?'",
      "Problem involves finding elements that add up to a target",
      "You need O(1) lookup time for previously seen elements"
    ],
    keyInsights: [
      "Transform 'find two numbers' into 'for each number, find its complement'",
      "Hash maps excel at 'membership testing' - use them when you need to check if something exists",
      "Sometimes trading space for time complexity is worth it",
      "The complement pattern: if you know the sum and one number, you know the other"
    ],
    commonMistakes: [
      "Forgetting to check if complement exists before adding current number to hash map",
      "Using the same element twice (not handling indices correctly)",
      "Not considering that the complement might be the same as current number",
      "Overcomplicating with sorting when hash map is simpler"
    ],
    relatedProblems: [
      "3Sum - extends the complement concept to three numbers",
      "4Sum - further extension of the pattern",
      "Two Sum II - when array is sorted, can use two pointers instead",
      "Two Sum III - when you need to support multiple queries"
    ]
  },
  'palindrome-number': {
    category: 'Math',
    difficulty: 'Easy',
    patterns: ['Math', 'Two Pointers'],
    hints: [
      "🤔 Can you reverse the number without converting to string?",
      "💡 What happens when you reverse half the number?",
      "⚡ Negative numbers can't be palindromes",
      "🎯 Compare original with reversed version"
    ],
    approaches: [
      {
        name: "String Conversion",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
        description: "Convert to string and check if it reads the same forwards and backwards"
      },
      {
        name: "Math Reversal",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        description: "Reverse the number mathematically and compare",
        pseudocode: `reversed = 0
original = x
while x > 0:
    reversed = reversed * 10 + x % 10
    x //= 10
return original == reversed`
      }
    ],
    relatedProblems: [
      "Reverse Integer",
      "Palindrome Linked List",
      "Valid Palindrome"
    ]
  },
  'add-two-numbers': {
    category: 'Linked List',
    difficulty: 'Medium',
    patterns: ['Linked List', 'Math', 'Simulation'],
    hints: [
      "🤔 Think about how you add numbers by hand",
      "💡 Don't forget about the carry!",
      "⚡ Handle different length lists",
      "🎯 Create a new linked list for the result"
    ],
    approaches: [
      {
        name: "Simulation",
        timeComplexity: "O(max(m,n))",
        spaceComplexity: "O(max(m,n))",
        description: "Simulate elementary math addition with carry",
        pseudocode: `dummy = ListNode(0)
current = dummy
carry = 0

while l1 or l2 or carry:
    val1 = l1.val if l1 else 0
    val2 = l2.val if l2 else 0
    
    total = val1 + val2 + carry
    carry = total // 10
    current.next = ListNode(total % 10)
    
    current = current.next
    l1 = l1.next if l1 else None
    l2 = l2.next if l2 else None

return dummy.next`
      }
    ],
    relatedProblems: [
      "Add Two Numbers II",
      "Multiply Strings",
      "Plus One"
    ]
  },
  'longest-common-prefix': {
    category: 'String',
    difficulty: 'Easy',
    patterns: ['String', 'Divide and Conquer'],
    hints: [
      "🤔 What's the maximum possible length of the common prefix?",
      "💡 Compare characters at the same position across all strings",
      "⚡ Stop as soon as you find a mismatch",
      "🎯 The first string can be your reference"
    ],
    approaches: [
      {
        name: "Vertical Scanning",
        timeComplexity: "O(S)",
        spaceComplexity: "O(1)",
        description: "Compare characters column by column",
        pseudocode: `if not strs: return ""
for i in range(len(strs[0])):
    char = strs[0][i]
    for j in range(1, len(strs)):
        if i >= len(strs[j]) or strs[j][i] != char:
            return strs[0][:i]
return strs[0]`
      },
      {
        name: "Horizontal Scanning",
        timeComplexity: "O(S)",
        spaceComplexity: "O(1)",
        description: "Compare strings one by one",
        pseudocode: `prefix = strs[0]
for i in range(1, len(strs)):
    while not strs[i].startswith(prefix):
        prefix = prefix[:-1]
        if not prefix: return ""
return prefix`
      }
    ],
    relatedProblems: [
      "Longest Common Subsequence",
      "Find the Difference",
      "Word Break"
    ]
  },
  'valid-parentheses': {
    category: 'Stack',
    difficulty: 'Easy',
    patterns: ['Stack', 'String'],
    hints: [
      "🤔 What data structure is perfect for 'last in, first out'?",
      "💡 When you see an opening bracket, what should you expect?",
      "⚡ What happens when you see a closing bracket?",
      "🎯 The stack should be empty at the end"
    ],
    approaches: [
      {
        name: "Stack",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Use stack to match opening and closing brackets",
        pseudocode: `stack = []
mapping = {')': '(', '}': '{', ']': '['}

for char in s:
    if char in mapping:  # closing bracket
        if not stack or stack.pop() != mapping[char]:
            return False
    else:  # opening bracket
        stack.append(char)

return not stack`
      }
    ],
    relatedProblems: [
      "Generate Parentheses",
      "Longest Valid Parentheses",
      "Remove Invalid Parentheses"
    ]
  },
  'median-of-two-sorted-arrays': {
    category: 'Binary Search',
    difficulty: 'Hard',
    patterns: ['Binary Search', 'Array', 'Divide and Conquer'],
    hints: [
      "🤔 Can you solve this without merging the arrays?",
      "💡 Think about partitioning both arrays",
      "⚡ Binary search on the smaller array",
      "🎯 Find the right partition where left_max ≤ right_min"
    ],
    approaches: [
      {
        name: "Binary Search",
        timeComplexity: "O(log(min(m,n)))",
        spaceComplexity: "O(1)",
        description: "Binary search to find the correct partition",
        pseudocode: `# Ensure nums1 is smaller
if len(nums1) > len(nums2):
    nums1, nums2 = nums2, nums1

m, n = len(nums1), len(nums2)
left, right = 0, m

while left <= right:
    partition1 = (left + right) // 2
    partition2 = (m + n + 1) // 2 - partition1
    
    # Find max/min around partition
    max_left1 = float('-inf') if partition1 == 0 else nums1[partition1-1]
    min_right1 = float('inf') if partition1 == m else nums1[partition1]
    
    max_left2 = float('-inf') if partition2 == 0 else nums2[partition2-1]
    min_right2 = float('inf') if partition2 == n else nums2[partition2]
    
    if max_left1 <= min_right2 and max_left2 <= min_right1:
        # Found correct partition
        if (m + n) % 2 == 0:
            return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
        else:
            return max(max_left1, max_left2)
    elif max_left1 > min_right2:
        right = partition1 - 1
    else:
        left = partition1 + 1`
      }
    ],
    relatedProblems: [
      "Find K-th Smallest Pair Distance",
      "Kth Smallest Element in a Sorted Matrix",
      "Find Median from Data Stream"
    ]
  }
};

// Function to get problem name from file path
function getProblemName(problemPath) {
  const parts = problemPath.split('/');
  if (parts.length >= 2) {
    return parts[parts.length - 2]; // Get folder name
  }
  return path.basename(problemPath, path.extname(problemPath));
}

// Function to provide hints for a problem
function provideHints(problemPath, level = 1) {
  const problemName = getProblemName(problemPath);
  const pattern = ALGORITHM_PATTERNS[problemName];

  if (!pattern) {
    console.log(`🤔 No hints available for ${problemName} yet.`);
    console.log(`💡 Try these general problem-solving steps:`);
    console.log(`   1. Understand the problem completely`);
    console.log(`   2. Think of brute force solution first`);
    console.log(`   3. Identify bottlenecks and optimize`);
    console.log(`   4. Consider different data structures`);
    console.log(`   5. Think about edge cases`);
    return;
  }

  console.log(`🎯 ${pattern.category} Problem - ${pattern.difficulty}`);
  console.log(`📚 Patterns: ${pattern.patterns.join(', ')}`);
  console.log('');

  // Progressive hints based on level
  console.log(`💡 Hint Level ${level}:`);
  if (level <= pattern.hints.length) {
    console.log(`   ${pattern.hints[level - 1]}`);
  } else {
    console.log(`   🎉 You've seen all hints! Time to implement.`);
  }

  if (level < pattern.hints.length) {
    console.log(`\n🔍 Want more hints? Run: lct hint ${problemPath.replace(/\.(js|py|java|cpp)$/, '')} ${level + 1}`);
  }
}

// Function to show problem analysis and learning
function showProblemAnalysis(problemPath) {
  const problemName = getProblemName(problemPath);
  const pattern = ALGORITHM_PATTERNS[problemName];

  if (!pattern) {
    console.log(`📚 No analysis available for ${problemName} yet.`);
    return;
  }

  console.log(`🎯 Problem Analysis: ${pattern.category} - ${pattern.difficulty}`);
  console.log('');

  // Step 1: Problem Understanding
  if (pattern.problemAnalysis) {
    console.log(`🔍 **Step 1: What is this problem really asking?**`);
    console.log(`   ${pattern.problemAnalysis.coreQuestion}`);
    console.log('');

    console.log(`🎯 **Step 2: What are the key constraints?**`);
    pattern.problemAnalysis.keyConstraints.forEach(constraint => {
      console.log(`   • ${constraint}`);
    });
    console.log('');

    console.log(`🧠 **Step 3: What patterns do you recognize?**`);
    pattern.problemAnalysis.patternRecognition.forEach(recognition => {
      console.log(`   • ${recognition}`);
    });
    console.log('');
  }

  // Step 2: Thinking Process
  if (pattern.thinkingProcess) {
    console.log(`💭 **How to approach this systematically:**`);
    pattern.thinkingProcess.forEach((step, index) => {
      console.log(`   ${index + 1}. ${step}`);
    });
    console.log('');
  }

  // Step 3: Multiple Approaches with Trade-offs
  if (pattern.approaches) {
    console.log(`⚖️  **Different approaches and their trade-offs:**`);
    console.log('');

    pattern.approaches.forEach((approach, index) => {
      console.log(`${index + 1}. **${approach.name}** (${approach.timeComplexity} time, ${approach.spaceComplexity} space)`);
      console.log(`   💡 When to use: ${approach.whenToUse || approach.description}`);
      if (approach.tradeoffs) {
        console.log(`   ⚖️  Trade-offs: ${approach.tradeoffs}`);
      }
      console.log('');
    });
  }

  // Step 4: Key Insights and Generalizable Concepts
  if (pattern.keyInsights) {
    console.log(`🔑 **Key insights you can apply to other problems:**`);
    pattern.keyInsights.forEach(insight => {
      console.log(`   • ${insight}`);
    });
    console.log('');
  }

  // Step 5: Pattern Recognition for Future Problems
  if (pattern.patternSignals) {
    console.log(`🎯 **How to recognize this pattern in future problems:**`);
    pattern.patternSignals.forEach(signal => {
      console.log(`   • ${signal}`);
    });
    console.log('');
  }

  // Step 6: Related Problems for Practice
  if (pattern.relatedProblems) {
    console.log(`🔗 **Practice the same pattern with these problems:**`);
    pattern.relatedProblems.forEach(problem => {
      console.log(`   • ${problem}`);
    });
    console.log('');
  }

  // Step 7: Common Mistakes
  if (pattern.commonMistakes) {
    console.log(`⚠️  **Common mistakes to avoid:**`);
    pattern.commonMistakes.forEach(mistake => {
      console.log(`   • ${mistake}`);
    });
  }
}

// Function to resolve problem path (similar to other scripts)
function resolveProblemPath(input) {
  const projectRoot = process.cwd();
  const language = getCurrentLanguage();
  const langConfig = getLanguageConfig(language);

  const parts = input.split('/');
  if (parts.length === 2) {
    const [difficulty, problemName] = parts;

    // Try active folder first
    const activePath = path.join(projectRoot, difficulty, problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(activePath)) {
      return path.relative(projectRoot, activePath);
    }

    // Try completed folder
    const completedPath = path.join(projectRoot, difficulty, 'completed', problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(completedPath)) {
      return path.relative(projectRoot, completedPath);
    }
  }

  return null;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const problemInput = args[1];
  const level = parseInt(args[2]) || 1;

  if (!command) {
    console.log('🧠 LeetCode Learning Assistant');
    console.log('');
    console.log('💡 Usage:');
    console.log('  lct hint easy/two-sum           # Get progressive hints');
    console.log('  lct hint easy/two-sum 2         # Get hint level 2');
    console.log('  lct learn easy/two-sum          # Show algorithm approaches');
    console.log('  lct patterns                    # List all available patterns');
    console.log('');
    console.log('🎯 Available for these problems:');
    Object.keys(ALGORITHM_PATTERNS).forEach(problem => {
      const pattern = ALGORITHM_PATTERNS[problem];
      console.log(`  ${problem.padEnd(20)} - ${pattern.category} (${pattern.difficulty})`);
    });
    return;
  }

  if (command === 'patterns') {
    console.log('📚 Available Algorithm Patterns:');
    console.log('');

    const categories = {};
    Object.entries(ALGORITHM_PATTERNS).forEach(([problem, pattern]) => {
      if (!categories[pattern.category]) {
        categories[pattern.category] = [];
      }
      categories[pattern.category].push({ problem, ...pattern });
    });

    Object.entries(categories).forEach(([category, problems]) => {
      console.log(`🏷️  ${category}:`);
      problems.forEach(p => {
        console.log(`   • ${p.problem} (${p.difficulty}) - ${p.patterns.join(', ')}`);
      });
      console.log('');
    });
    return;
  }

  if (!problemInput) {
    console.log('❌ Please specify a problem: lct hint easy/two-sum');
    return;
  }

  const problemPath = resolveProblemPath(problemInput);
  if (!problemPath) {
    console.log(`❌ Problem not found: ${problemInput}`);
    return;
  }

  if (command === 'learn') {
    showProblemAnalysis(problemPath);
  } else {
    provideHints(problemPath, level);
  }
}

// Export for use in other scripts
module.exports = {
  provideHints,
  showProblemAnalysis,
  ALGORITHM_PATTERNS
};

// Run if called directly
if (require.main === module) {
  main();
}