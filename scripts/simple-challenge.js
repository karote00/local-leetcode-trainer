/**
 * Simple Challenge Generator
 * Creates LeetCode challenges by scraping directly from website
 */

const fs = require('fs');
const path = require('path');
const { SimpleLeetCodeScraper } = require('./simple-scraper');
const { getCurrentLanguage, getLanguageConfig } = require('./config');

// Popular LeetCode problems by difficulty
const POPULAR_PROBLEMS = {
  easy: [
    'two-sum', 'palindrome-number', 'roman-to-integer', 'longest-common-prefix',
    'valid-parentheses', 'merge-two-sorted-lists', 'remove-duplicates-from-sorted-array',
    'remove-element', 'search-insert-position', 'climbing-stairs', 'symmetric-tree',
    'maximum-depth-of-binary-tree', 'same-tree', 'invert-binary-tree',
    'best-time-to-buy-and-sell-stock', 'valid-palindrome', 'single-number',
    'linked-list-cycle', 'min-stack', 'intersection-of-two-linked-lists',
    'majority-element', 'reverse-linked-list', 'contains-duplicate',
    'valid-anagram', 'binary-tree-inorder-traversal', 'binary-tree-preorder-traversal',
    'binary-tree-postorder-traversal', 'move-zeroes', 'first-bad-version',
    'ransom-note', 'fizz-buzz', 'reverse-string', 'reverse-vowels-of-a-string',
    'intersection-of-two-arrays', 'valid-perfect-square', 'guess-number-higher-or-lower',
    'first-unique-character-in-a-string', 'find-the-difference', 'is-subsequence',
    'sum-of-left-leaves', 'path-sum', 'convert-a-number-to-hexadecimal',
    'queue-reconstruction-by-height', 'add-strings', 'third-maximum-number',
    'arrange-coins', 'find-all-numbers-disappeared-in-an-array', 'assign-cookies',
    'repeated-substring-pattern', 'hamming-distance', 'island-perimeter',
    'max-consecutive-ones', 'predict-the-winner', 'construct-the-rectangle'
  ],
  medium: [
    'add-two-numbers', 'longest-substring-without-repeating-characters',
    'longest-palindromic-substring', 'zigzag-conversion', 'reverse-integer',
    'string-to-integer-atoi', 'container-with-most-water', 'integer-to-roman',
    '3sum', '3sum-closest', 'letter-combinations-of-a-phone-number', '4sum',
    'remove-nth-node-from-end-of-list', 'generate-parentheses', 'swap-nodes-in-pairs',
    'next-permutation', 'search-in-rotated-sorted-array', 'find-first-and-last-position-of-element-in-sorted-array',
    'valid-sudoku', 'combination-sum', 'combination-sum-ii', 'first-missing-positive',
    'multiply-strings', 'permutations', 'permutations-ii', 'rotate-image',
    'group-anagrams', 'powx-n', 'maximum-subarray', 'spiral-matrix',
    'jump-game', 'merge-intervals', 'insert-interval', 'unique-paths',
    'unique-paths-ii', 'minimum-path-sum', 'add-binary', 'set-matrix-zeroes',
    'search-a-2d-matrix', 'sort-colors', 'combinations', 'subsets',
    'word-search', 'remove-duplicates-from-sorted-array-ii', 'search-in-rotated-sorted-array-ii',
    'remove-duplicates-from-sorted-list-ii', 'partition-list', 'gray-code',
    'subsets-ii', 'decode-ways', 'reverse-linked-list-ii', 'restore-ip-addresses',
    'binary-tree-inorder-traversal', 'unique-binary-search-trees', 'unique-binary-search-trees-ii',
    'validate-binary-search-tree', 'recover-binary-search-tree', 'binary-tree-level-order-traversal'
  ],
  hard: [
    'median-of-two-sorted-arrays', 'regular-expression-matching', 'merge-k-sorted-lists',
    'reverse-nodes-in-k-group', 'substring-with-concatenation-of-all-words',
    'longest-valid-parentheses', 'sudoku-solver', 'count-and-say',
    'trapping-rain-water', 'wildcard-matching', 'jump-game-ii',
    'n-queens', 'n-queens-ii', 'spiral-matrix-ii', 'permutation-sequence',
    'rotate-list', 'valid-number', 'plus-one', 'text-justification',
    'sqrt-x', 'simplify-path', 'edit-distance', 'minimum-window-substring',
    'largest-rectangle-in-histogram', 'maximal-rectangle', 'scramble-string',
    'interleaving-string', 'same-tree', 'recover-binary-search-tree',
    'construct-binary-tree-from-preorder-and-inorder-traversal',
    'construct-binary-tree-from-inorder-and-postorder-traversal',
    'flatten-binary-tree-to-linked-list', 'distinct-subsequences',
    'populating-next-right-pointers-in-each-node', 'populating-next-right-pointers-in-each-node-ii',
    'triangle', 'best-time-to-buy-and-sell-stock-iii', 'binary-tree-maximum-path-sum',
    'word-ladder-ii', 'word-ladder', 'longest-consecutive-sequence',
    'sum-root-to-leaf-numbers', 'surrounded-regions', 'palindrome-partitioning-ii',
    'clone-graph', 'gas-station', 'candy', 'single-number-ii',
    'copy-list-with-random-pointer', 'word-break-ii', 'linked-list-cycle-ii',
    'reorder-list', 'lru-cache', 'insertion-sort-list', 'sort-list'
  ]
};

