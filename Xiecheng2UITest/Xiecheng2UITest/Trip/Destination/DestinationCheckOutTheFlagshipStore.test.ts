import { test , expect, chromium} from '@playwright/test';
// Ctrip Destination Check out the flagship store(06/28/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "Destination" page under the "Tour" menu, Check out the flagship store button should be displayed
// 3. Open a new page 
// 4. Click "欧洲" and check the "西班牙加泰罗尼亚旅游体验馆"
// 5. Open "西班牙加泰罗尼亚旅游体验馆"
// 6. Select any route
// 7. Ask a question
// 8. Enter question
// 9. Close browsers
test('DestinationCheckOutTheFlagshipStore - From Bunny', async ({}) => {
    // Question information
    const questionTitle = "巴特罗之家好玩吗？";
    const questionDescription = "打算请一周的假去巴塞罗那，想问问大家巴特罗之家适合玩几天？";
    const questionTag = "巴塞罗那";

    // Open browser and login a account, Navigate bar should be displayed
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');
    await expect(page.locator('#leftSideNavLayer')).toBeVisible();

    // Open "Destination" page under the "Tour" menu, Check out the flagship store button should be displayed
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '目的地', exact: true })).toBeVisible();
    await page.getByRole('link', {name:"目的地", exact: true}).click();
    await expect(page.getByText("查看更多旗舰店")).toBeVisible();

    // Open a new page 
    const [checkOutTheFlagshipStorePage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText("查看更多旗舰店").click()
    ]);
    await checkOutTheFlagshipStorePage.waitForLoadState();
    await expect(checkOutTheFlagshipStorePage.getByRole("heading",{name:"目的地官方旗舰店"})).toBeVisible();
    await expect(checkOutTheFlagshipStorePage.getByRole("heading",{name:"全球300+旗舰店品质保障"})).toBeVisible();

    // Click "欧洲" and check the "西班牙加泰罗尼亚旅游体验馆"
    await checkOutTheFlagshipStorePage.locator("#mkt_act_dst_dsttype_153").click();
    await expect(checkOutTheFlagshipStorePage.getByText("西班牙加泰罗尼亚旅游体验馆")).toBeVisible();

    // Open "西班牙加泰罗尼亚旅游体验馆"
    const [SpainPage] = await Promise.all([
        checkOutTheFlagshipStorePage.context().waitForEvent('page'),
        checkOutTheFlagshipStorePage.getByText("西班牙加泰罗尼亚旅游体验馆").click()
    ]);
    await SpainPage.waitForLoadState();
    await expect(SpainPage.getByRole("heading", {name:"西班牙加泰罗尼亚旅游体验馆"})).toBeVisible();

    // Select any route
    await SpainPage.locator("#mkt_act_pc_em43_smalljx2").hover();
    const [SpainRoutePage] = await Promise.all([
        SpainPage.context().waitForEvent('page'),
        SpainPage.locator("#mkt_act_pc_em43_jx2").click()
    ]);
    await SpainRoutePage.waitForLoadState();
    await expect(SpainRoutePage.getByRole("heading", {name:"巴特罗之家"})).toBeVisible();
    
    // Ask a question
    const [AskQuestion] = await Promise.all([
        SpainRoutePage.context().waitForEvent('page'),
        SpainRoutePage.getByText("我要提问").click()
    ]);
    await AskQuestion.waitForLoadState();

    // Enter question
    await AskQuestion.locator("#asktitle_input").fill(questionTitle);
    await AskQuestion.locator("#askinfo_area").fill(questionDescription);
    await AskQuestion.getByText("发布问题").click();
    await expect(AskQuestion.getByText("问题必须关联至少一个目的地/景点标签")).toBeVisible();

    // Close browsers
    await browser.close();
});