/**
 * Test Case Generator for Enhanced Fallback Problems
 * Generates comprehensive test cases including edge cases and stress tests
 */

class TestCaseGenerator {
  /**
   * Generate comprehensive test cases from problem data
   */
  static generateTestCases(problem) {
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

    // Add predefined test cases if available
    if (problem.testCases) {
      testCases.push(...problem.testCases);
    }

    // Generate additional edge cases based on constraints
    const edgeCases = this.generateEdgeCases(problem);
    testCases.push(...edgeCases);

    // Generate stress tests
    const stressTests = this.generateStressTests(problem);
    testCases.push(...stressTests);

    return this.validateAndCleanTestCases(testCases);
  }

  /**
   * Parse example to test case
   */
  static parseExampleToTestCase(example) {
    try {
      const input = this.parseInput(example.input);
      const expected = this.parseOutput(example.output);
      
      return {
        input: Array.isArray(input) ? input : [input],
        expected: expected,
        description: example.explanation || 'Example test case',
        category: 'basic',
        isEdgeCase: false
      };
    } catch (error) {
      console.warn(`Failed to parse example: ${error.message}`);
      return null;
    }
  }

  /**
   * Parse input string to actual values
   */
  static parseInput(inputStr) {
    // Handle multiple parameters
    const params = [];
    const paramMatches = inputStr.match(/(\w+)\s*=\s*([^,]+)/g);
    
    if (paramMatches) {
      for (const match of paramMatches) {
        const [, paramName, paramValue] = match.match(/(\w+)\s*=\s*(.+)/);
        params.push(this.parseValue(paramValue.trim()));
      }
      return params;
    }
    
    // Single parameter
    const cleaned = inputStr.replace(/^\w+\s*=\s*/, '');
    return [this.parseValue(cleaned)];
  }

  /**
   * Parse output string to expected value
   */
  static parseOutput(outputStr) {
    return this.parseValue(outputStr);
  }

  /**
   * Parse a value from string representation
   */
  static parseValue(valueStr) {
    const trimmed = valueStr.trim();
    
    try {
      return JSON.parse(trimmed);
    } catch {
      // Handle special cases
      if (trimmed.toLowerCase() === 'true') return true;
      if (trimmed.toLowerCase() === 'false') return false;
      if (trimmed.toLowerCase() === 'null') return null;
      
      // Try to parse as number
      const num = parseFloat(trimmed);
      if (!isNaN(num)) return num;
      
      // Handle arrays manually
      if (trimmed.includes('[') && trimmed.includes(']')) {
        try {
          const arrayMatch = trimmed.match(/\[([^\]]*)\]/);
          if (arrayMatch) {
            const content = arrayMatch[1];
            if (content.trim() === '') return [];
            return content.split(',').map(item => this.parseValue(item.trim()));
          }
        } catch (error) {
          console.warn(`Failed to parse array: ${error.message}`);
        }
      }
      
      // Return as string, removing quotes
      return trimmed.replace(/^["']|["']$/g, '');
    }
  }

  /**
   * Generate edge cases based on constraints
   */
  static generateEdgeCases(problem) {
    const edgeCases = [];
    
    if (!problem.constraints) return edgeCases;
    
    for (const constraint of problem.constraints) {
      const cases = this.parseConstraintForEdgeCases(constraint, problem);
      edgeCases.push(...cases);
    }

    return edgeCases;
  }

  /**
   * Parse constraint to generate edge cases
   */
  static parseConstraintForEdgeCases(constraint, problem) {
    const cases = [];
    
    // Array length constraints
    const lengthMatch = constraint.match(/(\w+)\.length\s*[<>=]+\s*(\d+)/);
    if (lengthMatch) {
      const arrayName = lengthMatch[1];
      const maxLength = parseInt(lengthMatch[2]);
      
      // Minimum length case
      if (constraint.includes('>=') || constraint.includes('<=')) {
        const minLength = constraint.includes('>=') ? 
          parseInt(constraint.match(/>=\s*(\d+)/)?.[1] || '1') : 1;
        
        if (minLength === 1) {
          cases.push({
            input: this.generateArrayInput(1, problem),
            expected: null, // Would need problem-specific logic
            description: 'Minimum array length',
            category: 'edge',
            isEdgeCase: true
          });
        }
      }
      
      // Empty array case (if allowed)
      if (constraint.includes('>=') && constraint.includes('0')) {
        cases.push({
          input: this.generateArrayInput(0, problem),
          expected: null,
          description: 'Empty array',
          category: 'edge',
          isEdgeCase: true
        });
      }
    }

    // Value range constraints
    const rangeMatch = constraint.match(/(-?\d+)\s*<=\s*\w+\s*<=\s*(-?\d+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1]);
      const max = parseInt(rangeMatch[2]);
      
      cases.push({
        input: [min],
        expected: null,
        description: `Minimum value: ${min}`,
        category: 'edge',
        isEdgeCase: true
      });
      
      cases.push({
        input: [max],
        expected: null,
        description: `Maximum value: ${max}`,
        category: 'edge',
        isEdgeCase: true
      });
    }

    // String length constraints
    const stringLengthMatch = constraint.match(/(\w+)\.length\s*[<>=]+\s*(\d+)/);
    if (stringLengthMatch && problem.topics?.includes('String')) {
      const maxLength = parseInt(stringLengthMatch[2]);
      
      cases.push({
        input: ['a'],
        expected: null,
        description: 'Single character string',
        category: 'edge',
        isEdgeCase: true
      });
      
      if (maxLength > 1) {
        cases.push({
          input: ['a'.repeat(Math.min(maxLength, 100))],
          expected: null,
          description: 'Long string',
          category: 'edge',
          isEdgeCase: true
        });
      }
    }

    return cases;
  }

