const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Supported languages configuration
const LANGUAGE_CONFIGS = {
  javascript: {
    extension: '.js',
    testCommand: 'node',
    template: `/**
 * LeetCode {{id}}: {{title}}
 * Link: https://leetcode.com/problems/{{name}}/
 * 
 * {{description}}
 * 
 * Topics: {{topics}}
 * Companies: {{companies}}
 * 
 * TODO: Add problem description, examples, and constraints from LeetCode
 */

function {{functionName}}() {
    // Your solution here
    
}

module.exports = {{functionName}};`,
    testTemplate: `// Test cases for {{title}}
// TODO: Add test cases from LeetCode problem description
module.exports = [
    {
        input: [],
        expected: null
    }
];`
  },
  python: {
    extension: '.py',
    testCommand: 'python3',
    template: `"""
LeetCode {{id}}: {{title}}
Link: https://leetcode.com/problems/{{name}}/

{{description}}

Topics: {{topics}}
Companies: {{companies}}

TODO: Add problem description, examples, and constraints from LeetCode
"""

def {{function_name}}():
    # Your solution here
    pass

if __name__ == "__main__":
    # Test runner will execute this
    pass`,
    testTemplate: `# Test cases for {{title}}
# TODO: Add test cases from LeetCode problem description
test_cases = [
    {
        "input": [],
        "expected": None
    }
]`
  },
  java: {
    extension: '.java',
    testCommand: 'javac {{file}} && java {{className}}',
    template: `/**
 * LeetCode {{id}}: {{title}}
 * Link: https://leetcode.com/problems/{{name}}/
 * 
 * {{description}}
 * 
 * Topics: {{topics}}
 * Companies: {{companies}}
 * 
 * TODO: Add problem description, examples, and constraints from LeetCode
 */

public class {{ClassName}} {
    public static void main(String[] args) {
        // Your solution here
        
    }
}`,
    testTemplate: `// Test cases for {{title}}
// TODO: Add test cases from LeetCode problem description
public class {{ClassName}}Test {
    // Test implementation
}`
  },
  cpp: {
    extension: '.cpp',
    testCommand: 'g++ -o {{output}} {{file}} && ./{{output}}',
    template: `/**
 * LeetCode {{id}}: {{title}}
 * Link: https://leetcode.com/problems/{{name}}/
 * 
 * {{description}}
 * 
 * Topics: {{topics}}
 * Companies: {{companies}}
 * 
 * TODO: Add problem description, examples, and constraints from LeetCode
 */

#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // Your solution here
    
};

int main() {
    // Test cases
    return 0;
}`,
    testTemplate: `// Test cases for {{title}}
// TODO: Add test cases from LeetCode problem description`
  }
};

// Config file path
const CONFIG_FILE = path.join(__dirname, '..', '.leetcode-config.json');

// Read current configuration
function readConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const content = fs.readFileSync(CONFIG_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.log('⚠️  Config file corrupted, using defaults');
  }
  
  // Default configuration
  return {
    language: 'javascript',
    companies: [],
    createdAt: new Date().toISOString()
  };
}

// Write configuration
function writeConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.log(`❌ Failed to write config: ${error.message}`);
    return false;
  }
}

// Get current language
function getCurrentLanguage() {
  const config = readConfig();
  return config.language || 'javascript';
}

// Get language configuration
function getLanguageConfig(language) {
  return LANGUAGE_CONFIGS[language] || LANGUAGE_CONFIGS.javascript;
}

