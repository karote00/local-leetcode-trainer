/**
 * LeetCode API Integration for fetching problem data
 */

const https = require('https');
const { URL } = require('url');
const { LeetCodeAPI } = require('./interfaces');
const { config } = require('./config');
const { getEnhancedFallbackProblem, getAllEnhancedFallbackProblems } = require('./enhanced-fallback-database');
const { LeetCodeScraper } = require('./leetcode-scraper');

class LeetCodeAPIImpl extends LeetCodeAPI {
  constructor() {
    super();
    this.baseUrl = config.get('api.leetcodeBaseUrl');
    this.timeout = config.get('api.requestTimeout');
    this.maxRetries = config.get('api.maxRetries');
    this.retryDelay = config.get('api.retryDelay');
    this.userAgent = config.get('api.userAgent');
  }

  /**
   * Make HTTP request with retry logic
   */
  async makeRequest(url, options = {}) {
    const requestOptions = {
      timeout: this.timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
        ...options.headers
      },
      ...options
    };

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // Add random delay to avoid rate limiting
        if (attempt > 1) {
          const delay = this.retryDelay * attempt + Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        return await this._httpRequest(url, requestOptions);
      } catch (error) {
        if (attempt === this.maxRetries) {
          throw new Error(`Failed to fetch ${url} after ${this.maxRetries} attempts: ${error.message}`);
        }
        
        // Exponential backoff with jitter for 403 errors
        if (error.message.includes('403')) {
          const backoffDelay = Math.min(this.retryDelay * Math.pow(2, attempt) + Math.random() * 2000, 10000);
          await new Promise(resolve => setTimeout(resolve, backoffDelay));
        } else {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        }
      }
    }
  }

  /**
   * Internal HTTP request implementation
   */
  _httpRequest(url, options) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const requestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: options.method || 'GET',
        headers: options.headers,
        timeout: options.timeout
      };

      const req = https.request(requestOptions, (res) => {
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
   * Normalize problem identifier to problem slug
   */
  normalizeProblemIdentifier(identifier) {
    // Handle different input formats
    if (typeof identifier === 'number') {
      // Problem ID - we'll need to convert this to slug
      return identifier.toString();
    }
    
    if (typeof identifier === 'string') {
      // Handle full URL
      if (identifier.includes('leetcode.com/problems/')) {
        const match = identifier.match(/\/problems\/([^\/]+)/);
        return match ? match[1] : identifier;
      }
      
      // Handle problem slug
      return identifier.toLowerCase().replace(/\s+/g, '-');
    }
    
    throw new Error(`Invalid problem identifier: ${identifier}`);
  }

  /**
   * Fetch problem by identifier
   */
  async fetchProblem(identifier) {
    const scraper = new LeetCodeScraper();
    
    try {
      // First, try to get the problem slug
      let problemSlug;
      if (typeof identifier === 'number') {
        problemSlug = await scraper.getProblemSlugById(identifier);
      } else {
        problemSlug = this.normalizeProblemIdentifier(identifier);
      }
      
      console.log(`🌐 Scraping problem from LeetCode: ${problemSlug}`);
      
      // Use web scraper to get fresh data directly from the website
      const problemData = await scraper.scrapeProblem(problemSlug);
      
      console.log(`✅ Successfully scraped problem: ${problemData.title}`);
      return problemData;
      
    } catch (error) {
      console.log(`⚠️ Web scraping failed: ${error.message}`);
      console.log(`🔄 Falling back to enhanced fallback data for: ${identifier}`);
      
      // If web scraping fails, use enhanced fallback data
      return this.getFallbackProblemData(identifier);
    }
  }

  /**
   * Get fallback problem data when LeetCode blocks us
   */
  getFallbackProblemData(identifier) {
    const problemSlug = this.normalizeProblemIdentifier(identifier);
    
    // Try to get enhanced fallback problem first (pass original identifier for ID lookup)
    const enhancedProblem = getEnhancedFallbackProblem(identifier);
    if (enhancedProblem) {
      console.log(`📱 Using enhanced fallback data for: ${identifier}`);
      return enhancedProblem;
    }
    
    // Fall back to basic fallback list if not in enhanced database
    const fallbackProblems = this.getFallbackProblems();
    const problem = fallbackProblems.find(p => 
      p.name === problemSlug || 
      p.id.toString() === identifier.toString() ||
      p.title.toLowerCase().replace(/\s+/g, '-') === problemSlug
    );
    
    if (!problem) {
      // Get list of available enhanced problems for better error message
      const availableProblems = getAllEnhancedFallbackProblems().map(p => p.name).slice(0, 10);
      throw new Error(`Problem "${identifier}" not available in fallback data. Available problems: ${availableProblems.join(', ')}, etc.`);
    }
    
    // Return basic enhanced problem data
    return this.enhanceFallbackProblem(problem);
  }

  /**
   * Enhance fallback problem with complete LeetCode-style data
   */
  enhanceFallbackProblem(problem) {
    const problemData = {
      'two-sum': {
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
          },
          {
            input: "nums = [3,2,4], target = 6",
            output: "[1,2]",
            explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
          }
        ],
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9",
          "Only one valid answer exists."
        ],
        topics: ["Array", "Hash Table"],
        companies: ["Amazon", "Google", "Apple"],
        functionSignatures: {
          javascript: {
            name: "twoSum",
            params: [{ name: "nums", type: "number[]" }, { name: "target", type: "number" }],
            returnType: "number[]"
          },
          python: {
            name: "twoSum",
            params: [{ name: "nums", type: "List[int]" }, { name: "target", type: "int" }],
            returnType: "List[int]"
          }
        }
      },
      'valid-parentheses': {
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        examples: [
          {
            input: 's = "()"',
            output: "true",
            explanation: "The string contains valid parentheses."
          },
          {
            input: 's = "()[]{}"',
            output: "true",
            explanation: "The string contains valid combinations of all bracket types."
          }
        ],
        constraints: [
          "1 <= s.length <= 10^4",
          "s consists of parentheses only '()[]{}'."
        ],
        topics: ["String", "Stack"],
        companies: ["Amazon", "Google", "Facebook"],
        functionSignatures: {
          javascript: {
            name: "isValid",
            params: [{ name: "s", type: "string" }],
            returnType: "boolean"
          },
          python: {
            name: "isValid",
            params: [{ name: "s", type: "str" }],
            returnType: "bool"
          }
        }
      },
      'palindrome-number': {
        description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
        examples: [
          {
            input: "x = 121",
            output: "true",
            explanation: "121 reads as 121 from left to right and from right to left."
          },
          {
            input: "x = -121",
            output: "false",
            explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
          }
        ],
        constraints: ["-2^31 <= x <= 2^31 - 1"],
        followUp: "Could you solve it without converting the integer to a string?",
        topics: ["Math"],
        companies: ["Amazon", "Apple"],
        functionSignatures: {
          javascript: {
            name: "isPalindrome",
            params: [{ name: "x", type: "number" }],
            returnType: "boolean"
          },
          python: {
            name: "isPalindrome",
            params: [{ name: "x", type: "int" }],
            returnType: "bool"
          }
        }
      },
      'best-time-to-buy-and-sell-stock': {
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
        examples: [
          {
            input: "prices = [7,1,5,3,6,4]",
            output: "5",
            explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
          },
          {
            input: "prices = [7,6,4,3,1]",
            output: "0",
            explanation: "In this case, no transactions are done and the max profit = 0."
          }
        ],
        constraints: [
          "1 <= prices.length <= 10^5",
          "0 <= prices[i] <= 10^4"
        ],
        topics: ["Array", "Dynamic Programming"],
        companies: ["Amazon", "Microsoft", "Facebook"],
        functionSignatures: {
          javascript: {
            name: "maxProfit",
            params: [{ name: "prices", type: "number[]" }],
            returnType: "number"
          },
          python: {
            name: "maxProfit",
            params: [{ name: "prices", type: "List[int]" }],
            returnType: "int"
          }
        }
      },
      'climbing-stairs': {
        description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
          {
            input: "n = 2",
            output: "2",
            explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
          },
          {
            input: "n = 3",
            output: "3",
            explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
          }
        ],
        constraints: ["1 <= n <= 45"],
        topics: ["Math", "Dynamic Programming", "Memoization"],
        companies: ["Amazon", "Adobe", "Apple"],
        functionSignatures: {
          javascript: {
            name: "climbStairs",
            params: [{ name: "n", type: "number" }],
            returnType: "number"
          },
          python: {
            name: "climbStairs",
            params: [{ name: "n", type: "int" }],
            returnType: "int"
          }
        }
      },
      'maximum-subarray': {
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        examples: [
          {
            input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
            output: "6",
            explanation: "The subarray [4,-1,2,1] has the largest sum 6."
          },
          {
            input: "nums = [1]",
            output: "1",
            explanation: "The subarray [1] has the largest sum 1."
          }
        ],
        constraints: [
          "1 <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4"
        ],
        followUp: "If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.",
        topics: ["Array", "Divide and Conquer", "Dynamic Programming"],
        companies: ["Amazon", "Microsoft", "LinkedIn"],
        functionSignatures: {
          javascript: {
            name: "maxSubArray",
            params: [{ name: "nums", type: "number[]" }],
            returnType: "number"
          },
          python: {
            name: "maxSubArray",
            params: [{ name: "nums", type: "List[int]" }],
            returnType: "int"
          }
        }
      }
    };

    const enhancedData = problemData[problem.name] || {};
    
    return {
      id: problem.id,
      title: problem.title,
      name: problem.name,
      difficulty: problem.difficulty,
      description: enhancedData.description || `${problem.title} - Problem description not available in offline mode.`,
      examples: enhancedData.examples || [],
      constraints: enhancedData.constraints || [],
      followUp: enhancedData.followUp,
      topics: enhancedData.topics || problem.topics || [],
      companies: enhancedData.companies || problem.companies || [],
      functionSignatures: enhancedData.functionSignatures || this.generateFunctionSignatures(problem.title),
      testCases: this.generateTestCases(enhancedData.examples || []),
      metadata: {
        fetchedAt: new Date(),
        source: 'fallback',
        version: '1.0'
      }
    };
  }

  /**
   * Parse problem HTML to extract structured data
   */
  parseProblemHTML(html, problemSlug) {
    try {
      // Extract problem title
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const fullTitle = titleMatch ? titleMatch[1].trim() : '';
      
      // Parse title to get ID and name
      const titleParts = fullTitle.match(/^(\d+)\.\s*(.+?)\s*-\s*LeetCode$/);
      const problemId = titleParts ? parseInt(titleParts[1]) : null;
      const problemTitle = titleParts ? titleParts[2].trim() : fullTitle.replace(' - LeetCode', '');

      // Extract difficulty
      const difficultyMatch = html.match(/class="[^"]*difficulty[^"]*"[^>]*>([^<]+)</i) || 
                             html.match(/>(?:Easy|Medium|Hard)</gi);
      const difficulty = difficultyMatch ? difficultyMatch[0].replace(/[<>]/g, '').toLowerCase() : 'unknown';

      // Extract problem description
      const descriptionMatch = html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s);
      let description = '';
      if (descriptionMatch) {
        description = this.cleanHTML(descriptionMatch[1]);
      }

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

      // Generate test cases from examples
      const testCases = this.generateTestCases(examples);

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
          source: 'leetcode',
          version: '1.0'
        }
      };
    } catch (error) {
      throw new Error(`Failed to parse problem HTML: ${error.message}`);
    }
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
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Extract examples from HTML
   */
  extractExamples(html) {
    const examples = [];
    const exampleRegex = /<strong>Example\s*(\d+):<\/strong>(.*?)(?=<strong>Example|\n\n|<\/div>)/gs;
    let match;

    while ((match = exampleRegex.exec(html)) !== null) {
      const exampleText = this.cleanHTML(match[2]);
      const inputMatch = exampleText.match(/Input:\s*(.+?)(?=Output:|$)/s);
      const outputMatch = exampleText.match(/Output:\s*(.+?)(?=Explanation:|$)/s);
      const explanationMatch = exampleText.match(/Explanation:\s*(.+?)$/s);

      if (inputMatch && outputMatch) {
        examples.push({
          input: inputMatch[1].trim(),
          output: outputMatch[1].trim(),
          explanation: explanationMatch ? explanationMatch[1].trim() : undefined
        });
      }
    }

    return examples;
  }

  /**
   * Extract constraints from HTML
   */
  extractConstraints(html) {
    const constraints = [];
    const constraintsMatch = html.match(/<strong>Constraints:<\/strong>(.*?)(?=<\/div>|<strong>)/s);
    
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

    return constraints;
  }

  /**
   * Extract topics from HTML
   */
  extractTopics(html) {
    const topics = [];
    const topicMatches = html.match(/data-topic="([^"]+)"/g);
    
    if (topicMatches) {
      for (const match of topicMatches) {
        const topic = match.match(/data-topic="([^"]+)"/)[1];
        if (!topics.includes(topic)) {
          topics.push(topic);
        }
      }
    }

    return topics;
  }

  /**
   * Extract companies from HTML (if available)
   */
  extractCompanies(html) {
    const companies = [];
    // This is a placeholder - company data might not be available in public HTML
    // Could be enhanced with additional data sources
    return companies;
  }

  /**
   * Generate function signatures for different languages
   */
  generateFunctionSignatures(problemTitle, html) {
    // This is a simplified implementation
    // In a real implementation, this would parse the code editor templates from the page
    const functionName = this.generateFunctionName(problemTitle);
    
    return {
      javascript: {
        name: functionName,
        params: [{ name: 'param', type: 'any' }],
        returnType: 'any'
      },
      python: {
        name: functionName,
        params: [{ name: 'param', type: 'Any' }],
        returnType: 'Any'
      },
      java: {
        name: functionName,
        params: [{ name: 'param', type: 'Object' }],
        returnType: 'Object'
      },
      cpp: {
        name: functionName,
        params: [{ name: 'param', type: 'auto' }],
        returnType: 'auto'
      }
    };
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
   * Generate test cases from examples
   */
  generateTestCases(examples) {
    const testCases = [];
    
    for (const example of examples) {
      try {
        // This is a simplified parser - would need more sophisticated parsing
        const input = this.parseExampleInput(example.input);
        const expected = this.parseExampleOutput(example.output);
        
        testCases.push({
          input: input,
          expected: expected,
          description: example.explanation
        });
      } catch (error) {
        console.warn(`Failed to parse example: ${error.message}`);
      }
    }

    return testCases;
  }

  /**
   * Parse example input
   */
  parseExampleInput(inputStr) {
    // Simplified parsing - would need more sophisticated logic
    try {
      return JSON.parse(inputStr.replace(/=/g, ':'));
    } catch {
      return [inputStr];
    }
  }

  /**
   * Parse example output
   */
  parseExampleOutput(outputStr) {
    // Simplified parsing - would need more sophisticated logic
    try {
      return JSON.parse(outputStr);
    } catch {
      return outputStr;
    }
  }

  /**
   * Search problems with filters
   */
  async searchProblems(filters = {}) {
    try {
      const { difficulty, topics, companies, limit = 50 } = filters;
      
      // Build search URL with filters
      let searchUrl = `${this.baseUrl}/problemset/all/`;
      const params = new URLSearchParams();
      
      if (difficulty) {
        params.append('difficulty', difficulty.toUpperCase());
      }
      
      if (topics && topics.length > 0) {
        params.append('topicSlugs', topics.join(','));
      }
      
      if (params.toString()) {
        searchUrl += '?' + params.toString();
      }
      
      console.log(`Searching problems with filters:`, filters);
      const html = await this.makeRequest(searchUrl);
      
      return this.parseProblemsListHTML(html, limit);
    } catch (error) {
      console.warn(`Search failed, using fallback: ${error.message}`);
      return this.getFallbackProblems(filters);
    }
  }

  /**
   * Parse problems list from HTML
   */
  parseProblemsListHTML(html, limit) {
    const problems = [];
    
    try {
      // Look for JSON data containing problems list
      const jsonMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/s);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[1]);
        const problemsData = data.problemsetQuestionList?.questions || [];
        
        for (const problem of problemsData.slice(0, limit)) {
          problems.push({
            id: problem.frontendQuestionId,
            title: problem.title,
            name: problem.titleSlug,
            difficulty: problem.difficulty?.toLowerCase() || 'unknown',
            topics: problem.topicTags?.map(tag => tag.name) || [],
            companies: problem.companyTags?.map(tag => tag.name) || [],
            isPaidOnly: problem.isPaidOnly || false,
            acRate: problem.acRate || 0
          });
        }
      }
      
      // Fallback to HTML parsing if JSON parsing fails
      if (problems.length === 0) {
        return this.parseProblemsFromHTML(html, limit);
      }
      
    } catch (error) {
      console.warn(`Failed to parse problems list: ${error.message}`);
      return this.parseProblemsFromHTML(html, limit);
    }
    
    return problems;
  }

  /**
   * Parse problems from HTML table (fallback)
   */
  parseProblemsFromHTML(html, limit) {
    const problems = [];
    const problemRegex = /<tr[^>]*>.*?<td[^>]*>.*?(\d+).*?<\/td>.*?<a[^>]*href="\/problems\/([^"]+)"[^>]*>([^<]+)<\/a>.*?<td[^>]*>.*?(Easy|Medium|Hard).*?<\/td>/gs;
    
    let match;
    let count = 0;
    
    while ((match = problemRegex.exec(html)) !== null && count < limit) {
      problems.push({
        id: parseInt(match[1]),
        title: this.cleanHTML(match[3]),
        name: match[2],
        difficulty: match[4].toLowerCase(),
        topics: [],
        companies: [],
        isPaidOnly: false,
        acRate: 0
      });
      count++;
    }
    
    return problems;
  }

  /**
   * Get fallback problems list (popular problems)
   */
  getFallbackProblems(filters = {}) {
    const fallbackProblems = [
      { id: 1, name: 'two-sum', title: 'Two Sum', difficulty: 'easy' },
      { id: 2, name: 'add-two-numbers', title: 'Add Two Numbers', difficulty: 'medium' },
      { id: 3, name: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium' },
      { id: 4, name: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'hard' },
      { id: 5, name: 'longest-palindromic-substring', title: 'Longest Palindromic Substring', difficulty: 'medium' },
      { id: 7, name: 'reverse-integer', title: 'Reverse Integer', difficulty: 'medium' },
      { id: 8, name: 'string-to-integer-atoi', title: 'String to Integer (atoi)', difficulty: 'medium' },
      { id: 9, name: 'palindrome-number', title: 'Palindrome Number', difficulty: 'easy' },
      { id: 11, name: 'container-with-most-water', title: 'Container With Most Water', difficulty: 'medium' },
      { id: 13, name: 'roman-to-integer', title: 'Roman to Integer', difficulty: 'easy' },
      { id: 14, name: 'longest-common-prefix', title: 'Longest Common Prefix', difficulty: 'easy' },
      { id: 15, name: '3sum', title: '3Sum', difficulty: 'medium' },
      { id: 20, name: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'easy' },
      { id: 21, name: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', difficulty: 'easy' },
      { id: 22, name: 'generate-parentheses', title: 'Generate Parentheses', difficulty: 'medium' },
      { id: 23, name: 'merge-k-sorted-lists', title: 'Merge k Sorted Lists', difficulty: 'hard' },
      { id: 26, name: 'remove-duplicates-from-sorted-array', title: 'Remove Duplicates from Sorted Array', difficulty: 'easy' },
      { id: 27, name: 'remove-element', title: 'Remove Element', difficulty: 'easy' },
      { id: 28, name: 'find-the-index-of-the-first-occurrence-in-a-string', title: 'Find the Index of the First Occurrence in a String', difficulty: 'easy' },
      { id: 33, name: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', difficulty: 'medium' },
      { id: 34, name: 'find-first-and-last-position-of-element-in-sorted-array', title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'medium' },
      { id: 35, name: 'search-insert-position', title: 'Search Insert Position', difficulty: 'easy' },
      { id: 36, name: 'valid-sudoku', title: 'Valid Sudoku', difficulty: 'medium' },
      { id: 39, name: 'combination-sum', title: 'Combination Sum', difficulty: 'medium' },
      { id: 42, name: 'trapping-rain-water', title: 'Trapping Rain Water', difficulty: 'hard' },
      { id: 46, name: 'permutations', title: 'Permutations', difficulty: 'medium' },
      { id: 48, name: 'rotate-image', title: 'Rotate Image', difficulty: 'medium' },
      { id: 49, name: 'group-anagrams', title: 'Group Anagrams', difficulty: 'medium' },
      { id: 53, name: 'maximum-subarray', title: 'Maximum Subarray', difficulty: 'medium' },
      { id: 54, name: 'spiral-matrix', title: 'Spiral Matrix', difficulty: 'medium' },
      { id: 55, name: 'jump-game', title: 'Jump Game', difficulty: 'medium' },
      { id: 56, name: 'merge-intervals', title: 'Merge Intervals', difficulty: 'medium' },
      { id: 62, name: 'unique-paths', title: 'Unique Paths', difficulty: 'medium' },
      { id: 70, name: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'easy' },
      { id: 72, name: 'edit-distance', title: 'Edit Distance', difficulty: 'hard' },
      { id: 75, name: 'sort-colors', title: 'Sort Colors', difficulty: 'medium' },
      { id: 76, name: 'minimum-window-substring', title: 'Minimum Window Substring', difficulty: 'hard' },
      { id: 78, name: 'subsets', title: 'Subsets', difficulty: 'medium' },
      { id: 79, name: 'word-search', title: 'Word Search', difficulty: 'medium' },
      { id: 84, name: 'largest-rectangle-in-histogram', title: 'Largest Rectangle in Histogram', difficulty: 'hard' },
      { id: 85, name: 'maximal-rectangle', title: 'Maximal Rectangle', difficulty: 'hard' },
      { id: 91, name: 'decode-ways', title: 'Decode Ways', difficulty: 'medium' },
      { id: 94, name: 'binary-tree-inorder-traversal', title: 'Binary Tree Inorder Traversal', difficulty: 'easy' },
      { id: 96, name: 'unique-binary-search-trees', title: 'Unique Binary Search Trees', difficulty: 'medium' },
      { id: 98, name: 'validate-binary-search-tree', title: 'Validate Binary Search Tree', difficulty: 'medium' },
      { id: 101, name: 'symmetric-tree', title: 'Symmetric Tree', difficulty: 'easy' },
      { id: 102, name: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'medium' },
      { id: 104, name: 'maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', difficulty: 'easy' },
      { id: 105, name: 'construct-binary-tree-from-preorder-and-inorder-traversal', title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'medium' },
      { id: 121, name: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'easy' },
      { id: 124, name: 'binary-tree-maximum-path-sum', title: 'Binary Tree Maximum Path Sum', difficulty: 'hard' },
      { id: 125, name: 'valid-palindrome', title: 'Valid Palindrome', difficulty: 'easy' },
      { id: 128, name: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence', difficulty: 'medium' }
    ];

    // Filter by difficulty if specified
    let filtered = fallbackProblems;
    if (filters.difficulty) {
      filtered = filtered.filter(p => p.difficulty === filters.difficulty.toLowerCase());
    }

    // Add default properties
    return filtered.map(problem => ({
      ...problem,
      topics: [],
      companies: [],
      isPaidOnly: false,
      acRate: 0
    }));
  }

  /**
   * Get random problem by difficulty
   */
  async getRandomProblem(difficulty) {
    try {
      // First try to search LeetCode
      const problems = await this.searchProblems({ difficulty, limit: 100 });
      if (problems.length === 0) {
        throw new Error(`No problems found for difficulty: ${difficulty}`);
      }
      
      const randomIndex = Math.floor(Math.random() * problems.length);
      return problems[randomIndex];
    } catch (error) {
      // If search fails (403 errors), use fallback problems directly
      console.log(`🔄 LeetCode search failed, using fallback problems...`);
      const fallbackProblems = this.getFallbackProblems({ difficulty });
      
      if (fallbackProblems.length === 0) {
        throw new Error(`No fallback problems available for difficulty: ${difficulty}`);
      }
      
      const randomIndex = Math.floor(Math.random() * fallbackProblems.length);
      return fallbackProblems[randomIndex];
    }
  }

  /**
   * Get problems by topic
   */
  async getProblemsByTopic(topic, limit = 20) {
    return this.searchProblems({ topics: [topic], limit });
  }

  /**
   * Get problems by company
   */
  async getProblemsByCompany(company, limit = 20) {
    return this.searchProblems({ companies: [company], limit });
  }

  /**
   * Get problem by ID
   */
  async getProblemById(id) {
    try {
      // First try to get from search results
      const problems = await this.searchProblems({ limit: 2000 });
      const problem = problems.find(p => p.id === parseInt(id));
      
      if (problem) {
        return await this.fetchProblem(problem.name);
      }
      
      // Fallback: try to fetch directly by ID
      return await this.fetchProblem(id);
    } catch (error) {
      throw new Error(`Failed to get problem by ID ${id}: ${error.message}`);
    }
  }

  /**
   * Validate if problem exists
   */
  async validateProblemExists(identifier) {
    try {
      await this.fetchProblem(identifier);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { LeetCodeAPIImpl };