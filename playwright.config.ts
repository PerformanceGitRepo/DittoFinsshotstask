import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

timeout: process.env.CI ? 180_000 : 60_000, 
expect: {
  timeout: 10_000,
},

  fullyParallel: false,
  retries: 0,
  workers: process.env.CI ? 1 : 4,
  forbidOnly: !!process.env.CI,

  reporter: process.env.CI
    ? [
        ['list'],
        ['junit', { outputFile: 'reports/results.xml' }],
        ['json', { outputFile: 'reports/results.json' }],
      ]
    : [
        ['html'],
        ['list'],
      ],

  use: {
    baseURL: process.env.BASE_URL || 'https://www.makemytrip.com',
   // trace: 'on-first-retry',
      trace: 'on',
    screenshot: 'only-on-failure',
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: 'firefox',
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     browserName: 'webkit',
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],

  outputDir: 'test-results/',
});
