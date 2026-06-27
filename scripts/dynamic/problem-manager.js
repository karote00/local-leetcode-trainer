/**
 * Problem Manager - Orchestrates local problem loading, caching, and generation
 */

const { ProblemManager } = require('./interfaces');
const { LocalProblemSourceImpl } = require('./local-problem-source');
const { CacheManagerImpl } = require('./cache-manager');
const { OfflineManager } = require('./offline-manager');
const { TestCaseGenerator } = require('./test-case-generator');
const { FallbackValidator } = require('./fallback-validator');

class ProblemManagerImpl extends ProblemManager {
  constructor() {
    super();
    this.problemSource = new LocalProblemSourceImpl();
    this.cache = new CacheManagerImpl();
    this.offline = new OfflineManager();
  }

  /**
   * Get a problem with caching and template generation
   */
  async getProblem(identifier, options = {}) {
    const {
      forceRefresh = false,
      language = 'javascript',
      includeHints = false
    } = options;

    try {
      console.log(`🎯 Getting problem: ${identifier}`);
      
      const cacheKey = `problem:${identifier}`;
      let problemData = null;

      // Try local cache first unless force refresh
      if (!forceRefresh) {
        problemData = await this.offline.getProblemOffline(identifier);
      }

      // Load from bundled local library if not in cache or force refresh
      if (!problemData || forceRefresh) {
        console.log(`📚 Loading problem from local library: ${identifier}`);
        problemData = await this.problemSource.fetchProblem(identifier);
        
        // Validate bundled problem data using the local-library validator rules.
        const validation = FallbackValidator.validateProblemData(problemData);
          
        if (!validation.isValid) {
          throw new Error(`Invalid problem data: ${validation.errors.join(', ')}`);
        }

        if (validation.warnings.length > 0) {
          console.warn(`⚠️  Problem warnings: ${validation.warnings.join(', ')}`);
        }

        // Display local library information
        if (problemData.metadata?.source === 'local-library') {
          console.log(`📚 Using local library data (${validation.completenessScore}% complete)`);
        } else if (problemData.metadata?.source === 'enhanced-fallback' || problemData.metadata?.source === 'fallback') {
          console.log(`📚 Using bundled fallback data (${validation.completenessScore}% complete)`);
        }

        // Cache the loaded problem
        const cached = await this.cache.set(cacheKey, problemData, {
          source: problemData.metadata?.source || 'local-library',
          version: '2.0',
          language: language,
          loadedAt: new Date().toISOString(),
          completeness: validation.completenessScore || 100
        });

        if (cached) {
          console.log(`✅ Problem cached: ${identifier}`);
        } else {
          console.warn(`⚠️  Problem cache skipped: ${identifier}`);
        }
      }

      // Enhance problem data
      problemData = await this.enhanceProblemData(problemData, language, options);

      return problemData;
    } catch (error) {
      throw new Error(`Failed to get problem "${identifier}": ${error.message}`);
    }
  }

  /**
   * Get a random problem by difficulty
   */
  async getRandomProblem(difficulty, options = {}) {
    try {
      console.log(`🎲 Getting random ${difficulty} problem`);

      const excludedNames = new Set((options.exclude || []).map(name => String(name).toLowerCase()));
      const randomProblem = await this.problemSource.getRandomProblem(difficulty, {
        exclude: Array.from(excludedNames)
      });

      // Get full problem data
      return await this.getProblem(randomProblem.name || randomProblem.id, options);
    } catch (error) {
      throw new Error(`Failed to get random ${difficulty} problem: ${error.message}`);
    }
  }

