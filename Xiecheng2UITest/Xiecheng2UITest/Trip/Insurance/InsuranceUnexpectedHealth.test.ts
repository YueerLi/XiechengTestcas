import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Unexpected Health -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Before each test, Click '意外健康'.
        await page.goto('https://vacations.ctripins.com/ins?isctripins=true');
        await page.locator('div').filter({ hasText: /^意外健康$/ }).click();
      });
    
      // @summary
      // 'Unexpected Health button can be usable.
      // 1.Click'意外保障' button.
      // 2.Verify '意外保障' was choosed in the new page.
      // 3.Verify '医疗报销' and '更多产品' buttons.
      test('Unexpected Health Button  -by Ryan', async ({ page }) => {
        // Veryify '意外保障' can be useable.
        let pagePromise = page.waitForEvent('popup');
        await page.getByText('意外保障', { exact: true }).click();
        let pageTemp = await pagePromise;
        await expect(pageTemp.locator('#root')).toContainText('意外保障');
        await pageTemp.close();

        // Verify '医疗报销' can be useable.
        pagePromise = page.waitForEvent('popup');
        await page.getByText('医疗报销').click();
        pageTemp = await pagePromise;
        await expect(pageTemp.locator('#root')).toContainText('医疗报销');
        await pageTemp.close();

        // Verify '更多产品' can be useable.
        pagePromise = page.waitForEvent('popup');
        await page.getByText('更多产品').first().click();
        pageTemp = await pagePromise;
        await expect(pageTemp.locator('#root')).toContainText('意外健康');
        await pageTemp.close();
      });

      // @summary
      // 'Unexpected Health Recommandation.
      // 1.Creat a variable to store the title of the insurance
      // 2.remove the characters after 'space'.
      // 3.click the insurance.
      // 4.Verify that the insurance title is same to the insurance we clicked.
      test('Unexpected Health Recommandation  -by Ryan', async ({ page }) => {
        let title;// used to store title
        const contentHtml=await page.locator('div.pro-tit.line2').nth(0);// title's html element

        //store the title in title variable
        await contentHtml.textContent().then((result) => {  
            if (result === null) {  
              console.log('Received null');  
            } else {
              title = result;
            }  
          });
        //processing characters
        const spaceIndex =await title.indexOf(' ');// find the position of firsp 'space'
        // if we find 'spce', remove all characters behind 'space'.
        if (spaceIndex !== -1) {  
            title= await title.slice(0, spaceIndex);  
        }  

        //click insurance.
        let pagePromise = page.waitForEvent('popup');
        await contentHtml.click();
        let pageTemp = await pagePromise;

        //expect the title meets the information we clicked.
        await pageTemp.getByText('知道了').click();
        await expect(pageTemp.locator('.insure_info').locator('h1')).toContainText(title);
      });
  });
 
  




































