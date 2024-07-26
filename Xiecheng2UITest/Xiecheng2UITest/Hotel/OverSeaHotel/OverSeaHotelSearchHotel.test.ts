import { test , expect, chromium} from '@playwright/test';
// @summary
// ForeignHotelSearchHotel
// 1.Navigate to foreign hotel.
// 2.Navigate to hotel recommendation.
test('ForeignHotelSearchHotel -- by henry', async ({}) => {
    const date = '6月25日'
    const locationOrHotel = '东京';
    const star = '五星(钻)'
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();

    //Navigate to foreign hotel.
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('酒店 按回车键打开菜单').click();
    await expect(page.getByRole('link',{name:'海外酒店'}).nth(0)).toBeVisible();
    await page.getByRole('link',{name:'海外酒店'}).nth(0).click();
    
    //Navigate to search hotel.
    await expect(page.getByRole('heading',{ name:'酒店推荐'})).toBeVisible();
    await page.locator('.star-rate-container .rate').filter({hasText:star}).click();
    await page.getByLabel('目的地/酒店名称',{exact:true}).nth(0).fill(locationOrHotel);
    await page.getByRole('textbox',{ name:date+'(今天)'}).nth(0).click();
    await page.locator('.c-calendar-month .is-allow-hover').nth(0).click();
    await page.getByLabel('房间及住客').click();
    await page.locator('.child-kid').nth(1).locator('.actions .icon-btn').nth(1).click();
    await page.locator('.done').filter({hasText:'确定'}).click();
    await page.getByRole('button',{ name:'按钮：查询酒店', exact:true}).click();
    await expect(page.getByRole('heading',{ name:'位置区域'})).toBeVisible();
    await page.close();
});