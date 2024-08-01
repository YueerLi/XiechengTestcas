import {test,expect,chromium} from '@playwright/test';
//@summary
// Overseas Hotels Search（海外酒店搜索）
// 1.Get the time of today and tomorrow
// 2.Enter the destination and time, number of people to search for hotels
// 3.Select check-in conditions
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
     //Search Overseas Hotels
     await page.getByRole('link',{name:'海外酒店'}).first().click();
     await page.getByLabel('目的地/酒店名称').first().click();;
     await page.locator('#hotels-destination').fill('东京');
     await page.locator('.focus-input.show-hightlight.in-time').click();
     await page.locator('li').filter({ hasText: new RegExp(`^${currentDay}$`) }).first().click();
     await page.locator('.focus-input.show-hightlight.out-time').click()
     await page.locator('li').filter({ hasText: new RegExp(`^${tomorrowDay}$`) }).first().click();
     await page.locator('.u-icon.u-icon-ic_plus.btn').first().click();
     await page.getByRole('button',{name:'按钮：查询酒店'}).first().click();
     //Select check-in conditions
     await page
             .getByRole('listitem')
             .filter({hasText:'五钻/豪华'})
             .click();
     await page
             .getByRole('listitem')
             .filter({hasText:'支付方式'})
             .click();
     await page.getByLabel('到店付款').click(); 
     await page
             .getByRole('listitem')
             .filter({hasText:'特色主题'})
             .click();  
     await page.getByLabel('美食酒店').click();    
     await page.close();    
 });