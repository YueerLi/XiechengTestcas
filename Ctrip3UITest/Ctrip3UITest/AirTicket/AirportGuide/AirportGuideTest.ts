import {test,expect,chromium} from '@playwright/test';

//@summary
//Airport Guide
//Select Airticket
//Guide for selecting an airport
//Select '虹桥机场'
//Assert that '机场首页', '机场简介', '机场交通', '机场电话' are visible
test ('AirportGuideTest - by Ele', async ({})=> {
    const browser = await chromium.launchPersistentContext('D:\cookie', {
        viewport: { width: 1600, height: 900 }
    });
    const page = await browser.newPage();
    await page.goto('https://www.ctrip.com/');

    await page.getByLabel('机票 按回车键打开菜单').click();
    await page.getByRole('link',{name:'机场攻略'}).click()
    await page.getByRole('link',{name:'虹桥机场'}).click()

    await expect(page.locator('ul>li')).toContainText(['机场首页','机场简介','机场交通','机场电话'])

    await page.close();
});