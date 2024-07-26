import { test , expect, chromium} from '@playwright/test';
// Ctrip Destination Check out the flagship store(06/28/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "Destination" page under the "Tour" menu, Check out the cultural and travel guide pivot should be displayed
// 3. Open any guide
// 4. Click "喜欢" and "收藏" buttons
// 5. Click "当地向导"
// 6. Close browsers
test('DestinationCheckOutTheFlagshipStore - From Bunny', async ({}) => {
    // Open browser and login a account, Navigate bar should be displayed
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');
    await expect(page.locator('#leftSideNavLayer')).toBeVisible();

    // Open "Destination" page under the "Tour" menu, Check out the cultural and travel guide pivot should be displayed
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '目的地', exact: true })).toBeVisible();
    await page.getByRole('link', {name:"目的地", exact: true}).click();
    await expect(page.getByText("文旅攻略")).toBeVisible();

    // Open any guide
    const [culturalAndTravelGuidePage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator("#mkt_act_dst_list_rqgl_9").click()
    ]);
    await culturalAndTravelGuidePage.waitForLoadState();

    // Click "喜欢" and "收藏" buttons
    await culturalAndTravelGuidePage.locator("#TitleFavourite").click();
    await culturalAndTravelGuidePage.locator("#TitleLike").click();

    // Click "当地向导"
    const [localGuidePage] = await Promise.all([
        culturalAndTravelGuidePage.context().waitForEvent('page'),
        culturalAndTravelGuidePage.getByText("当地向导").click()
    ]);
    await localGuidePage.waitForLoadState();
    await expect(localGuidePage.getByText("多样的旅行感受")).toBeVisible();
    await expect(localGuidePage.getByText("省心的游玩体验")).toBeVisible();
    await expect(localGuidePage.getByText("专业的当地向导")).toBeVisible();

    // Close browsers
    await browser.close();
});