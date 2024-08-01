import {test,expect} from '@playwright/test';

//@summary
//Group Tour City Search
//1.Click Trip
//2.Click Group Tour
//3.Enter Destination
//3.Click 'Search'
//4.Assertion that the attribution of 'destination' is visible
test ('GroupTourCitySearchTest - by Ying', async ({page})=> {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('https://www.ctrip.com/');

    await page.getByLabel('旅游 按回车键打开菜单').click();
    await page.getByRole('link',{name:'跟团游'}).click();

    await page.getByLabel('请输入目的地、主题或关键字').first().click()
    await page.getByLabel('请输入目的地、主题或关键字').first().fill('东北')
    await page.getByRole('link',{name:'搜 索'}).click();

    await expect(page.getByRole('link',{name:'黑龙江旅游'})).toBeVisible();

    await page.close();
});