const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:3000", headless: true },
  webServer: [
    { command: "npm run dev --workspace backend", url: "http://127.0.0.1:4000/api/health", reuseExistingServer: !process.env.CI, timeout: 30000 },
    { command: "npm run dev --workspace frontend", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI, timeout: 120000 }
  ]
});
