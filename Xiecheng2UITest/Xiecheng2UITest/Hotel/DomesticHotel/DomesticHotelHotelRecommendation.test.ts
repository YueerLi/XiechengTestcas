import { test , expect, chromium} from '@playwright/test';
// @summary
// SearchHotel
// 1.Navigate to domestic hotel.
// 2.Navigate to hotel recommendation.
// 3.Choose a hotel and check the page.
test('HotelRecommendation -- by henry', async ({}) => {
    const location = '杭州';
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
    
    //Navigate to hotel recommendation.
    await expect(page.getByLabel('您已进入酒店预订去，该模块包含目的地、入住、离店日期、房间数、住客数、酒店级别以及关键词等输入框。按下tab键可进入输入框。')).toBeVisible();
    await page.getByRole('button', { name: '更多' }).click();
    await page.getByLabel(location,{exact: true}).click();
    await page.locator('.pas_item_7-Jyt').nth(0).click();
    
    //Choose a hotel and check the page.
    await expect(page.getByText('选择房间').nth(0)).toBeVisible();
    await expect(page.locator('.m-policy_title').filter({hasText:'酒店政策'})).toBeVisible();
    await page.locator('.m-policy_title').filter({hasText:'酒店政策'}).click();
    await page.close();
});