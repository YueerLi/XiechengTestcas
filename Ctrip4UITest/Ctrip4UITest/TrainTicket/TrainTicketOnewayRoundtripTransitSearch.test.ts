import { test , expect , chromium} from '@playwright/test';
// One-way/round-trip/transit Search
// 1.Testing of one-way ticket functionality
// 2.Testing of the round-trip ticket function
// 3.Testing of the transit ticket function
test('One-way/round-trip/transitSearch -- by John', async ({ }) => {
    function getCurrentDay(): string {
        const date = new Date();
        const day = String(date.getDate());
        return day;
    }
    const browser = await chromium.launchPersistentContext('D:\cookie', { 
        viewport: { width: 1920, height: 1080 } 
    });
    const currentDay = getCurrentDay();
    console.log(currentDay);
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    await page.getByLabel('火车票 按回车键打开菜单').click();
    // 1.Testing of one-way ticket functionality
    await page.getByRole('button', { name: '单程' }).click();
    await page.getByText('出发城市').click();
    await page.getByPlaceholder('出发城市').fill('合肥');
    await page.getByPlaceholder('到达城市').click();
    await page.waitForTimeout(3000);
    await page.click('//li[text()="重庆"]');
    await page.getByText('出发日期').click();
    await page.locator('div.widget-calendar-bd ul.date-bd').filter({hasText:currentDay}).nth(0).click();
    await page.click('//span[text()="只搜高铁动车"]');  //Due to system caching problems, the line of code can be commented out according to the actual running situation
    await page.click('//button[text()="搜索"]');
    await page.click('//*[@id="trainlistitem0"]/div[2]/button');
    await page.click('//*[@id="__next"]/div/div[3]/div[1]/section/div[2]/ul/li[2]/button');
    await page.waitForTimeout(3000);
    await page.goBack();
    await page.goBack();
    // 2.Testing of the round-trip ticket function
    await page.getByRole('button', { name: '往返' }).click();
    await page.click('//button[text()="搜索"]');
    await page.click('//*[@id="trainlistitem0"]/div[2]/button');
    await page.click('//*[@id="__next"]/div/div[3]/div/div[1]/section/div[2]/ul/li[1]/button');
    await page.click('//*[@id="trainlistitem0"]/div/button');
    await page.goBack();
    // 3.Testing of the transit ticket function
    await page.getByRole('button', { name: '中转' }).click();
    await page.getByPlaceholder('中转城市').fill('长沙');
    await page.click('//li[text()="长沙"]');
    await page.click('//button[text()="搜索"]');
    await page.waitForTimeout(5000);
    await page.getByPlaceholder('中转城市').click();
    await page.waitForTimeout(5000);
    await page.click('//li[text()="长沙"]');
    await page.waitForTimeout(5000);
    await page.click('//button[text()="搜索"]');
    await page.click('//*[@id="trainlistitem0"]/div/button');
    await page.click('//*[@id="__next"]/div/div[3]/div/div[1]/section/div[2]/ul/li[1]/button');
    await page.click('//*[@id="trainlistitem0"]/div[2]/button');
    await page.close();
    await browser.close();
});