const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

// Function to extract the official practice link from a problem file
function extractOfficialPracticeLink(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const linkMatch = content.match(/(?:Link:|Official Practice Link:)?\s*(https:\/\/leetcode\.com\/problems\/[^\/\s]+\/)/);
    return linkMatch ? linkMatch[1] : null;
  } catch (error) {
    return null;
  }
}

// Helper function to check if file is a problem file
function isProblemFile(filename) {
  return filename.endsWith('.js') || filename.endsWith('.py') || filename.endsWith('.java') || filename.endsWith('.cpp');
}

// Function to find all problem files recursively
function findProblemFiles(dir = process.cwd()) {
  const files = [];
  
  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'scripts') {
        scanDir(fullPath);
      } else if (isProblemFile(item) && !item.includes('test') && !['test-runner.js', 'open-problem.js', 'challenge.js', 'complete.js', 'config.js'].includes(item)) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(dir);
  return files;
}

// Function to open URL in default browser
function openInBrowser(url) {
  const platform = process.platform;
  let command;
  
  if (platform === 'darwin') {
    command = `open "${url}"`;
  } else if (platform === 'win32') {
    command = `start "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }
  
  exec(command, (error) => {
    if (error) {
      console.log(`❌ Failed to open browser: ${error.message}`);
      console.log(`🔗 Please open this link manually: ${url}`);
    } else {
      console.log(`🚀 Opened official practice page in your browser!`);
    }
  });
}

// Function to resolve problem path
function resolveProblemPath(input) {
  const projectRoot = process.cwd();
  const language = getCurrentLanguage();
  const langConfig = getLanguageConfig(language);
  
  // If it's already a full path with extension and exists, use it
  if (input.includes('.')) {
    const fullInputPath = path.join(projectRoot, input);
    if (fs.existsSync(fullInputPath)) {
      return fullInputPath;
    }
  }
  
  // Try to construct the full path: difficulty/problem-name/problem-name.ext
  const parts = input.split('/');
  if (parts.length === 2) {
    const [difficulty, problemName] = parts;
    
    // First try active folder
    const activePath = path.join(projectRoot, difficulty, problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(activePath)) {
      return activePath;
    }
    
    // Then try completed folder within difficulty
    const completedPath = path.join(projectRoot, difficulty, 'completed', problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(completedPath)) {
      return completedPath;
    }
  }
  
  return null;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  let input = args[0];
  
  if (!input) {
    // Find all problem files and show them
    const problemFiles = findProblemFiles();
    
    if (problemFiles.length === 0) {
      console.log('❌ No problem files found.');
      process.exit(1);
    }
    
    console.log('📚 Available problems:');
    
    // Separate active and completed problems
    const activeProblems = [];
    const completedProblems = [];
    
    problemFiles.forEach(file => {
      const projectRoot = process.cwd();
      const relativePath = path.relative(projectRoot, file);
      const shortPath = relativePath.replace(/\/[^\/]+\.js$/, '');
      
      if (shortPath.includes('/completed/')) {
        completedProblems.push({ file, shortPath });
      } else {
        activeProblems.push({ file, shortPath });
      }
    });
    
    if (activeProblems.length > 0) {
      console.log('🔥 Active Problems:');
      activeProblems.forEach((item, index) => {
        const link = extractOfficialPracticeLink(item.file);
        const status = link ? '🔗' : '❌';
        console.log(`  ${index + 1}. ${status} ${item.shortPath}`);
      });
      console.log('');
    }
    
    if (completedProblems.length > 0) {
      console.log('✅ Completed Problems:');
      completedProblems.forEach((item, index) => {
        const link = extractOfficialPracticeLink(item.file);
        const status = link ? '🔗' : '❌';
        console.log(`  ${index + 1}. ${status} ${item.shortPath}`);
      });
      console.log('');
    }
    
    console.log('\n💡 Usage:');
    console.log('  yarn open <difficulty/problem-name>');
    console.log('  Example: yarn open easy/two-sum');
    return;
  }
  
  // Resolve the problem path
  const problemPath = resolveProblemPath(input);
  
  if (!problemPath) {
    console.log(`❌ Problem not found: ${input}`);
    console.log('💡 Try: yarn open easy/two-sum');
    process.exit(1);
  }
  
  // Extract and open the official practice link
  const link = extractOfficialPracticeLink(problemPath);
  
  if (!link) {
    console.log(`❌ No official practice link found in ${problemPath}`);
    console.log('💡 Make sure the file contains a line like: https://leetcode.com/problems/...');
    process.exit(1);
  }
  
  console.log(`🎯 Opening: ${path.basename(problemPath)}`);
  console.log(`🔗 Link: ${link}`);
  openInBrowser(link);
}

main();
