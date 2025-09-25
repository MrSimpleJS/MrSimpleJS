const fs = require('fs');
const path = require('path');

// Simple test framework
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 Running README Tests...\n');

    for (const { name, fn } of this.tests) {
      try {
        await fn();
        console.log(`✅ ${name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ ${name}: ${error.message}`);
        this.failed++;
      }
    }

    console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
    
    if (this.failed > 0) {
      process.exit(1);
    }
  }
}

// Helper function to assert
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Test implementation
const runner = new TestRunner();
const readmePath = path.join(__dirname, '..', 'README.md');

runner.test('README file exists', () => {
  assert(fs.existsSync(readmePath), 'README.md file should exist');
});

runner.test('README has basic structure', () => {
  const content = fs.readFileSync(readmePath, 'utf8');
  
  assert(content.includes('Hey, I\'m'), 'Should have greeting section');
  assert(content.includes('Tech Stack'), 'Should have tech stack section');
  assert(content.includes('Highlighted Projects'), 'Should have projects section');
  assert(content.includes('Stats'), 'Should have stats section');
  assert(content.includes('Connect'), 'Should have connect section');
});

runner.test('README has valid links', () => {
  const content = fs.readFileSync(readmePath, 'utf8');
  
  // Check for GitHub profile links
  assert(content.includes('https://github.com/MrSimpleJS'), 'Should have GitHub profile link');
  
  // Check for Discord link
  assert(content.includes('https://discord.gg/cvx7EmAtxd'), 'Should have Discord link');
  
  // Check for project links
  assert(content.includes('Static-ID-FiveM'), 'Should reference Static-ID-FiveM project');
  assert(content.includes('FiveM-Grand-Admin-Mode'), 'Should reference FiveM-Grand-Admin-Mode project');
});

runner.test('README has proper markdown formatting', () => {
  const content = fs.readFileSync(readmePath, 'utf8');
  
  // Check for headers
  assert(content.includes('### 🧰'), 'Should have Tech Stack header');
  assert(content.includes('### 🚀'), 'Should have Projects header');
  assert(content.includes('### 📈'), 'Should have Stats header');
  assert(content.includes('### 🤝'), 'Should have Connect header');
  
  // Check for proper table structure
  assert(content.includes('| Project | What It Does | Stack |'), 'Should have proper table headers');
  assert(content.includes('|--------|---------------|-------|'), 'Should have table separator');
});

runner.test('README has visual elements', () => {
  const content = fs.readFileSync(readmePath, 'utf8');
  
  // Check for badges
  assert(content.includes('img.shields.io'), 'Should have GitHub badges');
  
  // Check for typing animation
  assert(content.includes('readme-typing-svg.herokuapp.com'), 'Should have typing animation');
  
  // Check for GitHub stats
  assert(content.includes('github-readme-stats.vercel.app'), 'Should have GitHub stats');
  
  // Check for tech stack icons
  assert(content.includes('devicons/devicon'), 'Should have tech stack icons');
});

// Run tests
runner.run().catch(console.error);