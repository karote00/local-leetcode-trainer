const fs = require('fs');
const path = require('path');

// Initialize LeetCode practice environment
function main() {
  const projectRoot = process.cwd();
  const lctDir = path.join(projectRoot, 'lct');
  const configFile = path.join(lctDir, 'config.json');
  
  console.log('🎯 Initializing Local LeetCode Trainer...');
  console.log('');
  
  // Check if already initialized
  if (fs.existsSync(configFile)) {
    console.log('✅ Already initialized!');
    console.log(`📁 Config: ${path.relative(projectRoot, configFile)}`);
    console.log('');
    console.log('🚀 Ready to practice:');
    console.log('  lct c easy 1        # Generate easy problem');
    console.log('  lct test easy/two-sum  # Test your solution');
    console.log('  lct lang python     # Switch language');
    return;
  }
  
  try {
    // Create lct directory
    if (!fs.existsSync(lctDir)) {
      fs.mkdirSync(lctDir, { recursive: true });
      console.log('📁 Created lct/ directory');
    }
    
    // Create default config
    const defaultConfig = {
      language: 'javascript',
      companies: [],
      createdAt: new Date().toISOString(),
      version: '1.0'
    };
    
    fs.writeFileSync(configFile, JSON.stringify(defaultConfig, null, 2));
    console.log('⚙️  Created lct/config.json');
    console.log('');
    
    console.log('🎉 Initialization complete!');
    console.log('');
    console.log('📋 Project Structure:');
    console.log('  lct/');
    console.log('  └── config.json     # Your settings');
    console.log('  easy/               # Easy problems (created automatically)');
    console.log('  medium/             # Medium problems');
    console.log('  hard/               # Hard problems');
    console.log('');
    console.log('🚀 Get started:');
    console.log('  lct c easy 1        # Generate your first easy problem');
    console.log('  lct test easy/two-sum  # Test your solution');
    console.log('  lct lang            # Check current language (javascript)');
    console.log('  lct lang python     # Switch to Python');
    console.log('  lct --help          # See all commands');
    console.log('');
    console.log('💡 Tip: Add lct/ to your .gitignore if you want to keep settings local');
    
  } catch (error) {
    console.error('❌ Failed to initialize:', error.message);
    process.exit(1);
  }
}

main();