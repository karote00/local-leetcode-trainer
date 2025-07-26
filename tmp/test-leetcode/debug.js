const path = require('path');
const fs = require('fs');

// Simulate the PROBLEMS array (just a few items)
const PROBLEMS = {
  easy: [
    { name: 'two-sum', title: 'Two Sum' },
    { name: 'palindrome-number', title: 'Palindrome Number' }
  ]
};

function getExistingProblems() {
  const existing = { easy: [], medium: [], hard: [] };
  const projectRoot = process.cwd();
  
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const activePath = path.join(projectRoot, difficulty);
    console.log('Checking active path:', activePath, 'exists:', fs.existsSync(activePath));
    if (fs.existsSync(activePath)) {
      const dirs = fs.readdirSync(activePath);
      dirs.forEach(dir => {
        const problemPath = path.join(activePath, dir);
        if (fs.statSync(problemPath).isDirectory() && dir !== 'completed') {
          existing[difficulty].push(dir);
        }
      });
    }
    
    const completedPath = path.join(projectRoot, difficulty, 'completed');
    console.log('Checking completed path:', completedPath, 'exists:', fs.existsSync(completedPath));
    if (fs.existsSync(completedPath)) {
      const dirs = fs.readdirSync(completedPath);
      dirs.forEach(dir => {
        const problemPath = path.join(completedPath, dir);
        if (fs.statSync(problemPath).isDirectory()) {
          if (!existing[difficulty].includes(dir)) {
            existing[difficulty].push(dir);
          }
        }
      });
    }
  });
  
  return existing;
}

const existing = getExistingProblems();
console.log('Existing problems:', existing);

const availableProblems = PROBLEMS.easy.filter(p => 
  !existing.easy.includes(p.name)
);

console.log('Available problems:', availableProblems);
console.log('Available problems length:', availableProblems.length);