  /**
   * Generate problem files in target directory
   */
  async generateProblemFiles(problem, language, targetDir) {
    try {
      const fs = require('fs');
      const path = require('path');

      console.log(`📁 Generating ${language} files for: ${problem.title}`);

      // Ensure target directory exists
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Generate main problem file
      const problemFile = await this.generateProblemFile(problem, language);
      const problemFileName = `${problem.name}.${this.getFileExtension(language)}`;
      const problemFilePath = path.join(targetDir, problemFileName);
      
      fs.writeFileSync(problemFilePath, problemFile);
      console.log(`✅ Created: ${problemFileName}`);

      // Generate test file
      const testFile = await this.generateTestFile(problem, language);
      const testFileName = `${problem.name}.test.${this.getFileExtension(language)}`;
      const testFilePath = path.join(targetDir, testFileName);
      
      fs.writeFileSync(testFilePath, testFile);
      console.log(`✅ Created: ${testFileName}`);

      // Generate README file
      const readmeFile = await this.generateReadmeFile(problem);
      const readmeFilePath = path.join(targetDir, 'README.md');
      
      fs.writeFileSync(readmeFilePath, readmeFile);
      console.log(`✅ Created: README.md`);

      return {
        problemFile: problemFilePath,
        testFile: testFilePath,
        readmeFile: readmeFilePath,
        language: language
      };
    } catch (error) {
      throw new Error(`Failed to generate problem files: ${error.message}`);
    }
  }

  /**
   * Enhance problem data with additional information
   */
  async enhanceProblemData(problemData, language, options) {
    try {
      // Add language-specific enhancements
      problemData.currentLanguage = language;
      
      // Add template information
      problemData.template = await this.generateTemplateInfo(problemData, language);
      
      // Add test case information
      if (!problemData.testCases || problemData.testCases.length === 0) {
        problemData.testCases = await this.generateTestCases(problemData);
      }

      // Add hints if requested
      if (options.includeHints) {
        problemData.hints = await this.generateHints(problemData);
      }

      // Add related problems
      problemData.relatedProblems = await this.findRelatedProblems(problemData);

      // Add difficulty analysis
      problemData.analysis = this.analyzeProblemDifficulty(problemData);

      return problemData;
    } catch (error) {
      console.warn(`Failed to enhance problem data: ${error.message}`);
      return problemData;
    }
  }

  /**
   * Generate template information
   */
  async generateTemplateInfo(problem, language) {
    const signature = problem.functionSignatures?.[language];
    
    if (!signature) {
      return {
        hasSignature: false,
        needsCustomTypes: false,
        imports: []
      };
    }

    const needsListNode = signature.params.some(p => p.type.includes('ListNode')) || 
                         signature.returnType.includes('ListNode');
    
    const needsTreeNode = signature.params.some(p => p.type.includes('TreeNode')) || 
                         signature.returnType.includes('TreeNode');

    const imports = [];
    if (language === 'python') {
      if (signature.params.some(p => p.type.includes('List'))) {
        imports.push('from typing import List');
      }
      if (needsListNode || needsTreeNode) {
        imports.push('from typing import Optional');
      }
    }

    return {
      hasSignature: true,
      needsListNode,
      needsTreeNode,
      needsCustomTypes: needsListNode || needsTreeNode,
      imports,
      signature
    };
  }

  /**
   * Generate test cases from problem data
   */
  async generateTestCases(problem) {
    const testCases = [];

    // Add example test cases
    if (problem.examples) {
      for (const example of problem.examples) {
        try {
          const testCase = this.parseExampleToTestCase(example);
          if (testCase) {
            testCases.push(testCase);
          }
        } catch (error) {
          console.warn(`Failed to parse example: ${error.message}`);
        }
      }
    }

    // Generate additional edge cases based on constraints
    const edgeCases = this.generateEdgeCases(problem);
    testCases.push(...edgeCases);

    return testCases;
  }

  /**
   * Parse example to test case
   */
  parseExampleToTestCase(example) {
    try {
      // This is a simplified parser - would need more sophisticated logic
      const input = this.parseInput(example.input);
      const expected = this.parseOutput(example.output);
      
      return {
        input: Array.isArray(input) ? input : [input],
        expected: expected,
        description: example.explanation
      };
    } catch (error) {
      console.warn(`Failed to parse example: ${error.message}`);
      return null;
    }
  }

  /**
   * Parse input string to actual values
   */
  parseInput(inputStr) {
    // Remove common prefixes
    const cleaned = inputStr.replace(/^\w+\s*=\s*/, '');
    
    try {
      return JSON.parse(cleaned);
    } catch {
      // Handle special cases
      if (cleaned.includes('[') && cleaned.includes(']')) {
        // Try to parse as array
        const arrayMatch = cleaned.match(/\[([^\]]+)\]/);
        if (arrayMatch) {
          return JSON.parse(`[${arrayMatch[1]}]`);
        }
      }
      
      // Return as string if all else fails
      return cleaned.replace(/"/g, '');
    }
  }

