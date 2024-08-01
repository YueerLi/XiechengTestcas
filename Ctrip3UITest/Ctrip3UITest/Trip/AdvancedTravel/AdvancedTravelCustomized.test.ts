import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Advanced Travel Customized -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Before each test, goto Advanced Travel.
        await page.goto('https://vacations.ctrip.com/tangram/hhtravel?ctm_ref=vactang_page_5872#ctm_ref=hh_ct_thp_nav');
      });

      // @summary
      // Advanced Travel Customized.
      // 1.Click '欧洲'
      // 2.Verify the element has been choosed
      // 3.Click '德国'
      // 4.Verify all messages in page contains '德国'
      // 5.Click the first message in the page.
      // Expect: the title is same as we choosed.
      test('Advanced Travel Customized Destination choosable  -by Ryan', async ({ page }) => {
        //Click '欧洲'
        let europeHtml=await page.locator('.multiple_modules_tab_box').locator('li').nth(1);
        //Verify the element has not been choosed
        await expect(europeHtml).not.toHaveClass('multiple_modules_tab_item multiple_modules_tab_cur');
        await europeHtml.click();
        //Verify the element has been choosed
        await expect(europeHtml).toHaveClass('multiple_modules_tab_item multiple_modules_tab_cur');

        //Verify all messages contain '德国'.
        const page1Promise = page.waitForEvent('popup');
        await page.locator('p:nth-child(8)').first().click();
        const page1 = await page1Promise;
        let messagesHtml = await page1.locator('#listProducts').locator('.item_main_title');
        await expect(messagesHtml).toContainText(['德国']); 
        
        //Verify the message we click have the same title we have selected. 
        let title;
        await messagesHtml.nth(0).innerText().then((result) => {  
            if (result === null) {  
              console.log('Received null');  
            } else {
              title = result;
            }  
          });
        const page2Promise = page1.waitForEvent('popup');
        await messagesHtml.nth(0).click();
        const page2 = await page2Promise;
        await expect(page2.locator('.product_title')).toHaveText(title);
      });



  });
 