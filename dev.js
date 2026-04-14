#!/usr/bin/env node

/**
 * Development Server Launcher
 * 
 * This script runs the Next.js development server directly
 * without requiring npm to be working.
 */

const { spawn } = require('child_process');
const path = require('path');

// Path to Next.js binary
const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');

console.log('🚀 Starting Quein Event Website development server...\n');

// Spawn the Next.js dev server
const devServer = spawn('node', [nextBin, 'dev'], {
  stdio: 'inherit',
  shell: false,
  cwd: __dirname
});

devServer.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});

devServer.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Development server exited with code ${code}`);
  }
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down development server...');
  devServer.kill('SIGINT');
  process.exit(0);
});
