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
      companies: ["Amazon", "Google", "Apple"]
    },
    {
      id: 9,
      name: "palindrome-number",
      title: "Palindrome Number",
      description: "Check if integer is palindrome without string conversion",
      topics: ["Math"],
      companies: ["Amazon", "Apple"]
    },
    {
      id: 13,
      name: "roman-to-integer",
      title: "Roman to Integer",
      description: "Convert roman numerals to integer",
      topics: ["Hash Table", "Math", "String"],
      companies: ["Facebook", "Microsoft", "Yahoo"]
    },
    {
      id: 14,
      name: "longest-common-prefix",
      title: "Longest Common Prefix",
      description: "Find longest common prefix among array of strings",
      topics: ["String"],
      companies: ["Google", "Yelp"]
    },
    {
      id: 20,
      name: "valid-parentheses",
      title: "Valid Parentheses",
      description: "Check if parentheses are properly matched",
      topics: ["String", "Stack"],
      companies: ["Amazon", "Google", "Facebook"]
    },
    {
      id: 21,
      name: "merge-two-sorted-lists",
      title: "Merge Two Sorted Lists",
      description: "Merge two sorted linked lists",
      topics: ["Linked List", "Recursion"],
      companies: ["Amazon", "Apple", "Adobe"]
    }
  ],
  medium: [
    {
      id: 2,
      name: "add-two-numbers",
      title: "Add Two Numbers",
      description: "Add numbers represented as linked lists",
      topics: ["Linked List", "Math", "Recursion"],
      companies: ["Amazon", "Microsoft", "Bloomberg"]
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

  // Create test file
  const testContent = langConfig.testTemplate
    .replace(/\{\{title\}\}/g, problem.title)
    .replace(/\{\{ClassName\}\}/g, className);

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