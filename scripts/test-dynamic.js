#!/usr/bin/env node

/**
 * Test script for the dynamic LeetCode integration system
 */

const { DynamicChallenge } = require('./dynamic-challenge');

async function testDynamicSystem() {
  const dynamic = new DynamicChallenge();

  console.log('🧪 Testing Dynamic LeetCode Integration System\n');

  try {
    // Test 1: Get cache stats
    console.log('📊 Test 1: Cache Statistics');
    await dynamic.getCacheStats();

    // Test 2: Get offline problems
    console.log('\n📱 Test 2: Offline Problems');
    await dynamic.getOfflineProblems();

    // Test 3: Try to generate a specific problem
    console.log('\n🎯 Test 3: Generate Specific Problem (Two Sum)');
    try {
      const result = await dynamic.generateSpecificProblem('two-sum');
      if (result) {
        console.log('✅ Successfully generated Two Sum problem');
      }
    } catch (error) {
      console.log(`⚠️  Specific problem generation: ${error.message}`);
    }

    // Test 4: Try to generate random easy problem
    console.log('\n🎲 Test 4: Generate Random Easy Problem');
    try {
      const results = await dynamic.generateChallenge('easy', 1);
      if (results.length > 0) {
        console.log('✅ Successfully generated random easy problem');
      }
    } catch (error) {
      console.log(`⚠️  Random problem generation: ${error.message}`);
    }

    // Test 5: Search problems
    console.log('\n🔍 Test 5: Search Problems');
    try {
      const searchResults = await dynamic.searchProblems('', { difficulty: 'easy', limit: 5 });
      console.log(`✅ Search returned ${searchResults.length} results`);
    } catch (error) {
      console.log(`⚠️  Search: ${error.message}`);
    }

    console.log('\n🎉 Dynamic system test completed!');
    console.log('\n💡 Usage:');
    console.log('  node scripts/test-dynamic.js          # Run this test');
    console.log('  lct challenge easy --dynamic          # Use dynamic system (when integrated)');
    console.log('  lct challenge two-sum --dynamic       # Generate specific problem');

  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    process.exit(1);
  }
}

// Run test if called directly
if (require.main === module) {
  testDynamicSystem().catch(error => {
    console.error(`❌ Test script failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { testDynamicSystem };