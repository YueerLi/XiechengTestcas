import { test , expect, chromium} from '@playwright/test';
// Set the size of the window
// Click "个人财产" button
// Select "更多产品"
// Select "华泰财险", "房屋家财" and "价格从低到高"
//Select the first insurance and open the second newpage
//Enter Login website and close newPage1 page
//Close browsers
test('InsurancePersonalProperty - From Yueer', async ({}) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '保险', exact: true })).toBeVisible();
    await page.getByRole('link', {name:"保险", exact: true}).click();
    await page.getByRole('link', { name: '携程旅行网', exact: true }).waitFor();
    await expect(page.getByText("个人财产")).toBeVisible();

    // Click "个人财产" button
    await page.waitForLoadState();
    await page.getByText("个人财产").click();
    
    // Select "更多产品"
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText(" 更多产品").nth(2).click()
    ]);
    await newPage.waitForLoadState();
    
    // Select "华泰财险", "房屋家财" and "价格从低到高"
    await newPage.getByText("华泰财险").click();
    await newPage.getByText("房屋家财").click();
    await newPage.getByText("价格").click();
    await newPage.getByText("价格从低到高").click();


    //Select the first insurance and open the second newpage
    const [newPage1] = await Promise.all([
        newPage.context().waitForEvent('page'),
        newPage.locator('.list-con-item .right-con>span').first().click()
    ]);
    await newPage1.waitForLoadState();
    //Enter Login website and close newPage1 page
    await expect(newPage1.locator('h2')).toContainText('账号密码登录');
    await newPage1.close();

    // Close browsers
    await browser.close();
});