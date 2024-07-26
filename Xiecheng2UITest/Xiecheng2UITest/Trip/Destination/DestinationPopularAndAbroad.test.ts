import { test , expect, chromium} from '@playwright/test';
// Ctrip Agency Self-Operated Insurance in Insurance page(06/21/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "Destination" page under the "Tour" menu, Popular And Abroad should be displayed
// 3. Enter a destination to search box, like "马来西亚"
// 4. Back to the preview page and click a destination, like "新加坡"
// 5. Click any product like "新加坡+马来西亚"
// 6. Close browsers
test('DestinationPopularAndAbroad.test - From Bunny', async ({}) => {
    // Detailed Information
    const destinationMalaysia = "马来西亚";
    const destinationSingapore = "新加坡";

    // Open browser and login a account, Navigate bar should be displayed
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');
    await expect(page.locator('#leftSideNavLayer')).toBeVisible();

    // Open "Destination" page under the "Tour" menu, Popular And Abroad should be displayed
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '目的地', exact: true })).toBeVisible();
    await page.getByRole('link', {name:"目的地", exact: true}).click();
    await page.getByRole('link', { name: '携程旅行网', exact: true }).waitFor();
    await expect(page.locator(".search-ipt")).toBeVisible();
    await expect(page.locator("#mkt_act_dst_0")).toBeVisible();
    await expect(page.locator("#mkt_act_dst_1")).toBeVisible();

    // Enter a destination to search box, like "马来西亚"
    await page.getByPlaceholder("请输入目的地名称").fill(destinationMalaysia);
    await page.waitForTimeout(1000);
    await page.locator(".search-ipt .icon-search").dblclick();
    await expect(page.getByText("您搜索的旗舰店正在搭建中...")).toBeVisible();

    // Back to the preview page and click a destination, like "新加坡"
    await page.goBack();
    const [destinationSingaporePage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText(destinationSingapore).click()
    ]);
    await destinationSingaporePage.waitForLoadState();
    await expect(destinationSingaporePage.getByText("新加坡+马来西亚")).toBeVisible();

    // Click any product like "新加坡+马来西亚"
    await destinationSingaporePage.getByText("新加坡+马来西亚").click();
    const [SingaporeMalaysiaPage] = await Promise.all([
        destinationSingaporePage.context().waitForEvent('page'),
        destinationSingaporePage.locator("#mkt_act_dstproduct_mlxy_4428382").click()
    ]);
    await SingaporeMalaysiaPage.waitForLoadState();
    await expect(SingaporeMalaysiaPage.getByRole("heading")).toContainText(destinationSingapore || destinationMalaysia);

    // Close browsers
    await browser.close();
});