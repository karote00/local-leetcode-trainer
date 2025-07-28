const fs = require('fs');
const path = require('path');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');
const { getCondensedGuide } = require('./dynamic/condensed-guide.js');

// Algorithm patterns and hints database
const ALGORITHM_PATTERNS = {
  'two-sum': {
    title: 'Two Sum',
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
    title: 'Palindrome Number',
    category: 'Math',
    difficulty: 'Easy',
    patterns: ['Math', 'Two Pointers'],
    hints: [
      "🤔 Can you reverse the number without converting to string?",
      "💡 What happens when you reverse half the number?",
      "⚡ Negative numbers can't be palindromes",
      "🎯 Compare original with reversed version"
    ],
    keyInsights: [
      "Mathematical operations can often replace string manipulations for better space complexity",
      "Reversing only half the number is an optimization that reduces operations",
      "Edge cases like negative numbers and single digits need special handling"
    ],
    commonMistakes: [
      "Converting to string when a mathematical solution exists",
      "Not handling negative numbers correctly",
      "Forgetting about integer overflow when reversing",
      "Not considering the optimization of reversing only half the number"
    ],
    approaches: [
      {
        name: "String Conversion",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(log n)",
        description: "Convert to string and check if it reads the same forwards and backwards",
        whenToUse: "When string manipulation is more intuitive or when working with very large numbers"
      },
      {
        name: "Math Reversal",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        description: "Reverse the number mathematically and compare",
        whenToUse: "When you want optimal space complexity and avoid string operations",
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
    title: 'Add Two Numbers',
    category: 'Linked List',
    difficulty: 'Medium',
    patterns: ['Linked List', 'Math', 'Simulation'],
    hints: [
      "🤔 Think about how you add numbers by hand",
      "💡 Don't forget about the carry!",
      "⚡ Handle different length lists",
      "🎯 Create a new linked list for the result"
    ],
    keyInsights: [
      "Simulate elementary math addition - process digits from least to most significant",
      "Use a dummy head node to simplify linked list construction",
      "Handle carry propagation carefully - it can extend beyond both input lists",
      "Treat missing nodes as having value 0 to handle different length lists"
    ],
    commonMistakes: [
      "Forgetting to handle the final carry after processing both lists",
      "Not handling lists of different lengths correctly",
      "Trying to modify input lists instead of creating a new result list",
      "Forgetting to use a dummy head node, making list construction more complex"
    ],
    approaches: [
      {
        name: "Simulation",
        timeComplexity: "O(max(m,n))",
        spaceComplexity: "O(max(m,n))",
        description: "Simulate elementary math addition with carry",
        whenToUse: "This is the standard approach - mirrors how humans add numbers",
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
    title: 'Longest Common Prefix',
    category: 'String',
    difficulty: 'Easy',
    patterns: ['String', 'Divide and Conquer'],
    hints: [
      "🤔 What's the maximum possible length of the common prefix?",
      "💡 Compare characters at the same position across all strings",
      "⚡ Stop as soon as you find a mismatch",
      "🎯 The first string can be your reference"
    ],
    keyInsights: [
      "The longest common prefix cannot be longer than the shortest string",
      "You can compare character by character either vertically (by position) or horizontally (by string)",
      "Early termination saves time - stop as soon as you find a mismatch",
      "Edge cases: empty array or empty strings need special handling"
    ],
    commonMistakes: [
      "Not handling empty input array or empty strings",
      "Continuing comparison after finding a mismatch",
      "Not considering that the shortest string limits the maximum prefix length",
      "Overcomplicating with complex algorithms when simple scanning works"
    ],
    approaches: [
      {
        name: "Vertical Scanning",
        timeComplexity: "O(S)",
        spaceComplexity: "O(1)",
        description: "Compare characters column by column",
        whenToUse: "When you want to minimize comparisons by stopping early on mismatches",
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
        whenToUse: "When you want a more intuitive approach that builds the prefix incrementally",
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
    title: 'Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    patterns: ['Stack', 'String'],
    hints: [
      "🤔 What data structure is perfect for 'last in, first out'?",
      "💡 When you see an opening bracket, what should you expect?",
      "⚡ What happens when you see a closing bracket?",
      "🎯 The stack should be empty at the end"
    ],
    keyInsights: [
      "Stack's LIFO property perfectly matches the nested structure of valid parentheses",
      "Every opening bracket must have a corresponding closing bracket in the correct order",
      "Use a mapping to quickly check if closing brackets match their opening counterparts",
      "A valid string must have an empty stack at the end - no unmatched opening brackets"
    ],
    commonMistakes: [
      "Not handling the case where there are more closing brackets than opening ones",
      "Forgetting to check if the stack is empty at the end",
      "Not using a mapping, leading to complex if-else chains",
      "Trying to solve without a stack, missing the LIFO matching pattern"
    ],
    approaches: [
      {
        name: "Stack",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Use stack to match opening and closing brackets",
        whenToUse: "This is the standard approach - stack naturally handles nested structures",
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
    title: 'Median of Two Sorted Arrays',
    category: 'Binary Search',
    difficulty: 'Hard',
    patterns: ['Binary Search', 'Array', 'Divide and Conquer'],
    hints: [
      "🤔 Can you solve this without merging the arrays?",
      "💡 Think about partitioning both arrays",
      "⚡ Binary search on the smaller array",
      "🎯 Find the right partition where left_max ≤ right_min"
    ],
    keyInsights: [
      "Transform the problem from 'find median' to 'find correct partition' - this enables binary search",
      "The median divides the combined array into two equal halves - use this property to guide partitioning",
      "Binary search on the smaller array reduces time complexity to O(log(min(m,n)))",
      "The partition is correct when max(left_side) ≤ min(right_side) for both arrays"
    ],
    commonMistakes: [
      "Trying to merge arrays first, which gives O(m+n) time instead of optimal O(log(min(m,n)))",
      "Not ensuring you binary search on the smaller array, leading to index out of bounds",
      "Incorrect partition calculation - forgetting the +1 for odd total length",
      "Not handling edge cases where partition is at the beginning or end of an array",
      "Confusing the partition index with the actual array indices"
    ],
    approaches: [
      {
        name: "Binary Search",
        timeComplexity: "O(log(min(m,n)))",
        spaceComplexity: "O(1)",
        description: "Binary search to find the correct partition",
        whenToUse: "This is the optimal approach - required for the O(log(min(m,n))) time complexity constraint",
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
    console.log('');
    console.log('🤖 **AI Prompt - Copy this to your AI assistant:**');
    console.log('```');
    console.log(`I'm working on the "${problemName}" problem and need some hints to guide my thinking.

Can you help me with:
1. What type of problem is this and what patterns might apply?
2. What should I think about first when approaching this problem?
3. What data structures or algorithms might be useful?
4. Can you give me a hint about the approach without spoiling the solution?

Please guide my thinking process rather than giving me the complete solution.`);
    console.log('```');
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

  console.log('');
  console.log('🤖 **Copy this complete prompt to your AI assistant:**');
  console.log('```');
  
  // Add condensed guide
  const condensedGuide = getCondensedGuide();
  console.log(condensedGuide);
  console.log('');
  
  const currentHint = level <= pattern.hints.length ? pattern.hints[level - 1] : "I've seen all the basic hints";
  
  console.log(`## Problem: ${pattern.title} (${pattern.category} - ${pattern.difficulty})`);
  console.log('');
  console.log(`**I'm working on this problem and just received hint level ${level}:**`);
  console.log(`"${currentHint}"`);
  console.log('');
  console.log('**As my Algorithm Mentor, please help me:**');
  console.log('- Understand what this hint means in practical terms');
  console.log('- Figure out how to apply this hint to my approach');
  console.log('- Walk through the reasoning step by step');
  console.log('- Guide me toward the next insight without giving away the solution');
  console.log('');
  console.log('Please use the teaching methodology above to help me discover the solution rather than just telling me the answer.');
  console.log('```');

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
    console.log('');
    console.log('🤖 **AI Prompt - Copy this to your AI assistant:**');
    console.log('```');
    console.log(`I want to deeply understand the "${problemName}" problem. Can you help me analyze it?

Please help me with:
1. What is this problem really asking me to do?
2. What are the key constraints and edge cases I should consider?
3. What algorithmic patterns or techniques apply to this problem?
4. What's the systematic thinking process I should follow?
5. What are different approaches to solve this and their trade-offs?
6. What are the key insights I can apply to similar problems?
7. How can I recognize this pattern in future problems?
8. What are common mistakes people make with this type of problem?

I want to understand the problem deeply, not just get a solution.`);
    console.log('```');
    return;
  }

  console.log(`🎯 Problem Analysis: ${pattern.category} - ${pattern.difficulty}`);
  console.log(`📚 Patterns: ${pattern.patterns.join(', ')}`);
  console.log('');
  
  console.log('🤖 **Copy this complete prompt for comprehensive analysis:**');
  console.log('```');
  
  // Add condensed guide
  const condensedGuide = getCondensedGuide();
  console.log(condensedGuide);
  console.log('');
  
  console.log(`## Problem: ${pattern.title} (${pattern.category} - ${pattern.difficulty})`);
  console.log('');
  console.log('**I want to deeply understand this problem and would like your help as my Algorithm Mentor.**');
  console.log('');
  console.log('Please start by asking me:');
  console.log('- What do I understand about this problem so far?');
  console.log('- What specific aspects am I confused about?');
  console.log('- Have I identified any patterns or approaches yet?');
  console.log('');
  console.log('Based on my responses, guide me through a comprehensive analysis using the teaching methodology above. Help me understand the problem deeply, recognize patterns, compare different approaches, and connect this to broader algorithmic concepts.');
  console.log('```');

  console.log('');
  console.log('💡 **Alternative: Ask AI directly**');
  console.log(`You can also just ask: "Please run 'yarn lct learn ${problemName}' to teach me"`);
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