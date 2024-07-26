import {test,expect,chromium} from '@playwright/test';

//@summary
//AirTicket Special Priced 
//1.Click airticket
//2.Click Special Priced ticket
//3.Click '海边浪一浪'
//4.Direct flights only
//5.More Flight
//6.Select ticket prices
//7.Assert that the lowest fare of the day is visible
test('AirTicketSpecialPricedTest - by Ying', async ({}) => {
    test.setTimeout(60000);
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');

    //Click airticket
    await page.getByRole('button',{name:'机票 按回车键打开菜单'}).click()

    //Click Special Priced ticket
    await page.getByRole('link',{name:'特价机票'}).first().click()

    //Click '海边浪一浪'
    await page.getByText('海边浪一浪',{exact : true}).first().click()

    //Direct flights only
    await page.locator('.f_checkbox_icon.flightOnlineFuzzySearch-WebCheckboxUnsel').click()

    //More Flight
    await page.locator('.flight_item_title_see_more').first().click()
    const page1Promise = page.waitForEvent('popup');

    //Select ticket prices
    await page.locator('.flight_item_depart_date').first().click()

    //Assert that the lowest fare of the day is visible
    const page1 = await page1Promise;
    await expect(page1.getByText('当日低价',{exact : true})).toBeVisible()

    //Close page
    await page.close(); 
});