const fs = require('fs');
const path = require('path');

// Function to resolve problem path
function resolveProblemPath(input) {
  const projectRoot = path.join(__dirname, '..');
  
  // If it's already a full path to a .js file and exists, use it
  if (input.endsWith('.js')) {
    const fullInputPath = path.join(projectRoot, input);
    if (fs.existsSync(fullInputPath)) {
      return fullInputPath;
    }
  }
  
  // Try to construct the full path: difficulty/problem-name/problem-name.js
  const parts = input.split('/');
  if (parts.length === 2) {
    const [difficulty, problemName] = parts;
    const fullPath = path.join(projectRoot, difficulty, problemName, `${problemName}.js`);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  
  return null;
}

// Function to move problem to completed folder
function markAsCompleted(problemInput) {
  const projectRoot = path.join(__dirname, '..');
  const problemPath = resolveProblemPath(problemInput);
  
  if (!problemPath) {
    console.log(`❌ Problem not found: ${problemInput}`);
    return false;
  }
  
  // Parse the problem path
  const relativePath = path.relative(projectRoot, problemPath);
  const parts = relativePath.split(path.sep);
  const difficulty = parts[0]; // easy, medium, hard
  const problemName = parts[1];
  
  // Create completed directory structure inside difficulty folder
  const completedDir = path.join(projectRoot, difficulty, 'completed');
  const targetDir = path.join(completedDir, problemName);
  
  if (!fs.existsSync(completedDir)) {
    fs.mkdirSync(completedDir, { recursive: true });
  }
  
  // Check if already completed
  if (fs.existsSync(targetDir)) {
    console.log(`✅ ${difficulty}/${problemName} is already marked as completed!`);
    return false;
  }
  
  // Move the entire problem folder
  const sourceDir = path.join(projectRoot, difficulty, problemName);
  
  try {
    // Copy the folder to completed
    fs.cpSync(sourceDir, targetDir, { recursive: true });
    
    // Remove from original location
    fs.rmSync(sourceDir, { recursive: true });
    
    console.log(`🎉 Moved ${difficulty}/${problemName} to completed!`);
    console.log(`📁 Location: ${difficulty}/completed/${problemName}`);
    return true;
  } catch (error) {
    console.log(`❌ Error moving problem: ${error.message}`);
    return false;
  }
}

// Function to list completed problems
function listCompleted() {
  const projectRoot = path.join(__dirname, '..');
  
  console.log('🏆 Completed Problems:');
  console.log('');
  
  let totalCompleted = 0;
  
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const completedDir = path.join(projectRoot, difficulty, 'completed');
    
    if (fs.existsSync(completedDir)) {
      const problems = fs.readdirSync(completedDir).filter(item => {
        return fs.statSync(path.join(completedDir, item)).isDirectory();
      });
      
      if (problems.length > 0) {
        console.log(`📗 ${difficulty.toUpperCase()} (${problems.length} completed):`);
        problems.forEach((problem, index) => {
          console.log(`  ${index + 1}. ${problem}`);
        });
        console.log('');
        totalCompleted += problems.length;
      }
    }
  });
  
  if (totalCompleted === 0) {
    console.log('📂 No completed problems yet. Keep coding! 💪');
  } else {
    console.log(`🎯 Total completed: ${totalCompleted} problems`);
    console.log('');
    console.log('💡 To test a completed problem:');
    console.log('  yarn test easy/problem-name  # Automatically finds in completed');
    console.log('💡 To open a completed problem:');
    console.log('  yarn open easy/problem-name  # Automatically finds in completed');
  }
}

// Function to uncomplete (move back to active)
function markAsActive(problemInput) {
  const projectRoot = path.join(__dirname, '..');
  
  // Parse input
  const parts = problemInput.split('/');
  if (parts.length !== 2) {
    console.log('❌ Invalid format. Use: difficulty/problem-name');
    return false;
  }
  
  const [difficulty, problemName] = parts;
  const completedDir = path.join(projectRoot, difficulty, 'completed', problemName);
  const activeDir = path.join(projectRoot, difficulty, problemName);
  
  if (!fs.existsSync(completedDir)) {
    console.log(`❌ Problem not found in completed: ${difficulty}/${problemName}`);
    return false;
  }
  
  if (fs.existsSync(activeDir)) {
    console.log(`❌ Problem already exists in active: ${difficulty}/${problemName}`);
    return false;
  }
  
  try {
    // Move back to active
    fs.cpSync(completedDir, activeDir, { recursive: true });
    fs.rmSync(completedDir, { recursive: true });
    
    console.log(`🔄 Moved ${difficulty}/${problemName} back to active!`);
    console.log(`📁 Location: ${difficulty}/${problemName}`);
    return true;
  } catch (error) {
    console.log(`❌ Error moving problem: ${error.message}`);
    return false;
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const firstArg = args[0];
  
  if (!firstArg) {
    console.log('🏆 LeetCode Completion Tracker');
    console.log('');
    console.log('💡 Usage:');
    console.log('  yarn complete easy/two-sum          # Mark problem as completed');
    console.log('  yarn complete list                  # List all completed problems');
    console.log('  yarn complete undo easy/two-sum     # Move back to active');
    console.log('');
    console.log('📊 Special Commands:');
    console.log('  list    - Show all completed problems');
    console.log('  undo    - Move problem back to active');
    return;
  }
  
  // Handle special commands
  if (firstArg.toLowerCase() === 'list' || firstArg.toLowerCase() === 'show') {
    listCompleted();
    return;
  }
  
  if (firstArg.toLowerCase() === 'undo' || firstArg.toLowerCase() === 'unmark') {
    const problemInput = args[1];
    if (!problemInput) {
      console.log('❌ Please specify a problem: yarn complete undo easy/two-sum');
      return;
    }
    markAsActive(problemInput);
    return;
  }
  
  // Default: treat first argument as problem to complete
  if (firstArg.includes('/')) {
    markAsCompleted(firstArg);
  } else {
    console.log(`❌ Invalid format: ${firstArg}`);
    console.log('💡 Use: yarn complete easy/two-sum');
  }
}

main();