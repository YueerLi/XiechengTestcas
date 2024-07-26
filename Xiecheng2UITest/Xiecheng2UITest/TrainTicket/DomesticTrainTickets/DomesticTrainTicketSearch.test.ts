//Done
import { test , expect, chromium} from '@playwright/test';

/**
 * @summary
 * 1.Navigate to Ctrip homepage
 * 2.Click 火车票 option
 * 3.单程搜索
 * 4.往返搜索
 * 5.中转搜索
 */

test('DomesticTrainTicketSearch - by Su', async ({}) => {
    await test.setTimeout(50000);
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // set window to larger size 
        viewport: { width: 1920, height: 1080 }  
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');  
    await expect(page.getByLabel('火车票 按回车键打开菜单')).toBeVisible();

    // click “火车票” option 
    await page.getByLabel('火车票 按回车键打开菜单').click();
    await expect(page.getByText("单程")).toBeVisible();

    // search for 单程
    await page.locator('xpath=//*[@id="app"]/div[2]/div[1]/div[2]/button').click();
    await expect(page.getByText("价格排序")).toBeVisible();
    await page.waitForLoadState("networkidle");

    // go back to the previous page
    await page.goBack();
    
    // select 往返 option
    await page.locator('xpath=//*[@id="app"]/div[2]/div[1]/div[1]/div/ul/li[2]/button').click();
    await expect(page.getByText("返回日期")).toBeVisible();

    // search for 往返
    await page.locator('xpath=//*[@id="app"]/div[2]/div[1]/div[2]/button').click();
    await expect(page.getByText("往返购票")).toBeVisible();
    await page.waitForLoadState("networkidle");

    // go back to the previous page
    await page.goBack();

    // select 中转 option
    await page.locator('xpath=//*[@id="app"]/div[2]/div[1]/div[1]/div/ul/li[3]/button').click();
    await expect(page.getByText("指定中转城市")).toBeVisible();

    // search for 中转
    await page.locator('xpath=//*[@id="app"]/div[2]/div[1]/div[2]/button').click();
    await expect(page.getByText("中转方案推荐")).toBeVisible();
    await page.waitForLoadState("networkidle");

    // close the browser
    await browser.close();
});