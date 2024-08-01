import {test,expect,chromium} from '@playwright/test';

//@summary
//More Service
//1.Click airticket
//2.Clcik more service
//3.Assertion of more services' functionality visible
test('AirTicketMoreServiceTest - by Ele', async ({}) => {
    test.setTimeout(60000);
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/')

    //Click airticket
    await page.getByRole('button',{name:'机票'}).click()
    await expect(page.locator('.lsn_son_nav_LbhRN.lsn_son_nav_active_E-1fy')).toBeVisible()

    //Clcik more service
    await page.getByText('更多服务',{exact : true}).click()

    //Assertion of more services' functionality visible
    await expect(page.locator('ul>li')).toContainText(['报销凭证','机场攻略','国内机场大全','国际机场大全','定制包机','扫码下载携程APP'])
    
    //Close page
    await page.close(); 
});