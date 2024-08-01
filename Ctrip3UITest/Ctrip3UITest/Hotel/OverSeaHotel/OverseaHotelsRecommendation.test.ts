import {test,expect,chromium} from '@playwright/test';

//@summary
// Overseas Hotel Recommention（海外酒店推荐）
// 1.Get the time of today and tomorrow
// 2.Choose Overseas Hotels
// 3.Choose a destination from the hotel recommendations
// 4.Choose a hotel
test ('OverseasHotelSearch - by summer', async ({})=> {
    // Get current date
    const currentDate: Date = new Date(); 
    const currentDay = currentDate.getDate();
    // Get tomorrow date
    const tomorrowDate: Date = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDay = tomorrowDate.getDate();
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByRole('button',{name:'酒店'}).click();
     //Set a timeout for waiting for a new page to pop up
     const popupTimeout = 3000;
     //Waiting for a possible pop-up page or performing an action on the current page after more than 3 seconds
     const page1Promise = page.waitForEvent('popup');
     const timeoutPromise = new Promise(resolve => setTimeout(resolve, popupTimeout)).then(() => null);
     const page1 = await Promise.race([page1Promise, timeoutPromise]);
     //Choose Overseas Hotels
     await page.getByRole('link',{name:'海外酒店'}).first().click();
     await page.getByRole('button',{name:'曼谷'}).click();
     await expect(page.locator('ul')).toContainText(['曼谷']);
     //Choose a hotel
     await page.locator('.hotel-info').nth(1).click();
     await expect(page.locator('h1')).toContainText(['曼谷']);
     await page.close();        
});