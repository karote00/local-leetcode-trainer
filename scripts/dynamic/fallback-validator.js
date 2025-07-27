/**
 * Fallback Data Validator
 * Validates and ensures quality of enhanced fallback problem data
 */

class FallbackValidator {
  /**
   * Validate problem data completeness and quality
   */
  static validateProblemData(problem) {
    const validation = {
      isValid: true,
      errors: [],
      warnings: [],
      completenessScore: 0,
      qualityMetrics: {}
    };

    // Validate required fields
    this.validateRequiredFields(problem, validation);
    
    // Validate content quality
    this.validateContentQuality(problem, validation);
    
    // Validate function signatures
    this.validateFunctionSignatures(problem, validation);
    
    // Validate test cases
    this.validateTestCases(problem, validation);
    
    // Calculate completeness score
    validation.completenessScore = this.calculateCompletenessScore(problem);
    
    // Generate quality metrics
    validation.qualityMetrics = this.generateQualityMetrics(problem);

    return validation;
  }

  /**
   * Validate required fields are present
   */
  static validateRequiredFields(problem, validation) {
    const requiredFields = ['id', 'title', 'name', 'difficulty', 'description'];
    
    for (const field of requiredFields) {
      if (!problem[field]) {
        validation.errors.push(`Missing required field: ${field}`);
        validation.isValid = false;
      }
    }

    // Validate difficulty value
    if (problem.difficulty && !['easy', 'medium', 'hard'].includes(problem.difficulty)) {
      validation.errors.push(`Invalid difficulty: ${problem.difficulty}`);
      validation.isValid = false;
    }

    // Validate ID is a number
    if (problem.id && typeof problem.id !== 'number') {
      validation.errors.push(`ID must be a number: ${problem.id}`);
      validation.isValid = false;
    }
  }

  /**
   * Validate content quality
   */
  static validateContentQuality(problem, validation) {
    // Description quality
    if (problem.description) {
      if (problem.description.length < 50) {
        validation.warnings.push('Description is too short (< 50 characters)');
      }
      if (problem.description.length < 100) {
        validation.warnings.push('Description could be more detailed (< 100 characters)');
      }
    }

    // Examples validation
    if (!problem.examples || problem.examples.length === 0) {
      validation.errors.push('No examples provided');
      validation.isValid = false;
    } else {
      if (problem.examples.length < 2) {
        validation.warnings.push('Should have at least 2 examples');
      }
      
      for (let i = 0; i < problem.examples.length; i++) {
        const example = problem.examples[i];
        if (!example.input || !example.output) {
          validation.errors.push(`Example ${i + 1} missing input or output`);
          validation.isValid = false;
        }
      }
    }

    // Constraints validation
    if (!problem.constraints || problem.constraints.length === 0) {
      validation.warnings.push('No constraints provided');
    }

    // Topics validation
    if (!problem.topics || problem.topics.length === 0) {
      validation.warnings.push('No topics specified');
    }
  }

  /**
   * Validate function signatures
   */
  static validateFunctionSignatures(problem, validation) {
    const requiredLanguages = ['javascript', 'python', 'java', 'cpp'];
    
    if (!problem.functionSignatures) {
      validation.errors.push('No function signatures provided');
      validation.isValid = false;
      return;
    }

    for (const language of requiredLanguages) {
      const signature = problem.functionSignatures[language];
      if (!signature) {
        validation.warnings.push(`Missing function signature for ${language}`);
        continue;
      }

      // Validate signature structure
      if (!signature.name) {
        validation.errors.push(`Missing function name for ${language}`);
        validation.isValid = false;
      }
      
      if (!signature.params || !Array.isArray(signature.params)) {
        validation.errors.push(`Invalid parameters for ${language}`);
        validation.isValid = false;
      }
      
      if (!signature.returnType) {
        validation.errors.push(`Missing return type for ${language}`);
        validation.isValid = false;
      }

      // Validate parameter structure
      if (signature.params) {
        for (let i = 0; i < signature.params.length; i++) {
          const param = signature.params[i];
          if (!param.name || !param.type) {
            validation.errors.push(`Invalid parameter ${i + 1} for ${language}`);
            validation.isValid = false;
          }
        }
      }
    }
  }

  /**
   * Validate test cases
   */
  static validateTestCases(problem, validation) {
    if (!problem.testCases || problem.testCases.length === 0) {
      validation.warnings.push('No test cases provided');
      return;
    }

    if (problem.testCases.length < 5) {
      validation.warnings.push('Should have at least 5 test cases');
    }

    // Check for different test case categories
    const categories = new Set(problem.testCases.map(tc => tc.category));
    if (!categories.has('basic')) {
      validation.warnings.push('Missing basic test cases');
    }
    if (!categories.has('edge')) {
      validation.warnings.push('Missing edge test cases');
    }
    if (!categories.has('stress')) {
      validation.warnings.push('Missing stress test cases');
    }

    // Validate individual test cases
    for (let i = 0; i < problem.testCases.length; i++) {
      const testCase = problem.testCases[i];
      
      if (!testCase.input || !Array.isArray(testCase.input)) {
        validation.errors.push(`Test case ${i + 1} has invalid input`);
        validation.isValid = false;
      }
      
      if (!testCase.description) {
        validation.warnings.push(`Test case ${i + 1} missing description`);
      }
      
      if (!testCase.category) {
        validation.warnings.push(`Test case ${i + 1} missing category`);
      }
    }
  }

