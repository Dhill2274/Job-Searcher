import puppeteer from 'puppeteer-core';


const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

try {
    await page.goto('https://uk.indeed.com/?r=us');
    await page.type('#search-box-selector', 'example search text');
    await page.type('#search-box-selector', 'example search text');
    await page.click('#search-button-selector');
    await page.waitForSelector('.result-item-selector');
    await page.click('#search-button-selector');
    await page.click('#search-button-selector');
    await page.waitForSelector('.result-item-selector');

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