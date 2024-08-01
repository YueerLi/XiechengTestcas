import {test,expect} from '@playwright/test';

//@summary
//Private Group Tour City Search
//1.Click Trip
//2.Click Private Group Tour
//3.Enter Destination
//3.Click 'Search'
//4.Assertion that the attribution of 'destination' is visible
test ('PrivateGroupTourCitySearchTest - by Ying', async ({page})=> {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('https://www.ctrip.com/');

    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link',{name:'私家团'}).click();

    await page.locator('.search_txt').click();
    await page.locator('.search_txt').fill('东北')
    await page.getByRole('link',{name:'搜 索'}).click();

    await expect(page.getByRole('heading',{name:'黑龙江私家团'})).toBeVisible();

    await page.close();
});