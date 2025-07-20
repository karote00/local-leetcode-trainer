#!/usr/bin/env node

const https = require('https');

function checkDownloads(period = 'last-week') {
  const url = `https://api.npmjs.org/downloads/point/${period}/local-leetcode-trainer`;
  
  https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.error) {
          console.log(`❌ ${result.error}`);
          console.log('📊 Download stats will be available a few hours after first download');
        } else {
          console.log(`📦 Package: ${result.package}`);
          console.log(`📅 Period: ${period}`);
          console.log(`📈 Downloads: ${result.downloads.toLocaleString()}`);
          console.log(`🗓️  Start: ${result.start}`);
          console.log(`🗓️  End: ${result.end}`);
        }
      } catch (error) {
        console.log('❌ Error parsing response:', error.message);
      }
    });
  }).on('error', (error) => {
    console.log('❌ Request error:', error.message);
  });
}

// Check different periods
console.log('🎯 Local LeetCode Trainer Download Stats\n');

console.log('📊 Last Day:');
checkDownloads('last-day');

setTimeout(() => {
  console.log('\n📊 Last Week:');
  checkDownloads('last-week');
}, 1000);

setTimeout(() => {
  console.log('\n📊 Last Month:');
  checkDownloads('last-month');
}, 2000);