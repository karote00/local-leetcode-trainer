/**
 * Enhanced problem data parsing and validation
 */

class ProblemParser {
  /**
   * Validate problem data completeness
   */
  static validateProblemData(problemData) {
    const errors = [];
    const warnings = [];

    // Required fields
    const requiredFields = ['id', 'title', 'name', 'difficulty', 'description'];
    for (const field of requiredFields) {
      if (!problemData[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (problemData.difficulty && !validDifficulties.includes(problemData.difficulty.toLowerCase())) {
      warnings.push(`Invalid difficulty: ${problemData.difficulty}`);
    }

    // Validate examples
    if (!problemData.examples || problemData.examples.length === 0) {
      warnings.push('No examples found');
    } else {
      problemData.examples.forEach((example, index) => {
        if (!example.input || !example.output) {
          warnings.push(`Example ${index + 1} missing input or output`);
        }
      });
    }

    // Validate function signatures
    if (!problemData.functionSignatures) {
      warnings.push('No function signatures found');
    } else {
      const languages = ['javascript', 'python', 'java', 'cpp'];
      for (const lang of languages) {
        if (!problemData.functionSignatures[lang]) {
          warnings.push(`Missing function signature for ${lang}`);
        }
      }
    }

    return { errors, warnings, isValid: errors.length === 0 };
  }

  /**
   * Enhanced HTML parsing with better pattern matching
   */
  static parseEnhancedHTML(html, problemSlug) {
    const parser = new ProblemParser();
    
    try {
      // Extract JSON data from script tags (more reliable than HTML parsing)
      const jsonData = parser.extractJSONData(html);
      
      if (jsonData) {
        return parser.parseFromJSON(jsonData, problemSlug);
      }
      
      // Fallback to HTML parsing
      return parser.parseFromHTML(html, problemSlug);
    } catch (error) {
      throw new Error(`Enhanced parsing failed: ${error.message}`);
    }
  }

  /**
   * Extract JSON data from script tags
   */
  extractJSONData(html) {
    // Look for JSON data in script tags
    const scriptMatches = html.match(/<script[^>]*>(.*?)<\/script>/gs);
    
    if (scriptMatches) {
      for (const script of scriptMatches) {
        // Look for problem data patterns
        const jsonMatch = script.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/s) ||
                         script.match(/questionData\s*:\s*({.*?})/s) ||
                         script.match(/"question"\s*:\s*({.*?})/s);
        
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[1]);
          } catch (error) {
            continue; // Try next match
          }
        }
      }
    }
    
