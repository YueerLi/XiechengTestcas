import { test , expect, chromium} from '@playwright/test';

//@Summary
//Travel Home -- Search City
//Set Beijing location
//Search '八达岭长城'
//Choose first recommanded option of '八达岭长城' Travel
//Expect： the newpage title is '八达岭长城'
test('TravelSearchCity - From Yueer', async () => {
  const browser = await chromium.launchPersistentContext('D:\cookie', {
    viewport: { width: 1600, height: 900 }  // Set the size of the window
  });
  const page = await browser.newPage();
  await page.goto('https://www.ctrip.com/');
  await page.getByLabel('旅游 按回车键打开菜单').click();
  await expect(page.getByRole('link', {name:"旅游首页"})).toBeVisible();
  await page.getByRole('link', {name:"旅游首页"}).click();

  //Set Beijing location
  await page.locator('.city_wrap  dl').click();
  await page.locator('.city_wrap  dl').getByText('北京',{exact: true}).first().click();
  
  //Search '八达岭长城'
  await expect(page.getByLabel('请输入目的地、主题或关键字')).toBeVisible();
  await page.getByLabel('请输入目的地、主题或关键字').fill('八达岭长城');
  await page.getByRole('link', { name: '搜 索' }).click();
  await page.locator('.list_recommend_text ').filter({hasText: '好评优先'}).click();
  await expect(page.locator('.list_recommend_text ').filter({hasText: '好评优先'})).toHaveClass('list_recommend_text cur')
  await expect(page.locator('.list_product_title:nth-child(1) span').first()).toContainText('八达岭长城');


  //Jump to new page
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    //Choose first recommanded option of '八达岭长城' Travel
    page.locator('.list_product_title:nth-child(1) span').first().click()
  ]);
  await newPage.waitForLoadState();
  //Expect： the newpage title is '八达岭长城'
  await expect(newPage.getByRole('heading').first()).toContainText('八达岭长城');
  await browser.close();
});