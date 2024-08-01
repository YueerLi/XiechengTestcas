import {test,expect,chromium} from '@playwright/test';
 
//@summary
// Domestic Hotel Explore Departures
// 1.Select More Destinations
// 2.Select '周末省心游'
// 3.Select round-trip
// 4.Select departure time
// 5.Select Date Ticket
// 6.Select Round Trip
test ('DomesticHotelExploreDepartures - by summer', async ({})=> {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByRole('button',{name:'酒店'}).click();
    await page.getByRole('link',{name:'更多目的地'}).click();
 
    //Select '周末省心游'
    await page.getByText('周末省心游', {exact : true}).first().click();
 
    //Select round-trip
    await page
        .locator('span')
        .filter({ hasText: '往返' })
        .first()
        .click();
 
    //Select departure time
    await page.getByText('周几出发').click();
    await page.locator('.f_checkbox_children').nth(3).click();
    await page.locator('.fs_button_bd.primary').click();
 
    //Select More Flight
    await page.locator('.flight_item_title_see_more').first().click();
 
    //Select Date Ticket
    const page1Promise = page.waitForEvent('popup');
    await page.locator('.flight_item_price_item.city_date_list_item_bd').first().click()
    const page1 = await page1Promise;
 
 
    //Select Round Trip
    await expect(page1.locator('.flight-action').first()).toBeVisible();
    await page1.locator('.flight-action').first().click()
    await page1.getByRole('button',{name:'订票'}).first().click();
    await page1.getByRole('button',{name:'预订'}).first().click();
 
    await page.close();  
});