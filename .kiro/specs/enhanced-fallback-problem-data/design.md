# Design Document

## Overview

The current fallback system in the dynamic LeetCode integration provides basic problem data when the LeetCode API returns 403 errors, but it generates incomplete problem files with minimal descriptions and empty test files. This design enhances the fallback system to provide rich, comprehensive problem data that matches the quality and completeness of live LeetCode problems, ensuring a consistent practice experience regardless of data source.

## Architecture

### Current State Analysis
- **Fallback Trigger**: Activated when LeetCode API returns 403/Forbidden errors
- **Current Data Source**: Limited hardcoded problem data in `enhanceFallbackProblem()` method
- **Current Coverage**: Only 6 problems with detailed data (two-sum, valid-parentheses, etc.)
- **Current Issues**: 
  - Minimal problem descriptions
  - Empty or missing test cases
  - Limited problem variety
  - Inconsistent data structure

### Proposed Architecture
1. **Enhanced Fallback Database**: Comprehensive problem data store with 50+ popular problems
2. **Rich Problem Templates**: Complete problem descriptions, examples, and constraints
3. **Comprehensive Test Generation**: Multiple test cases including edge cases
4. **Consistent Data Structure**: Standardized format matching live LeetCode data
5. **Transparent Fallback Mode**: Clear indication when using fallback data

## Components and Interfaces

### 1. Enhanced Fallback Database
```javascript
// Expanded problem database structure
const ENHANCED_FALLBACK_PROBLEMS = {
  'problem-slug': {
    id: number,
    title: string,
    name: string,
    difficulty: 'easy' | 'medium' | 'hard',
    description: string, // Rich, detailed description
    examples: Array<{
      input: string,
      output: string,
      explanation?: string
    }>,
    constraints: string[],
    followUp?: string,
    topics: string[],
    companies: string[],
    functionSignatures: {
      javascript: FunctionSignature,
      python: FunctionSignature,
      java: FunctionSignature,
      cpp: FunctionSignature
    },
    testCases: Array<{
      input: any[],
      expected: any,
      description: string,
      isEdgeCase?: boolean
    }>,
    hints: Array<{
      level: number,
      text: string
    }>
  }
}
```

### 2. Enhanced Problem Generator
```javascript
class EnhancedFallbackGenerator {
  generateProblemFile(problem, language): string
  generateTestFile(problem, language): string
  generateReadmeFile(problem): string
  validateProblemData(problem): ValidationResult
}
```

### 3. Test Case Generator
```javascript
class TestCaseGenerator {
  generateBasicTests(examples): TestCase[]
  generateEdgeCases(constraints): TestCase[]
  generateStressTests(constraints): TestCase[]
  validateTestCases(testCases, signature): boolean
}
```

### 4. Fallback Mode Indicator
```javascript
class FallbackModeIndicator {
  markAsFallback(problemData): ProblemData
  displayFallbackNotice(): void
  suggestOnlineMode(): void
}
```

## Data Models

### Enhanced Problem Data Model
```javascript
{
  // Core identification
  id: number,
  title: string,
  name: string,
  difficulty: 'easy' | 'medium' | 'hard',
  
  // Rich content
  description: string, // Detailed, multi-paragraph description
  examples: Array<{
    input: string,
    output: string,
    explanation: string
  }>,
  constraints: string[],
  followUp?: string,
  
  // Categorization
  topics: string[],
  companies: string[],
  
  // Language support
  functionSignatures: {
    [language]: {
      name: string,
      params: Array<{ name: string, type: string }>,
      returnType: string
    }
  },
  
  // Testing
  testCases: Array<{
    input: any[],
    expected: any,
    description: string,
    isEdgeCase: boolean,
    category: 'basic' | 'edge' | 'stress'
  }>,
  
  // Learning support
  hints: Array<{
    level: number,
    text: string,
    category: 'approach' | 'implementation' | 'optimization'
  }>,
  
  // Metadata
  metadata: {
    source: 'fallback',
    version: string,
    lastUpdated: Date,
    completeness: number // 0-100 score
  }
}
```

