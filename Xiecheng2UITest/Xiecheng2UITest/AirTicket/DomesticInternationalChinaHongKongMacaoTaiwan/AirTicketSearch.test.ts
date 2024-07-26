import {test,expect,chromium} from '@playwright/test';

//@summary
//AirTicket Search
//1.Click airticket
//2.Enter departure location
//3.Add Passenger Type
//4.Search
//5.Assert city name search include Chengdu-Xian
test('AirTicketSearchTest - by Ying', async ({}) => {
    test.setTimeout(60000);
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');

    //Click airticket
    await page.getByRole('button',{name:'机票 按回车键打开菜单'}).click()
    await expect(page.locator('.lsn_son_nav_LbhRN.lsn_son_nav_active_E-1fy')).toBeVisible()
    
    //Enter departure location
    await page.getByLabel('可输入城市或机场').first().click();
    await page.getByLabel('可输入城市或机场').first().fill('成都')

    //Enter destination location
    await page.getByLabel('可输入城市或机场').nth(1).click();
    await page.getByLabel('可输入城市或机场').nth(1).fill('西安')
    
    //Add Passenger Type
    await page.locator('.ico-checkbox-square').first().click()

    //Search
    await page.getByRole('button',{name:'搜索'}).first().click()
    
    //Assert city name search include Chengdu-Xian
    await expect(page.locator('div>span')).toContainText(['成都', '西安'])

    //Close page
    await page.close(); 
  });