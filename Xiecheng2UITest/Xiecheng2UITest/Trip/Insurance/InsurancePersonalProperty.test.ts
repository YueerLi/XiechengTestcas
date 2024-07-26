import { test , expect, chromium} from '@playwright/test';
// Personal Property Insurance in Insurance page(06/14/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "Insurance" page under the "Tour" menu, "保险" should be displayed
// 3. Click "个人财产" button
// 4. Select the recommended insurance
// 5. Select "保障计划", "旅行时间" and "出行人数"
// 6. Click "购买" button and select passenger information
// 7. Enter Detailed Information and "投保前请阅读" page is visible
// 8. Close browsers
test('InsurancePersonalProperty - From Bunny', async ({}) => {
    // Detailed Information
    const adultnumber = "1";
    const passenger = "薛博文";
    const address = "上海市闵行区吴泾镇";

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
    await expect(page.getByText("个人财产")).toBeVisible();

    // Click "个人财产" button
    await page.waitForLoadState();
    await page.getByText("个人财产").click();
    
    // Select the recommended insurance
    const [recommendedProductPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator(".left-pic").last().click()
    ]);
    await recommendedProductPage.waitForLoadState();
    await expect(recommendedProductPage.getByRole("heading")).toContainText("险");
    
    // Select "保障计划", "旅行时间" and "出行人数"
    await recommendedProductPage.getByText("知道了").click();
    await recommendedProductPage.getByText("500万版").click();
    await recommendedProductPage.getByPlaceholder("请选择时间").click();
    await recommendedProductPage.locator('div.calendar_content div.calendar_month:nth-child(1) dl.calendar_day dd a:nth-child(33)').click();
    await recommendedProductPage.locator("#adultnum").fill(adultnumber);
    await expect(recommendedProductPage.locator(".detail_reco").last()).toContainText("500万");

    // Click "购买" button and select passenger information
    await recommendedProductPage.getByRole('link', { name: '购买' }).click();
    await recommendedProductPage.waitForLoadState();
    await recommendedProductPage.getByText(passenger).click();
    await expect(recommendedProductPage.locator(".content-names")).toContainText(passenger);

    // Enter Detailed Information and "投保前请阅读" page is visible
    await recommendedProductPage.getByPlaceholder("请输入详细地址，如海南省三亚市XX号汇丰国际XXX室").fill(address);
    await recommendedProductPage.getByText("提交订单  去支付").click();
    await expect(recommendedProductPage.getByText("投保前请阅读")).toBeVisible();

    // Close browsers
    await browser.close();
});