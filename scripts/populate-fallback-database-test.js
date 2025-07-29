/**
 * Populate Enhanced Fallback Database
 * Scrapes LeetCode problems and saves them to enhanced-fallback-database.js
 */

const fs = require('fs');
const https = require('https');
const { URL } = require('url');

// Known popular LeetCode problems from training data
const KNOWN_PROBLEMS = {
  "easy": [
    "palindrome-number",
    "valid-palindrome"
  ],
  "medium": [
    "add-two-numbers"
  ],
  "hard": [
    "median-of-two-sorted-arrays"
  ]
};

class LeetCodeScraper {
  constructor() {
    this.baseUrl = 'https://leetcode.com';
    this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    this.delay = 2000; // 2 second delay between requests
  }

  async scrapeProblem(problemSlug) {
    try {
      const url = `${this.baseUrl}/problems/${problemSlug}/`;
      console.log(`🌐 Scraping: ${problemSlug}`);
      
      const html = await this.fetchHTML(url);
      const problemData = this.parseProblemHTML(html, problemSlug);
      
      console.log(`✅ Successfully scraped: ${problemData.title}`);
      return problemData;
    } catch (error) {
      console.log(`❌ Failed to scrape ${problemSlug}: ${error.message}`);
      return null;
    }
  }

  async fetchHTML(url) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname,
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Cache-Control': 'max-age=0'
        },
        timeout: 15000
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

  parseProblemHTML(html, problemSlug) {
    try {
      // Extract problem title and ID
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const fullTitle = titleMatch ? titleMatch[1].trim() : '';
      
      const titleParts = fullTitle.match(/^(\d+)\.\s*(.+?)\s*-\s*LeetCode$/);
      const problemId = titleParts ? parseInt(titleParts[1]) : null;
      const problemTitle = titleParts ? titleParts[2].trim() : fullTitle.replace(' - LeetCode', '');

      // Extract difficulty
      const difficulty = this.extractDifficulty(html);

      // Extract description
      const description = this.extractDescription(html);

      // Extract examples
      const examples = this.extractExamples(html);

      // Extract constraints
      const constraints = this.extractConstraints(html);

      // Extract topics
      const topics = this.extractTopics(html);

      // Extract companies (if available)
      const companies = this.extractCompanies(html);

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
        functionSignatures: this.generateFunctionSignatures(problemTitle),
        testCases: this.generateTestCases(examples),
        hints: this.generateHints(topics),
        metadata: {
          scrapedAt: new Date().toISOString(),
          source: 'leetcode-scraper',
          version: '2.0'
        }
      };
    } catch (error) {
      throw new Error(`Failed to parse HTML: ${error.message}`);
    }
  }

  extractDifficulty(html) {
    const patterns = [
      /"difficulty":\s*"([^"]+)"/i,
      /difficulty[^>]*>([^<]+)</i,
      />(?:Easy|Medium|Hard)</gi
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const difficulty = match[1] || match[0];
        const cleaned = difficulty.replace(/[<>]/g, '').toLowerCase();
        if (['easy', 'medium', 'hard'].includes(cleaned)) {
          return cleaned;
        }
      }
    }
    return 'unknown';
  }

  extractDescription(html) {
    // Try JSON data first
    const jsonMatch = html.match(/"content":"([^"]+)"/);
    if (jsonMatch) {
      return this.cleanHTML(jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'));
    }

    // Fallback to HTML parsing
    const descPatterns = [
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/s,
      /<p[^>]*>(.*?)<\/p>/s
    ];

    for (const pattern of descPatterns) {
      const match = html.match(pattern);
      if (match) {
        const description = this.cleanHTML(match[1]);
        if (description.length > 50) {
          return description;
        }
      }
    }

    return `Problem description for ${problemSlug}`;
  }

  extractExamples(html) {
    const examples = [];
    
    // Try JSON data first
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

    // HTML parsing fallback
    if (examples.length === 0) {
      const exampleRegex = /<strong[^>]*>Example\s*(\d+):<\/strong>(.*?)(?=<strong[^>]*>Example|<strong[^>]*>Constraints|<\/div>)/gs;
      let match;

      while ((match = exampleRegex.exec(html)) !== null) {
        const exampleText = this.cleanHTML(match[2]);
        const example = this.parseExample(exampleText);
        if (example) {
          examples.push(example);
        }
      }
    }

    // Generate at least one example
    if (examples.length === 0) {
      examples.push({
        input: "Example input",
        output: "Example output",
        explanation: "Example explanation"
      });
    }

    return examples;
  }

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

  extractConstraints(html) {
    const constraints = [];
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

    if (constraints.length === 0) {
      constraints.push("Valid input guaranteed");
    }

    return constraints;
  }

  extractTopics(html) {
    const topics = [];
    
    // Look for topic tags
    const topicMatches = html.match(/data-topic="([^"]+)"/g);
    if (topicMatches) {
      for (const match of topicMatches) {
        const topic = match.match(/data-topic="([^"]+)"/)[1];
        if (!topics.includes(topic)) {
          topics.push(topic);
        }
      }
    }

    // JSON fallback
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

  extractCompanies(html) {
    const companies = [];
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

  generateFunctionSignatures(problemTitle) {
    const functionName = this.generateFunctionName(problemTitle);
    
    return {
      javascript: {
        name: functionName,
        params: [{ name: "param", type: "any" }],
        returnType: "any"
      },
      python: {
        name: functionName,
        params: [{ name: "param", type: "Any" }],
        returnType: "Any"
      },
      java: {
        name: functionName,
        params: [{ name: "param", type: "Object" }],
        returnType: "Object"
      },
      cpp: {
        name: functionName,
        params: [{ name: "param", type: "auto" }],
        returnType: "auto"
      }
    };
  }

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

  generateTestCases(examples) {
    return examples.map((example, index) => ({
      input: [example.input],
      expected: example.output,
      description: example.explanation || `Example ${index + 1}`,
      category: 'basic'
    }));
  }

  generateHints(topics) {
    const hints = [];
    
    if (topics.includes('Array')) {
      hints.push({ level: 1, text: 'Consider using two pointers or hash map for array problems', category: 'approach' });
    }
    if (topics.includes('Dynamic Programming')) {
      hints.push({ level: 2, text: 'Think about breaking the problem into subproblems', category: 'implementation' });
    }
    if (topics.includes('Binary Search')) {
      hints.push({ level: 1, text: 'The array might be sorted - consider binary search', category: 'approach' });
    }

    return hints;
  }

  cleanHTML(html) {
    return html
      .replace(/<[^>]+>/g, '')
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

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Main function to populate the database
async function populateDatabase() {
  const scraper = new LeetCodeScraper();
  const scrapedProblems = {};
  let successCount = 0;
  let failCount = 0;

  console.log('🚀 Starting to populate enhanced fallback database...');
  console.log(`📊 Total problems to scrape: ${Object.values(KNOWN_PROBLEMS).flat().length}`);

  for (const [difficulty, problems] of Object.entries(KNOWN_PROBLEMS)) {
    console.log(`\n📝 Scraping ${difficulty} problems (${problems.length} problems)...`);
    
    for (const problemSlug of problems) {
      try {
        const problemData = await scraper.scrapeProblem(problemSlug);
        
        if (problemData) {
          scrapedProblems[problemSlug] = problemData;
          successCount++;
        } else {
          failCount++;
        }
        
        // Add delay between requests to be respectful
        await scraper.delay(scraper.delay);
        
      } catch (error) {
        console.log(`❌ Error scraping ${problemSlug}: ${error.message}`);
        failCount++;
      }
    }
  }

  console.log(`\n📊 Scraping complete!`);
  console.log(`✅ Successfully scraped: ${successCount} problems`);
  console.log(`❌ Failed to scrape: ${failCount} problems`);

  if (successCount > 0) {
    await saveToDatabase(scrapedProblems);
  }
}

async function saveToDatabase(scrapedProblems) {
  try {
    console.log('\n💾 Saving to enhanced fallback database...');
    
    // Generate the new database content
    const databaseContent = generateDatabaseFile(scrapedProblems);
    
    // Write to file
    fs.writeFileSync('scripts/dynamic/enhanced-fallback-database-new.js', databaseContent);
    
    console.log('✅ Successfully saved enhanced fallback database!');
    console.log('📁 File: scripts/dynamic/enhanced-fallback-database-new.js');
    console.log('💡 Review the file and replace the original when ready');
    
  } catch (error) {
    console.error('❌ Failed to save database:', error.message);
  }
}

function generateDatabaseFile(problems) {
  const problemEntries = Object.entries(problems).map(([slug, data]) => {
    return `  '${slug}': ${JSON.stringify(data, null, 4).replace(/^/gm, '  ')}`;
  }).join(',\n\n');

  return `/**
 * Enhanced Fallback Problem Database
 * Comprehensive problem data scraped from LeetCode
 * Generated on: ${new Date().toISOString()}
 */

const ENHANCED_FALLBACK_PROBLEMS = {
${problemEntries}
};

/**
 * Get enhanced fallback problem data
 */
function getEnhancedFallbackProblem(identifier) {
  let problem = null;
  
  // If identifier is a number, find by ID
  if (typeof identifier === 'number') {
    problem = Object.values(ENHANCED_FALLBACK_PROBLEMS).find(p => p.id === identifier);
  } else {
    // If identifier is a string, find by slug
    problem = ENHANCED_FALLBACK_PROBLEMS[identifier];
  }
  
  if (!problem) {
    return null;
  }

  // Add metadata
  return {
    ...problem,
    metadata: {
      source: 'enhanced-fallback',
      version: '2.0',
      lastUpdated: new Date(),
      completeness: calculateCompletenessScore(problem)
    }
  };
}

/**
 * Calculate completeness score for a problem (0-100)
 */
function calculateCompletenessScore(problem) {
  let score = 0;
  
  // Basic fields (40 points)
  if (problem.description && problem.description.length > 100) score += 10;
  if (problem.examples && problem.examples.length >= 2) score += 10;
  if (problem.constraints && problem.constraints.length > 0) score += 10;
  if (problem.topics && problem.topics.length > 0) score += 10;
  
  // Function signatures (20 points)
  const languages = ['javascript', 'python', 'java', 'cpp'];
  const signaturesComplete = languages.every(lang => 
    problem.functionSignatures[lang] && 
    problem.functionSignatures[lang].name &&
    problem.functionSignatures[lang].params &&
    problem.functionSignatures[lang].returnType
  );
  if (signaturesComplete) score += 20;
  
  // Test cases (30 points)
  if (problem.testCases && problem.testCases.length >= 3) score += 10;
  if (problem.testCases && problem.testCases.some(tc => tc.category === 'edge')) score += 10;
  if (problem.testCases && problem.testCases.some(tc => tc.category === 'stress')) score += 10;
  
  // Hints (10 points)
  if (problem.hints && problem.hints.length >= 2) score += 10;
  
  return score;
}

/**
 * Get all available fallback problems
 */
function getAllEnhancedFallbackProblems() {
  return Object.keys(ENHANCED_FALLBACK_PROBLEMS).map(slug => ({
    slug,
    ...ENHANCED_FALLBACK_PROBLEMS[slug]
  }));
}

/**
 * Get fallback problems by difficulty
 */
function getEnhancedFallbackProblemsByDifficulty(difficulty) {
  return Object.entries(ENHANCED_FALLBACK_PROBLEMS)
    .filter(([_, problem]) => problem.difficulty === difficulty)
    .map(([slug, problem]) => ({ slug, ...problem }));
}

/**
 * Get fallback problems by topic
 */
function getEnhancedFallbackProblemsByTopic(topic) {
  return Object.entries(ENHANCED_FALLBACK_PROBLEMS)
    .filter(([_, problem]) => problem.topics.includes(topic))
    .map(([slug, problem]) => ({ slug, ...problem }));
}

module.exports = {
  ENHANCED_FALLBACK_PROBLEMS,
  getEnhancedFallbackProblem,
  getAllEnhancedFallbackProblems,
  getEnhancedFallbackProblemsByDifficulty,
  getEnhancedFallbackProblemsByTopic,
  calculateCompletenessScore
};`;
}

if (require.main === module) {
  populateDatabase().catch(console.error);
}

module.exports = { populateDatabase };