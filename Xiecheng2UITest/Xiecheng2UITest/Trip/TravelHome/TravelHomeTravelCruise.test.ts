import { test, expect, chromium } from '@playwright/test';

//@Summary
//Travel Home -- Cruise
//Browsing recommended well-known cities
//Choose and jump to '舟山' 
//Choose first recommanded option of '舟山' Travel
//Expect： the newpage1 title is '舟山'
test('TravelCruise - From Yueer', async () => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
      viewport: { width: 1600, height: 900 }  // Set the size of the window
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link', { name: '旅游首页', exact: true }).click();
  
     //Set Shanghai location
    await page.locator('.city_wrap dl').click();
    await page.locator('.city_wrap dl dd').getByText('上海',{exact: true}).first().click();
  
    //Test Switch Abroad place
    await page.mouse.wheel(0,2000);
    await page.locator('.cruise_product h2').click();
    await expect(page.locator('.cruise_product h2')).toContainText('邮轮');
    await page.locator('.cruise_product li').nth(0).click();
    await expect(page.locator('.cruise_product li').nth(0)).toContainText('精选');
    await page.locator('.cruise_product li').nth(1).click();
    await expect(page.locator('.cruise_product li').nth(1)).toContainText('日本');
    await expect(page.locator('.cruise_product .theme_box>a').first()).toHaveClass('theme_img');

    
    //Jump to new Travel page
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      //Click More to open newpage
      page.locator('.cruise_product .theme_box>a').first().click()
    ]);
    await expect(newPage.locator('.ship_name>a')).toContainText('长航游轮 · 长江叁号');
    await newPage.getByRole('link', { name : '销量'}).click();
  
    //Jump to new page
    const [newPage1] = await Promise.all([
      newPage.context().waitForEvent('page'),
      //Click More to open newpage
      newPage.locator('.route_list').first().click()
    ]);
    //Expect： the newpage1 title is '长航游轮 · 长江叁号4日3晚邮轮自由行'
    await expect(newPage1.locator('h1').first()).toContainText('长航游轮 · 长江叁号4日3晚邮轮自由行');
    await browser.close();
  });
  