  /**
   * Calculate completeness score (0-100)
   */
  static calculateCompletenessScore(problem) {
    let score = 0;
    
    // Basic fields (40 points)
    if (problem.description && problem.description.length > 100) score += 10;
    if (problem.examples && problem.examples.length >= 2) score += 10;
    if (problem.constraints && problem.constraints.length > 0) score += 10;
    if (problem.topics && problem.topics.length > 0) score += 10;
    
    // Function signatures (20 points)
    const languages = ['javascript', 'python', 'java', 'cpp'];
    const signaturesComplete = languages.every(lang => 
      problem.functionSignatures?.[lang]?.name &&
      problem.functionSignatures?.[lang]?.params &&
      problem.functionSignatures?.[lang]?.returnType
    );
    if (signaturesComplete) score += 20;
    
    // Test cases (30 points)
    if (problem.testCases && problem.testCases.length >= 5) score += 10;
    if (problem.testCases && problem.testCases.some(tc => tc.category === 'edge')) score += 10;
    if (problem.testCases && problem.testCases.some(tc => tc.category === 'stress')) score += 10;
    
    // Hints (10 points)
    if (problem.hints && problem.hints.length >= 2) score += 10;
    
    return score;
  }

  /**
   * Generate quality metrics
   */
  static generateQualityMetrics(problem) {
    return {
      descriptionLength: problem.description?.length || 0,
      exampleCount: problem.examples?.length || 0,
      constraintCount: problem.constraints?.length || 0,
      topicCount: problem.topics?.length || 0,
      testCaseCount: problem.testCases?.length || 0,
      hintCount: problem.hints?.length || 0,
      languageSupport: Object.keys(problem.functionSignatures || {}).length,
      hasFollowUp: !!problem.followUp,
      hasCompanies: !!(problem.companies && problem.companies.length > 0)
    };
  }

  /**
   * Validate all problems in the enhanced fallback database
   */
  static validateAllFallbackProblems(problems) {
    const results = {
      totalProblems: Object.keys(problems).length,
      validProblems: 0,
      invalidProblems: 0,
      averageCompleteness: 0,
      problemResults: {},
      overallErrors: [],
      overallWarnings: []
    };

    let totalCompleteness = 0;

    for (const [slug, problem] of Object.entries(problems)) {
      const validation = this.validateProblemData(problem);
      results.problemResults[slug] = validation;
      
      if (validation.isValid) {
        results.validProblems++;
      } else {
        results.invalidProblems++;
        results.overallErrors.push(`${slug}: ${validation.errors.join(', ')}`);
      }
      
      totalCompleteness += validation.completenessScore;
      
      if (validation.warnings.length > 0) {
        results.overallWarnings.push(`${slug}: ${validation.warnings.join(', ')}`);
      }
    }

    results.averageCompleteness = totalCompleteness / results.totalProblems;

    return results;
  }

  /**
   * Generate validation report
   */
  static generateValidationReport(validationResults) {
    const report = [];
    
    report.push('# Fallback Data Validation Report\n');
    report.push(`**Total Problems:** ${validationResults.totalProblems}`);
    report.push(`**Valid Problems:** ${validationResults.validProblems}`);
    report.push(`**Invalid Problems:** ${validationResults.invalidProblems}`);
    report.push(`**Average Completeness:** ${validationResults.averageCompleteness.toFixed(1)}%\n`);
    
    if (validationResults.overallErrors.length > 0) {
      report.push('## Errors\n');
      for (const error of validationResults.overallErrors) {
        report.push(`- ${error}`);
      }
      report.push('');
    }
    
    if (validationResults.overallWarnings.length > 0) {
      report.push('## Warnings\n');
      for (const warning of validationResults.overallWarnings) {
        report.push(`- ${warning}`);
      }
      report.push('');
    }
    
    // Top performing problems
    const sortedProblems = Object.entries(validationResults.problemResults)
      .sort(([,a], [,b]) => b.completenessScore - a.completenessScore)
      .slice(0, 5);
    
    report.push('## Top Quality Problems\n');
    for (const [slug, result] of sortedProblems) {
      report.push(`- **${slug}**: ${result.completenessScore}% complete`);
    }
    
    return report.join('\n');
  }

  /**
   * Fix common validation issues automatically
   */
  static autoFixProblem(problem) {
    const fixed = { ...problem };
    
    // Ensure required arrays exist
    if (!fixed.examples) fixed.examples = [];
    if (!fixed.constraints) fixed.constraints = [];
    if (!fixed.topics) fixed.topics = [];
    if (!fixed.companies) fixed.companies = [];
    if (!fixed.testCases) fixed.testCases = [];
    if (!fixed.hints) fixed.hints = [];
    
    // Ensure function signatures exist
    if (!fixed.functionSignatures) {
      fixed.functionSignatures = {};
    }
    
    // Add basic function signatures if missing
    const languages = ['javascript', 'python', 'java', 'cpp'];
    for (const lang of languages) {
      if (!fixed.functionSignatures[lang]) {
        fixed.functionSignatures[lang] = {
          name: this.generateFunctionName(fixed.title || 'solution'),
          params: [{ name: 'param', type: 'any' }],
          returnType: 'any'
        };
      }
    }
    
    return fixed;
  }

  /**
   * Generate function name from problem title
   */
  static generateFunctionName(title) {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  }
}

module.exports = { FallbackValidator };