import { test } from '@playwright/test';

const keepBrowserOpened = false;

test.afterAll(async ({ page }) => {
    if (keepBrowserOpened) {
        await page.pause();
    }
});

// 1. Run `npx playwright test`.
// 2. Immediately after the browser starts, hides the browser by bringing other windows such as VSCode to the foreground.
// 3. Following result error occurs.

test('Vertiacally long page test', async ({ page }) => {
    await page.goto('https://www.google.com/', { timeout: 1000 * 30 });
    await page.goto('https://playwright.dev/', { timeout: 1000 * 30 });
    await page.goto('https://en.wikipedia.org/wiki/Main_Page', {
        timeout: 1000 * 30,
    });
    const link = page.locator("//a[text()='About Wikipedia']");
    await link.scrollIntoViewIfNeeded();
    await link.click({ timeout: 1000 * 30 });
});

// <<result error>>
// PS C:\Users\hn06343\dev\github\test20161010\playwright-18888> npx playwright test
//
// Running 1 test using 1 worker
//   1) [firefox] › example.spec.ts:15:1 › Vertiacally long page test =================================
//
//     locator.scrollIntoViewIfNeeded: Timeout 4770.782000000589ms exceeded.
//     =========================== logs ===========================
//       waiting for element to be  and stable
//     ============================================================
//
//       20 |     });
//       21 |     const link = page.locator("//a[text()='About Wikipedia']");
//     > 22 |     await link.scrollIntoViewIfNeeded();
//          |                ^
//       23 |     await link.click({ timeout: 1000 * 30 });
//       24 | });
//       25 |
//
//         at C:\Users\hn06343\dev\github\test20161010\playwright-18888\tests\example.spec.ts:22:16
//
//     attachment #1: trace (application/zip) ---------------------------------------------------------
//     test-results\example-Vertiacally-long-page-test-firefox\trace.zip
//     Usage:
//
//         npx playwright show-trace test-results\example-Vertiacally-long-page-test-firefox\trace.zip
//
//     ------------------------------------------------------------------------------------------------
//
//
//   1 failed
//     [firefox] › example.spec.ts:15:1 › Vertiacally long page test ==================================
//
//   Serving HTML report at http://localhost:9223. Press Ctrl+C to quit.
