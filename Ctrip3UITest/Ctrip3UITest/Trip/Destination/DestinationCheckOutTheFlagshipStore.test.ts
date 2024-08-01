import { test , expect, chromium} from '@playwright/test';
// Open browser and login a account, Navigate bar should be displayed
// Open a new page and jump to the "安徽文旅旗舰店"
//Look through "皖美印象、皖美热榜、皖美精选、皖美攻略"
//Select "欢乐皖江"
//Click "欢乐芜湖" and jump to new page
//Expect the title
//Select "红色大别山"
//Click "重温革命，行摄大别山" and jump to new page
//Expect the title
//Close browsers
test('DestinationCheckOutTheFlagshipStore - From Yueer', async ({}) => {
    // Open browser and login a account, Navigate bar should be displayed
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');
    await expect(page.locator('#leftSideNavLayer')).toBeVisible();
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '目的地', exact: true })).toBeVisible();
    await page.getByRole('link', {name:"目的地", exact: true}).click();
    await expect(page.getByText("安徽文旅旗舰店")).toBeVisible();

    // Open a new page and jump to the "安徽文旅旗舰店"
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText("安徽文旅旗舰店").click()
    ]);
    await newPage.waitForLoadState();
    
    //Look through "皖美印象、皖美热榜、皖美精选、皖美攻略"
    await newPage.mouse.wheel(0,3000);
    await newPage.locator(".bantab a").nth(0).click();
    await newPage.locator('.dise video').first().click();
    await newPage.locator(".bantab a").nth(1).click();
    await newPage.locator(".bantab a").nth(2).click();
    await newPage.locator(".bantab a").nth(3).click();

    //Select "欢乐皖江"
    await newPage.locator(".bantab a").nth(2).click();
    await newPage.locator(".dh li:nth-child(2) img").nth(0).click();
    await expect(newPage.locator(".dt2 h4").first()).toContainText('欢乐芜湖')
    const [newPage1] = await Promise.all([
        newPage.context().waitForEvent('page'),
        //Click "欢乐芜湖" and jump to new page
        newPage.locator(".dt2 a").nth(0).click()
    ]);
    await newPage1.waitForLoadState();
    //Expect the title
    await expect(newPage1.getByRole("heading", {name:"芜湖赭山风景区+芜湖方特旅游区2日跟团游"})).toBeVisible();

    //Select "红色大别山"
    await newPage.bringToFront();
    await newPage.locator(".dh li:nth-child(3) img").nth(0).click();
    await expect(newPage.locator(".dt3 h4").nth(3)).toContainText('重温革命，行摄大别山')
    const [newPage2] = await Promise.all([
        newPage.context().waitForEvent('page'),
        //Click "重温革命，行摄大别山" and jump to new page
        newPage.locator(".dt3 a").nth(3).click()
    ]);
    await newPage2.waitForLoadState();
    //Expect the title
    await expect(newPage1.getByRole("heading", {name:"芜湖赭山风景区+芜湖方特旅游区2日跟团游"})).toBeVisible();    

    // Close browsers
    await browser.close();
});