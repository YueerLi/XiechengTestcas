import {test,expect,chromium} from '@playwright/test';

//@summary
// Domestic Hotel Recommendation
// 1.Select Hotel
// 2.Select Domestic Hotel
// 3.Select destination 
// 4.Asserts that the hotel name contains the selected destination name
test ('DomesticHotelRecommendation - by Ele', async ({})=> {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByRole('button',{name:'酒店'}).click();
    await page.getByRole('link',{name:'国内酒店'}).click(); 

    //Select destination 
    await page.getByRole('button',{name:'上海'}).click();

    //Asserts that the hotel name contains the selected destination name
    await expect(page.locator('h3')).toContainText(['上海']);
    await page.close();   
});