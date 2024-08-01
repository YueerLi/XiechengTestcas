import { test , expect, chromium} from '@playwright/test';
// @summary
// TravelAround
// 1.Navigate to travel around
// 2.Navigate to detail page.
test('TravelTravelAroundVisitingNearbyAttractions -- by henry', async ({}) => {
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
    await expect(page.locator('.expose_dom .hot_zone_item').nth(7)).toBeVisible();
    await delay(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.locator('.expose_dom .hot_zone_item').nth(7).click();
    const page1 = await page1Promise;
    await expect(page1.locator('div.searchbar-container div.homepage-button').filter({hasText:'我的主页'})).toBeVisible();
    await delay(2000);
    const page2Promise = page1.waitForEvent('popup');
    await page1.locator('div.infobar-container div.infobar-item div.infobar-item-text-container').filter({hasText:'篇游记'}).click();
    const page2 = await page2Promise;
    await expect(page2.getByRole('link',{ name:'写游记'})).toBeVisible();
    await page2.getByRole('link',{ name:'推荐',exact:true}).click()
    console.log('已切换至推荐游记');
    await page2.getByRole('link',{ name:'最新',exact:true}).click()
    console.log('已切换至最新游记');
    await page2.getByRole('link',{ name:'问答',exact:true}).click();
    await expect(page2.getByRole('heading',{ name:'攻略社区问答',exact:true})).toBeVisible();
    await page2.getByRole('link',{ name:'最新问题',exact:true}).click()
    await page.close();
});