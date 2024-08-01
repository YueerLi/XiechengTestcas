import { test , expect, chromium} from '@playwright/test';
// Open "Destination" page under the "Tour" menu, Popular And Abroad should be displayed
// Go to '四川'
//Select '玲珑沃野' option
//Select the first item of '美在四川'
//Expect the title
// Close browsers
test('DestinationPopularAndAbroad - From Yueer', async ({}) => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');

    // Open "Destination" page under the "Tour" menu, Popular And Abroad should be displayed
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '目的地', exact: true })).toBeVisible();
    await page.getByRole('link', {name:"目的地", exact: true}).click();
    await expect(page.locator(".search-ipt")).toBeVisible();
    await expect(page.locator("#mkt_act_dst_0")).toBeVisible();
    await expect(page.locator("#mkt_act_dst_1")).toBeVisible();

    // Go to '四川'
    await page.locator("#mkt_act_dst_0").click();
    await expect(page.locator('.search-cnts .list a>div').nth(0)).toContainText('四川');
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText('四川', {exact: true}).first().click()
    ]);
    await newPage.waitForLoadState();
    //Select '玲珑沃野' option
    await newPage.locator('.wzbbli2').nth(4).click();
    const [newPage1] = await Promise.all([
        newPage.context().waitForEvent('page'),
        //Select the first item of '美在四川'
        newPage.locator(".mytabgg  .boxmkli a").nth(0).click()
    ]);
    await newPage1.waitForLoadState();
    //Expect the title
    await expect(newPage1.locator("h1")).toContainText("成都武侯祠旅拍【精致摄影旅行跟拍亲子写真情侣闺蜜个人全家福】");

    // Close browsers
    await browser.close();
});