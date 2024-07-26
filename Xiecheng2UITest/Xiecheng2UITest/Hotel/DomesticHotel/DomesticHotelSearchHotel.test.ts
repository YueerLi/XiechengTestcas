import { test , expect, chromium} from '@playwright/test';
// @summary
// SearchHotel
// 1.Navigate to domestic hotel.
// 2.Navigate to search hotel function.
// 3.Set the number of guests.
// 4.Set the number of hotel stars.
test('SearchHotel -- by henry', async ({}) => {
    const cityNameOrHotelName = '上海';
    const hotelstars = '五星（钻）'
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();

    //Navigate to domestic hotel.
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('酒店 按回车键打开菜单').click();
    await expect(page.getByRole('link',{name:'国内酒店'})).toBeVisible();
    await page.getByRole('link',{name:'国内酒店'}).click();
    
    //Navigate to search hotel function.
    await expect(page.getByLabel('您已进入酒店预订去，该模块包含目的地、入住、离店日期、房间数、住客数、酒店级别以及关键词等输入框。按下tab键可进入输入框。')).toBeVisible();
    await page.getByPlaceholder('城市、机场、区域、地标或酒店名称').fill(cityNameOrHotelName);
    await page.getByText('入住').click();
    await page.locator('.c-calendar-month').nth(0).locator('.is-allow-hover').nth(0).click();
    await page.locator('.c-calendar-month').nth(0).locator('.is-allow-hover').nth(0).click();

    //Set the number of guests.
    await page.getByText('房间及住客').click();
    await page.getByText('确定').first().click();

    //Set the number of hotel stars.
    await page.getByText('酒店级别', {exact: true}).click();
    await page.getByText(hotelstars).click();
    await page.getByText('确定').nth(1).click();
    await page.getByText('搜索', {exact: true}).click();
    await expect(page.getByRole('heading',{ name:'位置区域'})).toBeVisible();


});