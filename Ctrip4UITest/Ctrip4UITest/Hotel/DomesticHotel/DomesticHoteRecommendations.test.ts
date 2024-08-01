import { test , expect , chromium} from '@playwright/test';
// Hotel Recommendations
// 1.Tests on selected cities
// 2.Testing the page turn buttons
// 3.Testing of recommended hotel choices
test('HotelRecommendations -- by John', async ({ }) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    // 1.Tests on selected cities
    await page.click('//button[@aria-label="出发地选择上海"]');
    await page.click('//button[@aria-label="北京"]');
    await page.click('//button[@aria-label="广州"]');
    await page.click('//button[@aria-label="三亚"]');
    await page.click('//button[@class="pas_base_yGP0w"]');
    await page.click('//button[@aria-label="杭州"]');
    // 2.Testing the page turn buttons
    await page.click('//*[@id="platformAdvertStairs"]/div/div[2]/div[2]');
    // 3.Testing of recommended hotel choices
    await page.click('//li[@class="pas_item_7-Jyt"][2]');
    await page.click('.detail-head-price_select');
    // The following elements could not be found in the test due to the anti-autoclipping functionality of the site under test
    //await page.click('//li[text()="双床房"]');
    //await page.click('//*[@id="303505411"]/div/div[2]/div/div/div/div[5]/div[2]/div/div');
    await page.close();
    await browser.close();
});