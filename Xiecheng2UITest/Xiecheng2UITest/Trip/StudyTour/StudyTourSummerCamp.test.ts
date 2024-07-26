import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Summer Camp -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://vacations.ctrip.com/youxue');
      });

      // @summary
      // Summer Camp tab
      // The information after clicking '更多' must be same as the tab we choosed.
      // 1.get the text of second tab.
      // 2.Click second tab.
      // 3.Click '更多'.
      // 4.New page's input text shold contains the same text of the second tab.
      test('Summer Camp tab -by Ryan', async ({ page }) => {
        // Get the second tab.
        const tabHtml = await page.locator('div.adult.box_white').locator('.ulTags').locator('span').nth(1);
        let tabtext; // used to store tab's text.
        // Get the text of the second tab.
        await tabHtml.textContent().then((result) => {  
            if (result === null) {  
              console.log('Received null');  
            } else {
              tabtext = result;
            }  
          });
        
        //click the second tab
        await tabHtml.click();
        //click more
        let page1Promise = page.waitForEvent('popup');
        await page.locator('div.adult.box_white').getByText('更多').click();
        let page1 = await page1Promise;
        //expect the tab is same as the tab we clicked.
        await expect(page1.locator('.search_txt')).toHaveValue(tabtext);

      });
    
      // @summary
      // Verify each information page meet the information we choosed.
      // 1.Locator all information of 'Summer campus'.
      // 2.Create a variable to store the title of the information.
      // 3.Click each information
      // 4.Verify the title in this page meet the title we choosed.
      // 5.Create a loop todo this.
      test('Summer camp clickable  -by Ryan', async ({ page }) => {
        //get all information of 'Summer campus'.
        let contentHtml = await page.locator('div.adult.box_white').locator('.ulPicTxtB').locator('li');
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
 
  






















