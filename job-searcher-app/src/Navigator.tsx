import puppeteer from 'puppeteer-core';


const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

try {
    await page.goto('https://uk.indeed.com/?r=us');
    await page.type('input[id="text-input-what"]', 'example search text');
    await page.type('input[id="text-input-where"]', 'example search text');
    await page.click('button[type="submit"]');
    await page.waitForSelector('div.css-1blgujh eu4oa1w0');
    await page.click('button[id="filter-radius"]');
    await page.waitForSelector('a[href="/jobs?l=london&radius=15"]', { visible: true });
    await page.click('a[href="/jobs?l=london&radius=15"]');
    await page.waitForFunction(
      (selector, text) => {
        const element = document.querySelector(selector);
        return element && element?.ariaLabel?.includes(text);
      },
      {},
      'button[id="filter-radius"]',
      'Within 15 miles'
    );

    const results = await page.evaluate(() => {

        const result1 = Array.from(document.querySelectorAll('.result-item-selector')).map(
          (item) => ({
            title: item.querySelector('.title-selector')?.textContent,
            link: item.querySelector('a')?.href,
            description: item.querySelector('.description-selector')?.textContent,
          })
        );

        const result2 = Array.from(document.querySelectorAll('.result-item-selector')).map(
          (item) => ({
            title: item.querySelector('.title-selector')?.textContent,
            link: item.querySelector('a')?.href,
            description: item.querySelector('.description-selector')?.textContent,
          })
        );

        return [...result1, ...result2];
      });

} catch (error) {

} finally {
    await browser.close();
}