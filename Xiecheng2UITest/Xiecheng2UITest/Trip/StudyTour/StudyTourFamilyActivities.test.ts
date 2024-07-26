import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('FamilyActivities -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://vacations.ctrip.com/youxue');
      });
    
      // @summary
      // Verify each information page meet the information we choosed.
      // 1.Locator all information of Family Activity clickable.
      // 2.Create a variable to store the title of the information.
      // 3.Click each information
      // 4.Verify the title in this page meet the title we choosed.
      // 5.Create a loop todo this.
      test('Family Activity clickable  -by Ryan', async ({ page }) => {
        //get all information of family activities
        let contentHtml = await page.locator('div.student.box_white').locator('.ulPicTxtB').locator('li');;
        let title; // used to store title of each information
        let tempHtml; //used to store each information's html

        for (let li of await contentHtml.all()){
            //get the title of this information
            tempHtml = await li.locator('a');
            await tempHtml.getAttribute('title').then((result) => {  
              if (result === null) {  
                console.log('Received null');  
              } else {
                title = result;
              }  
            });
  
            // open second pages and verify that the title is same.
            let page1Promise = page.waitForEvent('popup');
            await tempHtml.click();
            let pageTemp = await page1Promise;
            //expect
            await expect(pageTemp.locator('h1')).toContainText(title);
            pageTemp.close();
        }

      });
  });
 
  






















