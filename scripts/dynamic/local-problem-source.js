/**
 * Local Problem Source - loads practice problems from the bundled library.
 */

const { ProblemSource } = require('./interfaces');
const { getProblem, getProblemsByDifficulty, getAllProblems } = require('./problems/index.js');

class LocalProblemSourceImpl extends ProblemSource {
  normalizeProblemIdentifier(identifier) {
    if (typeof identifier === 'number') {
      return identifier;
    }

    if (typeof identifier === 'string') {
      if (identifier.includes('leetcode.com/problems/')) {
        const match = identifier.match(/\/problems\/([^\/]+)/);
        return match ? match[1] : identifier;
      }

      return identifier.toLowerCase().replace(/\s+/g, '-');
    }

    throw new Error(`Invalid problem identifier: ${identifier}`);
  }

  async fetchProblem(identifier) {
    const normalizedIdentifier = this.normalizeProblemIdentifier(identifier);
    const problem = getProblem(normalizedIdentifier);

    if (!problem) {
      const availableProblems = getAllProblems().map(p => p.name).slice(0, 10);
      throw new Error(`Problem "${identifier}" not available in local library. Available problems: ${availableProblems.join(', ')}, etc.`);
    }

    console.log(`📚 Loading local problem data for: ${problem.name}`);

    return {
      ...problem,
      metadata: {
        ...(problem.metadata || {}),
        source: 'local-library',
        version: '4.0',
        loadedAt: new Date().toISOString()
      }
    };
  }

  async searchProblems(filters = {}) {
    const {
      difficulty,
      topics,
      companies,
      limit = 50
    } = filters;

    let problems = getAllProblems();

    if (difficulty) {
      const normalizedDifficulty = difficulty.toLowerCase();
      problems = problems.filter(problem =>
        String(problem.difficulty).toLowerCase() === normalizedDifficulty
      );
    }

    if (topics && topics.length > 0) {
      const normalizedTopics = topics.map(topic => topic.toLowerCase());
      problems = problems.filter(problem =>
        (problem.topics || []).some(topic => normalizedTopics.includes(topic.toLowerCase()))
      );
    }

    if (companies && companies.length > 0) {
      const normalizedCompanies = companies.map(company => company.toLowerCase());
      problems = problems.filter(problem =>
        (problem.companies || []).some(company => normalizedCompanies.includes(company.toLowerCase()))
      );
    }

    return problems.slice(0, limit).map(problem => ({
      id: problem.id,
      name: problem.slug || problem.name,
      title: problem.title,
      difficulty: problem.difficulty,
      topics: problem.topics || [],
      companies: problem.companies || [],
      isPaidOnly: false,
      acRate: 0
    }));
  }

  async getRandomProblem(difficulty, options = {}) {
    const excludedNames = new Set((options.exclude || []).map(name => String(name).toLowerCase()));
    const availableProblems = getProblemsByDifficulty(difficulty).filter(problem => {
      const slug = String(problem.slug || problem.name).toLowerCase();
      const name = String(problem.name || problem.slug).toLowerCase();
      return !excludedNames.has(slug) && !excludedNames.has(name);
    });

    if (availableProblems.length === 0) {
      throw new Error(`No available local ${difficulty} problems after excluding existing problems`);
    }

    const randomIndex = Math.floor(Math.random() * availableProblems.length);
    const selectedProblem = availableProblems[randomIndex];

    return {
      id: selectedProblem.id,
      name: selectedProblem.slug || selectedProblem.name,
      title: selectedProblem.title,
      difficulty: selectedProblem.difficulty
    };
  }

  async getProblemsByTopic(topic, limit = 20) {
    return this.searchProblems({ topics: [topic], limit });
  }

  async getProblemsByCompany(company, limit = 20) {
    return this.searchProblems({ companies: [company], limit });
  }

  async getProblemById(id) {
    return this.fetchProblem(parseInt(id, 10));
  }

  async validateProblemExists(identifier) {
    try {
      await this.fetchProblem(identifier);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { LocalProblemSourceImpl };
