import { test , expect, chromium} from '@playwright/test';
// Ctrip Agency Self-Operated Insurance in Insurance page(06/21/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "Insurance" page under the "Tour" menu, "保险" should be displayed
// 3. Click "境外/港澳台旅行" button in Ctrip Agency Self-Operated bar
// 4. Select "保险公司" like "京东安联" and "保险特色" like "可办申根签"
// 5. Click the first "查看详情" button
// 6. Add various items to compare
// 7. Click "开始对比" button
// 8. Select the detailed insurance
// 9. Select start time and end time
// 10. Click "购买" button
// 11. Close browsers
test('InsuranceCtripAgencySelf-Operated - From Bunny', async ({}) => {
    // Open browser and login a account, Navigate bar should be displayed
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');
    await expect(page.locator('#leftSideNavLayer')).toBeVisible();

    // Open "Insurance" page under the "Tour" menu, "保险" should be displayed
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '保险', exact: true })).toBeVisible();
    await page.getByRole('link', {name:"保险", exact: true}).click();
    await page.getByRole('link', { name: '携程旅行网', exact: true }).waitFor();
    await expect(page.getByText("携程保险代理有限公司自营平台").last()).toBeVisible();

    // Click "境外/港澳台旅行" button in Ctrip Agency Self-Operated bar
    await page.waitForLoadState();
    const [overseasTraveltoHongKongMacauAndTaiwanPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText("境外/港澳台旅行").click()
    ]);
    await overseasTraveltoHongKongMacauAndTaiwanPage.waitForLoadState();
    await expect(overseasTraveltoHongKongMacauAndTaiwanPage.getByTitle("旅游保险")).toBeVisible();  
    
    // Select "保险公司" like "京东安联" and "保险特色" like "可办申根签"
    await overseasTraveltoHongKongMacauAndTaiwanPage.locator('span').filter({ hasText: /^京东安联$/ }).click();
    await overseasTraveltoHongKongMacauAndTaiwanPage.getByText('可办申根签', { exact: true }).click();
    await overseasTraveltoHongKongMacauAndTaiwanPage.getByText("价格").click();
    await overseasTraveltoHongKongMacauAndTaiwanPage.waitForLoadState();

    // Add various items to compare
    await overseasTraveltoHongKongMacauAndTaiwanPage.getByText("对比").nth(0).click();
    await overseasTraveltoHongKongMacauAndTaiwanPage.getByText("对比").nth(1).click();
    await overseasTraveltoHongKongMacauAndTaiwanPage.waitForTimeout(6000);
    await expect(overseasTraveltoHongKongMacauAndTaiwanPage.locator(".compare_wrap").last()).toBeVisible();

    // Click "开始对比" button
    await overseasTraveltoHongKongMacauAndTaiwanPage.getByText("开始对比").click();
    await overseasTraveltoHongKongMacauAndTaiwanPage.waitForLoadState();
    await expect(overseasTraveltoHongKongMacauAndTaiwanPage.getByText(" > 旅游保险对比页")).toBeVisible();

    // Select the detailed insurance
    await overseasTraveltoHongKongMacauAndTaiwanPage.waitForLoadState();
    const [detailedInsurancePage] = await Promise.all([
        overseasTraveltoHongKongMacauAndTaiwanPage.context().waitForEvent('page'),
        overseasTraveltoHongKongMacauAndTaiwanPage.locator(".bug-button").nth(1).click()
    ]);
    await detailedInsurancePage.waitForLoadState();
    await detailedInsurancePage.getByText("知道了").click();
    await detailedInsurancePage.getByRole("link", {name:"隐藏对比栏"}).click();
    await expect(overseasTraveltoHongKongMacauAndTaiwanPage.locator(".compare_wrap").last()).toBeHidden();

    //Select start time and end time
    await detailedInsurancePage.locator('#js_goStartTime').click()
    await detailedInsurancePage.locator('div.calendar_content div.calendar_month:nth-child(1) dl.calendar_day dd a:nth-child(33)').click()
    await detailedInsurancePage.locator('#js_goEndTime').click()
    await detailedInsurancePage.locator('div.calendar_content div.calendar_month:nth-child(2) dl.calendar_day dd a:nth-child(23)').click()

    // Click "购买" button
    await detailedInsurancePage.getByRole('link', { name: '购买' }).click();
    await detailedInsurancePage.waitForLoadState();
    await expect(detailedInsurancePage.getByRole("heading")).toContainText("京东安联");

    // Close browsers
    await browser.close();
});