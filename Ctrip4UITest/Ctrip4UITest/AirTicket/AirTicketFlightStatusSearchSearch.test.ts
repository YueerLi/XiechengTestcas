import { test , expect , chromium} from '@playwright/test';
// Flight Status Search
// 1.Testing the use of flight number search to search for flight movements
// 2.Testing the use of searching for landing and takeoff locations to search for flight movements
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
    await page.click('//span[@class="lsn_font_data_rSNIK" and text()="航班动态"]');
    // 1.Testing the use of flight number search to search for flight movements
    await page.click('//div[text()="搜航班号"]');
    await page.getByPlaceholder('请填写航班号，如MU1234').fill('MU1234');
    await page.click('//div[text()="出发日期"]');
    await page.locator('.date-month .date-d').filter({hasText:currentDay}).click();
    await page.click('//div[@class="search-button-text"]');
    await page.goBack();
    // 2.Testing the use of searching for landing and takeoff locations to search for flight movements
    await page.click('//div[text()="搜起降地"]');
    await page.click('//div[text()="出发城市"]');
    await page.click('//div[text()="北京"]');
    await page.click('//div[text()="到达城市"]')
    await page.click('//div[text()="PQRSTUVW"]');
    await page.click('//div[text()="上海"]')
    await page.click('//div[@class="city-change"]');
    await page.click('//div[text()="出发日期"]');
    await page.locator('.date-month .date-d').filter({hasText:currentDay}).click();
    await page.click('//div[@class="search-button-text"]');
    await page.click('//div[@class="list-item" and @data-speed="c_online_list_list_click"][1]');
    await page.close();
    await browser.close();
});