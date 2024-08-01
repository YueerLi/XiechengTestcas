import { test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Surrounding OneDay Tour -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Before each test, goto Surrounding OneDay Tour.
        await page.goto('https://vacations.ctrip.com/tangram/NTAwNzk=?ctm_ref=vactang_page_50079&apppgid=10650019968');
      });

      // @summary
      // Surrounding OneDay Tour messages
      // 1.store the title of the message we choosed into an variable.
      // 2.click the message
      // Expect:the title of the message is same as we choosed.
      test('Surrounding OneDay Tour messages   -by Ryan', async ({ page }) => {
        let title; //get title
        await page.mouse.wheel(0,7000);// in order to flush the page.
        //title's html
        let titleHtml = await page.locator('.diy_product_wrapper').nth(2).locator('.diy_product_txt_wrapper').first();
        await titleHtml.innerText().then((result) => {  
          if (result === null) {  
            console.log('Received null');  
          } else {
            title = result;
            //use '·' to split the title
            title = title.split('·')[0]; 
          }  
        });

        // choose the first message under “周边跟团游”
        const pageMessagePromise = page.waitForEvent('popup');
        await titleHtml.click();
        const pageMessage = await pageMessagePromise;
        await expect(pageMessage.locator('h1')).toContainText(title);
      });
    
      // @summary
      // Surrounding OneDay Tour more messages button 
      // 1.Click '更多日游产品'
      // Expect: the input text contains '周边'
      test('Surrounding OneDay Tour more messages button   -by Ryan', async ({ page }) => {
        const pagePromise = page.waitForEvent('popup');
        await page.locator('div:nth-child(4) > .hot_zone_box > .hot_zone_content > .hot_zone_wrapper > .hot_zone_item').click();
        const testPage = await pagePromise;
        await expect(testPage.locator('.input_val.input_val_search').first()).toHaveValue('周边');
      });

  });
 