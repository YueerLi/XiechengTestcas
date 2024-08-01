import { test , expect , chromium} from '@playwright/test';
// Hotel Search
// 1.Test for entering destination/hotel names
// 2.Testing of adjustments for selection of tenants and number of residents
// 3.Tests on selection of hotel level
// 4.Tests on input keyword searches
test('HotelSearch -- by John', async ({ }) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    // 1.Test for entering destination/hotel names
    await page.getByPlaceholder('城市、机场、区域、地标或酒店名称').fill('深圳');
    // 2.Testing of adjustments for selection of tenants and number of residents
    await page.locator('.hs_rgn-label_yEmCJ.hs_dark-color-text_7IJMQ').click();
    await page.locator('//*[@id="kakxi"]/li[3]/div/div[2]/div[1]/div[1]/div[2]/span[3]/i').click();
    await page.locator('//*[@id="kakxi"]/li[3]/div/div[2]/div[1]/div[2]/div[2]/span[3]/i').click();
    await page.locator('//*[@id="kakxi"]/li[3]/div/div[2]/div[1]/div[3]/div[2]/span[3]/i').click();
    await page.click('//span[text()="确定" and @class="hs_done-span_-EIBx"]');
    // 3.Tests on selection of hotel level
    await page.click('//label[text()="酒店级别"]');
    await page.click('//div[text()="五星（钻）"]');
    await page.click('//span[text()="重置"]');
    await page.click('//div[text()="三星（钻）"]');
    await page.click('//span[text()="确定" and @class="hs_done-span_bF5dT"]');
    // 4.Tests on input keyword searches
    await page.getByPlaceholder("机场/火车站/酒店名称...").fill('如家');
    await page.click('//span[text()="搜索"]');
    await page.click('//li[@aria-label="商业区"]');
    await page.click('//p[@aria-label="深圳北站地区"]');
    await page.locator('//input[@class="price-range-input-low"]').fill('100');
    await page.locator('//input[@class="price-range-input-high"]').fill('1100');
    await page.click('//li[@aria-label="评分"]');
    await page.click('//span[text()="4.0分以上" and @class="filter-content"]');
    await page.click('//*[@id="ibu_hotel_container"]/div/section/div[2]/ul/li[5]/div/div/div/div[2]/div[2]/div[2]');
    // The following elements could not be found in the test due to the anti-autoclipping functionality of the site under test
    //await page.click('//li[text()="大床房"]');
    //await page.click('//*[@id="470132381"]/div/div[2]/div/div/div/div[5]/div[2]/div/div');
    await page.close();
    await browser.close();
});