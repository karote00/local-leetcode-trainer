const fs = require('fs');
const path = require('path');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

// Dynamic LeetCode Integration (required)
let dynamicSystem = null;
try {
  const { ProblemManagerImpl } = require('./dynamic/problem-manager');
  const { OfflineManager } = require('./dynamic/offline-manager');
  dynamicSystem = {
    problemManager: new ProblemManagerImpl(),
    offlineManager: new OfflineManager()
  };
  console.log('🌐 Dynamic LeetCode integration enabled');
} catch (error) {
  console.error('❌ Dynamic system failed to load:', error.message);
  console.error('💡 Please ensure all dependencies are installed');
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
      throw new Error(`Failed to fetch specific problem "${specificProblem}": ${error.message}`);
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
          includeHints: false
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
        console.warn(`⚠️  Failed to fetch problem ${i + 1}: ${error.message}`);
        continue;
      }
    }
    
    if (problems.length === 0) {
      throw new Error(`Failed to fetch any ${difficulty} problems after ${maxAttempts} attempts`);
    }
  }
  
  return problems;
}

// Create problem files using dynamic problem data
async function createProblemFiles(difficulty, problem) {
  try {
    const language = getCurrentLanguage();
    const problemDir = path.join(difficulty, problem.name);
    
    // Generate problem files using the problem manager
    const files = await dynamicSystem.problemManager.generateProblemFiles(
      problem, 
      language, 
      problemDir
    );
    
    return !fs.existsSync(files.problemFile);
  } catch (error) {
    console.error(`❌ Failed to create files for ${problem.name}: ${error.message}`);
    return false;
  }
}

// Display problem information
function displayProblemInfo(problem, created, index) {
  const connectivity = dynamicSystem.offlineManager.getConnectivityStatus();
  const sourceIcon = problem.metadata?.source === 'cache' ? '📱' : '🌐';
  const sourceText = problem.metadata?.source === 'cache' ? 'Cache' : 'LeetCode';
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
    const offlineProblems = await dynamicSystem.offlineManager.getOfflineProblemList();
    console.log(`\n📱 Offline Problems Available: ${offlineProblems.count}`);
    
    if (offlineProblems.count > 0) {
      const grouped = {
        easy: offlineProblems.problems.filter(p => p.difficulty === 'easy').length,
        medium: offlineProblems.problems.filter(p => p.difficulty === 'medium').length,
        hard: offlineProblems.problems.filter(p => p.difficulty === 'hard').length
      };
      console.log(`  Easy: ${grouped.easy}, Medium: ${grouped.medium}, Hard: ${grouped.hard}`);
    }
  } catch (error) {
    console.log('📱 Offline cache not available');
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

  // Check if user specified a specific problem name (not a difficulty or number)
  const words = args.filter(arg => 
    !['easy', 'medium', 'hard'].includes(arg.toLowerCase()) && 
    !arg.match(/^\d+$/) &&
    !arg.startsWith('--')
  );
  
  if (words.length > 0) {
    specificProblem = words.join('-').toLowerCase();
  }

  // Show help if no difficulty and no specific problem
  if (!difficulty && !specificProblem) {
    console.log('🎯 LeetCode Challenge Generator (Dynamic)');
    console.log('');
    console.log('💡 Usage:');
    console.log('  lct challenge easy              # Get 1 random easy problem from LeetCode');
    console.log('  lct challenge medium 2          # Get 2 random medium problems from LeetCode');
    console.log('  lct challenge hard              # Get 1 random hard problem from LeetCode');
    console.log('  lct challenge two-sum           # Get specific problem by name');
    console.log('  lct challenge 3sum              # Get specific problem by name');
    console.log('  lct challenge 1                 # Get problem by ID');
    console.log('');
    console.log('🌐 All problems are fetched directly from LeetCode in real-time!');
    console.log('');

    await showProgressStats();
    
    console.log('');
    console.log('💡 New Features:');
    console.log('  lct hint <problem> <level>      # Get AI hints (levels 1-5)');
    console.log('  lct solution <problem>          # Get complete solution');
    console.log('  lct cache stats                 # Check cache status');
    console.log('  lct cache list                  # List offline problems');
    
    process.exit(0);
  }

  try {
    // Generate problems using dynamic system
    console.log('🌐 Fetching from LeetCode...');
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
    
    // Check connectivity and provide helpful suggestions
    const connectivity = dynamicSystem.offlineManager.getConnectivityStatus();
    if (!connectivity.isOnline) {
      console.log('');
      console.log('📱 You appear to be offline. Try:');
      console.log('  lct cache list                  # See available offline problems');
      console.log('  lct cache prepare               # Cache problems when online');
    } else {
      console.log('');
      console.log('💡 Suggestions:');
      console.log('  - Check your internet connection');
      console.log('  - Try a different problem name');
      console.log('  - Use `lct cache list` to see offline problems');
    }
    
    process.exit(1);
  }

  // Ensure script exits properly
  process.exit(0);
}

main().catch(error => {
  console.error(`❌ Challenge generation failed: ${error.message}`);
  process.exit(1);
});