class SimpleChallengeGenerator {
  constructor() {
    this.scraper = new SimpleLeetCodeScraper();
  }

  /**
   * Generate a challenge
   */
  async generateChallenge(difficulty, count = 1) {
    try {
      console.log(`🎯 Generating ${count} ${difficulty} challenge(s)...`);
      
      const results = [];
      const existing = this.getExistingProblems();
      
      for (let i = 0; i < count; i++) {
        const problemSlug = this.selectRandomProblem(difficulty, existing[difficulty]);
        
        if (!problemSlug) {
          console.log(`⚠️  No more ${difficulty} problems available`);
          break;
        }

        console.log(`\n📝 Creating challenge: ${problemSlug}`);
        
        // Get problem data from LeetCode
        const problemData = await this.scraper.getProblem(problemSlug);
        
        // Create problem files
        const created = await this.createProblemFiles(difficulty, problemData);
        
        results.push({
          problem: problemData,
          created: created,
          index: i + 1
        });

        // Add to existing to avoid duplicates in this session
        existing[difficulty].push(problemSlug);
        
        // Add delay between requests to be respectful
        if (i < count - 1) {
          await this.delay(1000);
        }
      }

      // Display results
      this.displayResults(results);
      
      return results;
    } catch (error) {
      throw new Error(`Failed to generate challenge: ${error.message}`);
    }
  }

  /**
   * Get existing problems to avoid duplicates
   */
  getExistingProblems() {
    const existing = { easy: [], medium: [], hard: [] };
    const projectRoot = process.cwd();

    ['easy', 'medium', 'hard'].forEach(difficulty => {
      const difficultyPath = path.join(projectRoot, difficulty);
      
      if (fs.existsSync(difficultyPath)) {
        const dirs = fs.readdirSync(difficultyPath).filter(item => {
          const itemPath = path.join(difficultyPath, item);
          return fs.statSync(itemPath).isDirectory() && item !== 'completed';
        });
        existing[difficulty] = dirs;
      }

      // Also check completed problems
      const completedPath = path.join(difficultyPath, 'completed');
      if (fs.existsSync(completedPath)) {
        const completedDirs = fs.readdirSync(completedPath).filter(item => {
          const itemPath = path.join(completedPath, item);
          return fs.statSync(itemPath).isDirectory();
        });
        existing[difficulty].push(...completedDirs);
      }
    });

    return existing;
  }

