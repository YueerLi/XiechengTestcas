import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Seasonal recommendation -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Before each test, Click 'Online seat selection'.
        await page.goto('https://vacations.ctrip.com/youxue');
      });
    
      // @summary
      // Seasonal recommendation title
      // 1.Locate the title and store the title to a variable. 
      // 2.Click the link. 
      // 3.Check the title of the new page's content meet the origin page.
      // 4.Create a loop to perform that. 
      test('Seasonal recommendation title -by Ryan', async ({ page }) => {
        // Get all information of seasonal recommandation.
        const contentHtml = await page.locator('.recommend').locator('li');
        let title; // used to store titles

        // Verify that all titles in the origin page meet the content of opened pages. 
        for (let i = 0; i < 7; i++){
          //locate the location of each title and get the title.
          let tempHtml = await contentHtml.nth(i).locator('a');
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
 
  




