### Test Case Model
```javascript
{
  input: any[], // Array of function parameters
  expected: any, // Expected return value
  description: string, // Human-readable description
  isEdgeCase: boolean,
  category: 'basic' | 'edge' | 'stress',
  constraints?: string[], // Which constraints this tests
  timeComplexity?: string,
  spaceComplexity?: string
}
```

## Error Handling

### Fallback Data Validation
- Validate problem data completeness before serving
- Ensure all required fields are present
- Verify test cases are executable
- Check function signatures are valid for target language

### Graceful Degradation
- If enhanced fallback data is corrupted, fall back to minimal data
- Provide clear error messages about data limitations
- Suggest alternative problems if requested problem unavailable

### User Feedback
- Clear indication when using fallback mode
- Explanation of limitations compared to live data
- Guidance on when to retry with live API

## Testing Strategy

### Fallback Data Quality Testing
- Validate all problem descriptions are complete and accurate
- Ensure examples are properly formatted and executable
- Verify constraints are realistic and testable
- Check function signatures work in all supported languages

### Test Case Generation Testing
- Verify generated test cases cover basic functionality
- Ensure edge cases are properly identified and tested
- Validate stress tests respect problem constraints
- Check test cases execute correctly in all languages

### Integration Testing
- Test fallback activation when LeetCode API fails
- Verify seamless transition between live and fallback data
- Test problem file generation with fallback data
- Validate user experience consistency

### Performance Testing
- Measure fallback data loading time
- Test memory usage with large fallback database
- Verify test case generation performance
- Check file generation speed

## Implementation Phases

### Phase 1: Enhanced Fallback Database
- Expand problem database from 6 to 50+ problems
- Add comprehensive descriptions, examples, and constraints
- Include popular problems across all difficulty levels
- Add proper function signatures for all supported languages

### Phase 2: Rich Test Case Generation
- Implement comprehensive test case generation
- Add edge case detection based on constraints
- Generate stress tests for performance validation
- Ensure test cases are executable and meaningful

### Phase 3: Improved File Generation
- Enhance problem file templates with rich content
- Generate comprehensive test files with multiple test cases
- Create detailed README files with problem analysis
- Ensure consistent formatting across all languages

### Phase 4: Fallback Mode Transparency
- Add clear indicators when using fallback data
- Provide user guidance about fallback limitations
- Implement suggestions for switching to live data
- Add fallback data quality metrics

## Enhanced Problem Database Structure

### Problem Categories to Include
1. **Array Problems** (15 problems)
   - Two Sum, Three Sum, Maximum Subarray, etc.
2. **String Problems** (10 problems)
   - Valid Parentheses, Longest Palindrome, etc.
3. **Linked List Problems** (8 problems)
   - Merge Two Lists, Reverse Linked List, etc.
4. **Tree Problems** (10 problems)
   - Binary Tree Traversal, Validate BST, etc.
5. **Dynamic Programming** (8 problems)
   - Climbing Stairs, Coin Change, etc.
6. **Graph Problems** (5 problems)
   - Number of Islands, Course Schedule, etc.

### Data Quality Standards
- **Description**: Minimum 3 paragraphs with clear problem statement
- **Examples**: At least 2-3 examples with explanations
- **Constraints**: Complete and realistic constraint list
- **Test Cases**: Minimum 8 test cases (4 basic, 3 edge, 1 stress)
- **Function Signatures**: Accurate signatures for all 4 supported languages

### Fallback Mode Features
- **Transparency**: Clear "OFFLINE MODE" indicators in generated files
- **Limitations**: Explicit documentation of what's missing vs live data
- **Suggestions**: Guidance on when to retry with live API
- **Quality Score**: Completeness rating for each fallback problem

This design ensures that when LeetCode blocks API access, users still receive a high-quality practice experience with comprehensive problem data, extensive test cases, and clear documentation.