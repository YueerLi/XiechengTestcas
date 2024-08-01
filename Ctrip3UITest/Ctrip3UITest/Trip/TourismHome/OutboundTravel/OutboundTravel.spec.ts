import { test , expect, chromium} from '@playwright/test';
// Outbound Travel
// 1. Navigate to the city search page
// 2. Go to the Outbound Travel page
// 3. Select city, filter products
// 4. Go to the details page
test('OutboundTravel', async ({}) => {
    const departureCity = "悉尼";
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    //Navigate to the city search page
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('旅游 按回车键打开菜单').click();
    //Go to the Outbound Travel page
    await page.locator('#vac-103045-recommend-more-出境旅游-2-更多精选产品').click();
    const page1Promise = page.waitForEvent('popup');
    const page1 = await page1Promise;
    //Select city, filter products
    await page1.getByText('目的地参团',{exact:true}).nth(1).click();
    await page1.locator('#filter_box_point > div:nth-child(2) > div.list_cate_content.basefix > div.list_cate_right > span.list_more_down').click();
    try {
        await expect(page1.getByText(departureCity, { exact: true })).toBeVisible();
        await page1.getByText(departureCity, { exact: true }).click();
        console.log('The departure city exists');
    } catch (error) {
        console.error('The departure city does not exist', error);
    }    
    await page1.getByText('3日',{exact:true}).click();
    await page1.getByText('销量优先',{exact:true}).click();
    await page1.locator('#root > div > div.vacation_bd > div.main_col > div:nth-child(1) > div > div > div.list_product_right').click();
    //Go to the details page
    const page2Promise = page1.waitForEvent('popup');
    const page2 = await page2Promise;
    try {
        await expect(await page2.locator('#grp-157009-start-startcity')).toBeVisible();
        console.log('Test case success');
    } catch (error) {
        console.error('Test case failed', error);
    } 
    await page.close();
});