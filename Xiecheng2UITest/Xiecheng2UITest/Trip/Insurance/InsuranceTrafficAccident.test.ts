import { test , expect, chromium} from '@playwright/test';
// Traffic Accident Insurance in Insurance page(06/14/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "Insurance" page under the "Tour" menu, "保险" should be displayed
// 3. Click "交通意外" button
// 4. Select "更多产品"
// 5. Select "销量从高到低" button and select any product
// 6. Select "365天", "出发时间" and "出行人数"
// 7. Click "购买" button and select passenger information
// 8. Close browsers
test('InsuranceTrafficAccident - From Bunny', async ({}) => {
    // Passenger information
    const adultnumber = "2";
    const passenger1 = "高洁如";
    const passenger2 = "刘富旺";

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
    await expect(page.getByText("交通意外")).toBeVisible();

    // Click "交通意外" button
    await page.getByText("交通意外").click();
    
    // Select "更多产品"
    const [moreProductPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText("更多产品").nth(1).click()
    ]);
    await moreProductPage.waitForLoadState();
    
    // Select "销量从高到低" button and select any product
    await moreProductPage.getByText("销量从高到低").click();
    await moreProductPage.waitForLoadState();
    // await moreProductPage.waitForTimeout(3000);
    const [InsurancePage] = await Promise.all([
        moreProductPage.context().waitForEvent('page'),
        moreProductPage.getByText("查看详情").nth(0).click()
    ]);
    await InsurancePage.waitForLoadState();
    await expect(InsurancePage.getByRole("heading")).toContainText("险");

    // Select "365天", "出发时间" and "出行人数"
    await InsurancePage.getByText("知道了").click();
    await InsurancePage.getByText("365天").click();
    await InsurancePage.getByPlaceholder("请选择时间").click();
    await InsurancePage.locator('div.calendar_content div.calendar_month:nth-child(1) dl.calendar_day dd a:nth-child(33)').click();
    await InsurancePage.locator("#adultnum").fill(adultnumber);

    // Click "购买" button and select passenger information
    await InsurancePage.getByRole('link', { name: '购买' }).click();
    await InsurancePage.waitForLoadState();
    await InsurancePage.getByText(passenger1).click();
    await InsurancePage.getByText(passenger2).click();
    await expect(InsurancePage.locator(".content-names")).toContainText(passenger1 && passenger2);

    // Close browsers
    await browser.close();
});