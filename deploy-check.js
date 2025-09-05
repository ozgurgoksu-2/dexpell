#!/usr/bin/env node

/**
 * Pre-deployment check script for Vercel
 * This script validates the environment and configuration before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel Deployment Pre-Check\n');

const checks = [];

// Check if required files exist
const requiredFiles = [
  'package.json',
  'next.config.mjs',
  'vercel.json',
  'tsconfig.json'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  checks.push({
    name: `${file} exists`,
    status: exists,
    message: exists ? '✅ Found' : '❌ Missing'
  });
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['dev', 'build', 'start'];
  
  requiredScripts.forEach(script => {
    const hasScript = packageJson.scripts && packageJson.scripts[script];
    checks.push({
      name: `"${script}" script`,
      status: hasScript,
      message: hasScript ? '✅ Found' : '❌ Missing'
    });
  });
} catch (error) {
  checks.push({
    name: 'package.json parsing',
    status: false,
    message: '❌ Invalid JSON'
  });
}

// Check environment variables documentation
console.log('\n🔐 Checking environment setup...');
const envExample = `# Required Environment Variables for Vercel Deployment

# OpenAI Configuration (Required)
OPENAI_API_KEY=your_openai_api_key_here

# Google OAuth Configuration (Optional - for Google Calendar/Gmail integration)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=https://your-vercel-domain.vercel.app/api/google/callback

# Node Environment
NODE_ENV=production`;

if (!fs.existsSync('.env.example')) {
  try {
    fs.writeFileSync('.env.example', envExample);
    checks.push({
      name: '.env.example',
      status: true,
      message: '✅ Created .env.example file'
    });
  } catch (error) {
    checks.push({
      name: '.env.example',
      status: false,
      message: '❌ Could not create .env.example'
    });
  }
} else {
  checks.push({
    name: '.env.example',
    status: true,
    message: '✅ Already exists'
  });
}

// Check API routes structure
console.log('\n🔌 Checking API routes...');
const apiDir = path.join(__dirname, 'app', 'api');
if (fs.existsSync(apiDir)) {
  const apiRoutes = fs.readdirSync(apiDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  checks.push({
    name: 'API routes',
    status: apiRoutes.length > 0,
    message: `✅ Found ${apiRoutes.length} API route(s): ${apiRoutes.join(', ')}`
  });
} else {
  checks.push({
    name: 'API routes',
    status: false,
    message: '❌ No API directory found'
  });
}

// Print results
console.log('\n📋 Check Results:');
console.log('─'.repeat(50));

let allPassed = true;
checks.forEach(check => {
  console.log(`${check.message} ${check.name}`);
  if (!check.status) allPassed = false;
});

console.log('─'.repeat(50));

if (allPassed) {
  console.log('\n🎉 All checks passed! Ready for Vercel deployment.');
  console.log('\nNext steps:');
  console.log('1. Push your code to Git repository');
  console.log('2. Connect repository to Vercel');
  console.log('3. Set environment variables in Vercel dashboard');
  console.log('4. Deploy!');
  console.log('\nSee DEPLOYMENT.md for detailed instructions.');
} else {
  console.log('\n⚠️  Some checks failed. Please fix the issues above before deploying.');
  process.exit(1);
}

console.log('\n📖 For detailed deployment instructions, see DEPLOYMENT.md');
