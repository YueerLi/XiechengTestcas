import {test,expect,chromium} from '@playwright/test';

//@summary
//1.Click airticket
//2.Click Cheap Flight
//3.Click set off city '北京'
//4.Direct flights only
//5.More Flight
//6.Select ticket prices
//7.Assert that the lowest fare of the day is visible
test('CheapFlightSearchTest - by Ele', async ({}) => {
    test.setTimeout(60000);
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');

    //Click airticket
    await page.getByRole('button',{name:'机票'}).click()

    //Click Cheap Flight
    await page.getByRole('link',{name:'特价机票'}).first().click()

    //Click set off city '北京'
    await page.getByTestId('cityLabel_delete_0').click()
    await page.locator('span').filter({ hasText: '从哪出发,请选择出发地' }).click()
    await page.locator('.CitySwitch-right-wrap__bot-item ').first().click()

    //Direct flights only
    await page.locator('.f_checkbox_icon.flightOnlineFuzzySearch-WebCheckboxUnsel').click()

    //More Flight
    await page.locator('.flight_item_title_see_more').first().click()
    const page1Promise = page.waitForEvent('popup');

    //Select ticket prices
    await page.locator('.flight_item_depart_date').first().click()

    //Assert that the lowest fare of the day is visible
    const page1 = await page1Promise;
    await expect(page1.getByText('低价优先',{exact : true})).toBeVisible()

    //Close page
    await page.close(); 
});