  /**
   * Parse output string to expected value
   */
  parseOutput(outputStr) {
    try {
      return JSON.parse(outputStr);
    } catch {
      // Handle special cases
      if (outputStr.toLowerCase() === 'true') return true;
      if (outputStr.toLowerCase() === 'false') return false;
      if (outputStr.toLowerCase() === 'null') return null;
      
      // Try to parse as number
      const num = parseFloat(outputStr);
      if (!isNaN(num)) return num;
      
      // Return as string
      return outputStr.replace(/"/g, '');
    }
  }

  /**
   * Generate edge cases based on constraints
   */
  generateEdgeCases(problem) {
    const edgeCases = [];
    
    // Analyze constraints to generate edge cases
    if (problem.constraints) {
      for (const constraint of problem.constraints) {
        const cases = this.parseConstraintForEdgeCases(constraint);
        edgeCases.push(...cases);
      }
    }

    return edgeCases;
  }

  /**
   * Parse constraint to generate edge cases
   */
  parseConstraintForEdgeCases(constraint) {
    const cases = [];
    
    // Look for array length constraints
    const lengthMatch = constraint.match(/(\w+)\.length\s*[<>=]+\s*(\d+)/);
    if (lengthMatch) {
      const maxLength = parseInt(lengthMatch[2]);
      
      // Empty array case
      cases.push({
        input: [[]],
        expected: null, // Would need problem-specific logic
        description: 'Empty array edge case'
      });
      
      // Single element case
      cases.push({
        input: [[1]],
        expected: null,
        description: 'Single element edge case'
      });
    }

    // Look for value range constraints
    const rangeMatch = constraint.match(/(-?\d+)\s*<=\s*\w+\s*<=\s*(-?\d+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1]);
      const max = parseInt(rangeMatch[2]);
      
      // Minimum value case
      cases.push({
        input: [min],
        expected: null,
        description: `Minimum value edge case: ${min}`
      });
      
      // Maximum value case
      cases.push({
        input: [max],
        expected: null,
        description: `Maximum value edge case: ${max}`
      });
    }

    return cases;
  }

  /**
   * Generate hints for the problem
   */
  async generateHints(problem) {
    // This would integrate with AI assistant
    // For now, return basic hints based on problem analysis
    const hints = [];
    
    // Analyze problem type
    if (problem.topics.includes('Array')) {
      hints.push({
        level: 1,
        text: 'Consider using two pointers or hash map for array problems'
      });
    }
    
    if (problem.topics.includes('Dynamic Programming')) {
      hints.push({
        level: 2,
        text: 'Think about breaking the problem into subproblems'
      });
    }
    
    if (problem.topics.includes('Binary Search')) {
      hints.push({
        level: 1,
        text: 'The array might be sorted - consider binary search'
      });
    }

    return hints;
  }

  /**
   * Find related problems
   */
  async findRelatedProblems(problem) {
    try {
      const related = [];
      
      // Find problems with similar topics
      if (problem.topics && problem.topics.length > 0) {
        // This would query the cache or API for related problems
        // For now, return empty array
      }
      
      return related;
    } catch (error) {
      console.warn(`Failed to find related problems: ${error.message}`);
      return [];
    }
  }

  /**
   * Analyze problem difficulty
   */
  analyzeProblemDifficulty(problem) {
    const analysis = {
      difficulty: problem.difficulty,
      estimatedTime: this.estimateTimeComplexity(problem),
      keySkills: this.identifyKeySkills(problem),
      commonMistakes: this.identifyCommonMistakes(problem)
    };

    return analysis;
  }

  /**
   * Estimate time complexity
   */
  estimateTimeComplexity(problem) {
    const timeEstimates = {
      easy: '15-30 minutes',
      medium: '30-60 minutes',
      hard: '60+ minutes'
    };

    return timeEstimates[problem.difficulty] || 'Unknown';
  }

