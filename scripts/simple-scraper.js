/**
 * Simple LeetCode Web Scraper
 * Gets problem information directly from LeetCode website
 */

const https = require('https');
const { URL } = require('url');

class SimpleLeetCodeScraper {
  constructor() {
    this.baseUrl = 'https://leetcode.com';
    this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  }

  /**
   * Get problem data from LeetCode website
   */
  async getProblem(problemSlug) {
    try {
      const url = `${this.baseUrl}/problems/${problemSlug}/`;
      console.log(`🌐 Fetching problem from: ${url}`);
      
      const html = await this.fetchHTML(url);
      return this.parseProblemHTML(html, problemSlug);
    } catch (error) {
      throw new Error(`Failed to get problem ${problemSlug}: ${error.message}`);
    }
  }

  /**
   * Fetch HTML from URL with retry logic
   */
  async fetchHTML(url) {
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 1) {
          // Add delay between retries
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        }
        
        return await this.makeRequest(url, attempt);
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        console.log(`⚠️  Attempt ${attempt} failed, retrying...`);
      }
    }
  }

  /**
   * Make HTTP request
   */
  async makeRequest(url, attempt = 1) {
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

  /**
   * Parse HTML to extract problem information
   */
  parseProblemHTML(html, problemSlug) {
    try {
      // Extract problem title and ID from page title
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

      return {
        id: problemId,
        title: problemTitle,
        slug: problemSlug,
        difficulty: difficulty,
        description: description,
        examples: examples,
        constraints: constraints,
        url: `https://leetcode.com/problems/${problemSlug}/`
      };
    } catch (error) {
      throw new Error(`Failed to parse problem HTML: ${error.message}`);
    }
  }

  /**
   * Extract difficulty from HTML
   */
  extractDifficulty(html) {
    // Look for difficulty in various places
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

  /**
   * Extract problem description
   */
  extractDescription(html) {
    // Try to find the problem description in JSON data
    const jsonMatch = html.match(/"content":"([^"]+)"/);
    if (jsonMatch) {
      return this.cleanHTML(jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'));
    }

    // Fallback: try to extract from HTML
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

  /**
   * Extract examples from HTML
   */
  extractExamples(html) {
    const examples = [];
    
    // Try to extract from JSON data first
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

    // If no examples found, try HTML parsing
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

    // Generate at least one example if none found
    if (examples.length === 0) {
      examples.push({
        input: "Example input",
        output: "Example output",
        explanation: "Example explanation"
      });
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
    
    // Look for Constraints section
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

    // Generate basic constraints if none found
    if (constraints.length === 0) {
      constraints.push("Valid input guaranteed");
    }

    return constraints;
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
}

module.exports = { SimpleLeetCodeScraper };