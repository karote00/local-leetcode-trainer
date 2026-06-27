/**
 * Local Cache Manager for cache validation and compatibility helpers
 */

const { CacheManagerImpl } = require('./cache-manager');

class OfflineManager {
  constructor() {
    this.cache = new CacheManagerImpl();
    this.isOnline = false;
    this.lastOnlineCheck = null;
  }

  /**
   * Network monitoring is intentionally disabled. Problems are bundled locally.
   */
  startConnectivityMonitoring() {
    return false;
  }

  /**
   * Check network connectivity
   */
  async checkConnectivity() {
    this.isOnline = false;
    this.lastOnlineCheck = null;
    return false;
  }

  /**
   * Get connectivity status
   */
  getConnectivityStatus() {
    return {
      isOnline: false,
      lastCheck: this.lastOnlineCheck,
      mode: 'local',
      localOnly: true
    };
  }

  /**
   * Compatibility method: local-only mode is always enabled.
   */
  setOfflineMode(offline = true) {
    this.isOnline = false;
    console.log('Local-only mode is always enabled');
  }

  /**
   * Check if should prefer cache
   */
  shouldPreferCache() {
    return false;
  }

  /**
   * Get problem with local cache support
   */
  async getProblemOffline(identifier) {
    try {
      return null;
    } catch (error) {
      throw new Error(`Local cache access failed: ${error.message}`);
    }
  }

  /**
   * Get cached problem list
   */
  async getOfflineProblemList() {
    try {
      const problems = await this.cache.getOfflineProblems();
      
      return {
        problems,
        count: problems.length,
        isOffline: true,
        lastSync: this.lastOnlineCheck
      };
    } catch (error) {
      throw new Error(`Failed to get cached problems: ${error.message}`);
    }
  }

  /**
   * Validate cache integrity
   */
  async validateCacheIntegrity() {
    try {
      console.log('🔍 Validating cache integrity...');
      
      const entries = await this.cache.getAllEntries();
      const results = {
        total: entries.length,
        valid: 0,
        corrupted: 0,
        expired: 0,
        repaired: 0,
        errors: []
      };
      
      const now = Date.now();
      
      for (const entry of entries) {
        try {
          // Check expiration
          if (entry.expiresAt && now > entry.expiresAt) {
            results.expired++;
            await this.cache.delete(entry.key);
            continue;
          }
          
          // Validate checksum
          if (entry.checksum) {
            const calculatedChecksum = this.cache.calculateChecksum(entry.data);
            if (entry.checksum !== calculatedChecksum) {
              results.corrupted++;
              results.errors.push(`Corrupted entry: ${entry.key}`);
              await this.cache.delete(entry.key);
              continue;
            }
          }
          
          // Validate required fields for problems
          if (entry.key.startsWith('problem:')) {
            const required = ['id', 'title', 'name', 'difficulty', 'description'];
            const missing = required.filter(field => !entry.data[field]);
            
            if (missing.length > 0) {
              results.corrupted++;
              results.errors.push(`Problem ${entry.key} missing fields: ${missing.join(', ')}`);
              await this.cache.delete(entry.key);
              continue;
            }
          }
          
          results.valid++;
        } catch (error) {
          results.corrupted++;
          results.errors.push(`Error validating ${entry.key}: ${error.message}`);
          await this.cache.delete(entry.key);
        }
      }
      
      console.log(`✅ Cache validation complete: ${results.valid} valid, ${results.corrupted} corrupted, ${results.expired} expired`);
      return results;
    } catch (error) {
      throw new Error(`Cache validation failed: ${error.message}`);
    }
  }

  /**
   * Refresh stale cache entries
   */
  async refreshStaleEntries(maxAge = 7 * 24 * 60 * 60 * 1000) { // 7 days
    try {
      console.log('🔄 Marking stale local cache entries...');
      
      const entries = await this.cache.getAllEntries();
      const now = Date.now();
      const results = {
        refreshed: 0,
        errors: [],
        skipped: 0
      };
      
      for (const entry of entries) {
        try {
          if (!entry.key.startsWith('problem:')) {
            continue; // Only refresh problems
          }
          
          const age = now - new Date(entry.timestamp).getTime();
          if (age > maxAge) {
            console.log(`🔄 Marking stale entry: ${entry.key}`);
            
            // This would trigger a refresh - implementation depends on ProblemManager
            // For now, just mark as needing refresh
            entry.metadata.needsRefresh = true;
            await this.cache.set(entry.key, entry.data, entry.metadata);
            
            results.refreshed++;
          } else {
            results.skipped++;
          }
        } catch (error) {
          results.errors.push(`Failed to refresh ${entry.key}: ${error.message}`);
        }
      }
      
      console.log(`✅ Stale cache check complete: ${results.refreshed} marked, ${results.skipped} skipped`);
      return results;
    } catch (error) {
      throw new Error(`Failed to refresh stale entries: ${error.message}`);
    }
  }

  /**
   * Prepare for local use
   */
  async prepareOffline(problems = []) {
    try {
      console.log('📚 Local problem library is bundled with the package.');
      
      const results = {
        cached: problems.length,
        errors: [],
        totalSize: 0
      };

      console.log('✅ No network preparation is required.');
      return results;
    } catch (error) {
      throw new Error(`Failed to prepare local library: ${error.message}`);
    }
  }

  /**
   * Get cache health report
   */
  async getCacheHealthReport() {
    try {
      const stats = await this.cache.getStats();
      const connectivity = this.getConnectivityStatus();
      const validation = await this.validateCacheIntegrity();
      
      return {
        connectivity,
        stats,
        validation,
        recommendations: this.generateRecommendations(stats, validation, connectivity)
      };
    } catch (error) {
      throw new Error(`Failed to generate cache health report: ${error.message}`);
    }
  }

  /**
   * Generate cache recommendations
   */
  generateRecommendations(stats, validation, connectivity) {
    const recommendations = [];
    
    if (stats.utilizationPercent > 90) {
      recommendations.push({
        type: 'warning',
        message: 'Cache is nearly full. Consider clearing old entries.',
        action: 'lct cache clean'
      });
    }
    
    if (validation.corrupted > 0) {
      recommendations.push({
        type: 'error',
        message: `${validation.corrupted} corrupted cache entries found.`,
        action: 'lct cache validate --fix'
      });
    }
    
    if (stats.problemCount === 0) {
      recommendations.push({
        type: 'info',
        message: 'No generated problems cached. Start practicing to create local problem files.',
        action: 'lct challenge easy'
      });
    }
    
    return recommendations;
  }
}

module.exports = { OfflineManager };
