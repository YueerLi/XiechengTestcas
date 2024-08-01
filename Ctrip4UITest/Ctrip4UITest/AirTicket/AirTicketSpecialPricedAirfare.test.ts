import { test , expect , chromium} from '@playwright/test';
// Special priced Airfare
// 1.Tests on popular travel theme buttons
// 2.Testing of the origin, destination, and departure date information selection boxes
// 3.Testing the “Suggest information for you” checkbox
// 4.Select the appropriate ticket and click to go to the next tab.
// 5.Click on booking for eligible tickets
test('SpecialpricedAirfare -- by John', async ({ }) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com');
    // 1.Tests on popular travel theme buttons
    await page.getByLabel('机票 按回车键打开菜单').click();
    await page.locator('#leftSideNavLayer').getByRole('link', { name: '特价机票' }).click();
    await page.getByText('周末省心游').click();
    await page.getByText('爱上大草原').click();
    await page.getByText('海边浪一浪').click();
    await page.getByText('倾听古镇风情').click();
    await page.getByText('品味历史名城').click();
    await page.getByText('网红拍摄必选地').click();
    // 2.Testing of the origin, destination, and departure date information selection boxes
    await page.locator('div').filter({ hasText: /^目的地网红拍摄必选地$/ }).getByTestId('cityLabel_delete_0').click();
    await page.locator('div').filter({ hasText: /^全中国$/ }).nth(2).click();
    await page.getByText('GHIJ').click();
    await page.getByText('桂林').click();
    await page.getByText('一个月内').click();
    await page.click('//div[@class="searchbox-calendar-value"]');
    // 3.Testing the “Suggest information for you” checkbox
    await page.locator('div').filter({ hasText: /^1个最低价目的地仅看直飞$/ }).locator('span').nth(2).click();
    await page.click('//div[@class="fs_pop_select_container"][1]'); //Testing the categorized boxes
    await page.click('//span[text()="热门优先"]');
    await page.getByText('周几').click(); //Testing the Departure Time Selection Box
    await page.click('//div[@class="fs_pop_select_container"][2]');
    await page.click('//div[@class="fs_pop_select_container"][2]');
    await page.click('//span[text()="周一"]');
    await page.click('//span[text()="周二"]');
    await page.click('//span[text()="周三"]');
    await page.click('//span[text()="周四"]');
    await page.click('//span[text()="周五"]');
    await page.click('//span[text()="周六"]');
    await page.click('//span[text()="周日"]');
    await page.getByText('确认').click();
    await page.click('//span[text()="更多航班"]');
    await page.click('//span[@class="city_slight_city_back"]');
    // 4.Select the appropriate ticket and click to go to the next tab.
    await page.click('//*[@id="__next"]/div/div/div[1]/div[1]/div/div[3]/div/div[3]/div/div[2]/div[2]');
    const page1Promise = page.waitForEvent('popup');
    const page1 = await page1Promise;
    // 5.Click on booking for eligible tickets
    await page1.click('//*[@id="hp_container"]/div[2]/div/div[3]/div[3]/div[2]/span/div[1]/div/div/div/div/div[2]/div[2]/button');
    await page1.click('//*[@id="0_0"]');
});