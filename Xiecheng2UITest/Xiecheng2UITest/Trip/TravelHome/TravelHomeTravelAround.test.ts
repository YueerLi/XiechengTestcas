import { test, expect, chromium } from '@playwright/test';

//@Summary
//Travel Home -- Around
//Browsing recommended well-known cities
//Choose and jump to '舟山' 
//Choose first recommanded option of '舟山' Travel
//Expect： the newpage1 title is '舟山'
test('TravelAround - From Yueer', async () => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
      viewport: { width: 1600, height: 900 }  // Set the size of the window
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link', { name: '旅游首页', exact: true }).click();
  
     //Set Shanghai location
    await page.locator('.city_wrap  dl').click();
    await page.locator('.city_wrap  dl').getByText('上海',{exact: true}).first().click();
  
    //Test Switch Abroad place
    await page.mouse.wheel(0,2000);
    await page.locator('.around_product h2').click();
    await expect(page.locator('.around_product h2')).toContainText('周边当地游');
    await page.locator('.around_product li').nth(0).click();
    await expect(page.locator('.around_product li').nth(0)).toContainText('精选');
    await page.locator('.around_product li').nth(1).click();
    await expect(page.locator('.around_product li').nth(1)).toContainText('杭州');
    await page.locator('.around_product li').nth(2).click();
    await expect(page.locator('.around_product li').nth(2)).toContainText('南京');
    await page.locator('.around_product li').nth(3).click();
    await expect(page.locator('.around_product li').nth(3)).toContainText('苏州');
    await page.locator('.around_product li').nth(4).click();
    await expect(page.locator('.around_product li').nth(4)).toContainText('舟山');
    
    //Jump to new Travel page
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      //Click More to open newpage
      await page.getByRole('link', { name : '更多舟山产品'}).click()
    ]);
    await expect(newPage.getByRole('heading').first()).toContainText('舟山旅游');
    //Departure City：Shanghai
    await newPage.locator('.list_cate_select:nth-child(5) .list_cate_left span').first().click();
    await newPage.locator('.list_recommend_text ').filter({ hasText : '好评优先'}).click();
    await expect(newPage.locator('.list_product_title span:nth-child(1)').first()).toContainText('舟山');
  
    //Jump to new page
    const [newPage1] = await Promise.all([
      newPage.context().waitForEvent('page'),
      //Click More to open newpage
      newPage.locator('.list_product_title span:nth-child(1)').first().click()
    ]);
    //Expect： the newpage1 title is '舟山'
    await expect(newPage1.locator('h1').first()).toContainText('舟山');
    await browser.close();
  });
  