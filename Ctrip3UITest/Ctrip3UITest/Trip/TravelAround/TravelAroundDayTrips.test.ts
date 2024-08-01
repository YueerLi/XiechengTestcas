import { test , expect, chromium} from '@playwright/test';
// @summary
// TravelAround
// 1.Navigate to travel around
// 2.Navigate to detail page.
test('TravelTravelAroundDayTrips -- by henry', async ({}) => {
    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('旅游 按回车键打开菜单').click();

    //Navigate to travel around
    await expect(page.getByRole('link',{name:'周边游'})).toBeVisible();
    await page.getByRole('link',{name:'周边游'}).click();
    await expect(page.locator('.expose_dom .hot_zone_item').nth(6)).toBeVisible();
    await delay(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.locator('.expose_dom .hot_zone_item').nth(6).click();
    const page1 = await page1Promise;

    //Navigate to detail page.
    await expect(page1.locator('.select_div_content  .select_div_content_font').filter({hasText:'一日游'})).toBeVisible({timeout:2000});
    await page1.locator('.filter-data-wrap .filter-select-name').filter({hasText:'无购物'}).click();
    await expect(page1.locator('ul.m_filter_item_list span.m_filter_item_text').filter({hasText:'无购物'})).toBeVisible({timeout:2000});
    await expect(page1.locator('div.right-content-list div ._m_productcard.recommendList').nth(1)).toBeVisible();
    await delay(2000);
    const page2Promise = page1.waitForEvent('popup');
    await page1.locator('div.right-content-list div ._m_productcard.recommendList').nth(1).click();
    const page2 = await page2Promise;

    await page2.getByRole('link',{name:'图文详情'}).click();
    await page.close();
});