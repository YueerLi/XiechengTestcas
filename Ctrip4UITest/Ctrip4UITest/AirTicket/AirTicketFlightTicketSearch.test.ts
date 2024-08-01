import { test , expect , chromium} from '@playwright/test';
// Flight Status Search
// 1.Tested for buying one-way ticket searches
// 2.Test the search for purchasing round-trip tickets
// 3.Tests for purchasing multi-ride ticket searches
test('FlightStatusSearch -- by John', async ({ }) => {
    function getCurrentDay(): string {
        const date = new Date();
        const day = String(date.getDate());
        return day;
    }
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    const currentDay = getCurrentDay();
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    await page.click('//span[@class="lsn_top_nav_font_4h1KU" and text()="机票"]');
    await page.click('//*[@id="leftSideNavLayer"]/div/div/div[2]/div/div[1]/div/div[2]/div/a[1]/span');

    // 1.Tested for buying one-way ticket searches
    await page.click('//span[text()="单程 "]')
    await page.click('//*[@id="searchForm"]/div/div/div/div[2]/div[1]/div/div[1]/div/div/div[1]/input');
    await page.click('//*[@id="searchForm"]/div/div/div/div[2]/div[1]/div/div[1]/div/div/div[2]/div/div[2]/div/div/ul/li[1]');
    await page.click('//*[@id="searchForm"]/div/div/div/div[2]/div[1]/div/div[3]/div/div/div[1]/input');
    await page.click('//*[@id="searchForm"]/div/div/div/div[2]/div[1]/div/div[3]/div/div/div[2]/div/div[2]/div/div/ul/li[2]');
    await page.click('//*[@id="datePicker"]/div[1]/span/div/div/div/input');
    await page.locator('.date-month .date-week.date-week-2 .date-d').filter({hasText:currentDay}).click();
    await page.click('//span[text()="带儿童"]');
    await page.click('//button[text()="搜索"]');
    await page.goBack();

    // 2.Test the search for purchasing round-trip tickets
    await page.click('//span[text()="往返 "]');
    await page.click('//span[text()="带婴儿"]');
    await page.click('//button[text()="搜索"]');
    await page.goBack();
    
    // 3.Tests for purchasing multi-ride ticket searches
    await page.click('//span[text()="多程"]');
    await page.click('//span[text()="不限舱等"]');
    await page.click('//div[text()="经济舱"]');
    await page.click('//input[@name="mtDCity2"]');
    await page.click('//input[@name="mtACity2"]');
    await page.click('//*[@id="searchForm"]/div/div/div/div[2]/div[2]/div[1]/div/div[4]/div/div/div[2]/div/div[2]/div/div/ul/li[3]');
    await page.click('//*[@id="multiDatePicker1"]/div/span/div/div/div/input');
    await page.locator('.date-month .date-week.date-week-2 .date-d').filter({hasText:currentDay}).click();
    await page.click('//a[text()="+ 再加一程"]');
    await page.click('//button[text()="搜索"]');
    await page.close();
    await browser.close();
});