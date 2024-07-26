import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // befor each tests, go to the main page of Ctrip.
    await page.goto('https://www.ctrip.com/');
  });

  test.describe('Selected Travel Notes -by Ryan', () => {
    
    test.beforeEach(async ({ page }) => {
        // ​Before each test, Click 'Online seat selection'.
        await page.goto('https://vacations.ctrip.com/youxue');
      });
    
      // @summary
      // Selected travel notes next button can be used
      // 1.Locator all information of Selected travel notes.
      // 2.Expect that the first two information shold visible.
      // 3.Click next.
      // 4.Expect that the 2-4 information should visible.
      test('Selected travel notes next button can be used -by Ryan', async ({ page }) => {
        // Get all information of Selected travel notes.
        const contentHtml = await page.locator('div.travel_notes.basefix').locator('.focusbox').locator('.picbox');

        //Before click next, The first two information should visible.
        for(let i = 0;i < 2; i++){
            await expect(contentHtml.nth(i)).toBeVisible();
        }
        //Click next
        await page.locator('.next').click();
        //After click next, The 2-4 information should visible.
        for(let i = 2;i < 4; i++){
            await expect(contentHtml.nth(i)).toBeVisible();
        }
      });
  });
 
  




































