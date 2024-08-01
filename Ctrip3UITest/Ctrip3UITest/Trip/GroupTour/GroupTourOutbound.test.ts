import {test,expect} from '@playwright/test';

//@summary
//Group Tour Outbound
//1.Click Trip
//2.Click Group Tour
//3.Click Outbound group tours
//4.Assertion that 'Outbound' is visible
//5.The text of the assertion reads 'Departure'.
test ('GroupTourOutboundTest - by Ying', async ({page})=> {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('https://www.ctrip.com/');

    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link',{name:'跟团游'}).click();

    const page1Promise = page.waitForEvent('popup')
    await page.locator('.group_con_l.group_con_l_new').first().click();
    const page1 = await page1Promise;

    await expect(page1.getByRole('heading',{name:'出境'})).toBeVisible();
    await expect(page1.locator('.filtrate_list.current')).toHaveText('出发地参团');
    await page.close();
});