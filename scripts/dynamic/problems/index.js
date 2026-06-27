/**
 * Local Problems Database Index
 * Comprehensive collection of bundled practice problems organized by difficulty
 */

const fs = require('fs');
const path = require('path');

// Import all problems dynamically
function loadProblemsFromDirectory(directory) {
  const problems = {};
  const dirPath = path.join(__dirname, directory);
  
  if (!fs.existsSync(dirPath)) {
    return problems;
  }
  
  function scanDirectory(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    entries.forEach(entry => {
      if (entry.name.startsWith('.')) {
        return;
      }

      const entryPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(entryPath);
        return;
      }

      if (entry.name.endsWith('.js') && entry.name !== 'index.js') {
        try {
          const problem = require(entryPath);
          const problemName = problem.name || entry.name.replace('.js', '');
          problems[problemName] = problem;
        } catch (error) {
          console.warn(`Failed to load problem ${entryPath}:`, error.message);
        }
      }
    });
  }

  scanDirectory(dirPath);
  
  return problems;
}

// Load all problems by difficulty
const easyProblems = loadProblemsFromDirectory('easy');
const mediumProblems = loadProblemsFromDirectory('medium');
const hardProblems = loadProblemsFromDirectory('hard');

// Combine all problems
const allProblems = {
  ...easyProblems,
  ...mediumProblems,
  ...hardProblems
};

/**
 * Get problem by name/slug
 */
function getProblem(identifier) {
  if (typeof identifier === 'number') {
    // Find by ID
    return Object.values(allProblems).find(p => p.id === identifier);
  } else {
    // Find by name/slug
    return allProblems[identifier];
  }
}

/**
 * Get problems by difficulty
 */
function getProblemsByDifficulty(difficulty) {
  const normalizedDifficulty = difficulty.toLowerCase();
  return Object.entries(allProblems)
    .filter(([_, problem]) => String(problem.difficulty).toLowerCase() === normalizedDifficulty)
    .map(([slug, problem]) => ({ slug, ...problem }));
}

/**
 * Get problems by topic
 */
function getProblemsByTopic(topic) {
  return Object.entries(allProblems)
    .filter(([_, problem]) => problem.topics && problem.topics.includes(topic))
    .map(([slug, problem]) => ({ slug, ...problem }));
}

/**
 * Get problems by company
 */
function getProblemsByCompany(company) {
  return Object.entries(allProblems)
    .filter(([_, problem]) => problem.companies && problem.companies.includes(company))
    .map(([slug, problem]) => ({ slug, ...problem }));
}

/**
 * Get random problem by difficulty
 */
function getRandomProblem(difficulty = null) {
  let problemPool;
  
  if (difficulty) {
    problemPool = getProblemsByDifficulty(difficulty);
  } else {
    problemPool = Object.entries(allProblems).map(([slug, problem]) => ({ slug, ...problem }));
  }
  
  if (problemPool.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * problemPool.length);
  return problemPool[randomIndex];
}

/**
 * Get all available problems
 */
function getAllProblems() {
  return Object.entries(allProblems).map(([slug, problem]) => ({ slug, ...problem }));
}

/**
 * Get problem statistics
 */
function getStatistics() {
  const stats = {
    total: Object.keys(allProblems).length,
    easy: Object.keys(easyProblems).length,
    medium: Object.keys(mediumProblems).length,
    hard: Object.keys(hardProblems).length,
    topics: {},
    companies: {}
  };
  
  // Count topics and companies
  Object.values(allProblems).forEach(problem => {
    if (problem.topics) {
      problem.topics.forEach(topic => {
        stats.topics[topic] = (stats.topics[topic] || 0) + 1;
      });
    }
    
    if (problem.companies) {
      problem.companies.forEach(company => {
        stats.companies[company] = (stats.companies[company] || 0) + 1;
      });
    }
  });
  
  return stats;
}

module.exports = {
  // Problem collections
  easyProblems,
  mediumProblems,
  hardProblems,
  allProblems,
  
  // Query functions
  getProblem,
  getProblemsByDifficulty,
  getProblemsByTopic,
  getProblemsByCompany,
  getRandomProblem,
  getAllProblems,
  getStatistics
};
