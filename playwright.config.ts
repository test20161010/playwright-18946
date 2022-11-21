import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: './tests',
    /* Maximum time one test can run for. */
    timeout: 30 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env['CI'],
    /* Retry on CI only */
    retries: process.env['CI'] ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env['CI'] ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 5000,
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        // https://zenn.dev/reflex4qa/articles/b1e1bc501e2977
        // trace: 'on-first-retry',
        trace: 'on',
        /*
        launchOptions: {
            proxy: {
                server: 'http://example.com',
            },
            // devtools: true,
        },
        */
    },

    /* Configure projects for major browsers */
    projects: [
        /*
        {
            // Success at Chromium 107.0.5304.18
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: false,
            },
        },
        */
        {
            // NG at Firefox Nightly 105.0.1
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                headless: false,
                ignoreHTTPSErrors: true,
            },
        },
        /*
        {
            // Success at Webkit 16.0
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                headless: false,
            },
        },
        */
        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },
        /* Test against branded browsers. */
        /*
        {
            // Success at Edge 107.0.1418.52
            name: 'Microsoft Edge',
            use: {
                channel: 'msedge',
                headless: false,
            },
        },
        */
        /*
        {
            // Success at Chrome 107.0.5304.63
            name: 'Google Chrome',
            use: {
                channel: 'chrome',
                headless: false,
            },
        },
        */
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
};

export default config;
