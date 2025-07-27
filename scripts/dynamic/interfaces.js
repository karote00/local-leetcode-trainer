/**
 * Core interfaces for the dynamic LeetCode integration system
 */

/**
 * LeetCode API Integration Interface
 */
class LeetCodeAPI {
  /**
   * Fetch a problem by identifier (ID, name, or URL)
   * @param {string|number} identifier - Problem identifier
   * @returns {Promise<Object>} Problem data
   */
  async fetchProblem(identifier) {
    throw new Error('fetchProblem must be implemented');
  }

  /**
   * Search problems with filters
   * @param {Object} filters - Search filters
   * @param {string} filters.difficulty - easy, medium, hard
   * @param {string[]} filters.topics - Array of topic names
   * @param {string[]} filters.companies - Array of company names
   * @returns {Promise<Array>} Array of problem metadata
   */
  async searchProblems(filters = {}) {
    throw new Error('searchProblems must be implemented');
  }

  /**
   * Validate if a problem exists
   * @param {string|number} identifier - Problem identifier
   * @returns {Promise<boolean>} Whether problem exists
   */
  async validateProblemExists(identifier) {
    throw new Error('validateProblemExists must be implemented');
  }
}

/**
 * Problem Manager Interface
 */
class ProblemManager {
  /**
   * Get a problem with caching and template generation
   * @param {string|number} identifier - Problem identifier
   * @param {Object} options - Options
   * @param {boolean} options.forceRefresh - Force refresh from API
   * @param {string} options.language - Target language
   * @param {boolean} options.includeHints - Include AI hints
   * @returns {Promise<Object>} Complete problem object
   */
  async getProblem(identifier, options = {}) {
    throw new Error('getProblem must be implemented');
  }

  /**
   * Get a random problem by difficulty
   * @param {string} difficulty - easy, medium, hard
   * @param {Object} options - Options
   * @returns {Promise<Object>} Random problem
   */
  async getRandomProblem(difficulty, options = {}) {
    throw new Error('getRandomProblem must be implemented');
  }

  /**
   * Generate problem files in target directory
   * @param {Object} problem - Problem data
   * @param {string} language - Target language
   * @param {string} targetDir - Target directory path
   * @returns {Promise<void>}
   */
  async generateProblemFiles(problem, language, targetDir) {
    throw new Error('generateProblemFiles must be implemented');
  }
}

/**
 * Cache Manager Interface
 */
class CacheManager {
  /**
   * Get cached data
   * @param {string} key - Cache key
   * @param {number} maxAge - Maximum age in milliseconds
   * @returns {Promise<any|null>} Cached data or null
   */
  async get(key, maxAge = 24 * 60 * 60 * 1000) {
    throw new Error('get must be implemented');
  }

  /**
   * Set cached data
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<void>}
   */
  async set(key, data, metadata = {}) {
    throw new Error('set must be implemented');
  }

  /**
   * Invalidate cached entries
   * @param {string} pattern - Pattern to match keys
   * @returns {Promise<void>}
   */
  async invalidate(pattern) {
    throw new Error('invalidate must be implemented');
  }

  /**
   * Get list of offline available problems
   * @returns {Promise<Array>} Array of cached problem identifiers
   */
  async getOfflineProblems() {
    throw new Error('getOfflineProblems must be implemented');
  }
}

/**
 * AI Learning Assistant Interface
 */
class AILearningAssistant {
  /**
   * Generate contextual hint
   * @param {Object} problem - Problem data
   * @param {string} userCode - User's current code
   * @param {number} hintLevel - Hint level (1-5)
   * @returns {Promise<string>} Generated hint
   */
  async generateHint(problem, userCode, hintLevel) {
    throw new Error('generateHint must be implemented');
  }

  /**
   * Explain solution approach
   * @param {Object} problem - Problem data
   * @param {string} approach - Approach type
   * @returns {Promise<string>} Step-by-step explanation
   */
  async explainApproach(problem, approach) {
    throw new Error('explainApproach must be implemented');
  }

  /**
   * Provide complete solution
   * @param {Object} problem - Problem data
   * @param {boolean} withExplanation - Include explanation
   * @returns {Promise<Object>} Solution with explanation
   */
  async provideSolution(problem, withExplanation = true) {
    throw new Error('provideSolution must be implemented');
  }
}

module.exports = {
  LeetCodeAPI,
  ProblemManager,
  CacheManager,
  AILearningAssistant
};