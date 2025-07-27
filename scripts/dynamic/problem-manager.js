/**
 * Problem Manager - Orchestrates problem fetching, caching, and generation
 */

const { ProblemManager } = require('./interfaces');
const { LeetCodeAPIImpl } = require('./leetcode-api');
const { CacheManagerImpl } = require('./cache-manager');
const { OfflineManager } = require('./offline-manager');
const { ProblemParser } = require('./problem-parser');
const { config } = require('./config');

class ProblemManagerImpl extends ProblemManager {
  constructor() {
    super();
    this.api = new LeetCodeAPIImpl();
    this.cache = new CacheManagerImpl();
    this.offline = new OfflineManager();
    this.parser = new ProblemParser();
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

      // Try offline/cache first unless force refresh
      if (!forceRefresh) {
        problemData = await this.offline.getProblemOffline(identifier);
      }

      // Fetch from API if not in cache or force refresh
      if (!problemData || forceRefresh) {
        if (!this.offline.getConnectivityStatus().isOnline && !config.get('network.offlineMode')) {
          throw new Error(`Cannot fetch problem "${identifier}" - offline and not cached`);
        }

        console.log(`🌐 Fetching problem from LeetCode: ${identifier}`);
        problemData = await this.api.fetchProblem(identifier);
        
        // Validate fetched data
        const validation = ProblemParser.validateProblemData(problemData);
        if (!validation.isValid) {
          throw new Error(`Invalid problem data: ${validation.errors.join(', ')}`);
        }

        if (validation.warnings.length > 0) {
          console.warn(`⚠️  Problem warnings: ${validation.warnings.join(', ')}`);
        }

        // Cache the fetched problem
        await this.cache.set(cacheKey, problemData, {
          source: 'leetcode-api',
          version: '1.0',
          language: language,
          fetchedAt: new Date().toISOString()
        });

        console.log(`✅ Problem cached: ${identifier}`);
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

      // Try to get from search results first
      let randomProblem;
      
      if (this.offline.getConnectivityStatus().isOnline) {
        randomProblem = await this.api.getRandomProblem(difficulty);
      } else {
        // Get from cached problems
        const offlineProblems = await this.offline.getOfflineProblemList();
        const filteredProblems = offlineProblems.problems.filter(
          p => p.difficulty.toLowerCase() === difficulty.toLowerCase()
        );
        
        if (filteredProblems.length === 0) {
          throw new Error(`No offline ${difficulty} problems available`);
        }
        
        const randomIndex = Math.floor(Math.random() * filteredProblems.length);
        randomProblem = filteredProblems[randomIndex];
      }

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
    
    const listNodeDef = template.needsListNode ? `/**
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
    
    const listNodeDef = template.needsListNode ? `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

` : '';
    
    const imports = template.imports.join('\n') + '\n';
    
    return `"""
${problem.id}. ${problem.title}
https://leetcode.com/problems/${problem.name}/

${problem.description}

${examples}

Constraints:
${constraints}${problem.followUp ? '\n\nFollow-up: ' + problem.followUp : ''}
"""

${listNodeDef}${imports}
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
    
    return `/**
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
    
    return `/**
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
    // Use existing test generation logic from challenge.js
    // This would be integrated with the existing test system
    return `// Test file for ${problem.title}\n// Implementation would integrate with existing test system`;
  }

  /**
   * Generate README file
   */
  async generateReadmeFile(problem) {
    const examples = problem.examples.map((ex, i) => 
      `### Example ${i + 1}\n**Input:** ${ex.input}\n**Output:** ${ex.output}\n${ex.explanation ? `**Explanation:** ${ex.explanation}` : ''}`
    ).join('\n\n');
    
    const constraints = problem.constraints.map(c => `- ${c}`).join('\n');
    
    return `# ${problem.id}. ${problem.title}

**Difficulty:** ${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
**Topics:** ${problem.topics.join(', ')}
**Companies:** ${problem.companies.join(', ')}

## Problem Description

${problem.description}

## Examples

${examples}

## Constraints

${constraints}

${problem.followUp ? `## Follow-up\n\n${problem.followUp}` : ''}

## Links

- [LeetCode Problem](https://leetcode.com/problems/${problem.name}/)

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