  /**
   * Identify key skills needed
   */
  identifyKeySkills(problem) {
    const skills = [];
    
    if (problem.topics) {
      const skillMap = {
        'Array': 'Array manipulation',
        'Hash Table': 'Hash map usage',
        'Two Pointers': 'Two pointer technique',
        'Binary Search': 'Binary search algorithm',
        'Dynamic Programming': 'Dynamic programming',
        'Greedy': 'Greedy algorithms',
        'Backtracking': 'Backtracking',
        'Tree': 'Tree traversal',
        'Graph': 'Graph algorithms',
        'Linked List': 'Linked list operations'
      };

      for (const topic of problem.topics) {
        if (skillMap[topic]) {
          skills.push(skillMap[topic]);
        }
      }
    }

    return skills;
  }

  /**
   * Identify common mistakes
   */
  identifyCommonMistakes(problem) {
    const mistakes = [];
    
    if (problem.topics.includes('Array')) {
      mistakes.push('Off-by-one errors in array indexing');
    }
    
    if (problem.topics.includes('Linked List')) {
      mistakes.push('Not handling null pointers properly');
    }
    
    if (problem.topics.includes('Dynamic Programming')) {
      mistakes.push('Not considering base cases');
    }

    return mistakes;
  }

  /**
   * Generate problem file content
   */
  async generateProblemFile(problem, language) {
    const template = problem.template || await this.generateTemplateInfo(problem, language);
    
    switch (language) {
      case 'javascript':
        return this.generateJavaScriptProblem(problem, template);
      case 'python':
        return this.generatePythonProblem(problem, template);
      case 'java':
        return this.generateJavaProblem(problem, template);
      case 'cpp':
        return this.generateCppProblem(problem, template);
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }

  /**
   * Generate JavaScript problem file
   */
  generateJavaScriptProblem(problem, template) {
    const signature = template.signature;
    const params = signature.params.map(p => p.name).join(', ');
    const paramTypes = signature.params.map(p => `@param {${p.type}} ${p.name}`).join('\n * ');
    
    const examples = problem.examples.map((ex, i) => 
      `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? '\nExplanation: ' + ex.explanation : ''}`
    ).join('\n\n');
    
    const constraints = problem.constraints.map(c => `- ${c}`).join('\n');
    
    // Add bundled-data indicator for old cache entries from previous versions.
    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      ` * \n * 📚 LOCAL LIBRARY: This problem data is bundled with the package.\n` : '';
    
    const listNodeDef = template.needsListNode ? `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

` : '';
    
    const treeNodeDef = template.needsTreeNode ? `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

` : '';
    
    return `${listNodeDef}${treeNodeDef}/**
 * ${problem.id}. ${problem.title}
 * Official Practice Link: https://leetcode.com/problems/${problem.name}/
 *${fallbackNotice}
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

  /**
   * Generate Python problem file
   */
  generatePythonProblem(problem, template) {
    const signature = template.signature;
    const params = signature.params.map(p => `${p.name}: ${p.type}`).join(', ');
    
    const examples = problem.examples.map((ex, i) => 
      `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? '\nExplanation: ' + ex.explanation : ''}`
    ).join('\n\n');
    
    const constraints = problem.constraints.map(c => `- ${c}`).join('\n');
    
    // Add bundled-data indicator for old cache entries from previous versions.
    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      `\n📚 LOCAL LIBRARY: This problem data is bundled with the package.\n` : '';
    
    const listNodeDef = template.needsListNode ? `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

` : '';
    
    const treeNodeDef = template.needsTreeNode ? `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

` : '';
    
    const imports = template.imports.length > 0 ? template.imports.join('\n') + '\n' : '';
    
    return `"""
${problem.id}. ${problem.title}
Official Practice Link: https://leetcode.com/problems/${problem.name}/
${fallbackNotice}
${problem.description}

${examples}

Constraints:
${constraints}${problem.followUp ? '\n\nFollow-up: ' + problem.followUp : ''}
"""

${listNodeDef}${treeNodeDef}${imports}
class Solution:
    def ${signature.name}(self, ${params}) -> ${signature.returnType}:
        pass

# For testing
if __name__ == "__main__":
    solution = Solution()
    # Test your solution here`;
  }

