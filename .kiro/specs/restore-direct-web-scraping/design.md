# Design Document

## Overview

This design restores the original direct web scraping functionality for the LeetCode challenge generation system, replacing the current API-based approach with direct HTML parsing from LeetCode website. The system will also fix the critical bug where the same problem is always generated regardless of difficulty selection.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Challenge     │───▶│  Direct Web      │───▶│   Problem       │
│   Command       │    │  Scraper         │    │   Generator     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              ┌──────────────────┐    ┌─────────────────┐
         │              │   HTML Parser    │    │   File Creator  │
         │              └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Problem       │    │   Rate Limiter   │    │   Project       │
│   Selection     │    │   & Cache        │    │   Files         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Component Breakdown

1. **Challenge Command Interface** - Entry point that processes user commands
2. **Direct Web Scraper** - Core component that fetches and parses LeetCode pages
3. **Problem Selection Engine** - Ensures variety in problem generation
4. **HTML Parser** - Extracts structured data from LeetCode HTML
5. **Rate Limiter** - Prevents overwhelming LeetCode servers
6. **File Generator** - Creates problem files in the existing project structure

## Components and Interfaces

### 1. DirectWebScraper Class

```javascript
class DirectWebScraper {
  constructor(options = {}) {
    this.baseUrl = 'https://leetcode.com';
    this.timeout = options.timeout || 10000;
    this.userAgent = options.userAgent || 'Mozilla/5.0...';
    this.rateLimiter = new RateLimiter(options.rateLimit || 1000);
  }

  // Core scraping methods
  async scrapeProblem(problemSlug)
  async scrapeProblemsIndex(difficulty, limit = 100)
  async fetchHTML(url)
  
  // HTML parsing methods
  parseProblemHTML(html, problemSlug)
  extractProblemDescription(html)
  extractExamples(html)
  extractConstraints(html)
  extractTestCases(html)
}
```

### 2. ProblemSelector Class

```javascript
class ProblemSelector {
  constructor() {
    this.recentProblems = new Map(); // Track recently generated problems
    this.problemCache = new Map();   // Cache available problems by difficulty
  }

  // Problem selection methods
  async getRandomProblem(difficulty, excludeRecent = true)
  async refreshProblemList(difficulty)
  isRecentlyGenerated(problemSlug)
  addToRecentHistory(problemSlug)
}
```

### 3. RateLimiter Class

```javascript
class RateLimiter {
  constructor(minDelay = 1000) {
    this.minDelay = minDelay;
    this.lastRequest = 0;
    this.requestQueue = [];
  }

  // Rate limiting methods
  async throttle()
  async executeWithDelay(fn)
  calculateBackoffDelay(attempt)
}
```

### 4. HTMLParser Class

```javascript
class HTMLParser {
  // Parsing methods for different content types
  static extractTitle(html)
  static extractDifficulty(html)
  static extractDescription(html)
  static extractExamples(html)
  static extractConstraints(html)
  static extractTopics(html)
  static extractFunctionSignature(html)
  static cleanHTML(htmlContent)
}
```

## Data Models

### Problem Data Structure

```javascript
const ProblemData = {
  id: Number,                    // LeetCode problem ID
  title: String,                 // Problem title
  slug: String,                  // URL slug
  difficulty: String,            // 'easy', 'medium', 'hard'
  description: String,           // Full problem description
  examples: [                    // Array of examples
    {
      input: String,
      output: String,
      explanation: String
    }
  ],
  constraints: [String],         // Array of constraint strings
  topics: [String],              // Array of topic tags
  companies: [String],           // Array of company tags (if available)
  functionSignature: {           // Language-specific function signatures
    javascript: {
      name: String,
      params: [{ name: String, type: String }],
      returnType: String
    },
    python: { /* similar structure */ },
    java: { /* similar structure */ }
  },
  testCases: [                   // Generated test cases
    {
      input: [Any],
      expected: Any,
      description: String
    }
  ],
  metadata: {
    scrapedAt: Date,
    source: 'direct-scraper',
    version: String
  }
};
```

### Problem Selection State

```javascript
const SelectionState = {
  recentProblems: Map<String, Date>,  // problemSlug -> lastGenerated
  availableProblems: {
    easy: [ProblemSummary],
    medium: [ProblemSummary],
    hard: [ProblemSummary]
  },
  lastRefresh: Date,
  cacheExpiry: Number
};
```

## Error Handling

### Error Types and Recovery Strategies

1. **Network Errors**
   - Timeout: Retry with exponential backoff
   - Connection refused: Wait and retry
   - DNS errors: Fail gracefully with user message

2. **HTTP Errors**
   - 403 Forbidden: Implement longer delays, rotate user agents
   - 404 Not Found: Skip problem and try next
   - 429 Rate Limited: Implement exponential backoff
   - 5xx Server Errors: Retry with delay

