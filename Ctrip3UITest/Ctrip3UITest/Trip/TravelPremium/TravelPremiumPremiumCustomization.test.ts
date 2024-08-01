import { test , expect, chromium} from '@playwright/test';
// @summary
// Premium Customization
// 1.Navigate to Premium Customization
// 2.Navigate to detail page
test('TravelTravelPremiumPremiumCustomization -- by henry', async ({}) => {
    const travelMainTitle = '国内';
    const travelCity = '上海';
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('旅游 按回车键打开菜单').click();

    //Navigate to Premium Customization
    await expect(page.getByRole('link',{name:'高端游'})).toBeVisible();
    await page.getByRole('link',{name:'高端游'}).click();
    await expect(page.locator('div.floor_title_box div.floor_title_content').filter({hasText:'目的地'})).toBeVisible();
    await page.locator('ul.multiple_modules_tab_box div.tab_title_box p.tab_main_title').filter({hasText:travelMainTitle}).click();
    await expect(page.locator('#body_wrapper > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div > div > div > p:nth-child(2)')).toBeVisible();
    const page1Promise = page.waitForEvent('popup');
    await page.locator('#body_wrapper > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div > div > div > p:nth-child(2)').click();
    const page1 = await page1Promise;

    //Navigate to detail page
    await expect(page1.locator('p.desitinaion_title').filter({hasText:travelCity})).toBeVisible({timeout:6000});
    const page2Promise = page1.waitForEvent('popup');
    await page1.locator('div > div#listProducts > ul:nth-child(1)').click();
    const page2 = await page2Promise;
    await expect(page2.locator('div.product_price_reserve_cont span.btn')).toBeVisible({timeout:8000});
    await page2.locator('div.product_price_reserve_cont span.btn').click();
    await page.close();
});