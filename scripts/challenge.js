const fs = require('fs');
const path = require('path');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

// Local problem library integration (required)
let dynamicSystem = null;

console.log('🔍 Loading local problem library...');

try {
  const { ProblemManagerImpl } = require('./dynamic/problem-manager');
  const { OfflineManager } = require('./dynamic/offline-manager');
  
  dynamicSystem = {
    problemManager: new ProblemManagerImpl(),
    offlineManager: new OfflineManager()
  };
  
  console.log('📚 Local problem library enabled');
} catch (error) {
  console.error('❌ CRITICAL ERROR: Local problem system failed to load');
  console.error('📁 Error details:', error.message);
  console.error('📍 Error location:', error.stack?.split('\n')[1]?.trim() || 'Unknown');
  console.error('');
  console.error('💡 Possible solutions:');
  console.error('  1. Reinstall the package: npm install -g local-leetcode-trainer@latest');
  console.error('  2. Check if all files were installed correctly');
  console.error('  3. Report this issue at: https://github.com/karote00/local-leetcode-trainer/issues');
  console.error('');
  console.error('🚨 Cannot continue without dynamic system - exiting...');
  process.exit(1);
}

// Verify local problem system is working
if (!dynamicSystem || !dynamicSystem.problemManager || !dynamicSystem.offlineManager) {
  console.error('❌ CRITICAL ERROR: Local problem system components missing');
  console.error('🚨 Cannot continue - exiting...');
  process.exit(1);
}

// Get existing problems to avoid duplicates
function getExistingProblems() {
  const existing = { easy: [], medium: [], hard: [] };
  const projectRoot = process.cwd();

  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const difficultyPath = path.join(projectRoot, difficulty);
    
    if (fs.existsSync(difficultyPath)) {
      const dirs = fs.readdirSync(difficultyPath).filter(item => {
        const itemPath = path.join(difficultyPath, item);
        return fs.statSync(itemPath).isDirectory() && item !== 'completed';
      });
      existing[difficulty] = dirs;
    }

    // Also check completed problems
    const completedPath = path.join(difficultyPath, 'completed');
    if (fs.existsSync(completedPath)) {
      const completedDirs = fs.readdirSync(completedPath).filter(item => {
        const itemPath = path.join(completedPath, item);
        return fs.statSync(itemPath).isDirectory();
      });
      existing[difficulty].push(...completedDirs);
    }
  });

  return existing;
}

// Generate problems using dynamic system
async function generateDynamicProblems(difficulty, count, specificProblem = null) {
  const problems = [];
  
  if (specificProblem) {
    // Generate specific problem
    try {
      const problem = await dynamicSystem.problemManager.getProblem(specificProblem, {
        language: getCurrentLanguage(),
        includeHints: false
      });
      problems.push(problem);
    } catch (error) {
      throw new Error(`Failed to load specific problem "${specificProblem}": ${error.message}`);
    }
  } else {
    // Generate random problems
    const existing = getExistingProblems();
    let attempts = 0;
    const maxAttempts = count * 3; // Try up to 3x the requested count
    
    for (let i = 0; i < count && attempts < maxAttempts; attempts++) {
      try {
        const problem = await dynamicSystem.problemManager.getRandomProblem(difficulty, {
          language: getCurrentLanguage(),
          includeHints: false,
          exclude: existing[difficulty]
        });
        
        // Check if problem already exists
        if (existing[difficulty].includes(problem.name)) {
          console.log(`⚠️  Problem already exists: ${problem.name}, trying another...`);
          continue;
        }
        
        problems.push(problem);
        existing[difficulty].push(problem.name); // Avoid duplicates in this session
        i++;
      } catch (error) {
        console.warn(`⚠️  Failed to load problem ${i + 1}: ${error.message}`);
        if (error.message.includes('No available')) {
          break;
        }
        continue;
      }
    }
    
    if (problems.length === 0) {
      throw new Error(`Failed to load any ${difficulty} problems after ${maxAttempts} attempts`);
    }
  }
  
  return problems;
}

