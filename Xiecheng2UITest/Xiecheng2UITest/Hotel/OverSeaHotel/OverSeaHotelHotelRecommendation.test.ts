import { test , expect, chromium} from '@playwright/test';
// @summary
// ForeignHotelHotelRecommendation
// 1.Navigate to foreign hotel.
// 2.Navigate to hotel recommendation.
test('ForeignHotelHotelRecommendation -- by henry', async ({}) => {
    const location = '旧金山';
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
    
    //Navigate to hotel recommendation.
    await expect(page.getByRole('heading',{ name:'酒店推荐'})).toBeVisible({timeout:10000});
    await page.getByRole('heading',{ name:'酒店推荐'}).click();
    await page.getByRole('button',{ name:'更多'}).nth(0).click();
    await page.locator('.allcity-box .item').filter({hasText:location}).click();
    await page.locator('.hotel-img').nth(1).click();
    await page.close();
});