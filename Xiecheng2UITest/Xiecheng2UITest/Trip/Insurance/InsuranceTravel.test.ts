import { test, expect } from '@playwright/test';
//import { getDateString,testData } from '../../dataAndFunctions';

/*
 * Test data
 */
export const testData={
  departure:'北京',
  destination:'上海',
  insurance:'平安产险',
}

/*
* This method is used to return the Date String of future based on the param.
* @param fromNowDays: How many days is it from today.
*/
export function getDateString(fromNowDays:number=0): String {
  let today = new Date();    
  // get the date of future based on fromNowDays
  let otherDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + fromNowDays);
  // get year,month,day
  let year = otherDate.getFullYear();  
  let month = String(otherDate.getMonth() + 1).padStart(2, '0');   
  let day = String(otherDate.getDate()).padStart(2, '0');   
  // merge to string.
  let formattedDate = `${year}-${month}-${day}`;  // format "2023-10-23"
  return formattedDate;
}

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Insurance Travel -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Go to the Insurance page.
        await page.goto('https://vacations.ctripins.com/ins?isctripins=true');
      });
    
      // @summary
      // Destination, travel time and people number.
      // 1.Test data
      // departure：北京; departuretime：tomrrow; endtime：tomorrow+1
      // 2.Expect result
      // 目的地：北京; 旅行时长：2天; 成人：2; 儿童：1
      test('Destination, travel time and people number  -by Ryan', async ({ page }) => {
        // Prepare date
        let dateTomorrow = getDateString(1);
        let dateAfterTomorrow = getDateString(2);
        // Meet the format of the page.
        dateTomorrow = dateTomorrow.substring(1);
        dateAfterTomorrow = dateAfterTomorrow.substring(1);
        // prepare departure
        const departure=testData.departure;

        // Choose departure
        await page.getByPlaceholder('城市/省份/国家/洲').click();
        await page.getByRole('link', { name: departure }).click();
        await page.getByPlaceholder('开始时间').click();
        // Choose date
        await page.locator(`[id="\\32 ${dateTomorrow}"]`).click();
        await page.locator(`[id="\\32 ${dateAfterTomorrow}"]`).click();
        // Choose Adult number and child number
        await page.locator('#adultnum').click();
        await page.getByRole('link', { name: '2', exact: true }).click();
        await page.locator('#childrennum').click();
        await page.getByRole('link', { name: '1', exact: true }).click();
        // Convert to second page.
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: '快速查询' }).click();
        const page1 = await page1Promise;
        
        // Expect
        await expect(page1.locator('#root')).toContainText(`目的地${departure}`);
        await expect(page1.locator('#root')).toContainText(`旅行时长2天`);
        await expect(page1.locator('#root')).toContainText('成人2');
        await expect(page1.locator('#root')).toContainText('儿童1');
      });

      // @summary
      // Insurance company
      // 1.Choose 'Beijing'
      // 2.Choose company as '平安保险'
      // 3.Check all Insurance data must be '平安携程'. 
      test('Insurance company -by Ryan', async ({ page }) => {
        //Choose Beijing
        await page.getByPlaceholder('城市/省份/国家/洲').click();
        await page.getByRole('link', { name: `${testData.departure}` }).click();

        //Choose '平安产险'
        await page.locator('#companysort').click();
        await page.getByRole('link', { name: `${testData.insurance}` }).click();
        await page.getByRole('link', { name: '确定' }).click();
        //second page
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: '快速查询' }).click();
        const page1 = await page1Promise;

        //All four insurance datas must contain '平安保险'
        for (let i = 0; i < 4; i++){
          //Choose each data of insurance name.
          await expect(page1.locator('tbody').locator('tr').nth(0).locator('td').nth(i)).toContainText('平安携程');
        }
      });

      // @summary
      // Insurance characteristics
      // 1.Choose 'Beijing'
      // 2.Choose characteristic as '亲子游'
      // 3.Check all Insurance data must contain '亲子游'. 
      test('Insurance character -by Ryan', async ({ page }) => {
        //Choose Beijing
        await page.getByPlaceholder('城市/省份/国家/洲').click();
        await page.getByRole('link', { name: `${testData.departure}` }).click();

        //Choose '亲子游'
        await page.locator('#featuresort').click();
        await page.getByRole('link', { name: '亲子游' }).click();
        await page.getByRole('link', { name: '确定' }).click();
        //second page
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: '快速查询' }).click();
        const page1 = await page1Promise;

        //Verify all information contains '亲子游'.
        const contentHtml= await page1.locator('tbody').locator('tr').nth(0).locator('td');
        for (let li of await contentHtml.all()){
          //Choose each data of insurance name.
          await expect(li).toContainText('亲子游');
        }
      });

  });
 
  




































