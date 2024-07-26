import { test, expect, chromium } from '@playwright/test';

//@Summary
//Travel Home -- Indoor
//Browsing recommended well-known cities
//Choose and jump to '九寨沟' 
//Choose first recommanded option of '九寨沟' Travel
//Expect： the newpage1 title is '九寨沟'
test('TravelIndoor - From Yueer', async () => {
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
    await page.locator('.domestic_product h2').click();
    await expect(page.locator('.domestic_product h2')).toContainText('境内旅游');
    await page.locator('.domestic_product li').nth(0).click();
    await expect(page.locator('.domestic_product li').nth(0)).toContainText('精选');
    await page.locator('.domestic_product li').nth(1).click();
    await expect(page.locator('.domestic_product li').nth(1)).toContainText('北京');
    await page.locator('.domestic_product li').nth(2).click();
    await expect(page.locator('.domestic_product li').nth(2)).toContainText('成都');
    await page.locator('.domestic_product li').nth(3).click();
    await expect(page.locator('.domestic_product li').nth(3)).toContainText('呼伦贝尔');
    await page.locator('.domestic_product li').nth(4).click();
    await expect(page.locator('.domestic_product li').nth(4)).toContainText('九寨沟');
    
    //Jump to new Travel page
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      //Click More to open newpage
      await page.getByRole('link', { name : '更多九寨沟产品'}).click()
    ]);
    await expect(newPage.getByRole('heading').first()).toContainText('九寨沟旅游');
    //Departure City：Shanghai
    await newPage.locator('.list_cate_select:nth-child(5) .list_cate_left span').first().click();
    await newPage.locator('.list_recommend_text ').filter({ hasText : '好评优先'}).click();
    await expect(newPage.locator('.list_product_title span:nth-child(1)').first()).toContainText('九寨沟');
  
    //Jump to new page
    const [newPage1] = await Promise.all([
      newPage.context().waitForEvent('page'),
      //Click More to open newpage
      newPage.locator('.list_product_title span:nth-child(1)').first().click()
    ]);
    //Expect： the newpage1 title is '九寨沟'
    await expect(newPage1.locator('h1').first()).toContainText('九寨沟');
    await browser.close();
  });
  