// Create problem files using dynamic problem data
async function createProblemFiles(difficulty, problem) {
  try {
    const language = getCurrentLanguage();
    const problemDir = path.join(difficulty, problem.name);
    const langConfig = getLanguageConfig(language);
    const problemFilePath = path.join(problemDir, `${problem.name}${langConfig.extension}`);
    const isNewProblem = !fs.existsSync(problemFilePath);
    
    // Generate problem files using the problem manager
    await dynamicSystem.problemManager.generateProblemFiles(
      problem, 
      language, 
      problemDir
    );
    
    return isNewProblem;
  } catch (error) {
    console.error(`❌ Failed to create files for ${problem.name}: ${error.message}`);
    return false;
  }
}

// Display problem information
function displayProblemInfo(problem, created, index) {
  const source = problem.metadata?.source || 'local-library';
  const isFallback = source.includes('fallback');
  const isLocal = source === 'local-library';
  const sourceIcon = isLocal || problem.metadata?.source === 'cache' || isFallback ? '📚' : '🌐';
  const sourceText = isLocal ? 'Local Library' : problem.metadata?.source === 'cache' ? 'Cache' : isFallback ? 'Bundled Data' : 'External';
  const status = created ? '✨ NEW' : '📁 EXISTS';

  // Show absolute path for new challenges
  const projectRoot = process.cwd();
  const language = getCurrentLanguage();
  const langConfig = getLanguageConfig(language);
  const problemDir = path.join(projectRoot, problem.difficulty, problem.name);
  const problemFile = path.join(problemDir, `${problem.name}${langConfig.extension}`);

  // Truncate description for display
  const description = problem.description && problem.description.length > 100 
    ? problem.description.substring(0, 100) + '...'
    : problem.description || 'No description available';

  console.log(`${index}. ${status} ${problem.title}`);
  console.log(`   📝 ${description}`);
  console.log(`   🏷️  ${(problem.topics || []).join(', ') || 'No topics'}`);
  console.log(`   🏢 ${(problem.companies || []).slice(0, 3).join(', ') || 'No companies'}`);
  if (created) {
    console.log(`   📁 Path: ${problemFile}`);
  }
  console.log(`   🧪 Test: lct test ${problem.difficulty}/${problem.name}`);
  console.log(`   🔗 Open: lct open ${problem.difficulty}/${problem.name}`);
  console.log(`   ${sourceIcon} Source: ${sourceText}`);
  console.log('');
}

