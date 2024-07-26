import { test, expect, chromium } from '@playwright/test';

//@Summary
//Travel -- Abroad Travel
//Browsing recommended well-known foreign cities
//Choose and jump to Bali 
//Choose first recommanded option of Bali Travel
//Expect： the newpage1 title is '巴厘岛'
test('TravelOnboard -- From Yueer', async () => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
      viewport: { width: 1600, height: 900 }  // Set the size of the window
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link', { name: '旅游首页', exact: true }).click();
  
    //Test Switch Abroad place
    await page.mouse.wheel(0,2000);
    await page.locator('.international_product h2').click();
    await expect(page.locator('.international_product h2')).toContainText('出境旅游');
    await page.locator('.international_product li').nth(0).click();
    await expect(page.locator('.international_product li').nth(0)).toContainText('精选');
    await page.locator('.international_product li').nth(1).click();
    await expect(page.locator('.international_product li').nth(1)).toContainText('日本');
    await page.locator('.international_product li').nth(2).click();
    await expect(page.locator('.international_product li').nth(2)).toContainText('泰国');
    await page.locator('.international_product li').nth(3).click();
    await expect(page.locator('.international_product li').nth(3)).toContainText('香港');
    await page.locator('.international_product li').nth(5).click();
    await expect(page.locator('.international_product li').nth(5)).toContainText('仙本那');
    await page.locator('.international_product li').nth(8).click();
    await expect(page.locator('.international_product li').nth(8)).toContainText('巴厘岛');

    //Jump to new Travel page
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      //Click More to open newpage
      await page.getByRole('link', { name : '更多巴厘岛产品'}).click()
    ]);
    await expect(newPage.getByRole('heading').first()).toContainText('巴厘岛旅游');
    await newPage.locator('.list_recommend_text ').filter({ hasText : '好评优先'}).click();
    await expect(newPage.locator('.list_product_title span:nth-child(1)').first()).toContainText('巴厘岛');
  
    //Jump to new page
    const [newPage1] = await Promise.all([
      newPage.context().waitForEvent('page'),
      //Click More to open newpage
      newPage.locator('.list_product_title span:nth-child(1)').first().click()
    ]);
    //Expect： the newpage1 title is '巴厘岛'
    await expect(newPage1.locator('h1').first()).toContainText('巴厘岛');
    await browser.close();
  });
  