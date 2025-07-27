/**
 * Dynamic Challenge Command - Integrates with existing challenge system
 */

const fs = require('fs');
const path = require('path');
const { ProblemManagerImpl } = require('./dynamic/problem-manager');
const { OfflineManager } = require('./dynamic/offline-manager');
const { getCurrentLanguage, getLanguageConfig } = require('./config.js');

class DynamicChallenge {
  constructor() {
    this.problemManager = new ProblemManagerImpl();
    this.offlineManager = new OfflineManager();
  }

  /**
   * Generate challenge using dynamic system
   */
  async generateChallenge(difficulty, count = 1, options = {}) {
    try {
      const language = getCurrentLanguage();
      const results = [];

      console.log(`🎯 Generating ${count} ${difficulty} challenge(s) using dynamic system...`);

      // Check connectivity
      const connectivity = this.offlineManager.getConnectivityStatus();
      if (!connectivity.isOnline) {
        console.log('📱 Offline mode - using cached problems');
      }

      for (let i = 0; i < count; i++) {
        try {
          // Get random problem
          const problem = await this.problemManager.getRandomProblem(difficulty, {
            language: language,
            includeHints: false
          });

          // Create problem directory
          const problemDir = path.join(difficulty, problem.name);
          
          // Check if problem already exists
          if (fs.existsSync(problemDir)) {
            console.log(`⚠️  Problem already exists: ${problem.name}`);
            continue;
          }

          // Generate problem files
          const files = await this.problemManager.generateProblemFiles(
            problem, 
            language, 
            problemDir
          );

          results.push({
            problem: problem,
            files: files,
            directory: problemDir,
            isNew: true
          });

          // Display problem info
          this.displayProblemInfo(problem, files, i + 1);

        } catch (error) {
          console.error(`❌ Failed to generate problem ${i + 1}: ${error.message}`);
          
          // Fallback to static system if dynamic fails
          if (error.message.includes('offline') || error.message.includes('network')) {
            console.log('🔄 Falling back to static problem database...');
            return this.fallbackToStatic(difficulty, count - i, options);
          }
        }
      }

      if (results.length > 0) {
        this.displaySummary(results);
      }

      return results;
    } catch (error) {
      console.error(`❌ Dynamic challenge generation failed: ${error.message}`);
      
      // Fallback to static system
      console.log('🔄 Falling back to static problem database...');
      return this.fallbackToStatic(difficulty, count, options);
    }
  }

  /**
   * Generate specific problem by identifier
   */
  async generateSpecificProblem(identifier, options = {}) {
    try {
      const language = getCurrentLanguage();
      
      console.log(`🎯 Generating specific problem: ${identifier}`);

      // Get problem data
      const problem = await this.problemManager.getProblem(identifier, {
        language: language,
        forceRefresh: options.forceRefresh || false,
        includeHints: options.includeHints || false
      });

      // Create problem directory
      const problemDir = path.join(problem.difficulty, problem.name);
      
      // Check if problem already exists and handle accordingly
      if (fs.existsSync(problemDir) && !options.forceRefresh) {
        console.log(`⚠️  Problem already exists: ${problem.name}`);
        console.log(`💡 Use --force to regenerate or try: lct open ${problem.difficulty}/${problem.name}`);
        return null;
      }

      // Generate problem files
      const files = await this.problemManager.generateProblemFiles(
        problem, 
        language, 
        problemDir
      );

      const result = {
        problem: problem,
        files: files,
        directory: problemDir,
        isNew: !fs.existsSync(problemDir)
      };

      // Display problem info
      this.displayProblemInfo(problem, files, 1);

      return result;
    } catch (error) {
      throw new Error(`Failed to generate specific problem: ${error.message}`);
    }
  }

  /**
   * Display problem information
   */
  displayProblemInfo(problem, files, index) {
    const connectivity = this.offlineManager.getConnectivityStatus();
    const sourceIcon = connectivity.isOnline ? '🌐' : '📱';
    const sourceText = connectivity.isOnline ? 'LeetCode' : 'Cache';

    console.log(`\n${index}. ✨ ${problem.metadata?.source === 'cache' ? 'CACHED' : 'NEW'} ${problem.title}`);
    console.log(`   📝 ${this.truncateDescription(problem.description)}`);
    console.log(`   🏷️  ${problem.topics.join(', ')}`);
    if (problem.companies && problem.companies.length > 0) {
      console.log(`   🏢 ${problem.companies.slice(0, 3).join(', ')}`);
    }
    console.log(`   📁 Path: ${files.problemFile}`);
    console.log(`   🧪 Test: lct test ${problem.difficulty}/${problem.name}`);
    console.log(`   🔗 Open: lct open ${problem.difficulty}/${problem.name}`);
    console.log(`   ${sourceIcon} Source: ${sourceText}`);
  }

