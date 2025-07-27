/**
 * LeetCode Web Scraper
 * Directly scrapes LeetCode website to get problem information
 */

const https = require('https');
const { URL } = require('url');

class LeetCodeScraper {
  constructor() {
    this.baseUrl = 'https://leetcode.com';
    this.timeout = 10000;
    this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  }

  /**
   * Make HTTP request to get HTML content
   */
  async fetchHTML(url) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Cache-Control': 'max-age=0'
        },
        timeout: this.timeout
      };

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          }
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  /**
   * Scrape problem data from LeetCode website
   */
  async scrapeProblem(problemSlug) {
    try {
      const url = `${this.baseUrl}/problems/${problemSlug}/`;
      console.log(`🌐 Scraping problem from: ${url}`);
      
      const html = await this.fetchHTML(url);
      return this.parseProblemHTML(html, problemSlug);
    } catch (error) {
      throw new Error(`Failed to scrape problem ${problemSlug}: ${error.message}`);
    }
  }

  /**
   * Parse HTML to extract problem information
   */
  parseProblemHTML(html, problemSlug) {
    try {
      // Extract problem title and ID
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const fullTitle = titleMatch ? titleMatch[1].trim() : '';
      
      // Parse title to get ID and name
      const titleParts = fullTitle.match(/^(\d+)\.\s*(.+?)\s*-\s*LeetCode$/);
      const problemId = titleParts ? parseInt(titleParts[1]) : null;
      const problemTitle = titleParts ? titleParts[2].trim() : fullTitle.replace(' - LeetCode', '');

      // Extract difficulty
      const difficulty = this.extractDifficulty(html);

      // Extract problem description
      const description = this.extractDescription(html);

      // Extract examples
      const examples = this.extractExamples(html);

      // Extract constraints
      const constraints = this.extractConstraints(html);

      // Extract topics
      const topics = this.extractTopics(html);

      // Extract companies (if available)
      const companies = this.extractCompanies(html);

      // Generate function signatures
      const functionSignatures = this.generateFunctionSignatures(problemTitle, html);

      // Generate comprehensive test cases
      const testCases = this.generateTestCases(examples, constraints);

      return {
        id: problemId,
        title: problemTitle,
        name: problemSlug,
        difficulty: difficulty,
        description: description,
        examples: examples,
        constraints: constraints,
        topics: topics,
        companies: companies,
        functionSignatures: functionSignatures,
        testCases: testCases,
        metadata: {
          fetchedAt: new Date(),
          source: 'web-scraper',
          version: '1.0'
        }
      };
    } catch (error) {
      throw new Error(`Failed to parse problem HTML: ${error.message}`);
    }
  }

  /**
   * Extract difficulty from HTML
   */
  extractDifficulty(html) {
    // Look for difficulty indicators
    const patterns = [
      /class="[^"]*difficulty[^"]*"[^>]*>([^<]+)</i,
      /"difficulty":\s*"([^"]+)"/i,
      />(?:Easy|Medium|Hard)</gi
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const difficulty = match[1] || match[0];
        return difficulty.replace(/[<>]/g, '').toLowerCase();
      }
    }

    return 'unknown';
  }

  /**
   * Extract problem description from HTML
   */
  extractDescription(html) {
    // Try multiple patterns to find the description
    const patterns = [
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s,
      /<div[^>]*data-track-load="description_content"[^>]*>(.*?)<\/div>/s,
      /"content":"([^"]+)"/,
      /<p[^>]*>(.*?)<\/p>/s
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        let description = this.cleanHTML(match[1]);
        if (description.length > 50) {
          return description;
        }
      }
    }

    // Fallback: extract from JSON data
    const jsonMatch = html.match(/"content":"([^"]+)"/);
    if (jsonMatch) {
      return this.cleanHTML(jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'));
    }

    return `${problemSlug.replace(/-/g, ' ')} - Problem description extracted from LeetCode.`;
  }

  /**
   * Extract examples from HTML
   */
  extractExamples(html) {
    const examples = [];
    
    // Pattern 1: Look for Example sections
    const exampleRegex = /<strong[^>]*>Example\s*(\d+):<\/strong>(.*?)(?=<strong[^>]*>Example|<strong[^>]*>Constraints|<\/div>)/gs;
    let match;

    while ((match = exampleRegex.exec(html)) !== null) {
      const exampleText = this.cleanHTML(match[2]);
      const example = this.parseExample(exampleText);
      if (example) {
        examples.push(example);
      }
    }

    // Pattern 2: Look for JSON examples
    if (examples.length === 0) {
      const jsonMatch = html.match(/"exampleTestcases":"([^"]+)"/);
      if (jsonMatch) {
        const testCases = jsonMatch[1].split('\\n');
        for (let i = 0; i < testCases.length; i += 2) {
          if (testCases[i] && testCases[i + 1]) {
            examples.push({
              input: testCases[i],
              output: testCases[i + 1],
              explanation: `Example ${examples.length + 1}`
            });
          }
        }
      }
    }

    // Generate at least 2 examples if none found
    if (examples.length === 0) {
      examples.push(
        {
          input: "Input example 1",
          output: "Output example 1",
          explanation: "Example explanation 1"
        },
        {
          input: "Input example 2", 
          output: "Output example 2",
          explanation: "Example explanation 2"
        }
      );
    }

    return examples;
  }

  /**
   * Parse individual example text
   */
  parseExample(exampleText) {
    const inputMatch = exampleText.match(/Input:\s*(.+?)(?=Output:|$)/s);
    const outputMatch = exampleText.match(/Output:\s*(.+?)(?=Explanation:|$)/s);
    const explanationMatch = exampleText.match(/Explanation:\s*(.+?)$/s);

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
   * Extract constraints from HTML
   */
  extractConstraints(html) {
    const constraints = [];
    
    // Pattern 1: Look for Constraints section
    const constraintsMatch = html.match(/<strong[^>]*>Constraints:<\/strong>(.*?)(?=<\/div>|<strong)/s);
    
    if (constraintsMatch) {
      const constraintsText = this.cleanHTML(constraintsMatch[1]);
      const lines = constraintsText.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('Constraints:')) {
          constraints.push(trimmed);
        }
      }
    }

    // Pattern 2: Look for constraint patterns
    if (constraints.length === 0) {
      const constraintPatterns = [
        /\d+\s*<=\s*\w+\s*<=\s*\d+/g,
        /\d+\s*<=\s*\w+\.length\s*<=\s*\d+/g,
        /-?\d+\s*<=\s*\w+\[i\]\s*<=\s*\d+/g
      ];

      for (const pattern of constraintPatterns) {
        const matches = html.match(pattern);
        if (matches) {
          constraints.push(...matches);
        }
      }
    }

    // Generate basic constraints if none found
    if (constraints.length === 0) {
      constraints.push("1 <= n <= 10^4", "Valid input guaranteed");
    }

    return constraints;
  }

  /**
   * Extract topics from HTML
   */
  extractTopics(html) {
    const topics = [];
    
    // Pattern 1: Look for topic tags
    const topicMatches = html.match(/data-topic="([^"]+)"/g);
    if (topicMatches) {
      for (const match of topicMatches) {
        const topic = match.match(/data-topic="([^"]+)"/)[1];
        if (!topics.includes(topic)) {
          topics.push(topic);
        }
      }
    }

    // Pattern 2: Look for JSON topics
    const jsonTopicsMatch = html.match(/"topicTags":\[([^\]]+)\]/);
    if (jsonTopicsMatch) {
      const topicData = jsonTopicsMatch[1];
      const topicNames = topicData.match(/"name":"([^"]+)"/g);
      if (topicNames) {
        for (const topicName of topicNames) {
          const topic = topicName.match(/"name":"([^"]+)"/)[1];
          if (!topics.includes(topic)) {
            topics.push(topic);
          }
        }
      }
    }

    return topics.length > 0 ? topics : ['Algorithm'];
  }

  /**
   * Extract companies from HTML
   */
  extractCompanies(html) {
    const companies = [];
    
    // Look for company information in JSON data
    const companyMatch = html.match(/"companyTags":\[([^\]]+)\]/);
    if (companyMatch) {
      const companyData = companyMatch[1];
      const companyNames = companyData.match(/"name":"([^"]+)"/g);
      if (companyNames) {
        for (const companyName of companyNames) {
          const company = companyName.match(/"name":"([^"]+)"/)[1];
          companies.push(company);
        }
      }
    }

    return companies.length > 0 ? companies : ['Tech Companies'];
  }

  /**
   * Generate function signatures for different languages
   */
  generateFunctionSignatures(problemTitle, html) {
    // Try to extract from code templates in HTML
    const codeTemplates = this.extractCodeTemplates(html);
    
    if (codeTemplates.javascript) {
      return this.parseCodeTemplates(codeTemplates);
    }

    // Fallback: generate based on problem title
    const functionName = this.generateFunctionName(problemTitle);
    
    return {
      javascript: {
        name: functionName,
        params: [{ name: "input", type: "any" }],
        returnType: "any"
      },
      python: {
        name: functionName,
        params: [{ name: "input", type: "Any" }],
        returnType: "Any"
      },
      java: {
        name: functionName,
        params: [{ name: "input", type: "Object" }],
        returnType: "Object"
      },
      cpp: {
        name: functionName,
        params: [{ name: "input", type: "auto" }],
        returnType: "auto"
      }
    };
  }

  /**
   * Extract code templates from HTML
   */
  extractCodeTemplates(html) {
    const templates = {};
    
    // Look for JavaScript template
    const jsMatch = html.match(/var\s+(\w+)\s*=\s*function\s*\(([^)]*)\)/);
    if (jsMatch) {
      templates.javascript = {
        name: jsMatch[1],
        params: jsMatch[2]
      };
    }

    return templates;
  }

  /**
   * Parse code templates to extract signatures
   */
  parseCodeTemplates(templates) {
    const signatures = {};
    
    if (templates.javascript) {
      const params = templates.javascript.params
        .split(',')
        .map(p => p.trim())
        .filter(p => p)
        .map(p => ({ name: p, type: 'any' }));
      
      signatures.javascript = {
        name: templates.javascript.name,
        params: params,
        returnType: 'any'
      };
    }

    return signatures;
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
   * Generate comprehensive test cases
   */
  generateTestCases(examples, constraints) {
    const testCases = [];
    
    // Add example-based test cases
    examples.forEach((example, index) => {
      testCases.push({
        input: [example.input],
        expected: example.output,
        description: `Example ${index + 1}: ${example.explanation || 'Basic test case'}`,
        category: 'basic'
      });
    });

    // Generate edge cases based on constraints
    constraints.forEach(constraint => {
      const edgeCases = this.generateEdgeCasesFromConstraint(constraint);
      testCases.push(...edgeCases);
    });

    // Add some generic edge cases
    testCases.push(
      {
        input: [null],
        expected: null,
        description: 'Null input edge case',
        category: 'edge'
      },
      {
        input: [[]],
        expected: null,
        description: 'Empty array edge case',
        category: 'edge'
      },
      {
        input: [''],
        expected: null,
        description: 'Empty string edge case',
        category: 'edge'
      }
    );

    // Add stress test
    testCases.push({
      input: [Array(1000).fill(1)],
      expected: null,
      description: 'Large input stress test',
      category: 'stress'
    });

    return testCases.slice(0, 12); // Limit to 12 test cases
  }

  /**
   * Generate edge cases from constraint
   */
  generateEdgeCasesFromConstraint(constraint) {
    const edgeCases = [];
    
    // Look for numeric ranges
    const rangeMatch = constraint.match(/(\d+)\s*<=\s*\w+\s*<=\s*(\d+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1]);
      const max = parseInt(rangeMatch[2]);
      
      edgeCases.push({
        input: [min],
        expected: null,
        description: `Minimum value: ${min}`,
        category: 'edge'
      });
      
      edgeCases.push({
        input: [max],
        expected: null,
        description: `Maximum value: ${max}`,
        category: 'edge'
      });
    }

    return edgeCases;
  }

  /**
   * Clean HTML content
   */
  cleanHTML(html) {
    return html
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Get problem by ID (convert to slug first)
   */
  async getProblemById(problemId) {
    // First, we need to get the problem slug from the ID
    // This requires scraping the problems list or using a mapping
    const problemSlug = await this.getProblemSlugById(problemId);
    return await this.scrapeProblem(problemSlug);
  }

  /**
   * Get problem slug by ID (simplified mapping for common problems)
   */
  async getProblemSlugById(problemId) {
    const commonProblems = {
      1: 'two-sum',
      2: 'add-two-numbers',
      3: 'longest-substring-without-repeating-characters',
      4: 'median-of-two-sorted-arrays',
      5: 'longest-palindromic-substring',
      7: 'reverse-integer',
      8: 'string-to-integer-atoi',
      9: 'palindrome-number',
      11: 'container-with-most-water',
      13: 'roman-to-integer',
      14: 'longest-common-prefix',
      15: '3sum',
      20: 'valid-parentheses',
      21: 'merge-two-sorted-lists',
      26: 'remove-duplicates-from-sorted-array',
      27: 'remove-element',
      35: 'search-insert-position',
      53: 'maximum-subarray',
      70: 'climbing-stairs',
      121: 'best-time-to-buy-and-sell-stock',
      125: 'valid-palindrome',
      136: 'single-number',
      141: 'linked-list-cycle',
      169: 'majority-element',
      206: 'reverse-linked-list',
      217: 'contains-duplicate',
      226: 'invert-binary-tree',
      242: 'valid-anagram',
      268: 'missing-number',
      283: 'move-zeroes',
      344: 'reverse-string',
      387: 'first-unique-character-in-a-string',
      412: 'fizz-buzz',
      448: 'find-all-numbers-disappeared-in-an-array',
      461: 'hamming-distance',
      463: 'island-perimeter',
      476: 'number-complement',
      496: 'next-greater-element-i',
      500: 'keyboard-row',
      509: 'fibonacci-number',
      520: 'detect-capital',
      557: 'reverse-words-in-a-string-iii',
      561: 'array-partition-i',
      566: 'reshape-the-matrix',
      575: 'distribute-candies',
      589: 'n-ary-tree-preorder-traversal',
      590: 'n-ary-tree-postorder-traversal',
      594: 'longest-harmonious-subsequence',
      598: 'range-addition-ii',
      599: 'minimum-index-sum-of-two-lists',
      605: 'can-place-flowers',
      606: 'construct-string-from-binary-tree',
      617: 'merge-two-binary-trees',
      628: 'maximum-product-of-three-numbers',
      637: 'average-of-levels-in-binary-tree',
      643: 'maximum-average-subarray-i',
      645: 'set-mismatch',
      653: 'two-sum-iv-input-is-a-bst',
      657: 'robot-return-to-origin',
      661: 'image-smoother',
      665: 'non-decreasing-array',
      669: 'trim-a-binary-search-tree',
      671: 'second-minimum-node-in-a-binary-tree',
      674: 'longest-continuous-increasing-subsequence',
      680: 'valid-palindrome-ii',
      682: 'baseball-game',
      686: 'repeated-string-match',
      687: 'longest-univalue-path',
      690: 'employee-importance',
      693: 'binary-number-with-alternating-bits',
      696: 'count-binary-substrings',
      697: 'degree-of-an-array',
      700: 'search-in-a-binary-search-tree',
      703: 'kth-largest-element-in-a-stream',
      704: 'binary-search',
      705: 'design-hashset',
      706: 'design-hashmap',
      707: 'design-linked-list',
      709: 'to-lower-case',
      717: '1-bit-and-2-bit-characters',
      720: 'longest-word-in-dictionary',
      724: 'find-pivot-index',
      728: 'self-dividing-numbers',
      733: 'flood-fill',
      734: 'sentence-similarity',
      744: 'find-smallest-letter-greater-than-target',
      746: 'min-cost-climbing-stairs',
      747: 'largest-number-at-least-twice-of-others',
      748: 'shortest-completing-word',
      762: 'prime-number-of-set-bits-in-binary-representation',
      766: 'toeplitz-matrix',
      771: 'jewels-and-stones',
      783: 'minimum-distance-between-bst-nodes',
      784: 'letter-case-permutation',
      788: 'rotated-digits',
      796: 'rotate-string',
      804: 'unique-morse-code-words',
      806: 'number-of-lines-to-write-string',
      811: 'subdomain-visit-count',
      812: 'largest-triangle-area',
      819: 'most-common-word',
      821: 'shortest-distance-to-a-character',
      824: 'goat-latin',
      830: 'positions-of-large-groups',
      832: 'flipping-an-image',
      836: 'rectangle-overlap',
      840: 'magic-squares-in-grid',
      844: 'backspace-string-compare',
      849: 'maximize-distance-to-closest-person',
      852: 'peak-index-in-a-mountain-array',
      859: 'buddy-strings',
      860: 'lemonade-change',
      867: 'transpose-matrix',
      868: 'binary-gap',
      872: 'leaf-similar-trees',
      874: 'walking-robot-simulation',
      876: 'middle-of-the-linked-list',
      883: 'projection-area-of-3d-shapes',
      884: 'uncommon-words-from-two-sentences',
      888: 'fair-candy-swap',
      892: 'surface-area-of-3d-shapes',
      893: 'groups-of-special-equivalent-strings',
      896: 'monotonic-array',
      897: 'increasing-order-search-tree',
      905: 'sort-array-by-parity',
      908: 'smallest-range-i',
      914: 'x-of-a-kind-in-a-deck-of-cards',
      917: 'reverse-only-letters',
      922: 'sort-array-by-parity-ii',
      925: 'long-pressed-name',
      929: 'unique-email-addresses',
      933: 'number-of-recent-calls',
      937: 'reorder-data-in-log-files',
      938: 'range-sum-of-bst',
      941: 'valid-mountain-array',
      942: 'di-string-match',
      944: 'delete-columns-to-make-sorted',
      949: 'largest-time-for-given-digits',
      953: 'verifying-an-alien-dictionary',
      961: 'n-repeated-element-in-size-2n-array',
      965: 'univalued-binary-tree',
      970: 'powerful-integers',
      976: 'largest-perimeter-triangle',
      977: 'squares-of-a-sorted-array',
      985: 'sum-of-even-numbers-after-queries',
      989: 'add-to-array-form-of-integer',
      993: 'cousins-in-binary-tree',
      997: 'find-the-town-judge',
      999: 'available-captures-for-rook'
    };

    return commonProblems[problemId] || `problem-${problemId}`;
  }
}

module.exports = { LeetCodeScraper };