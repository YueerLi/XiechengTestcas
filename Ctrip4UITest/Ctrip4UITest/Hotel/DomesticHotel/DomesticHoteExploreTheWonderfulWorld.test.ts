import { test , expect , chromium} from '@playwright/test';
// Exploere the Wonderful World
// 1.Test the origin input box
// 2.Testing of more destination buttons
// 3.Testing of travel destination screening
test('ExploereTheWonderfulWorld -- by John', async ({ }) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    // 1.Test the origin input box
    await page.locator('//*[@id="flightMap"]/div/div[1]/div/div/div/div/div[1]/input').fill('中国香港');
    await page.click('//span[@class="highlight"]');
    // 2.Testing of more destination buttons
    await page.click('//a[text()="更多目的地"]');
    await page.goBack();
    // 3.Testing of travel destination screening
    await page.click('//img[@src="https://webresource.c-ctrip.com/ResH5FlightOnline/flight-home/online/map/icon_zoom.png"]');
    await page.click('//span[text()="全中国"]');
    await page.locator('//input[@class="module-input f-16 f-bold color-main"]').fill('北京');
    await page.click('//*[@id="__next"]/div/div/div[1]/div[1]/div/div[1]/div[3]/div[2]/div/div/span[1]/span');
    await page.click('//span[text()="仅看直飞"]');
    await page.click('//*[@id="__next"]/div/div/div[1]/div[1]/div/div[3]/div/div[3]/div/div[2]/div[2]/a[1]');
    await page.close();
    await browser.close();
});