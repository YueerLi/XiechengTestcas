import { test , expect, chromium} from '@playwright/test';
// Selected Travel Diaries(07/26/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "EducationTour" page under the "Tour" menu
// 3. Click any group
// 4. Select "欧洲" and "莫斯科"
// 5. Click "美食" tab
// 6. Select any delicacies
// 7. Close browsers
test('EducationalTourSelectedTravelDiaries - From Bunny', async ({}) => {
    // Detailed information
    const cityName = "莫斯科";

    // Open browser and login a account, Navigate bar should be displayed
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        // Set the size of the window
        viewport: { width: 1600, height: 900 }  
    });
    const page = await browser.newPage();
    await page.goto('https://ctrip.com');
    await expect(page.locator('#leftSideNavLayer')).toBeVisible();

    // Open "EducationTour" page under the "Tour" menu
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await expect(page.getByRole('link', {name:"游学"})).toBeVisible();
    await page.getByRole('link', {name:"游学"}).click();
    await expect(page.getByRole('heading', { name: '精选游记' })).toBeVisible();

    // Click any group
    const [groupPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator(".picbox").nth(1).click()
    ]);
    await groupPage.waitForLoadState();
    await expect(groupPage.getByRole('link', { name: '游记', exact: true })).toBeVisible();

    // Select "欧洲" and "莫斯科"
    await groupPage.locator('#desContainer').getByText('欧洲').hover();
    await groupPage.getByRole('link', { name: '莫斯科', exact: true }).waitFor();
    await groupPage.getByRole('link', { name: '莫斯科', exact: true }).click();
    await expect(groupPage.getByRole('heading', { name: '莫斯科', exact: true })).toContainText(cityName);

    // Click "美食" tab
    await groupPage.getByRole('link', { name: '美食' }).first().click();
    await expect(groupPage.getByRole("heading",{name:"必吃美食", exact: true })).toBeVisible();

    // Select any delicacies
    const [delicaciesPage] = await Promise.all([
        groupPage.context().waitForEvent('page'),
        groupPage.locator(".fs_card ul li:first-child").click()
    ]);
    await delicaciesPage.waitForLoadState();
    await expect(delicaciesPage.getByRole('heading', { name: '莫斯科烤鱼' })).toBeVisible();

    // Close browsers
    await browser.close();
});