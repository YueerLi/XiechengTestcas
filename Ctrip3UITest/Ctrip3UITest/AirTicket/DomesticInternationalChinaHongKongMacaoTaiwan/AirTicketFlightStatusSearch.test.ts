import {test,expect,chromium} from '@playwright/test';

//@summary
// Search flight number
// 1.Click airticket
// 2.Click flight Status
// 3.Enter flight message
// 4.Search
// 5.Assert the flight MU9718 is visible

// Search take-ff and landing site
// 1.Click take-ff and landing site
// 2.Enter city
// 3.Search
// 4.Asserts that the searched city name contains the entered city name
test ('FlightStatusSearchTest - by Ele', async ({})=> {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');

    //Search flight number
    //Click airticket
    await page.getByLabel('机票').click();
    //Click flight Status
    await page.getByRole('link',{name:'航班动态'}).first().click();
    //Click search flight number
    await page.locator('.search-tab-item.search-tab-item--active').click();
    //Enter flight message
    await page.getByPlaceholder('请填写航班号，如MU1234').click()
    await page.getByPlaceholder('请填写航班号，如MU1234').fill('MU9718')
    //Click search
    await page.locator('.search-button').first().click()
    //Assert the flight MU9718 is visible
    await expect(page.getByText('MU9718')).toBeVisible();

    //Search take-ff and landing site
    //Click airticket
    await page.getByLabel('机票').click();
    //Click flight Status
    await page.getByRole('link',{name:'航班动态'}).first().click();
    //Search take-ff and landing site
    await page.locator('.search-tab-item__icon').nth(1).click();
    //Enter set off city
    await page.getByPlaceholder('请填写出发城市或机场').click();
    await page.getByPlaceholder('请填写出发城市或机场').fill('上海')
    await page.locator('.city-info').click();
    //Enter arrive city
    await page.getByPlaceholder('请填写到达城市或机场').click();
    await page.getByPlaceholder('请填写到达城市或机场').fill('大理')
    await page.locator('.city-info').click();
    //Click search
    await page.locator('.search-button').first().click()
    //Assert city name search include Shanghai-Dali
    await expect(page.locator('.search-history-container')).toContainText('上海-大理')

    //Close page
    await page.close(); 
});