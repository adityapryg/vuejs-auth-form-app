# Selenium WebDriver Tests

## Overview

This directory contains Selenium WebDriver tests exported from Selenium IDE and adapted for Mocha test framework.

## Prerequisites

Before running Selenium tests, install the required dependencies:

```bash
sudo npm install --save-dev selenium-webdriver mocha chai chromedriver
```

Or if you have permission issues with node_modules:

```bash
sudo chown -R $(whoami) node_modules
npm install --save-dev selenium-webdriver mocha chai chromedriver
```

## Test Files

### `auth-flow.test.js`

Complete user flow test using Selenium WebDriver:

- Login with credentials
- Navigate to dashboard
- Fill and submit the complete web form
- Logout

This test format matches the JavaScript/Mocha export from Selenium IDE.

## Running Tests

**Important:** Make sure your Vue app is running first!

```bash
# Terminal 1: Start the Vue app
npm run serve

# Terminal 2: Run Selenium tests
npm run test:selenium
```

## Selenium IDE Export Compatibility

These tests are compatible with Selenium IDE exports:

1. **Record in Selenium IDE** - Use the browser extension to record your interactions
2. **Export as JavaScript Mocha** - File → Export → JavaScript Mocha
3. **Save to tests/selenium/** - Place the exported .test.js file here
4. **Run with npm** - Use `npm run test:selenium`

## Key Differences from Playwright

| Feature | Playwright | Selenium |
|---------|-----------|----------|
| Auto-wait | ✅ Built-in | ❌ Manual waits needed |
| Setup | Simple | Requires ChromeDriver |
| API Style | Modern Promise | Traditional callback/promise |
| IDE Tool | ❌ | ✅ Visual recorder |
| Speed | Faster | Slower |

## Test Structure (Selenium IDE Format)

```javascript
const { Builder, By, until } = require('selenium-webdriver')

describe('Test Suite', function() {
  this.timeout(30000)
  let driver
  
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
  })
  
  afterEach(async function() {
    await driver.quit()
  })
  
  it('test case', async function() {
    await driver.get('http://localhost:8080')
    await driver.findElement(By.id('username')).sendKeys('admin')
    // ... more actions
  })
})
```

## Locator Strategies

Selenium IDE supports multiple locator strategies:

- `By.id('elementId')` - Find by ID
- `By.css('.class')` - CSS selector
- `By.xpath('//div[@id="test"]')` - XPath
- `By.linkText('Click Here')` - Link text
- `By.name('fieldName')` - Name attribute

## Tips

1. **Always add waits** - Use `driver.wait(until.elementLocated(...), timeout)`
2. **Start dev server first** - Tests won't work if the app isn't running
3. **Increase timeout** - Set `this.timeout(30000)` for slow operations
4. **Handle stale elements** - Re-find elements if they become stale
5. **Clean up** - Always call `driver.quit()` in `afterEach`
6. **Use reliable selectors** - Prefer CSS selectors or IDs over text content (especially with emojis)
7. **Navigate explicitly** - Use `driver.get(url)` when you need to change pages for reliable navigation