  /**
   * Select a random problem that doesn't exist yet
   */
  selectRandomProblem(difficulty, existingProblems) {
    const availableProblems = POPULAR_PROBLEMS[difficulty] || [];
    const unsolvedProblems = availableProblems.filter(problem => 
      !existingProblems.includes(problem)
    );

    if (unsolvedProblems.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * unsolvedProblems.length);
    return unsolvedProblems[randomIndex];
  }

  /**
   * Create problem files
   */
  async createProblemFiles(difficulty, problemData) {
    try {
      const language = getCurrentLanguage();
      const langConfig = getLanguageConfig(language);
      const problemDir = path.join(difficulty, problemData.slug);
      
      // Check if problem already exists
      if (fs.existsSync(problemDir)) {
        return false;
      }

      // Create directory
      fs.mkdirSync(problemDir, { recursive: true });

      // Generate problem file
      const problemFile = this.generateProblemFile(problemData, language, langConfig);
      const problemFileName = `${problemData.slug}${langConfig.extension}`;
      fs.writeFileSync(path.join(problemDir, problemFileName), problemFile);

      // Generate test file
      const testFile = this.generateTestFile(problemData, language, langConfig);
      const testFileName = `${problemData.slug}.test${langConfig.extension}`;
      fs.writeFileSync(path.join(problemDir, testFileName), testFile);

      // Generate README
      const readmeFile = this.generateReadmeFile(problemData);
      fs.writeFileSync(path.join(problemDir, 'README.md'), readmeFile);

      console.log(`✅ Created files in ${problemDir}/`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to create files: ${error.message}`);
      return false;
    }
  }

  /**
   * Generate problem file content
   */
  generateProblemFile(problemData, language, langConfig) {
    const examples = problemData.examples.map((ex, i) => 
      `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? '\nExplanation: ' + ex.explanation : ''}`
    ).join('\n\n');
    
    const constraints = problemData.constraints.map(c => `- ${c}`).join('\n');
    
    if (language === 'javascript') {
      return `/**
 * ${problemData.id}. ${problemData.title}
 * ${problemData.url}
 * 
 * ${problemData.description.replace(/\n/g, '\n * ')}
 * 
 * ${examples.replace(/\n/g, '\n * ')}
 * 
 * Constraints:
 * ${constraints.replace(/\n/g, '\n * ')}
 */

/**
 * @param {any} param
 * @return {any}
 */
var solution = function(param) {
    
};

module.exports = solution;`;
    }

    // Add other languages as needed
    return `// ${problemData.title}\n// ${problemData.url}\n\n// TODO: Implement solution`;
  }

  /**
   * Generate test file content
   */
  generateTestFile(problemData, language, langConfig) {
    if (language === 'javascript') {
      // Convert examples to test case array format
      const testCaseArray = problemData.examples.map((ex, i) => {
        return `  {
    description: "Example ${i + 1}",
    input: [${ex.input}], // TODO: Parse input properly
    expected: ${ex.output}, // TODO: Parse output properly
    category: "basic"
  }`;
      }).join(',\n');

      return `const ${problemData.slug.replace(/-/g, '')} = require('./${problemData.slug}');

// Test cases array - simple and clean
const testCases = [
${testCaseArray}
];

// Simple test runner - pure JavaScript
function runTests() {
  console.log('🧪 Running tests for ${problemData.title}\\n');
  
  let passed = 0;
  let failed = 0;
  
  for (let i = 0; i < testCases.length; i++) {
    const test = testCases[i];
    const emoji = test.category === 'edge' ? '⚠️' : test.category === 'stress' ? '🔥' : '✅';
    
    try {
      const result = ${problemData.slug.replace(/-/g, '')}(...test.input);
      
      if (JSON.stringify(result) === JSON.stringify(test.expected)) {
        console.log(\`\${emoji} PASS: \${test.description}\`);
        console.log(\`   Input: \${JSON.stringify(test.input)}\`);
        console.log(\`   Output: \${JSON.stringify(result)}\`);
        passed++;
      } else {
        console.log(\`❌ FAIL: \${test.description}\`);
        console.log(\`   Input: \${JSON.stringify(test.input)}\`);
        console.log(\`   Expected: \${JSON.stringify(test.expected)}\`);
        console.log(\`   Got: \${JSON.stringify(result)}\`);
        failed++;
      }
    } catch (error) {
      console.log(\`💥 ERROR: \${test.description}\`);
      console.log(\`   Input: \${JSON.stringify(test.input)}\`);
      console.log(\`   Error: \${error.message}\`);
      failed++;
    }
    
    console.log(''); // Empty line between tests
  }
  
  // Summary
  console.log('='.repeat(50));
  console.log(\`📊 Results: \${passed} passed, \${failed} failed\`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('🔧 Some tests failed. Keep working on your solution!');
  }
  
  return failed === 0;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

// Export for external test runners
module.exports = {
  ${problemData.slug.replace(/-/g, '')},
  runTests,
  runAllTests: runTests, // Alias for compatibility with lct test
  testCases
};`;
    }

    return `// Test file for ${problemData.title}`;
  }

  /**
   * Generate README file
   */
  generateReadmeFile(problemData) {
    const examples = problemData.examples.map((ex, i) => 
      `**Example ${i + 1}:**\n\`\`\`\nInput: ${ex.input}\nOutput: ${ex.output}\n\`\`\`\n${ex.explanation ? ex.explanation : ''}`
    ).join('\n\n');

    return `# ${problemData.id}. ${problemData.title}

**Difficulty:** ${problemData.difficulty.charAt(0).toUpperCase() + problemData.difficulty.slice(1)}

**LeetCode Link:** ${problemData.url}

## Problem Description

${problemData.description}

## Examples

${examples}

## Constraints

${problemData.constraints.map(c => `- ${c}`).join('\n')}

## Notes

- Use \`yarn lct test ${problemData.difficulty}/${problemData.slug}\` to run tests
- Use \`yarn lct learn ${problemData.difficulty}/${problemData.slug}\` for AI help
`;
  }

  /**
   * Display results
   */
  displayResults(results) {
    console.log(`\n🎉 Generated ${results.length} challenge(s):`);
    
    results.forEach(({ problem, created, index }) => {
      const status = created ? '✨ NEW' : '📁 EXISTS';
      console.log(`\n${index}. ${status} ${problem.title}`);
      console.log(`   📝 ${problem.description.substring(0, 100)}...`);
      console.log(`   🏷️  Difficulty: ${problem.difficulty}`);
      console.log(`   🔗 ${problem.url}`);
      if (created) {
        console.log(`   📁 Created in: ${problem.difficulty}/${problem.slug}/`);
      }
    });

    console.log(`\n🚀 Happy coding!`);
    console.log(`💡 Use 'yarn lct learn <problem>' for AI help`);
  }

  /**
   * Add delay between requests
   */
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const input = args.join(' ').toLowerCase();

  // Parse difficulty
  let difficulty = null;
  if (input.includes('easy')) difficulty = 'easy';
  else if (input.includes('medium')) difficulty = 'medium';
  else if (input.includes('hard')) difficulty = 'hard';

  // Parse count
  const numberMatch = input.match(/(\d+)/);
  const count = numberMatch ? parseInt(numberMatch[1]) : 1;

  if (!difficulty) {
    console.log('🎯 Simple LeetCode Challenge Generator');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/simple-challenge.js easy 1     # Generate 1 easy problem');
    console.log('  node scripts/simple-challenge.js medium 2   # Generate 2 medium problems');
    console.log('  node scripts/simple-challenge.js hard       # Generate 1 hard problem');
    console.log('');
    console.log('🌐 Gets fresh data directly from LeetCode website!');
    process.exit(0);
  }

  try {
    const generator = new SimpleChallengeGenerator();
    await generator.generateChallenge(difficulty, count);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { SimpleChallengeGenerator };