// Show progress statistics
async function showProgressStats() {
  const existing = getExistingProblems();
  const projectRoot = process.cwd();

  console.log('📊 Current Progress:');

  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const activePath = path.join(projectRoot, difficulty);
    const completedPath = path.join(projectRoot, difficulty, 'completed');

    let activeCount = 0;
    let completedCount = 0;

    if (fs.existsSync(activePath)) {
      activeCount = fs.readdirSync(activePath).filter(item => {
        const itemPath = path.join(activePath, item);
        return fs.statSync(itemPath).isDirectory() && item !== 'completed';
      }).length;
    }

    if (fs.existsSync(completedPath)) {
      completedCount = fs.readdirSync(completedPath).filter(item =>
        fs.statSync(path.join(completedPath, item)).isDirectory()
      ).length;
    }

    const total = activeCount + completedCount;
    console.log(`  ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}: ${total} total (${activeCount} active, ${completedCount} completed)`);
  });

  // Show cache stats
  try {
    const cachedProblems = await dynamicSystem.offlineManager.getOfflineProblemList();
    console.log(`\n📚 Cached Problems Available: ${cachedProblems.count}`);
    
    if (cachedProblems.count > 0) {
      const grouped = {
        easy: cachedProblems.problems.filter(p => p.difficulty === 'easy').length,
        medium: cachedProblems.problems.filter(p => p.difficulty === 'medium').length,
        hard: cachedProblems.problems.filter(p => p.difficulty === 'hard').length
      };
      console.log(`  Easy: ${grouped.easy}, Medium: ${grouped.medium}, Hard: ${grouped.hard}`);
    }
  } catch (error) {
    console.log('📚 Local cache not available');
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const input = args.join(' ').toLowerCase();

  // Parse the request
  let difficulty = null;
  let count = 1;
  let specificProblem = null;

  // Check for difficulty
  if (input.includes('easy')) difficulty = 'easy';
  else if (input.includes('medium')) difficulty = 'medium';
  else if (input.includes('hard')) difficulty = 'hard';

  // Extract number if specified
  const numberMatch = input.match(/(\d+)/);
  if (numberMatch) {
    count = parseInt(numberMatch[1]);
  }

  // Check if user specified a specific problem name or ID
  const words = args.filter(arg => 
    !['easy', 'medium', 'hard'].includes(arg.toLowerCase()) && 
    !arg.startsWith('--')
  );
  
  if (words.length > 0) {
    // Only treat numbers as problem IDs if no difficulty is specified
    if (!difficulty && words.length === 1 && words[0].match(/^\d+$/)) {
      specificProblem = parseInt(words[0]);
    } else if (!difficulty) {
      // Otherwise, treat it as a problem name (only if no difficulty)
      specificProblem = words.join('-').toLowerCase();
    }
    // If difficulty is specified, ignore the words (they're likely counts)
  }

  // Special case: only treat as problem ID if user explicitly uses format like "lct challenge 1" (without difficulty)
  // "lct challenge easy 1" should mean "1 easy problem", not "problem ID 1"

  // Show help if no difficulty and no specific problem
  if (!difficulty && !specificProblem) {
    console.log('🎯 Local Coding Challenge Generator');
    console.log('');
    console.log('💡 Usage:');
    console.log('  lct challenge easy              # Get 1 random easy problem from the local library');
    console.log('  lct challenge medium 2          # Get 2 random medium problems from the local library');
    console.log('  lct challenge hard              # Get 1 random hard problem from the local library');
    console.log('  lct challenge two-sum           # Get specific problem by name');
    console.log('  lct challenge 3sum              # Get specific problem by name');
    console.log('  lct challenge 1                 # Get problem by ID');
    console.log('');
    console.log('📚 Problems are loaded from the bundled local library.');
    console.log('');

    await showProgressStats();
    
    console.log('');
    console.log('💡 New Features:');
    console.log('  lct hint <problem> <level>      # Get AI hints (levels 1-5)');
    console.log('  lct solution <problem>          # Get complete solution');
    
    process.exit(0);
  }

  try {
    // Generate problems using dynamic system
    console.log('📚 Loading from local problem library...');
    const selectedProblems = await generateDynamicProblems(difficulty, count, specificProblem);

    if (selectedProblems.length === 0) {
      console.log(`❌ No problems could be generated. Please try again.`);
      process.exit(1);
    }

    console.log(`🎯 Generated ${selectedProblems.length} ${difficulty || 'problem'}${selectedProblems.length > 1 ? 's' : ''}:`);
    console.log('');

    // Create files and display info for each problem
    for (let i = 0; i < selectedProblems.length; i++) {
      const problem = selectedProblems[i];
      const created = await createProblemFiles(problem.difficulty, problem);
      displayProblemInfo(problem, created, i + 1);
    }

    console.log('🚀 Happy coding! Remember:');
    console.log('  1. Understand the problem first');
    console.log('  2. Think about edge cases');
    console.log('  3. Start with brute force, then optimize');
    console.log('  4. Test locally before submitting');
    console.log('');
    console.log('💡 New: Use `lct hint <problem> <level>` for AI assistance!');
    
  } catch (error) {
    console.error(`❌ Failed to generate challenge: ${error.message}`);
    
    console.log('');
    console.log('💡 Suggestions:');
    console.log('  - Try a different difficulty or problem name');
    console.log('  - Check the bundled library under scripts/dynamic/problems');
    
    process.exit(1);
  }

  // Ensure script exits properly
  process.exit(0);
}

main().catch(error => {
  console.error(`❌ Challenge generation failed: ${error.message}`);
  process.exit(1);
});
