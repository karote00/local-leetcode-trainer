#!/usr/bin/env node

/**
 * Debug script to check if dynamic system is working
 */

console.log('🔍 Debugging Dynamic System...\n');

// Test 1: Check if dynamic files exist
const fs = require('fs');
const path = require('path');

console.log('📁 Checking dynamic files:');
const dynamicFiles = [
  'scripts/dynamic/problem-manager.js',
  'scripts/dynamic/offline-manager.js',
  'scripts/dynamic/leetcode-api.js',
  'scripts/dynamic/cache-manager.js',
  'scripts/dynamic/interfaces.js'
];

for (const file of dynamicFiles) {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
}

// Test 2: Try to import dynamic system
console.log('\n🔧 Testing dynamic system import:');
try {
  const { ProblemManagerImpl } = require('./dynamic/problem-manager');
  const { OfflineManager } = require('./dynamic/offline-manager');
  
  console.log('✅ Dynamic imports successful');
  
  const dynamicSystem = {
    problemManager: new ProblemManagerImpl(),
    offlineManager: new OfflineManager()
  };
  
  console.log('✅ Dynamic system initialized');
  
  // Test 3: Try to get connectivity status
  const connectivity = dynamicSystem.offlineManager.getConnectivityStatus();
  console.log(`✅ Connectivity check: ${connectivity.isOnline ? 'Online' : 'Offline'}`);
  
} catch (error) {
  console.log('❌ Dynamic system failed to load:');
  console.log(`   Error: ${error.message}`);
  console.log(`   Stack: ${error.stack}`);
}

console.log('\n🎯 If you see errors above, the dynamic system is not working properly.');
console.log('💡 This explains why lct challenge is not fetching from LeetCode.');