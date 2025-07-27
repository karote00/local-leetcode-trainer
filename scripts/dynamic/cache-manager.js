/**
 * Cache Manager for local storage and retrieval
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const { CacheManager } = require('./interfaces');
const { config } = require('./config');

class CacheManagerImpl extends CacheManager {
  constructor() {
    super();
    this.cacheDir = path.join(process.cwd(), config.get('cache.directory'));
    this.maxSize = config.get('cache.maxSize');
    this.defaultTTL = config.get('cache.defaultTTL');
    this.cleanupInterval = config.get('cache.cleanupInterval');
    this.compressionEnabled = config.get('cache.compressionEnabled');
    
    this.initializeCache();
    this.startCleanupTimer();
  }

  /**
   * Initialize cache directory and metadata
   */
  initializeCache() {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        fs.mkdirSync(this.cacheDir, { recursive: true });
      }
      
      // Create metadata file if it doesn't exist
      const metadataPath = path.join(this.cacheDir, 'metadata.json');
      if (!fs.existsSync(metadataPath)) {
        const metadata = {
          version: '1.0',
          created: new Date().toISOString(),
          totalSize: 0,
          entryCount: 0
        };
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
      }
    } catch (error) {
      console.warn(`Failed to initialize cache: ${error.message}`);
    }
  }

  /**
   * Start cleanup timer
   */
  startCleanupTimer() {
    setInterval(() => {
      this.cleanup().catch(error => {
        console.warn(`Cache cleanup failed: ${error.message}`);
      });
    }, this.cleanupInterval);
  }

  /**
   * Generate cache key hash
   */
  generateKeyHash(key) {
    return crypto.createHash('sha256').update(key).digest('hex');
  }

  /**
   * Get cache file path
   */
  getCacheFilePath(key) {
    const keyHash = this.generateKeyHash(key);
    return path.join(this.cacheDir, `${keyHash}.cache`);
  }

  /**
   * Get metadata file path
   */
  getMetadataPath() {
    return path.join(this.cacheDir, 'metadata.json');
  }

  /**
   * Read metadata
   */
  readMetadata() {
    try {
      const metadataPath = this.getMetadataPath();
      if (fs.existsSync(metadataPath)) {
        return JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      }
    } catch (error) {
      console.warn(`Failed to read metadata: ${error.message}`);
    }
    
    return {
      version: '1.0',
      created: new Date().toISOString(),
      totalSize: 0,
      entryCount: 0
    };
  }

  /**
   * Write metadata
   */
  writeMetadata(metadata) {
    try {
      const metadataPath = this.getMetadataPath();
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    } catch (error) {
      console.warn(`Failed to write metadata: ${error.message}`);
    }
  }

  /**
   * Compress data if enabled
   */
  async compressData(data) {
    if (!this.compressionEnabled) {
      return Buffer.from(JSON.stringify(data));
    }
    
    return new Promise((resolve, reject) => {
      const jsonData = JSON.stringify(data);
      zlib.gzip(jsonData, (error, compressed) => {
        if (error) {
          reject(error);
        } else {
          resolve(compressed);
        }
      });
    });
  }

  /**
   * Decompress data if needed
   */
  async decompressData(buffer, isCompressed) {
    if (!isCompressed) {
      return JSON.parse(buffer.toString());
    }
    
    return new Promise((resolve, reject) => {
      zlib.gunzip(buffer, (error, decompressed) => {
        if (error) {
          reject(error);
        } else {
          try {
            resolve(JSON.parse(decompressed.toString()));
          } catch (parseError) {
            reject(parseError);
          }
        }
      });
    });
  }

  /**
   * Calculate checksum for data integrity
   */
  calculateChecksum(data) {
    return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
  }

  /**
   * Get cached data
   */
  async get(key, maxAge = this.defaultTTL) {
    try {
      const filePath = this.getCacheFilePath(key);
      
      if (!fs.existsSync(filePath)) {
        return null;
      }
      
      const stats = fs.statSync(filePath);
      const now = Date.now();
      const age = now - stats.mtime.getTime();
      
      // Check if cache entry is expired
      if (age > maxAge) {
        await this.delete(key);
        return null;
      }
      
      // Read cache entry
      const buffer = fs.readFileSync(filePath);
      const entry = await this.decompressData(buffer, this.compressionEnabled);
      
      // Validate checksum
      if (entry.checksum && entry.checksum !== this.calculateChecksum(entry.data)) {
        console.warn(`Cache entry corrupted for key: ${key}`);
        await this.delete(key);
        return null;
      }
      
      // Check TTL in entry metadata
      if (entry.expiresAt && now > entry.expiresAt) {
        await this.delete(key);
        return null;
      }
      
      // Update access time
      entry.metadata.lastAccessed = new Date().toISOString();
      entry.metadata.accessCount = (entry.metadata.accessCount || 0) + 1;
      
      // Write back updated metadata (async, don't wait)
      this.updateEntryMetadata(filePath, entry).catch(() => {});
      
      return entry.data;
    } catch (error) {
      console.warn(`Failed to get cache entry for key ${key}: ${error.message}`);
      return null;
    }
  }

  /**
   * Set cached data
   */
  async set(key, data, metadata = {}) {
    try {
      const filePath = this.getCacheFilePath(key);
      const now = new Date();
      const ttl = metadata.ttl || this.defaultTTL;
      
      const entry = {
        key: key,
        data: data,
        checksum: this.calculateChecksum(data),
        timestamp: now.toISOString(),
        expiresAt: new Date(now.getTime() + ttl).getTime(),
        metadata: {
          source: metadata.source || 'unknown',
          version: metadata.version || '1.0',
          size: JSON.stringify(data).length,
          created: now.toISOString(),
          lastAccessed: now.toISOString(),
          accessCount: 0,
          ...metadata
        }
      };
      
      // Compress data
      const compressed = await this.compressData(entry);
      
      // Check cache size limits
      await this.ensureCacheSize(compressed.length);
      
      // Write cache entry
      fs.writeFileSync(filePath, compressed);
      
      // Update metadata
      await this.updateCacheMetadata(compressed.length, 1);
      
      console.log(`Cached entry for key: ${key} (${compressed.length} bytes)`);
    } catch (error) {
      console.warn(`Failed to set cache entry for key ${key}: ${error.message}`);
    }
  }

  /**
   * Update entry metadata
   */
  async updateEntryMetadata(filePath, entry) {
    try {
      const compressed = await this.compressData(entry);
      fs.writeFileSync(filePath, compressed);
    } catch (error) {
      console.warn(`Failed to update entry metadata: ${error.message}`);
    }
  }

  /**
   * Ensure cache size is within limits
   */
  async ensureCacheSize(newEntrySize) {
    const metadata = this.readMetadata();
    const projectedSize = metadata.totalSize + newEntrySize;
    
    if (projectedSize > this.maxSize) {
      const bytesToFree = projectedSize - this.maxSize + (this.maxSize * 0.1); // Free 10% extra
      await this.evictLRU(bytesToFree);
    }
  }

  /**
   * Evict least recently used entries
   */
  async evictLRU(bytesToFree) {
    try {
      const entries = await this.getAllEntries();
      
      // Sort by last accessed time (oldest first)
      entries.sort((a, b) => {
        const aTime = new Date(a.metadata.lastAccessed || a.timestamp).getTime();
        const bTime = new Date(b.metadata.lastAccessed || b.timestamp).getTime();
        return aTime - bTime;
      });
      
      let freedBytes = 0;
      for (const entry of entries) {
        if (freedBytes >= bytesToFree) break;
        
        await this.delete(entry.key);
        freedBytes += entry.metadata.size || 0;
        console.log(`Evicted cache entry: ${entry.key}`);
      }
    } catch (error) {
      console.warn(`Failed to evict LRU entries: ${error.message}`);
    }
  }

  /**
   * Get all cache entries
   */
  async getAllEntries() {
    const entries = [];
    
    try {
      const files = fs.readdirSync(this.cacheDir);
      
      for (const file of files) {
        if (file.endsWith('.cache')) {
          const filePath = path.join(this.cacheDir, file);
          try {
            const buffer = fs.readFileSync(filePath);
            const entry = await this.decompressData(buffer, this.compressionEnabled);
            entries.push(entry);
          } catch (error) {
            console.warn(`Failed to read cache file ${file}: ${error.message}`);
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to read cache directory: ${error.message}`);
    }
    
    return entries;
  }

  /**
   * Update cache metadata
   */
  async updateCacheMetadata(sizeChange, countChange) {
    const metadata = this.readMetadata();
    metadata.totalSize += sizeChange;
    metadata.entryCount += countChange;
    metadata.lastUpdated = new Date().toISOString();
    this.writeMetadata(metadata);
  }

  /**
   * Delete cache entry
   */
  async delete(key) {
    try {
      const filePath = this.getCacheFilePath(key);
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        fs.unlinkSync(filePath);
        
        // Update metadata
        await this.updateCacheMetadata(-stats.size, -1);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.warn(`Failed to delete cache entry for key ${key}: ${error.message}`);
      return false;
    }
  }

  /**
   * Invalidate cached entries by pattern
   */
  async invalidate(pattern) {
    try {
      const entries = await this.getAllEntries();
      const regex = new RegExp(pattern);
      let deletedCount = 0;
      
      for (const entry of entries) {
        if (regex.test(entry.key)) {
          await this.delete(entry.key);
          deletedCount++;
        }
      }
      
      console.log(`Invalidated ${deletedCount} cache entries matching pattern: ${pattern}`);
      return deletedCount;
    } catch (error) {
      console.warn(`Failed to invalidate cache entries: ${error.message}`);
      return 0;
    }
  }

  /**
   * Get offline available problems
   */
  async getOfflineProblems() {
    try {
      const entries = await this.getAllEntries();
      const problems = [];
      
      for (const entry of entries) {
        if (entry.key.startsWith('problem:') && entry.data.id) {
          problems.push({
            id: entry.data.id,
            name: entry.data.name,
            title: entry.data.title,
            difficulty: entry.data.difficulty,
            cachedAt: entry.timestamp,
            lastAccessed: entry.metadata.lastAccessed
          });
        }
      }
      
      // Sort by last accessed (most recent first)
      problems.sort((a, b) => {
        const aTime = new Date(a.lastAccessed || a.cachedAt).getTime();
        const bTime = new Date(b.lastAccessed || b.cachedAt).getTime();
        return bTime - aTime;
      });
      
      return problems;
    } catch (error) {
      console.warn(`Failed to get offline problems: ${error.message}`);
      return [];
    }
  }

  /**
   * Cleanup expired entries
   */
  async cleanup() {
    try {
      const entries = await this.getAllEntries();
      const now = Date.now();
      let cleanedCount = 0;
      
      for (const entry of entries) {
        if (entry.expiresAt && now > entry.expiresAt) {
          await this.delete(entry.key);
          cleanedCount++;
        }
      }
      
      if (cleanedCount > 0) {
        console.log(`Cleaned up ${cleanedCount} expired cache entries`);
      }
      
      return cleanedCount;
    } catch (error) {
      console.warn(`Cache cleanup failed: ${error.message}`);
      return 0;
    }
  }

  /**
   * Get cache statistics
   */
  async getStats() {
    try {
      const metadata = this.readMetadata();
      const entries = await this.getAllEntries();
      
      const stats = {
        totalSize: metadata.totalSize,
        entryCount: metadata.entryCount,
        maxSize: this.maxSize,
        utilizationPercent: (metadata.totalSize / this.maxSize) * 100,
        oldestEntry: null,
        newestEntry: null,
        problemCount: 0,
        searchResultsCount: 0
      };
      
      if (entries.length > 0) {
        const sortedByTime = entries.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        stats.oldestEntry = sortedByTime[0].timestamp;
        stats.newestEntry = sortedByTime[sortedByTime.length - 1].timestamp;
        
        stats.problemCount = entries.filter(e => e.key.startsWith('problem:')).length;
        stats.searchResultsCount = entries.filter(e => e.key.startsWith('search:')).length;
      }
      
      return stats;
    } catch (error) {
      console.warn(`Failed to get cache stats: ${error.message}`);
      return null;
    }
  }

  /**
   * Clear all cache
   */
  async clear() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      let deletedCount = 0;
      
      for (const file of files) {
        if (file.endsWith('.cache')) {
          fs.unlinkSync(path.join(this.cacheDir, file));
          deletedCount++;
        }
      }
      
      // Reset metadata
      const metadata = {
        version: '1.0',
        created: new Date().toISOString(),
        totalSize: 0,
        entryCount: 0
      };
      this.writeMetadata(metadata);
      
      console.log(`Cleared ${deletedCount} cache entries`);
      return deletedCount;
    } catch (error) {
      console.warn(`Failed to clear cache: ${error.message}`);
      return 0;
    }
  }
}

module.exports = { CacheManagerImpl };