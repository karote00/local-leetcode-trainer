const fs = require('fs');
const path = require('path');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

// LeetCode problems database organized by difficulty
const PROBLEMS = {
  easy: [
    {
      id: 1,
      name: "two-sum",
      title: "Two Sum",
      description: "Find two numbers that add up to target",
      topics: ["Array", "Hash Table"],
      companies: ["Amazon", "Google", "Apple"],
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
        { input: [[6, 2, 4], 6], expected: [0, 2] },
        { input: [[10, 20, 30, 40], 50], expected: [1, 2] },
        { input: [[1, 2], 3], expected: [0, 1] }
      ]
    },
    {
      id: 9,
      name: "palindrome-number",
      title: "Palindrome Number",
      description: "Check if integer is palindrome without string conversion",
      topics: ["Math"],
      companies: ["Amazon", "Apple"],
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
      description: "Convert roman numerals to integer",
      topics: ["Hash Table", "Math", "String"],
      companies: ["Facebook", "Microsoft", "Yahoo"],
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
      description: "Find longest common prefix among array of strings",
      topics: ["String"],
      companies: ["Google", "Yelp"],
      testCases: [
        { input: [["flower","flow","flight"]], expected: "fl" },
        { input: [["dog","racecar","car"]], expected: "" },
        { input: [["interspecies","interstellar","interstate"]], expected: "inters" },
        { input: [["throne","throne"]], expected: "throne" },
        { input: [["throne","dungeon"]], expected: "" },
        { input: [["a"]], expected: "a" },
        { input: [[""]], expected: "" },
        { input: [["ab", "a"]], expected: "a" },
        { input: [["abab","aba","abc"]], expected: "ab" },
        { input: [["leets","leetcode","leet","leeds"]], expected: "lee" },
        { input: [["c","acc","ccc"]], expected: "" },
        { input: [["reflower","flow","flight"]], expected: "" }
      ]
    },
    {
      id: 20,
      name: "valid-parentheses",
      title: "Valid Parentheses",
      description: "Check if parentheses are properly matched",
      topics: ["String", "Stack"],
      companies: ["Amazon", "Google", "Facebook"],
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
      description: "Merge two sorted linked lists",
      topics: ["Linked List", "Recursion"],
      companies: ["Amazon", "Apple", "Adobe"],
      testCases: [
        { input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
        { input: [[], []], expected: [] },
        { input: [[], [0]], expected: [0] },
        { input: [[1], [2]], expected: [1,2] },
        { input: [[2], [1]], expected: [1,2] },
        { input: [[1,3,5], [2,4,6]], expected: [1,2,3,4,5,6] },
        { input: [[1,1,1], [2,2,2]], expected: [1,1,1,2,2,2] },
        { input: [[5], [1,2,4]], expected: [1,2,4,5] },
        { input: [[1,2,4], [3]], expected: [1,2,3,4] },
        { input: [[-1,0,1], [-2,2,3]], expected: [-2,-1,0,1,2,3] },
        { input: [[1,2,3,4,5], []], expected: [1,2,3,4,5] },
        { input: [[0,1,2], [3,4,5]], expected: [0,1,2,3,4,5] }
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
        { input: [[2,4,3], [5,6,4]], expected: [7,0,8] },
        { input: [[0], [0]], expected: [0] },
        { input: [[9,9,9,9,9,9,9], [9,9,9,9]], expected: [8,9,9,9,0,0,0,1] },
        { input: [[1,2], [9,9]], expected: [0,2,1] },
        { input: [[5], [5]], expected: [0,1] },
        { input: [[1,8], [0]], expected: [1,8] },
        { input: [[2,4,9], [5,6,4,9]], expected: [7,0,4,0,1] },
        { input: [[9], [1,9,9,9,9,9,9,9,9,9]], expected: [0,0,0,0,0,0,0,0,0,0,1] },
        { input: [[1], [9,9]], expected: [0,0,1] },
        { input: [[7,2,4,3], [5,6,4]], expected: [2,9,8,3] },
        { input: [[2,4,3,2,4,3,2,4,3], [5,6,4]], expected: [7,0,8,2,4,3,2,4,3] },
        { input: [[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], [5,6,4]], expected: [6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1] }
      ]
    },
    {
      id: 3,
      name: "longest-substring-without-repeating-characters",
      title: "Longest Substring Without Repeating Characters",
      description: "Find length of longest substring without repeating chars",
      topics: ["Hash Table", "String", "Sliding Window"],
      companies: ["Amazon", "Adobe", "Bloomberg"]
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
  
  // Create the main problem file
  const problemContent = langConfig.template
    .replace(/\{\{id\}\}/g, problem.id)
    .replace(/\{\{title\}\}/g, problem.title)
    .replace(/\{\{name\}\}/g, problem.name)
    .replace(/\{\{description\}\}/g, problem.description)
    .replace(/\{\{topics\}\}/g, problem.topics.join(', '))
    .replace(/\{\{companies\}\}/g, problem.companies.join(', '))
    .replace(/\{\{functionName\}\}/g, functionName)
    .replace(/\{\{function_name\}\}/g, functionName.toLowerCase().replace(/([A-Z])/g, '_$1').replace(/^_/, ''))
    .replace(/\{\{ClassName\}\}/g, className);

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

// Main function
function main() {
  const args = process.argv.slice(2);
  const input = args.join(' ').toLowerCase();
  
  // Parse the request
  let difficulty = null;
  let count = 1;
  
  if (input.includes('easy')) difficulty = 'easy';
  else if (input.includes('medium')) difficulty = 'medium';
  else if (input.includes('hard')) difficulty = 'hard';
  
  // Extract number if specified
  const numberMatch = input.match(/(\d+)/);
  if (numberMatch) {
    count = parseInt(numberMatch[1]);
  }
  
  if (!difficulty) {
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
  
  const existing = getExistingProblems();
  const availableProblems = PROBLEMS[difficulty].filter(p => 
    !existing[difficulty].includes(p.name)
  );
  
  if (availableProblems.length === 0) {
    console.log(`🎉 Wow! You've completed all available ${difficulty} problems!`);
    console.log('💪 Time to move to the next difficulty level!');
    return;
  }
  
  // Randomly select problems
  const selectedProblems = [];
  const actualCount = Math.min(count, availableProblems.length);
  
  for (let i = 0; i < actualCount; i++) {
    const randomIndex = Math.floor(Math.random() * availableProblems.length);
    const problem = availableProblems.splice(randomIndex, 1)[0];
    selectedProblems.push(problem);
  }
  
  console.log(`🎯 Generated ${actualCount} ${difficulty} challenge${actualCount > 1 ? 's' : ''}:`);
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
    
    console.log(`${index + 1}. ${status} ${problem.title}`);
    console.log(`   📝 ${problem.description}`);
    console.log(`   🏷️  ${problem.topics.join(', ')}`);
    console.log(`   🏢 ${problem.companies.slice(0, 3).join(', ')}`);
    if (created) {
      console.log(`   📁 Path: ${problemFile}`);
    }
    console.log(`   🧪 Test: yarn test ${difficulty}/${problem.name}`);
    console.log(`   🔗 Open: yarn open ${difficulty}/${problem.name}`);
    console.log('');
  });

  console.log('🚀 Happy coding! Remember:');
  console.log('  1. Understand the problem first');
  console.log('  2. Think about edge cases');
  console.log('  3. Start with brute force, then optimize');
  console.log('  4. Test locally before submitting');
}

main();