  /**
   * Generate stress tests
   */
  static generateStressTests(problem) {
    const stressTests = [];
    
    // Generate large input tests based on constraints
    if (problem.constraints) {
      for (const constraint of problem.constraints) {
        const stressTest = this.generateStressTestFromConstraint(constraint, problem);
        if (stressTest) {
          stressTests.push(stressTest);
        }
      }
    }

    return stressTests;
  }

  /**
   * Generate stress test from constraint
   */
  static generateStressTestFromConstraint(constraint, problem) {
    // Large array test
    const arrayLengthMatch = constraint.match(/(\w+)\.length\s*<=\s*(\d+)/);
    if (arrayLengthMatch) {
      const maxLength = parseInt(arrayLengthMatch[2]);
      const testSize = Math.min(maxLength, 1000); // Cap at 1000 for performance
      
      return {
        input: this.generateArrayInput(testSize, problem),
        expected: null,
        description: `Large array with ${testSize} elements`,
        category: 'stress',
        isEdgeCase: false
      };
    }

    // Large string test
    const stringLengthMatch = constraint.match(/(\w+)\.length\s*<=\s*(\d+)/);
    if (stringLengthMatch && problem.topics?.includes('String')) {
      const maxLength = parseInt(stringLengthMatch[2]);
      const testSize = Math.min(maxLength, 1000);
      
      return {
        input: [this.generateRandomString(testSize)],
        expected: null,
        description: `Large string with ${testSize} characters`,
        category: 'stress',
        isEdgeCase: false
      };
    }

    return null;
  }

  /**
   * Generate array input for testing
   */
  static generateArrayInput(length, problem) {
    if (length === 0) return [[]];
    
    const array = [];
    for (let i = 0; i < length; i++) {
      // Generate values based on problem type
      if (problem.topics?.includes('Array')) {
        array.push(Math.floor(Math.random() * 100) - 50); // Random integers
      } else {
        array.push(i + 1); // Sequential integers
      }
    }
    
    return [array];
  }

  /**
   * Generate random string for testing
   */
  static generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Validate and clean test cases
   */
  static validateAndCleanTestCases(testCases) {
    const validTestCases = [];
    
    for (const testCase of testCases) {
      if (this.isValidTestCase(testCase)) {
        validTestCases.push(testCase);
      }
    }
    
    // Remove duplicates
    return this.removeDuplicateTestCases(validTestCases);
  }

  /**
   * Check if test case is valid
   */
  static isValidTestCase(testCase) {
    return testCase &&
           testCase.input !== undefined &&
           Array.isArray(testCase.input) &&
           testCase.description &&
           testCase.category;
  }

  /**
   * Remove duplicate test cases
   */
  static removeDuplicateTestCases(testCases) {
    const seen = new Set();
    const unique = [];
    
    for (const testCase of testCases) {
      const key = JSON.stringify(testCase.input);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(testCase);
      }
    }
    
    return unique;
  }

  /**
   * Generate test cases for specific problem types
   */
  static generateProblemSpecificTestCases(problem) {
    const testCases = [];
    
    // Array problems
    if (problem.topics?.includes('Array')) {
      testCases.push(...this.generateArrayTestCases(problem));
    }
    
    // String problems
    if (problem.topics?.includes('String')) {
      testCases.push(...this.generateStringTestCases(problem));
    }
    
    // Tree problems
    if (problem.topics?.includes('Tree')) {
      testCases.push(...this.generateTreeTestCases(problem));
    }
    
    // Math problems
    if (problem.topics?.includes('Math')) {
      testCases.push(...this.generateMathTestCases(problem));
    }
    
    return testCases;
  }

  /**
   * Generate array-specific test cases
   */
  static generateArrayTestCases(problem) {
    return [
      {
        input: [[1, 2, 3, 4, 5]],
        expected: null,
        description: 'Sequential array',
        category: 'basic',
        isEdgeCase: false
      },
      {
        input: [[5, 4, 3, 2, 1]],
        expected: null,
        description: 'Reverse sequential array',
        category: 'basic',
        isEdgeCase: false
      },
      {
        input: [[1, 1, 1, 1, 1]],
        expected: null,
        description: 'All same elements',
        category: 'edge',
        isEdgeCase: true
      }
    ];
  }

  /**
   * Generate string-specific test cases
   */
  static generateStringTestCases(problem) {
    return [
      {
        input: ['abc'],
        expected: null,
        description: 'Simple string',
        category: 'basic',
        isEdgeCase: false
      },
      {
        input: [''],
        expected: null,
        description: 'Empty string',
        category: 'edge',
        isEdgeCase: true
      },
      {
        input: ['a'],
        expected: null,
        description: 'Single character',
        category: 'edge',
        isEdgeCase: true
      }
    ];
  }

  /**
   * Generate tree-specific test cases
   */
  static generateTreeTestCases(problem) {
    return [
      {
        input: [null],
        expected: null,
        description: 'Empty tree',
        category: 'edge',
        isEdgeCase: true
      }
    ];
  }

  /**
   * Generate math-specific test cases
   */
  static generateMathTestCases(problem) {
    return [
      {
        input: [0],
        expected: null,
        description: 'Zero input',
        category: 'edge',
        isEdgeCase: true
      },
      {
        input: [1],
        expected: null,
        description: 'One input',
        category: 'edge',
        isEdgeCase: true
      },
      {
        input: [-1],
        expected: null,
        description: 'Negative input',
        category: 'edge',
        isEdgeCase: true
      }
    ];
  }
}

module.exports = { TestCaseGenerator };