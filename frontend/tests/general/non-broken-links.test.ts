import { test } from '@playwright/test';
import { pages } from '../../playwright.config.common';

test.describe('Non-broken links', () => {
    pages.forEach((url) => {
        test(url, async ({ page }) => {
            await page.goto(url).catch(() => {
                throw new Error(`Error reaching ${url}`);
            });

            const links = await page.evaluate(() => {
                const BANNED_URLS = ['https://instagram.com', 'https://twitter.com', 'https://facebook.com'];
                const elements = Array.from(document.getElementsByTagName('a')).filter(
                    (el) =>
                        !el.href.startsWith('mailto:') &&
                        !el.href.startsWith('tel:') &&
                        !BANNED_URLS.some((url) => el.href.startsWith(url)),
                );
                return elements.map((a) => a.href);
            });

            for (const link of links) {
                try {
                    const response = await page.goto(link);

                    if (response && response.status() >= 400) {
                        // console.log(`Link "${link}" is broken: HTTP status code ${response.status()}`);
                        throw new Error(`Link "${link}" is broken: HTTP status code ${response.status()}`);
                    } else {
                        console.log(`Link "${link}": OK`);
                    }
                } catch (err) {
                    // console.log(`Link "${link}" is broken: ${err}`);
                    // continue;
                    throw new Error(`Link "${link}" is broken: ${err}`);
                }
            }
        });
    });
});
