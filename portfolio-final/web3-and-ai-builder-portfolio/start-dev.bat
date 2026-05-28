@echo off
:: Web3 Portfolio - Quick Start Dev Server
:: Double-click this file to start the dev server automatically

echo Starting Web3 Portfolio dev server...

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

:: Start the Vite dev server
echo Launching server at http://localhost:3000
node ./node_modules/vite/bin/vite.js --port=3000 --host=localhost --open

pause