    return null;
  }

  /**
   * Parse problem data from JSON
   */
  parseFromJSON(jsonData, problemSlug) {
    // This would parse the JSON structure from LeetCode's page data
    // Implementation would depend on the actual JSON structure
    return {
      id: jsonData.questionId || null,
      title: jsonData.title || '',
      name: problemSlug,
      difficulty: jsonData.difficulty?.toLowerCase() || 'unknown',
      description: this.cleanText(jsonData.content || ''),
      examples: this.parseExamplesFromJSON(jsonData),
      constraints: this.parseConstraintsFromJSON(jsonData),
      topics: jsonData.topicTags?.map(tag => tag.name) || [],
      companies: jsonData.companyTags?.map(tag => tag.name) || [],
      functionSignatures: this.parseFunctionSignatures(jsonData),
      testCases: [],
      metadata: {
        fetchedAt: new Date(),
        source: 'leetcode-json',
        version: '1.0'
      }
    };
  }

  /**
   * Parse problem data from HTML (fallback)
   */
  parseFromHTML(html, problemSlug) {
    // Enhanced HTML parsing with better regex patterns
    const titleMatch = html.match(/<h1[^>]*class="[^"]*title[^"]*"[^>]*>([^<]+)</i) ||
                      html.match(/<title>(\d+\.\s*[^-]+)/);
    
    let problemId = null;
    let problemTitle = '';
    
    if (titleMatch) {
      const fullTitle = titleMatch[1].trim();
      const titleParts = fullTitle.match(/^(\d+)\.\s*(.+?)(?:\s*-\s*LeetCode)?$/);
      problemId = titleParts ? parseInt(titleParts[1]) : null;
      problemTitle = titleParts ? titleParts[2].trim() : fullTitle;
    }

    return {
      id: problemId,
      title: problemTitle,
      name: problemSlug,
      difficulty: this.extractDifficulty(html),
      description: this.extractDescription(html),
      examples: this.extractExamplesEnhanced(html),
      constraints: this.extractConstraintsEnhanced(html),
      topics: this.extractTopicsEnhanced(html),
      companies: this.extractCompaniesEnhanced(html),
      functionSignatures: this.generateEnhancedFunctionSignatures(problemTitle, html),
      testCases: [],
      metadata: {
        fetchedAt: new Date(),
        source: 'leetcode-html',
        version: '1.0'
      }
    };
  }

  /**
   * Extract difficulty with multiple patterns
   */
  extractDifficulty(html) {
    const patterns = [
      /class="[^"]*difficulty[^"]*"[^>]*>([^<]+)</i,
      /difficulty[^>]*>([^<]*(?:Easy|Medium|Hard)[^<]*)</i,
      /"difficulty"\s*:\s*"([^"]+)"/i
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const difficulty = match[1].toLowerCase().trim();
        if (['easy', 'medium', 'hard'].includes(difficulty)) {
          return difficulty;
        }
      }
    }

    return 'unknown';
  }

  /**
   * Enhanced description extraction
   */
  extractDescription(html) {
    const patterns = [
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s,
      /<div[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)<\/div>/s,
      /<p[^>]*class="[^"]*problem[^"]*"[^>]*>(.*?)<\/p>/s
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        return this.cleanHTML(match[1]);
      }
    }

    return '';
  }

  /**
   * Enhanced examples extraction
   */
  extractExamplesEnhanced(html) {
    const examples = [];
    
    // Multiple patterns for different page layouts
    const patterns = [
      /<strong>Example\s*(\d+):<\/strong>(.*?)(?=<strong>Example|\n\n|<div|$)/gs,
      /<b>Example\s*(\d+):<\/b>(.*?)(?=<b>Example|\n\n|<div|$)/gs,
      /Example\s*(\d+):\s*(.*?)(?=Example\s*\d+:|Constraints:|$)/gs
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const exampleText = this.cleanHTML(match[2]);
        const parsed = this.parseExampleText(exampleText);
        if (parsed) {
          examples.push(parsed);
        }
      }
      if (examples.length > 0) break; // Use first successful pattern
    }

    return examples;
  }

  /**
   * Parse individual example text
   */
  parseExampleText(text) {
    const inputMatch = text.match(/Input:\s*(.+?)(?=Output:|Explanation:|$)/s);
    const outputMatch = text.match(/Output:\s*(.+?)(?=Explanation:|$)/s);
    const explanationMatch = text.match(/Explanation:\s*(.+?)$/s);

    if (inputMatch && outputMatch) {
      return {
        input: inputMatch[1].trim(),
        output: outputMatch[1].trim(),
        explanation: explanationMatch ? explanationMatch[1].trim() : undefined
      };
    }

    return null;
  }

  /**
   * Enhanced constraints extraction
   */
  extractConstraintsEnhanced(html) {
    const constraints = [];
    
    const patterns = [
      /<strong>Constraints:<\/strong>(.*?)(?=<\/div>|<strong>|$)/s,
      /<b>Constraints:<\/b>(.*?)(?=<\/div>|<b>|$)/s,
      /Constraints:\s*(.*?)(?=Follow-up:|Note:|$)/s
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const constraintsText = this.cleanHTML(match[1]);
        const lines = constraintsText.split(/\n|•|·/).filter(line => line.trim());
        
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.toLowerCase().startsWith('constraints')) {
            constraints.push(trimmed);
          }
        }
        
        if (constraints.length > 0) break;
      }
    }

    return constraints;
  }

  /**
   * Enhanced topics extraction
   */
  extractTopicsEnhanced(html) {
    const topics = new Set();
    
    const patterns = [
      /data-topic="([^"]+)"/g,
      /class="[^"]*topic[^"]*"[^>]*>([^<]+)</g,
      /"topicTags"\s*:\s*\[(.*?)\]/s
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const topic = match[1].trim();
        if (topic) {
          topics.add(topic);
        }
      }
    }

    return Array.from(topics);
  }

  /**
   * Enhanced companies extraction
   */
  extractCompaniesEnhanced(html) {
    const companies = new Set();
    
    const patterns = [
      /data-company="([^"]+)"/g,
      /class="[^"]*company[^"]*"[^>]*>([^<]+)</g,
      /"companyTags"\s*:\s*\[(.*?)\]/s
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const company = match[1].trim();
        if (company) {
          companies.add(company);
        }
      }
    }

    return Array.from(companies);
  }

  /**
   * Generate enhanced function signatures
   */
  generateEnhancedFunctionSignatures(problemTitle, html) {
    const functionName = this.generateFunctionName(problemTitle);
    
    // Try to extract actual function signatures from code templates
    const codeTemplates = this.extractCodeTemplates(html);
    
    if (codeTemplates.javascript) {
      return this.parseCodeTemplates(codeTemplates);
    }
    
    // Fallback to generated signatures
    return this.generateDefaultSignatures(functionName, problemTitle);
  }

  /**
   * Extract code templates from HTML
   */
  extractCodeTemplates(html) {
    const templates = {};
    
    // Look for code templates in script tags or data attributes
    const codeMatches = html.match(/codeDefinition.*?({.*?})/s);
    if (codeMatches) {
      try {
        const codeData = JSON.parse(codeMatches[1]);
        // Parse code data structure
        return codeData;
      } catch (error) {
        // Continue with fallback
      }
    }
    
    return {};
  }

  /**
   * Parse code templates to extract function signatures
   */
  parseCodeTemplates(templates) {
    const signatures = {};
    
    const languageMap = {
      javascript: 'javascript',
      python: 'python',
      python3: 'python',
      java: 'java',
      cpp: 'cpp',
      'c++': 'cpp'
    };

    for (const [lang, code] of Object.entries(templates)) {
      const mappedLang = languageMap[lang.toLowerCase()];
      if (mappedLang && code) {
        signatures[mappedLang] = this.parseCodeSignature(code, mappedLang);
      }
    }

    return signatures;
  }

  /**
   * Parse function signature from code
   */
  parseCodeSignature(code, language) {
    switch (language) {
      case 'javascript':
        return this.parseJavaScriptSignature(code);
      case 'python':
        return this.parsePythonSignature(code);
      case 'java':
        return this.parseJavaSignature(code);
      case 'cpp':
        return this.parseCppSignature(code);
      default:
        return null;
    }
  }

  /**
   * Parse JavaScript function signature
   */
  parseJavaScriptSignature(code) {
    const match = code.match(/var\s+(\w+)\s*=\s*function\s*\(([^)]*)\)/);
    if (match) {
      const name = match[1];
      const params = match[2].split(',').map(p => ({
        name: p.trim(),
        type: 'any' // JavaScript doesn't have static types
      })).filter(p => p.name);
      
      return { name, params, returnType: 'any' };
    }
    return null;
  }

  /**
   * Parse Python function signature
   */
  parsePythonSignature(code) {
    const match = code.match(/def\s+(\w+)\s*\(([^)]*)\)/);
    if (match) {
      const name = match[1];
      const paramStr = match[2];
      const params = [];
      
      if (paramStr.trim() !== 'self') {
        const paramParts = paramStr.split(',').slice(1); // Skip 'self'
        for (const param of paramParts) {
          const paramMatch = param.trim().match(/(\w+)(?::\s*([^=]+))?/);
          if (paramMatch) {
            params.push({
              name: paramMatch[1],
              type: paramMatch[2]?.trim() || 'Any'
            });
          }
        }
      }
      
      return { name, params, returnType: 'Any' };
    }
    return null;
  }

  /**
   * Parse Java function signature
   */
  parseJavaSignature(code) {
    const match = code.match(/public\s+(\w+)\s+(\w+)\s*\(([^)]*)\)/);
    if (match) {
      const returnType = match[1];
      const name = match[2];
      const paramStr = match[3];
      const params = [];
      
      if (paramStr.trim()) {
        const paramParts = paramStr.split(',');
        for (const param of paramParts) {
          const paramMatch = param.trim().match(/(\w+(?:\[\])?)\s+(\w+)/);
          if (paramMatch) {
            params.push({
              name: paramMatch[2],
              type: paramMatch[1]
            });
          }
        }
      }
      
      return { name, params, returnType };
    }
    return null;
  }

  /**
   * Parse C++ function signature
   */
  parseCppSignature(code) {
    const match = code.match(/(\w+(?:<[^>]+>)?(?:\*)?)\s+(\w+)\s*\(([^)]*)\)/);
    if (match) {
      const returnType = match[1];
      const name = match[2];
      const paramStr = match[3];
      const params = [];
      
      if (paramStr.trim()) {
        const paramParts = paramStr.split(',');
        for (const param of paramParts) {
          const paramMatch = param.trim().match(/(\w+(?:<[^>]+>)?(?:\*|&)?)\s+(\w+)/);
          if (paramMatch) {
            params.push({
              name: paramMatch[2],
              type: paramMatch[1]
            });
          }
        }
      }
      
      return { name, params, returnType };
    }
    return null;
  }

  /**
   * Generate default function signatures
   */
  generateDefaultSignatures(functionName, problemTitle) {
    // Analyze problem title to infer types
    const hasArray = /array|list|nums/i.test(problemTitle);
    const hasString = /string|word|char/i.test(problemTitle);
    const hasNumber = /number|integer|sum|count/i.test(problemTitle);
    const hasBoolean = /valid|palindrome|exist|can|is/i.test(problemTitle);

    let inputType = 'any';
    let returnType = 'any';

    if (hasArray) inputType = hasNumber ? 'number[]' : 'any[]';
    else if (hasString) inputType = 'string';
    else if (hasNumber) inputType = 'number';

    if (hasBoolean) returnType = 'boolean';
    else if (hasNumber) returnType = 'number';
    else if (hasArray) returnType = 'any[]';

    return {
      javascript: {
        name: functionName,
        params: [{ name: 'input', type: inputType }],
        returnType: returnType
      },
      python: {
        name: functionName,
        params: [{ name: 'input', type: this.jsTypeToPython(inputType) }],
        returnType: this.jsTypeToPython(returnType)
      },
      java: {
        name: functionName,
        params: [{ name: 'input', type: this.jsTypeToJava(inputType) }],
        returnType: this.jsTypeToJava(returnType)
      },
      cpp: {
        name: functionName,
        params: [{ name: 'input', type: this.jsTypeToCpp(inputType) }],
        returnType: this.jsTypeToCpp(returnType)
      }
    };
  }

  /**
   * Convert JavaScript type to Python type
   */
  jsTypeToPython(jsType) {
    const typeMap = {
      'number': 'int',
      'string': 'str',
      'boolean': 'bool',
      'number[]': 'List[int]',
      'string[]': 'List[str]',
      'any[]': 'List[Any]',
      'any': 'Any'
    };
    return typeMap[jsType] || 'Any';
  }

  /**
   * Convert JavaScript type to Java type
   */
  jsTypeToJava(jsType) {
    const typeMap = {
      'number': 'int',
      'string': 'String',
      'boolean': 'boolean',
      'number[]': 'int[]',
      'string[]': 'String[]',
      'any[]': 'Object[]',
      'any': 'Object'
    };
    return typeMap[jsType] || 'Object';
  }

  /**
   * Convert JavaScript type to C++ type
   */
  jsTypeToCpp(jsType) {
    const typeMap = {
      'number': 'int',
      'string': 'string',
      'boolean': 'bool',
      'number[]': 'vector<int>',
      'string[]': 'vector<string>',
      'any[]': 'vector<auto>',
      'any': 'auto'
    };
    return typeMap[jsType] || 'auto';
  }

  /**
   * Generate function name from problem title
   */
  generateFunctionName(title) {
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

  /**
   * Clean HTML content
   */
  cleanHTML(html) {
    return html
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Clean text content
   */
  cleanText(text) {
    return text
      .replace(/\s+/g, ' ')
      .trim();
  }
}

module.exports = { ProblemParser };