import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Surrounding Group Tours -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Before each test, goto Surrounding Group Tours.
        await page.goto('https://vacations.ctrip.com/tangram/NTAwNzk=?ctm_ref=vactang_page_50079&apppgid=10650019968');
      });

      // @summary
      // Surrounding Group Tours messages
      // 1.store the title of the message we choosed into an variable.
      // 2.click the message
      // Expect:the title of the message is same as we choosed.
      test('Surrounding Group Tours messages   -by Ryan', async ({ page }) => {
        let title;//get titleW
        //title's html
        let titleHtml=await page.locator('xpath=//*[@id="body_wrapper"]/div[9]/div[2]/div[2]/div/div/div/div/div/div/div[1]/div[1]/div[3]/div');
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
      // Surrounding Group Tours more messages button 
      // 1.Click '更多跟团产品'
      // Expect: the input text contains '周边'
      test('Surrounding Group Tours more messages button   -by Ryan', async ({ page }) => {
        const pagePromise = page.waitForEvent('popup');
        await page.locator('.expose_dom > div:nth-child(2) > div > .hot_zone_box > .hot_zone_content > .hot_zone_wrapper > .hot_zone_item').first().click();
        const testPage = await pagePromise;
        await expect(testPage.locator('.search_txt').first()).toHaveValue('周边');
      });

      // @summary
      // Surrounding Group Tours select clickable
      // 1.expect '亲子出游' doesn't have class 'multiple_modules_tab_box'
      // 2.Click '亲子出游'
      // Expect: '亲自出游' contain class'multiple_modules_tab_box'
      test('Surrounding Group Tours select clickable  -by Ryan', async ({ page }) => {
        //locate '亲自出游' element.
        let testHtml = await page.locator('.multiple_modules_tab_box').first().locator('li').nth(1);
        await expect(testHtml).not.toHaveClass('multiple_modules_tab_item multiple_modules_tab_cur');
        await testHtml.click();
        await expect(testHtml).toHaveClass('multiple_modules_tab_item multiple_modules_tab_cur');
      });

  });
 