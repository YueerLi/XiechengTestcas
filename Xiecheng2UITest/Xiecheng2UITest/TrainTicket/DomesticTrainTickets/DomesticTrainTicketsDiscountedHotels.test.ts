import { test , expect, chromium} from '@playwright/test';

// @summary
// Domestic Train Tickets Discounted Hotels
// Navigate to discount hotels
// Expect： the newpage title is '桐庐骏悦酒店'
// Choose and book room.
test('DomesticTrainTicketsDiscountedHotels - From Yueer', async () => {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
      viewport: { width: 1920, height: 1080 }  // Set the size of the window
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');
    await page.getByLabel('火车票 按回车键打开菜单').click();
    await expect(page.getByRole('link', {name:"国内火车票", exact: true})).toBeVisible();
    await page.getByRole('link', {name:"国内火车票", exact: true}).click();
    
    //Navigate to discount hotels
    expect(page.locator('.index-show-hd').filter({hasText: '优惠酒店'})).toBeVisible();
    expect(page.locator('.index-show-city>li:nth-child(3)').nth(0)).toContainText('杭州');
    await page.locator('.index-show-city>li:nth-child(3)').nth(0).click();
    await page.waitForTimeout(3000);
    expect(page.locator('.index-show-hotel>li h4').nth(0)).toContainText('桐庐骏悦酒店');
  
    //Jump to new page
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      //Choose first recommanded option 
      page.locator('.index-show-hotel>li').nth(0).click()
    ]);
    await newPage.waitForLoadState();
    //Expect： the newpage title is '桐庐骏悦酒店'
    await expect(newPage.locator('.detail-headline_name  ')).toContainText('桐庐骏悦酒店');
    await page.waitForTimeout(3000);
    await newPage.locator('.detail-head-price_select').filter({hasText:'选择房间'}).click();
    await browser.close();
  });
