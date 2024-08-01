import { test , expect, chromium} from '@playwright/test';

// Unlogin any account.
// Open "Insurance" page under the "Tour" menu, "保险" should be displayed
// Click "交通意外" button
// Select "更多产品"
// Click "平安产险" to jump newpage
// Select the first insurance and open the second newpage
// Enter Login website
// Return to the Previous Page. Click '清空条件' and select the condition again
test('InsuranceTrafficAccident - From Yueer', async ({}) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }  // Set the size of the window
      });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link', { name: '保险', exact: true }).click();
    await expect(page.getByText("交通意外")).toBeVisible();
    await page.getByText("交通意外").click();
    
    // Select "更多产品"
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText("交通综合").click()
    ]);
    await newPage.waitForLoadState();
    
    //Click "平安产险" to jump newpage
    await newPage.getByText("平安产险").click();
    await expect(newPage.locator('.list-con-item .right-con>span').first()).toContainText('平安携程互联网交通工具意外保险 尊贵款');
    await newPage.waitForLoadState();

    //Select the first insurance and open the second newpage
    const [newPage1] = await Promise.all([
        newPage.context().waitForEvent('page'),
        newPage.locator('.list-con-item .right-con>span').first().click()
    ]);
    await newPage1.waitForLoadState();
    //Enter Login website and close it
    await expect(newPage1.locator('h2')).toContainText('账号密码登录');
    await newPage1.close();

    //Return to the Previous Page. Click '清空条件' and select the condition again
    await newPage.bringToFront();
    await newPage.getByText('清空条件').click();
    await newPage.getByText('当日生效').click();
    await newPage.getByText('境内旅行',{ exact: true}).click();
    await newPage.getByText('销量从高到低').click();
    //Verify that the first insurance name is...
    await expect(newPage.locator('.list-con-item .right-con>span').first()).toContainText('平安携程互联网境内短期游保险 经典型');

    // Close browsers
    await browser.close();
});