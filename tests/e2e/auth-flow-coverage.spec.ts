import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Helper function to merge overlapping ranges
function mergeRanges(ranges: Array<{start: number, end: number}>): Array<{start: number, end: number}> {
  if (ranges.length === 0) return [];
  
  // Sort ranges by start position
  const sorted = ranges.sort((a, b) => a.start - b.start);
  const merged: Array<{start: number, end: number}> = [sorted[0]];
  
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    
    // If ranges overlap or are adjacent, merge them
    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }
  
  return merged;
}

const credentials = {
  username: 'admin',
  password: 'SuperSecretPassword!',
};

const formData = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  jobTitle: 'Mathematician',
  education: 'Grad School',
  sex: 'Female',
  experience: '5-9',
  date: '2025-10-29',
};

test.describe('Auth and Form experience with Coverage', () => {
  test('allows login, form submission, and logout', async ({ page, browserName }) => {
    // Skip coverage for non-Chromium browsers (coverage API not supported)
    const shouldCollectCoverage = browserName === 'chromium';
    
    // Enable JavaScript coverage (only for Chromium)
    if (shouldCollectCoverage) {
      await page.coverage.startJSCoverage();
    }
    
    // Login flow
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login$/);

    await page.fill('#username', credentials.username);
    await page.fill('#password', credentials.password);
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard');
    await expect(page.locator('.welcome-card')).toContainText(credentials.username);

    // Form flow
    await page.getByRole('link', { name: /Fill Complete Form/ }).click();
    await page.waitForURL('**/form');

    await page.fill('#firstName', formData.firstName);
    await page.fill('#lastName', formData.lastName);
    await page.fill('#jobTitle', formData.jobTitle);
    await page.getByLabel(formData.education).check();
    await page.getByLabel(formData.sex).check();
    await page.selectOption('#experience', formData.experience);
    await page.fill('#date', formData.date);

    await page.click('button[type="submit"]');
    await expect(page.locator('.submission-result')).toContainText('Form Submitted Successfully!');
    await expect(page.locator('.submission-result')).toContainText(formData.firstName);
    await expect(page.locator('.submission-result')).toContainText(formData.lastName);

    // Logout flow
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL('**/login');
    await expect(page.locator('.login-card')).toContainText('Login Page');
    
    // Stop coverage and save results (only for Chromium)
    if (!shouldCollectCoverage) {
      console.log(`\n⚠️  Coverage collection skipped for ${browserName} (not supported)\n`);
      return;
    }
    
    const jsCoverage = await page.coverage.stopJSCoverage();
    
    // Create coverage directory inside tests folder
    const coverageDir = path.join(process.cwd(), 'tests', 'coverage');
    if (!fs.existsSync(coverageDir)) {
      fs.mkdirSync(coverageDir, { recursive: true });
    }
    
    // Save raw coverage data
    fs.writeFileSync(
      path.join(coverageDir, 'coverage-raw.json'),
      JSON.stringify(jsCoverage, null, 2)
    );
    
    // Generate simple coverage report
    let totalBytes = 0;
    let usedBytes = 0;
    const fileReports: any[] = [];
    
    for (const entry of jsCoverage) {
      // Filter for application JavaScript (not node_modules or external)
      if (entry.url.includes('app.') || entry.url.includes('chunk-') || entry.url.includes('js')) {
        const source = entry.source || '';
        const total = source.length;
        
        if (total > 0) {
          // Calculate coverage using ranges, avoiding double-counting
          const coveredRanges: Array<{start: number, end: number}> = [];
          
          for (const func of entry.functions) {
            for (const range of func.ranges) {
              if (range.count > 0) {
                coveredRanges.push({
                  start: range.startOffset,
                  end: range.endOffset
                });
              }
            }
          }
          
          // Merge overlapping ranges to avoid counting the same bytes multiple times
          const mergedRanges = mergeRanges(coveredRanges);
          const used = mergedRanges.reduce((sum, range) => sum + (range.end - range.start), 0);
          
          totalBytes += total;
          usedBytes += used;
          
          fileReports.push({
            url: entry.url,
            total,
            used,
            percentage: ((used / total) * 100).toFixed(2) + '%'
          });
        }
      }
    }
    
    const report = {
      summary: {
        totalBytes,
        usedBytes,
        coverage: totalBytes > 0 ? ((usedBytes / totalBytes) * 100).toFixed(2) + '%' : '0%'
      },
      files: fileReports
    };
    
    fs.writeFileSync(
      path.join(coverageDir, 'coverage-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n📊 Coverage Report:');
    console.log(`Total JavaScript Coverage: ${report.summary.coverage}`);
    console.log(`Total Bytes: ${totalBytes}, Used Bytes: ${usedBytes}`);
    console.log(`\nDetailed report saved to: tests/coverage/coverage-report.json\n`);
  });
});
