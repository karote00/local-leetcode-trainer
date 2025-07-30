const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

// Language-specific test runners
function runJavaScriptTests(problemPath) {
  try {
    const projectRoot = process.cwd();
    const fullProblemPath = path.join(projectRoot, problemPath);
    
    // Check if test file exists
    const testFile = problemPath.replace('.js', '.test.js');
    const fullTestPath = path.join(projectRoot, testFile);
    if (!fs.existsSync(fullTestPath)) {
      console.log(`❌ Test file ${testFile} not found`);
      return;
    }
    
    console.log(`\n🧪 Running JavaScript tests for ${problemPath}...\n`);
    
    // Execute the test file directly (it has its own test runner now)
    delete require.cache[require.resolve(fullTestPath)]; // Clear cache
    const testModule = require(fullTestPath);
    
    if (testModule.runAllTests) {
      const success = testModule.runAllTests();
      if (success) {
        console.log('\n🎉 All tests passed! Your solution is working correctly.');
      } else {
        console.log('\n🔧 Some tests failed. Review your solution and try again.');
      }
    } else {
      console.log('❌ Test file does not have runAllTests function');
    }
  } catch (error) {
    console.log(`❌ Error running tests for ${problemPath}: ${error.message}`);
    console.log('💡 Make sure your solution file exports the function correctly.');
  }
}

function runPythonTests(problemPath) {
  const projectRoot = process.cwd();
  const fullProblemPath = path.join(projectRoot, problemPath);
  
  if (!fs.existsSync(fullProblemPath)) {
    console.log(`❌ Problem file not found: ${problemPath}`);
    return;
  }
  
  console.log(`\n🧪 Running Python tests for ${problemPath}...\n`);
  
  // Execute Python file
  exec(`python3 "${fullProblemPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ Python execution error: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.log(`⚠️  Python stderr: ${stderr}`);
    }
    
    console.log(stdout || '✅ Python script executed successfully');
  });
}

function runJavaTests(problemPath) {
  const projectRoot = process.cwd();
  const fullProblemPath = path.join(projectRoot, problemPath);
  const dir = path.dirname(fullProblemPath);
  const fileName = path.basename(fullProblemPath, '.java');
  
  if (!fs.existsSync(fullProblemPath)) {
    console.log(`❌ Problem file not found: ${problemPath}`);
    return;
  }
  
  console.log(`\n🧪 Running Java tests for ${problemPath}...\n`);
  
  // Compile and run Java
  exec(`cd "${dir}" && javac ${fileName}.java && java ${fileName}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ Java execution error: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.log(`⚠️  Java stderr: ${stderr}`);
    }
    
    console.log(stdout || '✅ Java program executed successfully');
  });
}

function runCppTests(problemPath) {
  const projectRoot = process.cwd();
  const fullProblemPath = path.join(projectRoot, problemPath);
  const dir = path.dirname(fullProblemPath);
  const fileName = path.basename(fullProblemPath, '.cpp');
  const outputFile = path.join(dir, fileName);
  
  if (!fs.existsSync(fullProblemPath)) {
    console.log(`❌ Problem file not found: ${problemPath}`);
    return;
  }
  
  console.log(`\n🧪 Running C++ tests for ${problemPath}...\n`);
  
  // Compile and run C++
  exec(`cd "${dir}" && g++ -o ${fileName} ${fileName}.cpp && ./${fileName}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ C++ execution error: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.log(`⚠️  C++ stderr: ${stderr}`);
    }
    
    console.log(stdout || '✅ C++ program executed successfully');
    
    // Clean up executable
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });
}

// Note: Test case runner is now embedded in each test file for framework-free testing

// Main test runner that detects language and runs appropriate tests
function runTests(problemPath) {
  const language = getCurrentLanguage();
  
  switch (language) {
    case 'javascript':
      runJavaScriptTests(problemPath);
      break;
    case 'python':
      runPythonTests(problemPath);
      break;
    case 'java':
      runJavaTests(problemPath);
      break;
    case 'cpp':
      runCppTests(problemPath);
      break;
    default:
      console.log(`❌ Unsupported language: ${language}`);
      console.log('✅ Supported languages: javascript, python, java, cpp');
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

// Function to resolve problem path
function resolveProblemPath(input) {
  const projectRoot = process.cwd();
  const language = getCurrentLanguage();
  const langConfig = getLanguageConfig(language);
  
  // If it's already a full path with extension and exists, use it
  if (input.includes('.')) {
    const fullInputPath = path.join(projectRoot, input);
    if (fs.existsSync(fullInputPath)) {
      return path.relative(projectRoot, fullInputPath);
    }
  }
  
  // Try to construct the full path: difficulty/problem-name/problem-name.ext
  const parts = input.split('/');
  if (parts.length === 2) {
    const [difficulty, problemName] = parts;
    
    // First try active folder
    const activePath = path.join(projectRoot, difficulty, problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(activePath)) {
      return path.relative(projectRoot, activePath);
    }
    
    // Then try completed folder within difficulty
    const completedPath = path.join(projectRoot, difficulty, 'completed', problemName, `${problemName}${langConfig.extension}`);
    if (fs.existsSync(completedPath)) {
      return path.relative(projectRoot, completedPath);
    }
  }
  
  return null;
}

// Get the problem file from command line args
const args = process.argv.slice(2);
let input = args[0];

if (!input) {
  // Find all problem files
  const problemFiles = findProblemFiles();
  
  if (problemFiles.length === 0) {
    console.log('❌ No problem files found. Create a problem file first!');
    console.log('📁 Expected structure: easy/problem-name/problem-name.js');
    process.exit(1);
  }
  
  // Show available problems
  console.log('📚 Available problems:');
  
  // Separate active and completed problems
  const activeProblems = [];
  const completedProblems = [];
  
  problemFiles.forEach(file => {
    const projectRoot = process.cwd();
    const relativePath = path.relative(projectRoot, file);
    const shortPath = relativePath.replace(/\/[^\/]+\.(js|py|java|cpp)$/, '');
    
    if (shortPath.includes('/completed/')) {
      completedProblems.push(shortPath);
    } else {
      activeProblems.push(shortPath);
    }
  });
  
  if (activeProblems.length > 0) {
    console.log('🔥 Active Problems:');
    activeProblems.forEach((shortPath, index) => {
      console.log(`  ${index + 1}. ${shortPath}`);
    });
    console.log('');
  }
  
  if (completedProblems.length > 0) {
    console.log('✅ Completed Problems:');
    completedProblems.forEach((shortPath, index) => {
      console.log(`  ${index + 1}. ${shortPath}`);
    });
    console.log('');
  }
  
  // Use the first one by default
  const problemPath = problemFiles[0];
  const projectRoot = process.cwd();
  const relativePath = path.relative(projectRoot, problemPath);
  console.log(`\n🎯 Running tests for: ${relativePath}`);
  runTests(relativePath);
} else {
  // Resolve the problem path
  const problemPath = resolveProblemPath(input);
  
  if (!problemPath) {
    console.log(`❌ Problem not found: ${input}`);
    console.log('💡 Try: yarn test easy/two-sum');
    process.exit(1);
  }
  
  runTests(problemPath);
}