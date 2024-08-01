import { test , expect , chromium} from '@playwright/test';
// Preferential Hotels
// 1.Test the city filter button above
// 2.Select a hotel and test various information filter boxes
// 3.Testing of various information filter boxes in selected hotels
test('PreferentialHotels -- by John', async ({ }) => {
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
    await page.getByLabel('火车票 按回车键打开菜单').click();
    // 1.Test the city filter button above
    await page.getByText('上海', { exact: true }).first().click();
    await page.getByText('北京', { exact: true }).first().click();
    await page.getByText('杭州', { exact: true }).first().click();
    await page.getByText('成都').click();
    await page.getByText('广州', { exact: true }).first().click();
    await page.getByText('天津', { exact: true }).first().click();
    // 2.Select a hotel and test various information filter boxes
    const page1Promise = page.waitForEvent('popup');
    await page.click('//*[@id="app"]/div[2]/div[3]/div/div/ul[2]/li[4]');
    const page1 = await page1Promise;
    await page1.click('//*[@id="ibu_hotel_container"]/div/div[1]/ul/li[2]/div/div[1]/input');
    await page1.locator('div.c-calendar-month__days li').filter({hasText:currentDay}).nth(0).click();
    await page1.getByLabel('房间及住客').click();
    await page1.locator('span:nth-child(3)').first().click();
    await page1.locator('div:nth-child(2) > .actions > span:nth-child(3)').first().click();
    await page1.locator('div:nth-child(3) > .actions > span:nth-child(3)').first().click();
    await page1.getByRole('combobox').selectOption('9');
    await page1.getByText('确定').first().click();
    await page1.click('//button[@aria-label="按钮：查询酒店"]');
    await page1.waitForTimeout(5000);
    await page1.click('//li[@aria-label="商业区"]');
    await page1.locator('//input[@class="price-range-input-low"]').fill('100');
    await page1.locator('//input[@class="price-range-input-high"]').fill('4000');
    await page1.click('//li[text()="评分"]');
    await page1.click('//span[text()="4.0分以上"]');
    // 3.Testing of various information filter boxes in selected hotels
    const page2Promise = page1.waitForEvent('popup');
    const page2 = await page2Promise;
    // The following elements could not be found in the test due to the anti-autoclipping functionality of the site under test
    await page2.click('//li[text()="大床房"]');
    await page2.click('//div[text()="清除筛选条件"]');
    await page2.click('//*[@id="244795705"]/div/div[2]/div[1]/div[1]/div/div[5]/div[2]/div/div');
});