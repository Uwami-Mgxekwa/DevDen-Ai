@echo off
echo Building project...
npm run build

echo Deploying to GitHub Pages...
npm run deploy

echo Done! Your site should be live shortly.
pause