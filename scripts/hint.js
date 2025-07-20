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
    approaches: [
      {
        name: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Check every pair of numbers",
        pseudocode: `for i in range(len(nums)):
    for j in range(i+1, len(nums)):
        if nums[i] + nums[j] == target:
            return [i, j]`
      },
      {
        name: "Hash Map",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Store complements in hash map for O(1) lookup",
        pseudocode: `seen = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        return [seen[complement], i]
    seen[num] = i`
      }
    ],
    relatedProblems: [
      "3Sum",
      "4Sum", 
      "Two Sum II - Input Array Is Sorted",
      "Two Sum III - Data Structure Design"
    ],
    keyInsights: [
      "Trade space for time complexity",
      "Hash maps are perfect for 'find complement' problems",
      "Always consider what you're looking for vs what you have"
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

// Function to show algorithm approaches
function showApproaches(problemPath) {
  const problemName = getProblemName(problemPath);
  const pattern = ALGORITHM_PATTERNS[problemName];
  
  if (!pattern || !pattern.approaches) {
    console.log(`📚 No algorithm approaches available for ${problemName} yet.`);
    return;
  }
  
  console.log(`🧠 Algorithm Approaches for ${problemName}:`);
  console.log('');
  
  pattern.approaches.forEach((approach, index) => {
    console.log(`${index + 1}. **${approach.name}**`);
    console.log(`   ⏰ Time: ${approach.timeComplexity}`);
    console.log(`   💾 Space: ${approach.spaceComplexity}`);
    console.log(`   📝 ${approach.description}`);
    
    if (approach.pseudocode) {
      console.log(`   \n   Pseudocode:`);
      approach.pseudocode.split('\n').forEach(line => {
        console.log(`   ${line}`);
      });
    }
    console.log('');
  });
  
  if (pattern.keyInsights) {
    console.log(`🔑 Key Insights:`);
    pattern.keyInsights.forEach(insight => {
      console.log(`   • ${insight}`);
    });
    console.log('');
  }
  
  if (pattern.relatedProblems) {
    console.log(`🔗 Related Problems:`);
    pattern.relatedProblems.forEach(problem => {
      console.log(`   • ${problem}`);
    });
  }
}

// Function to resolve problem path (similar to other scripts)
function resolveProblemPath(input) {
  const projectRoot = path.join(__dirname, '..');
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
    showApproaches(problemPath);
  } else {
    provideHints(problemPath, level);
  }
}

// Export for use in other scripts
module.exports = {
  provideHints,
  showApproaches,
  ALGORITHM_PATTERNS
};

// Run if called directly
if (require.main === module) {
  main();
}