#!/usr/bin/env node

/**
 * Bundle Size Analysis Script
 * Analyzes Next.js build output and reports bundle sizes
 * 
 * Usage: node scripts/analyze-bundle.js
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(process.cwd(), '.next');
const STATIC_DIR = path.join(BUILD_DIR, 'static');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Size thresholds (in KB)
const THRESHOLDS = {
  main: 200,
  firstLoad: 100,
  chunk: 50,
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getColorForSize(sizeKB, threshold) {
  if (sizeKB < threshold * 0.7) return colors.green;
  if (sizeKB < threshold) return colors.yellow;
  return colors.red;
}

function analyzeDirectory(dir, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      analyzeDirectory(filePath, results);
    } else if (file.endsWith('.js')) {
      const sizeBytes = stat.size;
      const sizeKB = sizeBytes / 1024;
      const relativePath = path.relative(STATIC_DIR, filePath);

      results.push({
        path: relativePath,
        sizeBytes,
        sizeKB,
      });
    }
  });

  return results;
}

function categorizeChunks(chunks) {
  const categories = {
    main: [],
    pages: [],
    chunks: [],
    framework: [],
  };

  chunks.forEach(chunk => {
    if (chunk.path.includes('main-')) {
      categories.main.push(chunk);
    } else if (chunk.path.includes('pages/')) {
      categories.pages.push(chunk);
    } else if (chunk.path.includes('framework-')) {
      categories.framework.push(chunk);
    } else {
      categories.chunks.push(chunk);
    }
  });

  return categories;
}

function printReport(categories) {
  console.log('\n' + colors.cyan + '═'.repeat(80) + colors.reset);
  console.log(colors.cyan + '  Bundle Size Analysis Report' + colors.reset);
  console.log(colors.cyan + '═'.repeat(80) + colors.reset + '\n');

  // Main bundles
  if (categories.main.length > 0) {
    console.log(colors.magenta + '📦 Main Bundles:' + colors.reset);
    categories.main.forEach(chunk => {
      const color = getColorForSize(chunk.sizeKB, THRESHOLDS.main);
      console.log(`  ${color}${chunk.path}${colors.reset} - ${formatBytes(chunk.sizeBytes)}`);
    });
    console.log();
  }

  // Framework bundles
  if (categories.framework.length > 0) {
    console.log(colors.magenta + '⚛️  Framework Bundles:' + colors.reset);
    categories.framework.forEach(chunk => {
      const color = getColorForSize(chunk.sizeKB, THRESHOLDS.main);
      console.log(`  ${color}${chunk.path}${colors.reset} - ${formatBytes(chunk.sizeBytes)}`);
    });
    console.log();
  }

  // Page bundles
  if (categories.pages.length > 0) {
    console.log(colors.magenta + '📄 Page Bundles:' + colors.reset);
    categories.pages.forEach(chunk => {
      const color = getColorForSize(chunk.sizeKB, THRESHOLDS.firstLoad);
      console.log(`  ${color}${chunk.path}${colors.reset} - ${formatBytes(chunk.sizeBytes)}`);
    });
    console.log();
  }

  // Dynamic chunks
  if (categories.chunks.length > 0) {
    console.log(colors.magenta + '🔀 Dynamic Chunks:' + colors.reset);
    
    // Sort by size descending
    const sortedChunks = [...categories.chunks].sort((a, b) => b.sizeKB - a.sizeKB);
    
    // Show top 10 largest chunks
    const topChunks = sortedChunks.slice(0, 10);
    topChunks.forEach(chunk => {
      const color = getColorForSize(chunk.sizeKB, THRESHOLDS.chunk);
      console.log(`  ${color}${chunk.path}${colors.reset} - ${formatBytes(chunk.sizeBytes)}`);
    });

    if (sortedChunks.length > 10) {
      console.log(`  ${colors.blue}... and ${sortedChunks.length - 10} more chunks${colors.reset}`);
    }
    console.log();
  }

  // Summary
  const totalSize = Object.values(categories)
    .flat()
    .reduce((sum, chunk) => sum + chunk.sizeBytes, 0);

  console.log(colors.cyan + '─'.repeat(80) + colors.reset);
  console.log(colors.magenta + '📊 Summary:' + colors.reset);
  console.log(`  Total Chunks: ${colors.blue}${Object.values(categories).flat().length}${colors.reset}`);
  console.log(`  Total Size: ${colors.blue}${formatBytes(totalSize)}${colors.reset}`);
  console.log();

  // Recommendations
  console.log(colors.cyan + '💡 Recommendations:' + colors.reset);
  
  const largeChunks = Object.values(categories)
    .flat()
    .filter(chunk => chunk.sizeKB > THRESHOLDS.chunk);

  if (largeChunks.length > 0) {
    console.log(`  ${colors.yellow}⚠️  ${largeChunks.length} chunk(s) exceed ${THRESHOLDS.chunk}KB${colors.reset}`);
    console.log(`     Consider code splitting or lazy loading for these components`);
  } else {
    console.log(`  ${colors.green}✓ All chunks are within recommended size limits${colors.reset}`);
  }

  const mainBundle = categories.main[0];
  if (mainBundle && mainBundle.sizeKB > THRESHOLDS.main) {
    console.log(`  ${colors.yellow}⚠️  Main bundle exceeds ${THRESHOLDS.main}KB${colors.reset}`);
    console.log(`     Consider moving heavy dependencies to dynamic imports`);
  }

  console.log();
  console.log(colors.cyan + '═'.repeat(80) + colors.reset + '\n');
}

// Main execution
console.log(colors.blue + 'Analyzing bundle sizes...' + colors.reset);

if (!fs.existsSync(BUILD_DIR)) {
  console.error(colors.red + 'Error: Build directory not found. Run "npm run build" first.' + colors.reset);
  process.exit(1);
}

const chunks = analyzeDirectory(STATIC_DIR);

if (chunks.length === 0) {
  console.error(colors.red + 'Error: No JavaScript chunks found in build output.' + colors.reset);
  process.exit(1);
}

const categories = categorizeChunks(chunks);
printReport(categories);
