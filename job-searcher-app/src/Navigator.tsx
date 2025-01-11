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
        // Query all result items on the page
        return Array.from(document.querySelectorAll('.result-item-selector')).map(
          (item) => ({
            title: item.querySelector('.title-selector')?.textContent,
            link: item.querySelector('a')?.href,
            description: item.querySelector('.description-selector')?.textContent,
          })
        );
      });
} catch (error) {

} finally {
    await browser.close();
}