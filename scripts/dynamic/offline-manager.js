/**
 * Offline Manager for handling offline scenarios and cache validation
 */

const { CacheManagerImpl } = require('./cache-manager');
const { config } = require('./config');

class OfflineManager {
  constructor() {
    this.cache = new CacheManagerImpl();
    this.isOnline = true;
    this.lastOnlineCheck = null;
    this.onlineCheckInterval = 30000; // 30 seconds
    
    this.startConnectivityMonitoring();
  }

  /**
   * Start monitoring network connectivity
   */
  startConnectivityMonitoring() {
    setInterval(() => {
      this.checkConnectivity().catch(() => {
        // Ignore errors in background check
      });
    }, this.onlineCheckInterval);
  }

  /**
   * Check network connectivity
   */
  async checkConnectivity() {
    try {
      const https = require('https');
      const url = config.get('api.leetcodeBaseUrl');
      
      return new Promise((resolve, reject) => {
        const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
          this.isOnline = res.statusCode >= 200 && res.statusCode < 400;
          this.lastOnlineCheck = new Date();
          resolve(this.isOnline);
        });
        
        req.on('error', () => {
          this.isOnline = false;
          this.lastOnlineCheck = new Date();
          resolve(false);
        });
        
        req.on('timeout', () => {
          req.destroy();
          this.isOnline = false;
          this.lastOnlineCheck = new Date();
          resolve(false);
        });
        
        req.end();
      });
    } catch (error) {
      this.isOnline = false;
      this.lastOnlineCheck = new Date();
      return false;
    }
  }

  /**
   * Get connectivity status
   */
  getConnectivityStatus() {
    return {
      isOnline: this.isOnline,
      lastCheck: this.lastOnlineCheck,
      mode: this.isOnline ? 'online' : 'offline'
    };
  }

  /**
   * Force offline mode
   */
  setOfflineMode(offline = true) {
    config.set('network.offlineMode', offline);
    this.isOnline = !offline;
    console.log(`${offline ? 'Enabled' : 'Disabled'} offline mode`);
  }

  /**
   * Check if should prefer cache
   */
  shouldPreferCache() {
    return config.get('network.preferCache') || 
           config.get('network.offlineMode') || 
           !this.isOnline;
  }

  /**
   * Get problem with offline support
   */
  async getProblemOffline(identifier) {
    const cacheKey = `problem:${identifier}`;
    
    try {
      // Try cache first if offline or prefer cache
      if (this.shouldPreferCache()) {
        const cached = await this.cache.get(cacheKey);
        if (cached) {
          console.log(`📱 Using cached problem: ${identifier}`);
          return {
            ...cached,
            metadata: {
              ...cached.metadata,
              source: 'cache',
              isOffline: !this.isOnline
            }
          };
        }
        
        if (!this.isOnline) {
          throw new Error(`Problem "${identifier}" not available offline. Try: lct cache list`);
        }
      }
      
      // If online, indicate cache miss
      if (this.isOnline) {
        console.log(`🌐 Problem not in cache, will fetch from LeetCode: ${identifier}`);
        return null; // Let caller handle fetching
      }
      
      throw new Error(`Offline and problem "${identifier}" not cached`);
    } catch (error) {
      throw new Error(`Offline access failed: ${error.message}`);
    }
  }

  /**
   * Get offline problem list
   */
  async getOfflineProblemList() {
    try {
      const problems = await this.cache.getOfflineProblems();
      
      return {
        problems,
        count: problems.length,
        isOffline: !this.isOnline,
        lastSync: this.lastOnlineCheck
      };
    } catch (error) {
      throw new Error(`Failed to get offline problems: ${error.message}`);
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
    if (!this.isOnline) {
      console.log('📱 Offline - cannot refresh cache entries');
      return { refreshed: 0, errors: [] };
    }
    
    try {
      console.log('🔄 Refreshing stale cache entries...');
      
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
            console.log(`🔄 Refreshing stale entry: ${entry.key}`);
            
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
      
      console.log(`✅ Refresh complete: ${results.refreshed} refreshed, ${results.skipped} skipped`);
      return results;
    } catch (error) {
      throw new Error(`Failed to refresh stale entries: ${error.message}`);
    }
  }

  /**
   * Prepare for offline use
   */
  async prepareOffline(problems = []) {
    if (!this.isOnline) {
      throw new Error('Must be online to prepare for offline use');
    }
    
    try {
      console.log('📱 Preparing for offline use...');
      
      const results = {
        cached: 0,
        errors: [],
        totalSize: 0
      };
      
      // If no specific problems provided, cache popular ones
      if (problems.length === 0) {
        problems = [
          'two-sum', 'add-two-numbers', 'longest-substring-without-repeating-characters',
          'median-of-two-sorted-arrays', 'longest-palindromic-substring', 'reverse-integer',
          'palindrome-number', 'container-with-most-water', 'roman-to-integer',
          'longest-common-prefix', 'valid-parentheses', 'merge-two-sorted-lists',
          'generate-parentheses', 'remove-duplicates-from-sorted-array', 'remove-element',
          'search-insert-position', 'maximum-subarray', 'climbing-stairs', 'merge-intervals',
          'unique-paths', 'minimum-path-sum', 'edit-distance', 'sort-colors'
        ];
      }
      
      for (const problemId of problems) {
        try {
          const cacheKey = `problem:${problemId}`;
          const existing = await this.cache.get(cacheKey);
          
          if (!existing) {
            console.log(`📥 Caching problem for offline use: ${problemId}`);
            // This would fetch and cache the problem
            // Implementation depends on LeetCodeAPI integration
            results.cached++;
          }
        } catch (error) {
          results.errors.push(`Failed to cache ${problemId}: ${error.message}`);
        }
      }
      
      console.log(`✅ Offline preparation complete: ${results.cached} problems cached`);
      return results;
    } catch (error) {
      throw new Error(`Failed to prepare for offline use: ${error.message}`);
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
    
    if (!connectivity.isOnline && stats.problemCount < 10) {
      recommendations.push({
        type: 'info',
        message: 'Limited offline problems available. Cache more when online.',
        action: 'lct cache prepare'
      });
    }
    
    if (connectivity.isOnline && stats.problemCount === 0) {
      recommendations.push({
        type: 'info',
        message: 'No problems cached. Start practicing to build offline library.',
        action: 'lct challenge easy'
      });
    }
    
    return recommendations;
  }
}

module.exports = { OfflineManager };