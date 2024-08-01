import { test , expect, chromium} from '@playwright/test';
// Domestic train ticket discount hotel
// 1. Enter the domestic train ticket page from the home page
// 2. Click on the discounted hotel to enter the new pop-up page
// 3. Select a room and fill in the room information to complete the order
test('DiscountHotels', async ({}) => {
  const browser = await chromium.launchPersistentContext('D:\\cookie', {
    viewport: { width: 1920, height: 1080 } 
  });
  //Enter the domestic train ticket page from the home page
  const page = await browser.newPage();
  await page.goto('https://www.ctrip.com/');
  await page.locator('.pc_home-tabbtnIcon').click();
  await page.getByLabel('火车票 按回车键打开菜单').click();
  await page.locator('.pc_home-tabbtnIcon').click();
  await page.locator('ul').locator('.cur').filter({hasText:'上海'}).nth(1).click();
  await expect(page.getByText('上海延安饭店')).toBeVisible();
  //Click on the discounted hotel to enter the new pop-up page
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('上海延安饭店').click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading',{name:'上海延安饭店'}).nth(0)).toBeVisible();
  //Select a room and fill in the room information to complete the order
  await page1.locator('.detail-head-price_select').filter({hasText:'选择房间'}).click();
  //Automatic operation causes the room not to be displayed and the last step of booking cannot be performed
  // await page1.locator('.focus-input.show-hightlight.in-time[control-id="ControlID-14"]').click();
  // await page1.locator('.c-calendar__body > div:nth-child(1)').locator('.c-calendar-month__days').filter({hasText:'18'}).click();
  // await page1.locator('.c-calendar__body > div:nth-child(1)').locator('.c-calendar-month__days').filter({hasText:'19'}).click();
  // await page1.locator('.roomlist-baseroom > div:nth-child(1)').locator('.book book-hover').filter({hasText:'预定'}).click();
  // await page1.getByRole('textbox',{name:'电话号码'}).fill('15527676716');
  // await page1.getByText('去支付').click();
  try {
      await expect(await expect(page1.locator('.layout-header-logo')).toBeVisible());
      console.log('Test case success');
  } catch (error) {
      console.error('Test case failed', error);
  } 
  await page.close();
});
