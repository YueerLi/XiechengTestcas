import {test,expect} from '@playwright/test';

//@summary
//Private Group Tour Destination
//1.Click Trip
//2.Click Private Group Tour 
//3.Click Destination Private Group Tour
//4.Assertion that 'Private Group Tour' is visible
//5.The text of the assertion reads 'Destination Private Tours'.
test ('PrivateGroupTourDestinationTest - by Ying', async ({page})=> {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('https://www.ctrip.com/');

    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link',{name:'私家团'}).click();

    const page1Promise = page.waitForEvent('popup')
    await page.locator('.group_con_l.group_con_l_new').nth(1).click()
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading',{name:'私家团'})).toBeVisible();
    await expect(page1.locator('.filtrate_list.current')).toHaveText('目的地私家团')

    await page.close();
});