3. **Parsing Errors**
   - Invalid HTML: Log error, skip problem
   - Missing elements: Use fallback extraction methods
   - Malformed content: Apply content sanitization

4. **Selection Errors**
   - No problems available: Refresh problem list
   - All recent problems: Clear recent history
   - Invalid difficulty: Default to 'medium'

### Error Recovery Flow

```
Error Occurs
     ↓
Classify Error Type
     ↓
Apply Recovery Strategy
     ↓
Retry if Appropriate
     ↓
Fallback or Fail Gracefully
```

## Testing Strategy

### Unit Tests

1. **HTMLParser Tests**
   - Test extraction methods with sample HTML
   - Test edge cases (missing elements, malformed HTML)
   - Test content sanitization

2. **ProblemSelector Tests**
   - Test random selection logic
   - Test recent problem tracking
   - Test cache management

3. **RateLimiter Tests**
   - Test delay calculations
   - Test queue management
   - Test backoff strategies

### Integration Tests

1. **End-to-End Scraping**
   - Test complete problem scraping flow
   - Test with different problem types
   - Test error handling scenarios

2. **Challenge Generation**
   - Test variety in problem generation
   - Test difficulty filtering
   - Test file creation

### Performance Tests

1. **Rate Limiting**
   - Verify requests don't exceed limits
   - Test backoff behavior
   - Measure response times

2. **Memory Usage**
   - Test cache size limits
   - Test memory cleanup
   - Monitor for memory leaks

## Implementation Plan

### Phase 1: Core Scraping Infrastructure
- Implement DirectWebScraper class
- Implement HTMLParser with robust extraction methods
- Implement RateLimiter with exponential backoff
- Add comprehensive error handling

### Phase 2: Problem Selection Engine
- Implement ProblemSelector class
- Add recent problem tracking
- Implement variety algorithms
- Add cache management

### Phase 3: Integration with Challenge Command
- Modify challenge.js to use DirectWebScraper
- Remove dependency on API-based system
- Maintain backward compatibility
- Add configuration options

### Phase 4: Testing and Optimization
- Add comprehensive test suite
- Performance optimization
- Error handling refinement
- Documentation updates

## Configuration

### Scraper Configuration

```javascript
const scraperConfig = {
  rateLimit: {
    minDelay: 1000,           // Minimum delay between requests (ms)
    maxDelay: 10000,          // Maximum delay for backoff (ms)
    backoffMultiplier: 2      // Exponential backoff multiplier
  },
  cache: {
    problemListTTL: 3600000,  // 1 hour cache for problem lists
    recentHistorySize: 50,    // Number of recent problems to track
    maxCacheSize: 1000        // Maximum cached problems
  },
  scraping: {
    timeout: 10000,           // Request timeout (ms)
    retries: 3,               // Maximum retry attempts
    userAgent: 'Mozilla/5.0...' // User agent string
  }
};
```

### Problem Selection Configuration

```javascript
const selectionConfig = {
  variety: {
    avoidRecentCount: 20,     // Avoid last N generated problems
    recentTimeWindow: 86400000, // 24 hours in ms
    maxRetries: 10            // Max attempts to find non-recent problem
  },
  fallback: {
    enableFallback: true,     // Enable fallback to recent problems if needed
    fallbackAfterAttempts: 5  // Use recent problems after N failed attempts
  }
};
```

## Migration Strategy

### Backward Compatibility

1. **File Structure**: Maintain existing directory structure and file naming
2. **Command Interface**: Keep existing command syntax and options
3. **Output Format**: Preserve existing problem file templates
4. **Configuration**: Add new config options without breaking existing ones

### Migration Steps

1. **Parallel Implementation**: Implement new scraper alongside existing system
2. **Feature Flag**: Add configuration to switch between old and new systems
3. **Gradual Rollout**: Test with subset of problem types first
4. **Full Migration**: Replace old system once new system is proven stable
5. **Cleanup**: Remove old API-based code after successful migration

### Rollback Plan

- Keep old system code available for quick rollback
- Implement feature flag to instantly switch back if issues arise
- Monitor error rates and performance metrics
- Have automated rollback triggers for critical failures

## Performance Considerations

### Optimization Strategies

1. **Caching**: Cache problem lists and parsed data
2. **Batch Processing**: Process multiple problems efficiently
3. **Lazy Loading**: Load problem details only when needed
4. **Connection Reuse**: Reuse HTTP connections where possible

### Monitoring

1. **Request Metrics**: Track request success rates and response times
2. **Error Rates**: Monitor different types of errors
3. **Cache Hit Rates**: Measure cache effectiveness
4. **User Experience**: Track problem generation times

This design provides a robust foundation for restoring direct web scraping functionality while ensuring reliability, performance, and maintainability.