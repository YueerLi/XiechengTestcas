import { test , expect, chromium} from '@playwright/test';
// Domestic train ticket discount routes
// 1. Navigate to the popular domestic train ticket routes and select the route
// 2. Select the train with tickets to book
// 3. Jump to the personal information filling page, fill in the information, and book the ticket
// 4. Jump to the payment page and pay immediately
// 5. Pay the order and complete the reservation
test('DiscountedRoutes', async ({}) => {
    const departureCity = '上海';
    const destinationCity = '北京';
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 } 
    });
    //Navigate to the popular domestic train ticket routes and select the route
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('火车票 按回车键打开菜单').click();
    await page.getByRole('link', {name:'国内火车票'}).click();
    try {
        await expect(page.getByText(departureCity, { exact: true }).nth(1)).toBeVisible();
        await page.getByText(departureCity, { exact: true }).nth(1).click();
        console.log('The route exists');
    } catch (error) {
        console.error('The route does not exist', error);
    }
    //Select the train with tickets to book
    const page1Promise = page.waitForEvent('popup');
    await page.getByText(departureCity+'到'+destinationCity).click();
    const page1 = await page1Promise;
    await page1.locator('li').filter({ hasText: '仅显示有票车次' }).locator('i').click();
    await page1.locator('#trainlistitem0').click();
    await page1.locator('#__next > div > div.train-wrapper.train-flex.pb120 > div.train-content > section > div.list-open.show.list-open-3 > ul > li:nth-child(2) > button').click();
    //Jump to the personal information filling page, fill in the information, and book the ticket
    await page1.locator('#__next > div > div.train-wrapper.train-flex.pb120 > div.train-content > div.online-btn.h5hide > button.btn-orange').click();
    //Jump to the payment page and pay immediately
    await page1.locator('#__next > div:nth-child(2) > div.train-wrapper.train-flex.pb80 > div.train-content > div.card-white.status-box > div > div.btn-box > button.btn-orange').click();
    //Pay the order and complete the reservation
    try {
        await expect(await page1.locator('#__next > div.page-layout > div.layout-header > div > div')).toBeVisible();
        console.log('Test case success');
    } catch (error) {
        console.error('Test case failed', error);
    } 
    await page.close();
});