  /**
   * Generate Java problem file
   */
  generateJavaProblem(problem, template) {
    const signature = template.signature;
    const params = signature.params.map(p => `${p.type} ${p.name}`).join(', ');
    
    const examples = problem.examples.map((ex, i) => 
      `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? '\nExplanation: ' + ex.explanation : ''}`
    ).join('\n\n');
    
    const constraints = problem.constraints.map(c => `- ${c}`).join('\n');
    
    // Add bundled-data indicator for old cache entries from previous versions.
    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      ` * \n * 📚 LOCAL LIBRARY: This problem data is bundled with the package.\n` : '';
    
    const listNodeDef = template.needsListNode ? `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */

` : '';
    
    const treeNodeDef = template.needsTreeNode ? `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

` : '';
    
    return `${listNodeDef}${treeNodeDef}/**
 * ${problem.id}. ${problem.title}
 * Official Practice Link: https://leetcode.com/problems/${problem.name}/
 *${fallbackNotice}
 * ${problem.description.replace(/\n/g, '\n * ')}
 * 
 * ${examples.replace(/\n/g, '\n * ')}
 * 
 * Constraints:
 * ${constraints.replace(/\n/g, '\n * ')}
${problem.followUp ? ' * \n * Follow-up: ' + problem.followUp : ''}
 */

class Solution {
    public ${signature.returnType} ${signature.name}(${params}) {
        
    }
}`;
  }

  /**
   * Generate C++ problem file
   */
  generateCppProblem(problem, template) {
    const signature = template.signature;
    const params = signature.params.map(p => `${p.type} ${p.name}`).join(', ');
    
    const examples = problem.examples.map((ex, i) => 
      `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? '\nExplanation: ' + ex.explanation : ''}`
    ).join('\n\n');
    
    const constraints = problem.constraints.map(c => `- ${c}`).join('\n');
    
    // Add bundled-data indicator for old cache entries from previous versions.
    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      ` * \n * 📚 LOCAL LIBRARY: This problem data is bundled with the package.\n` : '';
    
    const listNodeDef = template.needsListNode ? `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */

` : '';
    
    const treeNodeDef = template.needsTreeNode ? `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

` : '';
    
    return `${listNodeDef}${treeNodeDef}/**
 * ${problem.id}. ${problem.title}
 * Official Practice Link: https://leetcode.com/problems/${problem.name}/
 *${fallbackNotice}
 * ${problem.description.replace(/\n/g, '\n * ')}
 * 
 * ${examples.replace(/\n/g, '\n * ')}
 * 
 * Constraints:
 * ${constraints.replace(/\n/g, '\n * ')}
${problem.followUp ? ' * \n * Follow-up: ' + problem.followUp : ''}
 */

#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    ${signature.returnType} ${signature.name}(${params}) {
        
    }
};`;
  }

  /**
   * Generate test file
   */
  async generateTestFile(problem, language) {
    // Generate comprehensive test cases using TestCaseGenerator
    const testCases = TestCaseGenerator.generateTestCases(problem);
    
    switch (language) {
      case 'javascript':
        return this.generateJavaScriptTestFile(problem, testCases);
      case 'python':
        return this.generatePythonTestFile(problem, testCases);
      case 'java':
        return this.generateJavaTestFile(problem, testCases);
      case 'cpp':
        return this.generateCppTestFile(problem, testCases);
      default:
        throw new Error(`Unsupported language for test generation: ${language}`);
    }
  }

