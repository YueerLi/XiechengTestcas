import { test , expect, chromium} from '@playwright/test';
// @summary
// DomesticInternationalFlightSearch
// 1.Navigate to foreign hotel.
// 2.Navigate to hotel recommendation.
test('DomesticInternationalFlightSearch -- by henry', async ({}) => {
    const flightNumber = 'MU3827';
    const startCity = '上海';
    const arriveCity = '杭州';
    const browser = await chromium.launchPersistentContext('D:\\cookie', {
        viewport: { width: 1920, height: 1080 }
    });
    const page = await browser.newPage();

    //Navigate to flight ticket.
    await page.goto('https://www.ctrip.com/');
    await page.locator('.pc_home-tabbtnIcon').click();
    await page.getByLabel('机票 按回车键打开菜单').click();
    await expect(page.getByRole('link', { name: '航班动态', exact: true })).toBeVisible();
    await page.getByRole('link', { name: '航班动态', exact: true }).click();
    await expect(page.getByText('*国际航班请按照出发城市当地起飞时间查询')).toBeVisible();

    //Navigate to flight search and set details.
    await page.getByPlaceholder('请填写航班号，如MU1234').press('CapsLock');
    await page.getByPlaceholder('请填写航班号，如MU1234').fill(flightNumber);
    await page.getByLabel('出发日期今天').click();
    await page.getByText('3', { exact: true }).first().click();
    await page.getByText('搜索', { exact: true }).click();
    await page.getByText('搜起降地').click();
    await page.getByPlaceholder('请填写出发城市或机场').fill(startCity);
    await page.getByPlaceholder('请填写到达城市或机场').fill(arriveCity);
    await page.getByText('搜索', { exact: true }).click();
    await page.close();
});