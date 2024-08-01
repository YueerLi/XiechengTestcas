import { test , expect , chromium} from '@playwright/test';
// Seasonal High lights
// 1.Testing of the origin search drop-down box
// 2.Testing two different referral buttons
// Testing of selected tour screening information
test('SeasonalHighlights -- by John', async ({ }) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    // 1.Testing of the origin search drop-down box
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[1]/input');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[2]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[3]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[4]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[5]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[6]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[2]/div/div[2]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[1]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[2]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[3]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[4]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[5]');
    await page.click('//*[@id="platformAdvertStairs"]/div/div[3]/div/div/div[2]/div[3]/div/ul/li[6]');
    await page.click('//span[@aria-label="当季热推"]');
    // 2.Testing two different referral buttons
    await page.click('//a[text()="当季热卖·跟团游"]');
    await page.goBack();
    await page.click('//a[text()="周末畅游·特价机票"]');
    await page.goBack();
    // Testing of selected tour screening information
    await page.click('//*[@id="platformAdvertStairs"]/div/div[4]/div[1]/ul/li[2]');
    await page.click('//*[@id="js_OrderBox"]/ul/li[1]/div');
    await page.click('//*[@id="js_OrderBox"]/ul/li[2]/div')
    await page.click('//*[@id="js_OrderBox"]/ul/li[2]/div/div/div/span')
    await page.click('//*[@id="grp-103047-date-tab-23467402-23467402-"]/div[1]')
    await page.click('//*[@id="dev-103047-date-click-2024-08-01-23467402-23467402-"]')
    await page.click('//input[@aria-label="请选择成人数"]')
    await page.click('//*[@id="dev-103047-travel-count-adult-4-23467402-23467402-"]')
    await page.click('//input[@aria-label="请选择儿童数"]')
    await page.click('//*[@id="dev-103047-travel-count-child-2-23467402-23467402-"]')
    await page.click('//a[text()="查询资源"]')
    await page.close()
    await browser.close();
});