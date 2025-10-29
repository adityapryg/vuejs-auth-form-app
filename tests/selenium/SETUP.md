# Selenium Test Setup Guide

## Installation Steps

Due to permission issues with node_modules, follow these steps:

### Option 1: Fix Permissions (Recommended)

```bash
# Change ownership of node_modules to your user
sudo chown -R $(whoami):$(whoami) node_modules package-lock.json

# Now install Selenium dependencies
npm install --save-dev selenium-webdriver mocha chai chromedriver
```

### Option 2: Install with sudo

```bash
sudo npm install --save-dev selenium-webdriver mocha chai chromedriver
```

### Verify Installation

```bash
# Check if packages are installed
npm list selenium-webdriver mocha chai chromedriver
```

## Running the Tests

1. **Start your Vue app:**

   ```bash
   npm run serve
   ```

2. **In another terminal, run Selenium tests:**

   ```bash
   npm run test:selenium
   ```

## What Gets Installed

- **selenium-webdriver** (^4.x) - WebDriver API for browser automation
- **mocha** (^10.x) - Test framework
- **chai** (^4.x) - Assertion library
- **chromedriver** (latest) - Chrome browser driver

## Troubleshooting

### ChromeDriver Issues

If ChromeDriver version doesn't match your Chrome browser:

```bash
# Install specific version
npm install --save-dev chromedriver@<version>
```

### Port Already in Use

If port 8080 is in use:

```bash
# Stop existing server or use different port
npm run serve -- --port 8081

# Update test URLs in tests/selenium/*.test.js
```

### Headless Mode

To run tests without opening browser window, modify the test:

```javascript
driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().headless())
  .build()
```
