/**
 * Configuration system for dynamic LeetCode integration
 */

const path = require('path');
const fs = require('fs');

const DEFAULT_CONFIG = {
  // API Configuration
  api: {
    leetcodeBaseUrl: 'https://leetcode.com',
    requestTimeout: 30000,
    maxRetries: 3,
    retryDelay: 1000,
    userAgent: 'Local-LeetCode-Trainer/1.5.0'
  },

  // Cache Configuration
  cache: {
    directory: '.lct-cache',
    maxSize: 100 * 1024 * 1024, // 100MB
    defaultTTL: 24 * 60 * 60 * 1000, // 24 hours
    cleanupInterval: 60 * 60 * 1000, // 1 hour
    compressionEnabled: true
  },

  // AI Assistant Configuration
  ai: {
    hintLevels: 5,
    maxHintLength: 500,
    explanationStyle: 'detailed', // 'brief', 'detailed', 'step-by-step'
    includeComplexity: true
  },

  // Template Configuration
  templates: {
    includeListNodeDefinitions: true,
    includeImports: true,
    formatStyle: 'leetcode', // 'leetcode', 'minimal', 'verbose'
    commentStyle: 'detailed'
  },

  // Test Case Configuration
  testCases: {
    includeExamples: true,
    generateEdgeCases: true,
    maxTestCases: 20,
    validateAgainstSolution: true
  },

  // Network Configuration
  network: {
    offlineMode: false,
    preferCache: false,
    backgroundRefresh: true
  }
};

class ConfigManager {
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.configPath = path.join(process.cwd(), '.lct-config.json');
    this.loadConfig();
  }

  /**
   * Load configuration from file
   */
  loadConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const userConfig = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        this.config = this.mergeConfig(DEFAULT_CONFIG, userConfig);
      }
    } catch (error) {
      console.warn('Warning: Could not load config file, using defaults');
    }
  }

  /**
   * Save configuration to file
   */
  saveConfig() {
    try {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
    } catch (error) {
      console.error('Error saving config file:', error.message);
    }
  }

  /**
   * Deep merge configuration objects
   */
  mergeConfig(defaultConfig, userConfig) {
    const result = { ...defaultConfig };
    
    for (const key in userConfig) {
      if (userConfig[key] && typeof userConfig[key] === 'object' && !Array.isArray(userConfig[key])) {
        result[key] = this.mergeConfig(defaultConfig[key] || {}, userConfig[key]);
      } else {
        result[key] = userConfig[key];
      }
    }
    
    return result;
  }

  /**
   * Get configuration value
   */
  get(path) {
    const keys = path.split('.');
    let value = this.config;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    
    return value;
  }

  /**
   * Set configuration value
   */
  set(path, value) {
    const keys = path.split('.');
    let current = this.config;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
    this.saveConfig();
  }

  /**
   * Get all configuration
   */
  getAll() {
    return { ...this.config };
  }

  /**
   * Reset to default configuration
   */
  reset() {
    this.config = { ...DEFAULT_CONFIG };
    this.saveConfig();
  }
}

// Singleton instance
const configManager = new ConfigManager();

module.exports = {
  ConfigManager,
  config: configManager,
  DEFAULT_CONFIG
};