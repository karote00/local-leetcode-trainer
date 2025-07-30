#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const TeachingScriptGenerator = require('./generate-teaching-script');

/**
 * Generate trainer.yaml files for ALL problems that don't have them
 */
class UniversalTeachingGenerator {
  constructor() {
    this.generator = new TeachingScriptGenerator();
    this.stats = {
      total: 0,
      existing: 0,
      generated: 0,
      errors: 0
    };
  }

  /**
   * Generate teaching scripts for all problems
   */
  async generateAll() {
    console.log('🤖 **Universal AI Teaching Script Generator**\n');
    console.log('Scanning all problems and generating trainer.yaml files...\n');

    const difficulties = ['easy', 'medium', 'hard'];
    const basePath = path.join(__dirname, 'dynamic', 'problems');

    for (const difficulty of difficulties) {
      const difficultyPath = path.join(basePath, difficulty);
      if (!fs.existsSync(difficultyPath)) continue;

      console.log(`📁 **Processing ${difficulty.toUpperCase()} problems:**`);
      await this.processDifficulty(difficultyPath, difficulty);
      console.log('');
    }

    this.printSummary();
  }

  /**
   * Process all problems in a difficulty level
   */
  async processDifficulty(difficultyPath, difficulty) {
    const items = fs.readdirSync(difficultyPath, { withFileTypes: true });
    
    for (const item of items) {
      if (item.name === '.gitkeep' || item.name === 'completed') continue;
      
      const itemPath = path.join(difficultyPath, item.name);
      
      if (item.isDirectory()) {
        // Problem directory (e.g., two-sum/)
        await this.processProblemDirectory(itemPath, item.name, difficulty);
      } else if (item.isFile() && item.name.endsWith('.js')) {
        // Problem file (e.g., two-sum.js)
        await this.processProblemFile(itemPath, item.name, difficulty);
      }
    }
  }

  /**
   * Process a problem directory
   */
  async processProblemDirectory(problemPath, problemName, difficulty) {
    this.stats.total++;
    
    const trainerPath = path.join(problemPath, 'trainer.yaml');
    
    if (fs.existsSync(trainerPath)) {
      console.log(`  ✅ ${problemName} (already has trainer.yaml)`);
      this.stats.existing++;
      return;
    }

    // Generate teaching script
    const success = await this.generateTeachingScript(problemPath, problemName, difficulty);
    if (success) {
      console.log(`  🎯 ${problemName} (generated trainer.yaml)`);
      this.stats.generated++;
    } else {
      console.log(`  ❌ ${problemName} (failed to generate)`);
      this.stats.errors++;
    }
  }

  /**
   * Process a problem file (convert to directory structure)
   */
  async processProblemFile(problemFilePath, fileName, difficulty) {
    this.stats.total++;
    
    const problemName = fileName.replace('.js', '');
    const problemDir = path.join(path.dirname(problemFilePath), problemName);
    
    // Check if directory already exists
    if (fs.existsSync(problemDir)) {
      const trainerPath = path.join(problemDir, 'trainer.yaml');
      if (fs.existsSync(trainerPath)) {
        console.log(`  ✅ ${problemName} (already has trainer.yaml)`);
        this.stats.existing++;
        return;
      }
    } else {
      // Create directory and move file
      fs.mkdirSync(problemDir, { recursive: true });
      const newFilePath = path.join(problemDir, fileName);
      fs.renameSync(problemFilePath, newFilePath);
    }

    // Generate teaching script
    const success = await this.generateTeachingScript(problemDir, problemName, difficulty);
    if (success) {
      console.log(`  🎯 ${problemName} (created directory + trainer.yaml)`);
      this.stats.generated++;
    } else {
      console.log(`  ❌ ${problemName} (failed to generate)`);
      this.stats.errors++;
    }
  }

  /**
   * Generate teaching script for a problem
   */
  async generateTeachingScript(problemPath, problemName, difficulty) {
    try {
      // Determine template type based on difficulty
      const templateType = this.getTemplateType(difficulty);
      
      // Generate the script
      const scriptPath = this.generator.generateScript(problemPath, templateType, {
        language: 'javascript'
      });
      
      return scriptPath !== null;
    } catch (error) {
      console.error(`    Error: ${error.message}`);
      return false;
    }
  }

  /**
   * Get appropriate template type based on difficulty
   */
  getTemplateType(difficulty) {
    switch (difficulty) {
      case 'easy':
        return 'basic';
      case 'medium':
        return 'comprehensive';
      case 'hard':
        return 'advanced';
      default:
        return 'basic';
    }
  }

  /**
   * Print generation summary
   */
  printSummary() {
    console.log('🎉 **Generation Complete!**\n');
    console.log('📊 **Summary:**');
    console.log(`  📁 Total problems scanned: ${this.stats.total}`);
    console.log(`  ✅ Already had trainer.yaml: ${this.stats.existing}`);
    console.log(`  🎯 Generated trainer.yaml: ${this.stats.generated}`);
    console.log(`  ❌ Generation errors: ${this.stats.errors}`);
    console.log('');
    
    const coverage = this.stats.total > 0 ? 
      Math.round(((this.stats.existing + this.stats.generated) / this.stats.total) * 100) : 0;
    
    console.log(`🎯 **AI Teaching Coverage: ${coverage}%**`);
    
    if (this.stats.generated > 0) {
      console.log('');
      console.log('🚀 **Next Steps:**');
      console.log('1. Review generated trainer.yaml files');
      console.log('2. Customize specific problems as needed');
      console.log('3. Test AI teaching with: lct hint <problem-name>');
      console.log('4. Commit changes to repository');
    }
    
    if (this.stats.errors > 0) {
      console.log('');
      console.log('⚠️  **Errors encountered:**');
      console.log('Some problems failed to generate. Check the error messages above.');
    }
  }
}

// CLI interface
async function main() {
  const generator = new UniversalTeachingGenerator();
  await generator.generateAll();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = UniversalTeachingGenerator;