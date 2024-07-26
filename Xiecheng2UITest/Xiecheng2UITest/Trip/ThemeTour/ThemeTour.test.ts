import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Theme tour -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Before each test, Click 'Online seat selection'.
        await page.goto('https://vacations.ctrip.com/themetravel');
      });
    
      // @summary
      // Theme Search
      // 1.Choose '北京'.
      // 2.Choose '徒步'.
      // 3.The new page should contain '徒步' and '北京'
      test('Theme Search  -by Ryan', async ({ page }) => {
        // Choose '北京'
        await page.locator('.start_city_station ').click();
        await page.getByRole('link', { name: '北京' }).nth(1).click();
        const page1Promise = page.waitForEvent('popup');
        // Choose '徒步'
        await page.getByRole('link', { name: '徒步', exact: true }).click();
        const page1 = await page1Promise;
        
        // exception
        await expect(page1.locator('#online-search-input-box')).toHaveValue('徒步');
        await expect(page1.locator('#search-box-container')).toContainText('北京站');
     
      });

      // @Summary
      // expect all information from themeboxs match the information that we choose.
      // 1.Locate the page that contains all theme boxs.
      // 2.expect all information contains '潜水' in the first theme boxes after choosing '潜水'.
      // 3.expect all information contains '房车' in the first theme boxes after choosing '房车'.
      // 4.expect all information contains '摄影' in the first theme boxes after choosing '摄影'.
      test('Outdoor activities, Nature, and Humanity theme boxs -by Ryan', async ({ page }) => {
        //Locate the page that contains all theme boxes.
        const contentHtml = await page.locator('.theme_content').locator('div');

        //Choose '潜水' in the first theme box.
        await page.locator('span').filter({ hasText: /^潜水$/ }).hover();
        //expect all information contains '潜水'
        for(let temp=0; temp++; temp >= 3){
          await expect(contentHtml.nth(0).locator('.cont_con_item').locator('a').nth(temp)).toContainText('潜水');
        }

        //expect the second theme box.
        await page.locator('span').filter({ hasText: /^房车$/ }).hover();
        for(let temp=0; temp++; temp >= 3){
          await expect(contentHtml.nth(1).locator('.cont_con_item').locator('a').nth(temp)).toContainText('房车');
        }
        
        //expect the third theme box.
        await page.locator('span').filter({ hasText: /^摄影$/ }).hover();
        for(let temp=0; temp++; temp >= 3){
          await expect(contentHtml.nth(2).locator('.cont_con_item').locator('a').nth(temp)).toContainText('摄影');
        }
      });

  });
 
  




































