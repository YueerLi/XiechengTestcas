import { test , expect, chromium} from '@playwright/test';
// Summer Camp(07/26/2024):
// 1. Login CTrip with any account, Navigate bar should be displayed
// 2. Open "EducationTour" page under the "Tour" menu
// 3. Select "山西"
// 4. Click any group
// 5. Enter detailed information
// 6. Close browsers
test('EducationalTourSummerCamp - From Bunny', async ({}) => {
    // Detailed information
    const cityName = "山西";
    const numOfPeople = "3";
    const numOfChildren = "3";

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
    await expect(page.getByRole('heading', { name: '夏令营' })).toBeVisible();

    // Select "山西"
    await page.locator('span').filter({ hasText: '山西' }).click();

    // Click any group
    const [groupPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator(".iPic").nth(17).click()
    ]);
    await groupPage.waitForLoadState();
    await expect(groupPage.getByRole("heading")).toContainText(cityName);

    // Enter detailed information
    await groupPage.getByTestId("available-date-0").click();
    await groupPage.getByLabel("请选择成人数").fill(numOfPeople);
    await groupPage.getByLabel("请选择儿童数").fill(numOfChildren);
    await expect(groupPage.getByText("立即预订")).toBeVisible();

    // Close browsers
    await browser.close();
});