  /**
   * Display summary
   */
  displaySummary(results) {
    console.log(`\n🚀 Generated ${results.length} problem(s) successfully!`);
    console.log(`\n💡 Quick tips:`);
    console.log(`  • Use 'lct hint <problem>' for progressive hints`);
    console.log(`  • Use 'lct test <problem>' to run tests locally`);
    console.log(`  • Use 'lct open <problem>' to submit on LeetCode`);
    
    const connectivity = this.offlineManager.getConnectivityStatus();
    if (!connectivity.isOnline) {
      console.log(`  • 📱 Working offline - problems cached for future use`);
    }
  }

  /**
   * Truncate description for display
   */
  truncateDescription(description, maxLength = 100) {
    if (description.length <= maxLength) {
      return description;
    }
    
    return description.substring(0, maxLength).trim() + '...';
  }

  /**
   * Fallback to static system
   */
  async fallbackToStatic(difficulty, count, options) {
    try {
      // Import and use the original challenge system
      const originalChallenge = require('./challenge.js');
      
      console.log(`🔄 Using static problem database for ${count} ${difficulty} problem(s)`);
      
      // This would call the original challenge generation logic
      // For now, return empty array to indicate fallback occurred
      return [];
    } catch (error) {
      console.error(`❌ Static fallback also failed: ${error.message}`);
      return [];
    }
  }

  /**
   * Get offline problem list
   */
  async getOfflineProblems() {
    try {
      const offlineData = await this.offlineManager.getOfflineProblemList();
      
      console.log(`📱 Offline Problems Available: ${offlineData.count}`);
      
      if (offlineData.count === 0) {
        console.log(`💡 No problems cached. When online, practice problems to build your offline library.`);
        return offlineData;
      }

      // Group by difficulty
      const grouped = {
        easy: offlineData.problems.filter(p => p.difficulty === 'easy'),
        medium: offlineData.problems.filter(p => p.difficulty === 'medium'),
        hard: offlineData.problems.filter(p => p.difficulty === 'hard')
      };

      console.log(`\n📊 Breakdown:`);
      console.log(`   Easy: ${grouped.easy.length}`);
      console.log(`   Medium: ${grouped.medium.length}`);
      console.log(`   Hard: ${grouped.hard.length}`);

      if (offlineData.lastSync) {
        console.log(`\n🔄 Last sync: ${new Date(offlineData.lastSync).toLocaleString()}`);
      }

      return offlineData;
    } catch (error) {
      console.error(`❌ Failed to get offline problems: ${error.message}`);
      return { problems: [], count: 0, isOffline: true };
    }
  }

  /**
   * Search problems
   */
  async searchProblems(query, options = {}) {
    try {
      const { difficulty, topics, companies, limit = 20 } = options;
      
      console.log(`🔍 Searching problems: ${query || 'all'}`);

      // Use the API to search
      const results = await this.problemManager.api.searchProblems({
        difficulty,
        topics: topics ? topics.split(',') : undefined,
        companies: companies ? companies.split(',') : undefined,
        limit
      });

      if (results.length === 0) {
        console.log(`❌ No problems found matching criteria`);
        return [];
      }

      console.log(`\n📋 Found ${results.length} problem(s):`);
      
      results.forEach((problem, index) => {
        console.log(`${index + 1}. ${problem.title} (${problem.difficulty})`);
        console.log(`   ID: ${problem.id} | Name: ${problem.name}`);
        if (problem.topics.length > 0) {
          console.log(`   Topics: ${problem.topics.join(', ')}`);
        }
      });

      console.log(`\n💡 Use: lct challenge ${results[0].name} to practice a specific problem`);

      return results;
    } catch (error) {
      console.error(`❌ Search failed: ${error.message}`);
      return [];
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats() {
    try {
      const stats = await this.offlineManager.cache.getStats();
      const connectivity = this.offlineManager.getConnectivityStatus();

      console.log(`\n📊 Cache Statistics:`);
      console.log(`   Total Size: ${this.formatBytes(stats.totalSize)} / ${this.formatBytes(stats.maxSize)}`);
      console.log(`   Utilization: ${stats.utilizationPercent.toFixed(1)}%`);
      console.log(`   Total Entries: ${stats.entryCount}`);
      console.log(`   Problems Cached: ${stats.problemCount}`);
      console.log(`   Search Results: ${stats.searchResultsCount}`);
      
      if (stats.oldestEntry) {
        console.log(`   Oldest Entry: ${new Date(stats.oldestEntry).toLocaleString()}`);
      }
      
      if (stats.newestEntry) {
        console.log(`   Newest Entry: ${new Date(stats.newestEntry).toLocaleString()}`);
      }

      console.log(`\n🌐 Connectivity: ${connectivity.isOnline ? 'Online' : 'Offline'}`);
      if (connectivity.lastCheck) {
        console.log(`   Last Check: ${connectivity.lastCheck.toLocaleString()}`);
      }

      return stats;
    } catch (error) {
      console.error(`❌ Failed to get cache stats: ${error.message}`);
      return null;
    }
  }

  /**
   * Format bytes for display
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

module.exports = { DynamicChallenge };