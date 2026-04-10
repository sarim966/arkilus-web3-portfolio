# Web3 Portfolio - Quick Start Dev Server
# Double-click this file to start the dev server automatically

Write-Host "Starting Web3 Portfolio dev server..." -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "./node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the Vite dev server
Write-Host "Launching server at http://localhost:3000" -ForegroundColor Cyan
node ./node_modules/vite/bin/vite.js --port=3000 --host=localhost --open

Write-Host "`nPress Ctrl+C to stop the server" -ForegroundColor Gray