// Ask for user confirmation
function askConfirmation(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(`${question} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Count problems in workspace
function countProblems() {
  const counts = { easy: 0, medium: 0, hard: 0 };
  
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const difficultyPath = path.join(process.cwd(), difficulty);
    if (fs.existsSync(difficultyPath)) {
      const items = fs.readdirSync(difficultyPath);
      items.forEach(item => {
        const itemPath = path.join(difficultyPath, item);
        if (fs.statSync(itemPath).isDirectory() && item !== 'completed') {
          counts[difficulty]++;
        }
      });
      
      // Count completed problems
      const completedPath = path.join(difficultyPath, 'completed');
      if (fs.existsSync(completedPath)) {
        const completedItems = fs.readdirSync(completedPath);
        completedItems.forEach(item => {
          const itemPath = path.join(completedPath, item);
          if (fs.statSync(itemPath).isDirectory()) {
            counts[difficulty]++;
          }
        });
      }
    }
  });
  
  return counts;
}

// Archive current workspace
function archiveCurrentWork(currentLanguage) {
  const projectRoot = process.cwd();
  const archiveDir = path.join(projectRoot, `archive-${currentLanguage}`);
  
  // Create archive directory
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }
  
  // Move difficulty folders to archive
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const sourcePath = path.join(projectRoot, difficulty);
    const targetPath = path.join(archiveDir, difficulty);
    
    if (fs.existsSync(sourcePath)) {
      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true });
      }
      fs.renameSync(sourcePath, targetPath);
    }
  });
  
  console.log(`📦 Archived ${currentLanguage} work to archive-${currentLanguage}/`);
}

// Create fresh workspace structure
function createFreshWorkspace() {
  const projectRoot = process.cwd();
  
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const difficultyPath = path.join(projectRoot, difficulty);
    if (!fs.existsSync(difficultyPath)) {
      fs.mkdirSync(difficultyPath, { recursive: true });
    }
  });
}

// Show current configuration
function showCurrentConfig() {
  const config = readConfig();
  const counts = countProblems();
  const totalProblems = counts.easy + counts.medium + counts.hard;
  
  console.log('🔧 Current Configuration:');
  console.log('');
  console.log(`📝 Language: ${config.language}`);
  console.log(`📊 Problems: ${totalProblems} total (${counts.easy} easy, ${counts.medium} medium, ${counts.hard} hard)`);
  console.log(`📅 Created: ${new Date(config.createdAt).toLocaleDateString()}`);
  
  if (config.companies && config.companies.length > 0) {
    console.log(`🏢 Company Focus: ${config.companies.join(', ')}`);
  }
}

// Switch language
async function switchLanguage(newLanguage) {
  if (!LANGUAGE_CONFIGS[newLanguage]) {
    console.log(`❌ Unsupported language: ${newLanguage}`);
    console.log(`✅ Supported languages: ${Object.keys(LANGUAGE_CONFIGS).join(', ')}`);
    return;
  }
  
  const currentLanguage = getCurrentLanguage();
  
  if (currentLanguage === newLanguage) {
    console.log(`✅ Already using ${newLanguage}`);
    return;
  }
  
  const counts = countProblems();
  const totalProblems = counts.easy + counts.medium + counts.hard;
  
  console.log('⚠️  Language Switch Warning');
  console.log(`Current language: ${currentLanguage}`);
  console.log(`New language: ${newLanguage}`);
  console.log('');
  console.log('This will:');
  console.log(`❌ Archive all current problems to 'archive-${currentLanguage}/'`);
  console.log('🗑️  Clear active workspace');
  console.log(`✨ Start fresh with ${newLanguage} environment`);
  console.log('');
  console.log('📊 Current Progress:');
  console.log(`  Easy: ${counts.easy} problems`);
  console.log(`  Medium: ${counts.medium} problems`);
  console.log(`  Hard: ${counts.hard} problems`);
  console.log(`  Total: ${totalProblems} problems`);
  console.log('');
  
  const confirmed = await askConfirmation('❓ Are you sure you want to switch?');
  
  if (confirmed) {
    if (totalProblems > 0) {
      archiveCurrentWork(currentLanguage);
    }
    
    createFreshWorkspace();
    
    const config = readConfig();
    config.language = newLanguage;
    config.switchedAt = new Date().toISOString();
    
    if (writeConfig(config)) {
      console.log(`🎉 Switched to ${newLanguage}!`);
      console.log(`💡 Use 'yarn challenge easy' to start practicing.`);
    }
  } else {
    console.log('❌ Language switch cancelled.');
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command) {
    console.log('🔧 LeetCode Language Configuration');
    console.log('');
    showCurrentConfig();
    console.log('');
    console.log('💡 Usage:');
    console.log('  yarn config                    # Show current configuration');
    console.log('  yarn config javascript         # Switch to JavaScript');
    console.log('  yarn config python            # Switch to Python');
    console.log('  yarn config java              # Switch to Java');
    console.log('  yarn config cpp               # Switch to C++');
    console.log('');
    console.log('✅ Supported Languages:');
    Object.keys(LANGUAGE_CONFIGS).forEach(lang => {
      const config = LANGUAGE_CONFIGS[lang];
      console.log(`  ${lang.padEnd(12)} - ${config.extension} files`);
    });
    return;
  }
  
  await switchLanguage(command.toLowerCase());
}

// Export functions for use in other scripts
module.exports = {
  getCurrentLanguage,
  getLanguageConfig,
  LANGUAGE_CONFIGS,
  readConfig,
  writeConfig
};

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}