  /**
   * Generate JavaScript test file
   */
  generateJavaScriptTestFile(problem, testCases) {
    const signature = problem.functionSignatures?.javascript;
    if (!signature) {
      return `// Test file for ${problem.title}\n// No function signature available for testing`;
    }

    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      `// 📚 LOCAL LIBRARY: This test file uses bundled problem data\n\n` : '';

    const testCaseCode = testCases.map((testCase, index) => {
      const inputStr = testCase.input.map(val => JSON.stringify(val)).join(', ');
      const expectedStr = JSON.stringify(testCase.expected);
      const category = testCase.category || 'basic';
      const categoryEmoji = category === 'edge' ? '⚠️' : category === 'stress' ? '🔥' : '✅';
      
      return `  // ${categoryEmoji} ${testCase.description || `Test case ${index + 1}`} (${category})
  runTest('${testCase.description || `Test case ${index + 1}`}', () => {
    const result = ${signature.name}(${inputStr});
    ${testCase.expected !== null ? `assertEqual(result, ${expectedStr});` : `// Expected result: ${expectedStr || 'To be determined'}`}
  });`;
    }).join('\n\n');

    // Convert test cases to simple array format
    const testCaseArray = testCases.map((testCase, index) => {
      const category = testCase.category || 'basic';
      const description = (testCase.description || `Test case ${index + 1}`).replace(/"/g, '\\"');
      return `  {
    description: "${description}",
    input: [${testCase.input.map(val => JSON.stringify(val)).join(', ')}],
    expected: ${JSON.stringify(testCase.expected)},
    category: "${category}"
  }`;
    }).join(',\n');

    return `${fallbackNotice}const ${signature.name} = require('./${problem.name}');

// Test cases array - simple and clean
const testCases = [
${testCaseArray}
];

// Simple test runner - pure JavaScript
function runTests() {
  console.log('🧪 Running tests for ${problem.title}\\n');
  
  let passed = 0;
  let failed = 0;
  
  for (let i = 0; i < testCases.length; i++) {
    const test = testCases[i];
    const emoji = test.category === 'edge' ? '⚠️' : test.category === 'stress' ? '🔥' : '✅';
    
    try {
      const result = ${signature.name}(...test.input);
      
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
  ${signature.name},
  runTests,
  runAllTests: runTests, // Alias for compatibility with lct test
  testCases
};`;
  }

  /**
   * Generate Python test file
   */
  generatePythonTestFile(problem, testCases) {
    const signature = problem.functionSignatures?.python;
    if (!signature) {
      return `# Test file for ${problem.title}\n# No function signature available for testing`;
    }

    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      `# 📚 LOCAL LIBRARY: This test file uses bundled problem data\n\n` : '';

    const testCaseCode = testCases.map((testCase, index) => {
      const inputStr = testCase.input.map(val => JSON.stringify(val)).join(', ');
      const expectedStr = JSON.stringify(testCase.expected);
      const category = testCase.category || 'basic';
      const categoryEmoji = category === 'edge' ? '⚠️' : category === 'stress' ? '🔥' : '✅';
      
      return `    def test_${index + 1}_${category}(self):
        """${categoryEmoji} ${testCase.description || `Test case ${index + 1}`} (${category})"""
        solution = Solution()
        result = solution.${signature.name}(${inputStr})
        ${testCase.expected !== null ? `self.assertEqual(result, ${expectedStr})` : `# Expected result: ${expectedStr || 'To be determined'}`}`;
    }).join('\n\n');

    return `${fallbackNotice}import unittest
from ${problem.name} import Solution

class Test${problem.title.replace(/\s+/g, '')}(unittest.TestCase):
${testCaseCode}

    def run_all_tests(self):
        """Run all test cases"""
        print(f"Running all tests for ${problem.title}...")
        # Add custom test runner logic here

if __name__ == '__main__':
    unittest.main()`;
  }

  /**
   * Generate Java test file
   */
  generateJavaTestFile(problem, testCases) {
    const signature = problem.functionSignatures?.java;
    if (!signature) {
      return `// Test file for ${problem.title}\n// No function signature available for testing`;
    }

    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      `// 📚 LOCAL LIBRARY: This test file uses bundled problem data\n\n` : '';

    const testCaseCode = testCases.map((testCase, index) => {
      const inputStr = testCase.input.map(val => JSON.stringify(val)).join(', ');
      const expectedStr = JSON.stringify(testCase.expected);
      const category = testCase.category || 'basic';
      const categoryEmoji = category === 'edge' ? '⚠️' : category === 'stress' ? '🔥' : '✅';
      
      return `    @Test
    public void test${index + 1}_${category}() {
        // ${categoryEmoji} ${testCase.description || `Test case ${index + 1}`} (${category})
        Solution solution = new Solution();
        ${signature.returnType} result = solution.${signature.name}(${inputStr});
        ${testCase.expected !== null ? `assertEquals(${expectedStr}, result);` : `// Expected result: ${expectedStr || 'To be determined'}`}
    }`;
    }).join('\n\n');

    return `${fallbackNotice}import org.junit.Test;
import static org.junit.Assert.*;

public class ${problem.title.replace(/\s+/g, '')}Test {
${testCaseCode}

    public void runAllTests() {
        System.out.println("Running all tests for ${problem.title}...");
        // Add custom test runner logic here
    }
}`;
  }

  /**
   * Generate C++ test file
   */
  generateCppTestFile(problem, testCases) {
    const signature = problem.functionSignatures?.cpp;
    if (!signature) {
      return `// Test file for ${problem.title}\n// No function signature available for testing`;
    }

    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      `// 📚 LOCAL LIBRARY: This test file uses bundled problem data\n\n` : '';

    const testCaseCode = testCases.map((testCase, index) => {
      const inputStr = testCase.input.map(val => JSON.stringify(val)).join(', ');
      const expectedStr = JSON.stringify(testCase.expected);
      const category = testCase.category || 'basic';
      const categoryEmoji = category === 'edge' ? '⚠️' : category === 'stress' ? '🔥' : '✅';
      
      return `    // ${categoryEmoji} ${testCase.description || `Test case ${index + 1}`} (${category})
    void test${index + 1}_${category}() {
        Solution solution;
        ${signature.returnType} result = solution.${signature.name}(${inputStr});
        ${testCase.expected !== null ? `assert(result == ${expectedStr});` : `// Expected result: ${expectedStr || 'To be determined'}`}
        cout << "Test ${index + 1} (${category}): PASSED" << endl;
    }`;
    }).join('\n\n');

    return `${fallbackNotice}#include <iostream>
#include <cassert>
#include <vector>
#include <string>
using namespace std;

// Include the solution
#include "${problem.name}.cpp"

class ${problem.title.replace(/\s+/g, '')}Test {
public:
${testCaseCode}

    void runAllTests() {
        cout << "Running all tests for ${problem.title}..." << endl;
        // Add test execution logic here
    }
};

int main() {
    ${problem.title.replace(/\s+/g, '')}Test tester;
    tester.runAllTests();
    return 0;
}`;
  }

  /**
   * Generate README file
   */
  async generateReadmeFile(problem) {
    const examples = problem.examples.map((ex, i) => 
      `### Example ${i + 1}\n**Input:** ${ex.input}\n**Output:** ${ex.output}\n${ex.explanation ? `**Explanation:** ${ex.explanation}` : ''}`
    ).join('\n\n');
    
    const constraints = problem.constraints.map(c => `- ${c}`).join('\n');
    
    // Add bundled-data notice for old cache entries from previous versions.
    const fallbackNotice = problem.metadata?.source === 'enhanced-fallback' || problem.metadata?.source === 'fallback' ? 
      `\n## Local Library Notice\n\nThis problem data is bundled with the package for local AI-assisted practice.\n\nCompleteness Score: ${problem.metadata?.completeness || 'N/A'}%\n` : '';
    
    // Add hints section if available
    const hintsSection = problem.hints && problem.hints.length > 0 ? 
      `\n## Hints\n\n${problem.hints.map((hint, i) => `**Level ${hint.level}:** ${hint.text}`).join('\n\n')}\n` : '';
    
    return `# ${problem.id}. ${problem.title}

**Difficulty:** ${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
**Topics:** ${problem.topics.join(', ')}
**Companies:** ${problem.companies.join(', ')}
${fallbackNotice}
## Problem Description

${problem.description}

## Examples

${examples}

## Constraints

${constraints}

${problem.followUp ? `## Follow-up\n\n${problem.followUp}` : ''}
${hintsSection}
## Links

- [Official Practice Page](https://leetcode.com/problems/${problem.name}/)

## Notes

- Use \`lct test ${problem.name}\` to run tests
- Use \`lct hint ${problem.name}\` for hints
- Use \`lct open ${problem.name}\` to open in browser`;
  }

  /**
   * Get file extension for language
   */
  getFileExtension(language) {
    const extensions = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp'
    };
    
    return extensions[language] || 'txt';
  }
}

module.exports = { ProblemManagerImpl };
