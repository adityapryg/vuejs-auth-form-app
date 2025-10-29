const { defineConfig } = require('@vue/cli-service');

const isE2E = process.env.E2E === 'true';

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    // Disable auto-opening the browser during e2e runs to avoid hanging Playwright
    open: !isE2E
  }
});