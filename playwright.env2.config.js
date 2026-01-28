import { defineConfig, devices } from '@playwright/test';
import config from './config/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// import * as dotenv from 'dotenv';
// dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  // testMatch: /.*\.spec\.js/,
  // testIgnore: /.*\.*.ignore.test\.js/,
  // grep: /@smoke/,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'on-failure' }],
    // ['playwright-qase-reporter']
    // ['list'],
    // ['junit', { outputFile: 'results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    // baseURL: config.baseURL,
    // httpCredentials: config.httpCredentials,

    baseURL: config.baseURLEnv2,
    // baseURL: config.baseURL,
    httpCredentials: config.httpCredentials,
    // true - no browser window, false - show browser window
    headless: true,
    // viewport: { width: 1280, height: 720 },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    // video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'regression',
    //   grepInvert: /@ui/,
    //   // dependencies: ['chromium', 'firefox', 'webkit', 'setup'],
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     // viewport: { width: 1920, height: 1080 },
    //     // trace: 'on-first-retry',
    //     // baseURL: 'https://qauto.forstudy.space/'
    //   },
    // },

    {
      name: 'smoke env2',
      grep: /@smoke/,
      // testMatch: /tests\/smoke\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        trace: 'on-first-retry',
        screenshot: {
          fullPage: true,
          mode: 'only-on-failure',
        }
      },
    },

    {
      name: 'not a smoke env2',
      // grep: /@smoke/,
      grepInvert: /@smoke/,
      // testMatch: /tests\/smoke\/.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        trace: 'retain-on-failure',
        screenshot: {
          fullPage: true,
          mode: 'only-on-failure',
        }
        //  baseURL: config.baseURLEnv2
      },
    },

    //     {
    //   name: 'regression',
    //   // grep: /@regression/,
    //   grepInvert: /@smoke/,
    //   // testMatch: /tests\/smoke\/.*\.spec\.js/,
    //   use: { ...devices['Desktop Chrome'],
    //     trace: 'on-first-retry',
    //     screenshot: {
    //       fullPage: true,
    //       mode: 'only-on-failure',
    //     }
    //    },
    // },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

