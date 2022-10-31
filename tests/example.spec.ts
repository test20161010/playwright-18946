import * as path from 'path';
import { test, expect } from '@playwright/test';

const keepBrowserOpened = false;

test.afterAll(async ({ page }) => {
    if (keepBrowserOpened) {
        await page.pause();
    }
});

test('local html file test', async ({ page }) => {
    const absPath = path.resolve('./html/from.html');
    await page.goto(`file:///${absPath}`);
    const fromH1 = page.locator('//h1');
    const title = await fromH1.innerText();
    expect(title, 'FROM');
    const link = page.locator('//a');
    const linkName = await link.innerText();
    expect(linkName, 'Send');
    const [to] = await Promise.all([page.waitForEvent('popup'), link.click()]);
    const toH1 = to.locator('//h1');
    const toTitle = await toH1.innerText();
    expect(toTitle, 'TO');
});
