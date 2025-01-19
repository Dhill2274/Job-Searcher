import puppeteer from 'puppeteer-core';

type ScrapedData = {
  title: string;
  link: string;
  description: string;
};

export const scrapeData = async (): Promise<ScrapedData[]> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const allResults = [];

  try {

      await page.goto('https://uk.indeed.com/?r=us');
      await page.type('input[id="text-input-what"]', 'Software');
      await page.type('input[id="text-input-where"]', 'Manchester');
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

      let hasNextPage = true;

      while (hasNextPage) {

        const results = Array.from(document.querySelectorAll('div.mosaic-zone')).map(
          (item) => ({
            title: item.querySelector('span[title]')?.textContent || 'No title available',
            link: (item.querySelector('a.jcs-JobTitle css-1baag51 eu4oa1w0') as HTMLAnchorElement)?.href || 'No link available',
            description: item.querySelector('div.text-location')?.textContent || 'No description available',
          })
        );

        allResults.push(...results);

        const nextButton = await page.$('a[aria-label="Next Page"]');

        if (nextButton) {
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
            nextButton.click(),
          ]);
        } else {
          hasNextPage = false;
        }
      }

      console.log(allResults);
      return allResults;

  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  } finally {
      await browser.close();
  }
};