import {test,expect} from '@playwright/test';

//@summary
//Private Group Tour Domestic
//1.Click Trip
//2.Click Private Group Tour
//3.Click Domestic Private Group Tour
//4.Assertion that 'Domestic' is visible
//5.The text of the assertion reads 'Private Group Tour'.
test ('PrivateGroupTourDomesticTest - by Ying', async ({page})=> {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('https://www.ctrip.com/');

    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link',{name:'私家团'}).click();

    const page1Promise = page.waitForEvent('popup')
    await page.locator('.group_con_l.group_con_l_new').nth(0).click()
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading',{name:'境内'})).toBeVisible();
    await expect(page1.locator('.filtrate_list.current')).toHaveText('私家团');

    await page.close();
});