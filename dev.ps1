# Development Server Launcher for PowerShell
# This script runs the Next.js development server directly

Write-Host "🚀 Starting Quein Event Website development server..." -ForegroundColor Green
Write-Host ""

$nextBin = Join-Path $PSScriptRoot "node_modules\next\dist\bin\next"

try {
    & node $nextBin dev
} catch {
    Write-Host "❌ Failed to start development server: $_" -ForegroundColor Red
    exit 1
}
